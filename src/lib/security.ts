/**
 * Security utilities for the TryItTech Admin Panel.
 * Implements robust session signing, data sanitization, and rate limiting.
 */

const SECRET = process.env.ADMIN_JWT_SECRET || 'fallback-secret-for-development-9640946464';

// ─── Rate Limiting ─────────────────────────────────────────────────────────
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

// ─── Session Signing ───────────────────────────────────────────────────────

/**
 * Signs a session string with HMAC-SHA256.
 * Prevents session cookie forgery.
 */
export async function signSession(payload: string): Promise<string> {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(SECRET);
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
        const keyData = encoder.encode(SECRET);
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

// ─── NoSQL Injection Prevention ────────────────────────────────────────────

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
                if (keys.some(k => k.startsWith('$'))) continue;
            }
            sanitized[key] = value;
        }
    }
    return sanitized;
}

