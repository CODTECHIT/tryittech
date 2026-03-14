import { NextRequest, NextResponse } from 'next/server';
import { invalidateSession } from '@/lib/security';

export async function POST(req: NextRequest) {
    const session = req.cookies.get('admin_session');

    // Invalidate session in the session store
    if (session?.value) {
        invalidateSession(session.value);
    }

    const response = NextResponse.json({ message: 'Logged out successfully' });

    // Clear the session cookie
    response.cookies.set('admin_session', '', {
        httpOnly: true,
        path: '/',
        maxAge: 0 // Expire immediately
    });

    return response;
}
