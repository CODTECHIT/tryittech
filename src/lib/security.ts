/**
 * Security utilities for the TryItTech Admin Panel.
 * Implements robust session signing and data sanitization.
 */

// We use hardcoded fallback only if env is missing, but env is always preferred.
const SECRET = process.env.ADMIN_JWT_SECRET || 'fallback-secret-for-development-9640946464';

/**
 * Signs a session string with an HMAC-like signature.
 * Prevents session cookie forgery.
 */
export async function signSession(payload: string): Promise<string> {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(SECRET);
    const data = encoder.encode(payload);

    const cryptoKey = await crypto.subtle.importKey(
        'raw',
        keyData,
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
    );

    const signature = await crypto.subtle.sign('HMAC', cryptoKey, data);
    const signatureBase64 = btoa(String.fromCharCode(...new Uint8Array(signature)));

    // Return payload with signature appended
    return `${payload}.${signatureBase64}`;
}

/**
 * Verifies a session signature.
 * Returns true if the signature is valid.
 */
export async function verifySession(tokenWithSig: string): Promise<boolean> {
    try {
        if (!tokenWithSig || !tokenWithSig.includes('.')) return false;

        const [payload, signatureBase64] = tokenWithSig.split('.');
        const encoder = new TextEncoder();
        const keyData = encoder.encode(SECRET);
        const data = encoder.encode(payload);

        const cryptoKey = await crypto.subtle.importKey(
            'raw',
            keyData,
            { name: 'HMAC', hash: 'SHA-256' },
            false,
            ['verify']
        );

        const signature = Uint8Array.from(atob(signatureBase64), c => c.charCodeAt(0));

        return await crypto.subtle.verify('HMAC', cryptoKey, signature, data);
    } catch {
        return false;
    }
}

/**
 * Sanitizes an object to only include allowed keys.
 * Prevents NoSQL/SQL injection via unexpected query operators or extra fields.
 */
export function sanitizeData<T extends Record<string, unknown>>(data: T, allowedFields: (keyof T)[]): Partial<T> {
    const sanitized: Partial<T> = {};
    for (const key of allowedFields) {
        if (key in data) {
            const value = data[key];
            // Disallow nested objects that look like MongoDB operators (starting with $)
            if (value && typeof value === 'object' && !Array.isArray(value)) {
                const keys = Object.keys(value as object);
                if (keys.some(k => k.startsWith('$'))) continue;
            }
            sanitized[key] = value;
        }
    }
    return sanitized;
}
