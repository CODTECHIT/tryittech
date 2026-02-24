import { NextRequest, NextResponse } from 'next/server';
import { signSession } from '@/lib/security';

export async function POST(req: NextRequest) {
    try {
        const { username, password } = await req.json();

        // Use environment variables for security
        const validUser = process.env.ADMIN_USER;
        const validPass = process.env.ADMIN_PASS;

        if (username === validUser && password === validPass) {
            const response = NextResponse.json({ message: 'Login successful' });

            // Generate a secure session token
            const secureToken = crypto.randomUUID() + '-' + Date.now();
            const signedToken = await signSession(secureToken);

            // Set a secure cookie
            response.cookies.set('admin_session', signedToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                path: '/',
                maxAge: 60 * 60 * 24 // 24 hours
            });

            return response;
        }

        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
