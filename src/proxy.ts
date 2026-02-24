import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySession } from '@/lib/security';

// Routes that don't require authentication
const PUBLIC_PATCHES = [
    '/ADMINTRYITTECH-LLP/login',
    '/api/auth/login',
    '/api/auth/logout',
];

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. Whitelist public routes
    if (PUBLIC_PATCHES.some(path => pathname === path)) {
        return NextResponse.next();
    }

    // 2. Allow public inquiry submission (but only POST)
    if (pathname === '/api/inquiries' && request.method === 'POST') {
        return NextResponse.next();
    }

    // 3. Protect Admin UI and API Routes
    const isAdminPath = pathname.startsWith('/ADMINTRYITTECH-LLP');
    const isApiPath = pathname.startsWith('/api/') && !pathname.startsWith('/api/auth');

    if (isAdminPath || isApiPath) {
        const session = request.cookies.get('admin_session');

        // SECURITY FIX: Cryptographically verify the session signature
        const isValid = session?.value ? await verifySession(session.value) : false;

        if (!isValid) {
            // If it's an API call, return 401 instead of redirecting
            if (isApiPath) {
                return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
            }

            const loginUrl = new URL('/ADMINTRYITTECH-LLP/login', request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/ADMINTRYITTECH-LLP/:path*', '/api/:path*'],
};
