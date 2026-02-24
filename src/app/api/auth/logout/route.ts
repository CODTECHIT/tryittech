import { NextResponse } from 'next/server';

export async function POST() {
    const response = NextResponse.json({ message: 'Logged out successfully' });

    // Clear the session cookie
    response.cookies.set('admin_session', '', {
        httpOnly: true,
        path: '/',
        maxAge: 0 // Expire immediately
    });

    return response;
}
