/**
 * Security utilities for the TryItTech Admin Panel.
 * Implements robust session signing, data sanitization, rate limiting, and input validation.
 */

import { z } from 'zod';

const FINAL_SECRET = process.env.ADMIN_JWT_SECRET;
if (!FINAL_SECRET) {
    throw new Error('CRITICAL: ADMIN_JWT_SECRET environment variable is missing. Authentication and session signing will fail.');
}


// ─── Session Store for Rotation ─────────────────────────────────────────────────────
// NOTE: In Next.js, memory stores (Map) are NOT shared between Middleware (Edge) 
// and API Routes (Node.js). For shared state, use Redis.
// For now, we rely on cryptographic signing in VerifySession to allow cross-runtime auth.
const sessionStore = new Map<string, { valid: boolean; createdAt: number }>();
const SESSION_MAX_AGE = 60 * 60 * 8 * 1000; // 8 hours in ms

// ─── Rate Limiting ─────────────────────────────────────────────────────────────────
// In-memory store: ip → { count, resetAt }
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

export function checkRateLimit(ip: string): { allowed: boolean; remaining: number; retryAfterMs: number } {
    const now = Date.now();
    const entry = rateLimitStore.get(ip);

    if (!entry || now > entry.resetAt) {
        // First attempt or window expired — reset
        rateLimitStore.set(ip, { count: 1, resetAt: now + WINDOW_MS });
        return { allowed: true, remaining: MAX_ATTEMPTS - 1, retryAfterMs: 0 };
    }

    if (entry.count >= MAX_ATTEMPTS) {
        return { allowed: false, remaining: 0, retryAfterMs: entry.resetAt - now };
    }

    entry.count++;
    return { allowed: true, remaining: MAX_ATTEMPTS - entry.count, retryAfterMs: 0 };
}

export function resetRateLimit(ip: string) {
    rateLimitStore.delete(ip);
}

// ─── Session Signing ────────────────────────────────────────────────────────────────

export async function signSession(payload: string): Promise<string> {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(FINAL_SECRET);
    const data = encoder.encode(payload);

    const cryptoKey = await crypto.subtle.importKey(
        'raw', keyData,
        { name: 'HMAC', hash: 'SHA-256' },
        false, ['sign']
    );

    const signature = await crypto.subtle.sign('HMAC', cryptoKey, data);
    const signatureBase64 = btoa(String.fromCharCode(...new Uint8Array(signature)));

    return `${payload}.${signatureBase64}`;
}

/**
 * Verifies a session signature using constant-time comparison.
 * Uses lastIndexOf to safely split payload from signature.
 */
export async function verifySession(tokenWithSig: string): Promise<boolean> {
    try {
        if (!tokenWithSig) return false;

        // Use lastIndexOf — the signature is always the last segment after '.'
        const lastDot = tokenWithSig.lastIndexOf('.');
        if (lastDot === -1) return false;

        const payload = tokenWithSig.substring(0, lastDot);
        const signatureBase64 = tokenWithSig.substring(lastDot + 1);

        if (!payload || !signatureBase64) return false;

        const encoder = new TextEncoder();
        const keyData = encoder.encode(FINAL_SECRET);
        const data = encoder.encode(payload);

        const cryptoKey = await crypto.subtle.importKey(
            'raw', keyData,
            { name: 'HMAC', hash: 'SHA-256' },
            false, ['verify']
        );

        const signature = Uint8Array.from(atob(signatureBase64), c => c.charCodeAt(0));
        return await crypto.subtle.verify('HMAC', cryptoKey, signature, data);
    } catch {
        return false;
    }
}

/**
 * Creates a new session with a unique ID and registers it.
 * This helps prevent session fixation attacks.
 */
export async function createSession(): Promise<{ sessionId: string; signedToken: string }> {
    const sessionId = crypto.randomUUID();
    const payload = `${sessionId}-${Date.now()}`;
    const signedToken = await signSession(payload);

    // Register session in store
    sessionStore.set(sessionId, { valid: true, createdAt: Date.now() });

    // Clean up old sessions periodically
    if (sessionStore.size > 100) {
        const now = Date.now();
        for (const [key, value] of sessionStore.entries()) {
            if (now - value.createdAt > SESSION_MAX_AGE) {
                sessionStore.delete(key);
            }
        }
    }

    return { sessionId, signedToken };
}

/**
 * Validates a session and checks if it's in the valid store.
 * Extracts session ID from the token for verification.
 */
