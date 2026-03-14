import { NextRequest, NextResponse } from 'next/server';
import { createSession, checkRateLimit, resetRateLimit, loginSchema, validateInput } from '@/lib/security';

export async function POST(req: NextRequest) {
    try {
        // ── Rate Limiting: max 5 attempts per IP per 15 minutes ──
        const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
            || req.headers.get('x-real-ip')
            || 'unknown';

        const rateCheck = checkRateLimit(ip);
        if (!rateCheck.allowed) {
            const retryAfterSec = Math.ceil(rateCheck.retryAfterMs / 1000);
            return NextResponse.json(
                { error: `Too many login attempts. Please try again in ${Math.ceil(retryAfterSec / 60)} minute(s).` },
                {
                    status: 429,
                    headers: { 'Retry-After': String(retryAfterSec) }
                }
            );
        }

        const body = await req.json();

        // ── Input Validation ──
        const validation = validateInput(loginSchema, body);
        if (!validation.success) {
            return NextResponse.json({ error: validation.error }, { status: 400 });
        }

        const { username, password } = validation.data;

        const validUser = process.env.ADMIN_USER;
        const validPass = process.env.ADMIN_PASS;

        if (username === validUser && password === validPass) {
            // ── Successful login: clear rate limit, issue new session ──
            resetRateLimit(ip);

            const response = NextResponse.json({ message: 'Login successful' });

            // Use new session system to prevent session fixation
            const { signedToken } = await createSession();

            response.cookies.set('admin_session', signedToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                path: '/',
                maxAge: 60 * 60 * 8 // 8 hours
            });

            return response;
        }

        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