export async function verifySessionWithStore(tokenWithSig: string): Promise<boolean> {
    const isValid = await verifySession(tokenWithSig);
    if (!isValid) return false;

    try {
        const lastDot = tokenWithSig.lastIndexOf('.');
        const payload = tokenWithSig.substring(0, lastDot);
        const parts = payload.split('-');
        
        // Payload structure: UUID-Timestamp
        const sessionId = parts[0];
        const timestamp = parseInt(parts[parts.length - 1]);

        // 1. Check expiration using timestamp in payload (Stateless)
        if (isNaN(timestamp) || Date.now() - timestamp > SESSION_MAX_AGE) {
            return false;
        }

        // 2. Check Store (Stateful - for blacklisting/logout)
        // Note: This only works in the Node.js process, not Edge Middleware.
        const session = sessionStore.get(sessionId);
        if (session && !session.valid) return false;

        return true;
    } catch {
        return false;
    }
}

/**
 * Checks if a request is authenticated as an admin.
 * Used for defense-in-depth on API routes.
 */
export async function isAuthenticated(request: { cookies: { get: (name: string) => { value: string } | undefined } }): Promise<boolean> {
    const session = request.cookies.get('admin_session');
    if (!session?.value) return false;
    return await verifySessionWithStore(session.value);
}

/**
 * Invalidates a session (for logout or security events).
 */
export function invalidateSession(tokenWithSig: string): boolean {
    try {
        const lastDot = tokenWithSig.lastIndexOf('.');
        if (lastDot === -1) return false;

        const payload = tokenWithSig.substring(0, lastDot);
        const sessionId = payload.split('-')[0];

        return sessionStore.delete(sessionId);
    } catch {
        return false;
    }
}

// ─── NoSQL Injection Prevention ────────────────────────────────────────────────────

/**
 * Sanitizes an object to only include allowed keys.
 * Prevents NoSQL injection via unexpected query operators or extra fields.
 */
export function sanitizeData<T extends Record<string, unknown>>(data: T, allowedFields: (keyof T)[]): Partial<T> {
    const sanitized: Partial<T> = {};
    for (const key of allowedFields) {
        if (key in data) {
            const value = data[key];
            if (value && typeof value === 'object' && !Array.isArray(value)) {
                const keys = Object.keys(value as object);
                if (keys.some(k => k.startsWith('$')))
                    continue;
            }
            sanitized[key] = value;
        }
    }
    return sanitized;
}

// ─── Input Validation Schemas (Zod) ────────────────────────────────────────────────

/** Schema for login credentials */
export const loginSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required'),
});

/** Schema for inquiry form submission */
export const inquirySchema = z.object({
    name: z.string().min(1, 'Name is required').max(100),
    email: z.string().email('Invalid email').optional().or(z.literal('')),
    mobile: z.string().min(10, 'Mobile must be at least 10 digits').max(15),
    message: z.string().max(1000).optional(),
    service: z.string().optional(),
    source: z.string().optional(),
});

/** Schema for client logo data */
export const clientLogoSchema = z.object({
    name: z.string().min(1, 'Name is required').max(100),
    logoUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
    industry: z.string().max(50).optional(),
    website: z.string().url('Invalid URL').optional().or(z.literal('')),
});

/** Schema for service data */
export const serviceSchema = z.object({
    slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with dashes'),
    title: z.string().min(1, 'Title is required').max(100),
    icon: z.string().optional(),
    image: z.string().url('Invalid URL').optional().or(z.literal('')),
    secondaryImage: z.string().url('Invalid URL').optional().or(z.literal('')),
    shortDescription: z.string().max(200).optional(),
    fullDescription: z.string().optional(),
    benefits: z.array(z.string()).optional(),
    process: z.array(z.string()).optional(),
    startDate: z.string().optional(),
    curriculumPdf: z.string().optional(),
    executivePerspective: z.string().optional(),
});

/**
 * Validates data against a Zod schema.
 * Returns { success: true, data: parsed } on success,
 * or { success: false, error: message } on failure.
 */
export function validateInput<T>(schema: z.ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; error: string } {
    const result = schema.safeParse(data);
    if (result.success) {
        return { success: true, data: result.data };
    }
    const errorMessages = result.error.issues.map((e: z.ZodIssue) => `${e.path.join('.')}: ${e.message}`).join(', ');
    return { success: false, error: errorMessages };
}
