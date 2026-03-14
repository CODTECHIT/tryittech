import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySessionWithStore } from '@/lib/security';

// Routes that don't require authentication
const PUBLIC_PATHS = [
    '/ADMINTRYITTECH-LLP/login',
    '/api/auth/login',
    '/api/auth/logout',
];

export default async function middleware(request: NextRequest) {
    const { pathname, protocol } = request.nextUrl;
    const method = request.method;

    // ─── HTTPS Enforcement in Production ───
    if (process.env.NODE_ENV === 'production' && protocol === 'http:') {
        // Get the host with HTTPS
        const host = request.headers.get('host') || request.nextUrl.host;
        const httpsUrl = `https://${host}${pathname}${request.nextUrl.search}`;
        return NextResponse.redirect(httpsUrl, 301);
    }

    // Normalize path by removing trailing slash for comparison
    const normalizedPath = pathname.endsWith('/') && pathname.length > 1
        ? pathname.slice(0, -1)
        : pathname;

    // 1. Whitelist public UI and auth routes
    if (PUBLIC_PATHS.some(path => normalizedPath === path)) {
        return NextResponse.next();
    }

    // 2. Allow ALL GET requests for public data APIs
    // This fixes the 401 errors for services, industries, trainings, etc.
    const isPublicGet = method === 'GET' && (
        normalizedPath.startsWith('/api/services') ||
        normalizedPath.startsWith('/api/industries') ||
        normalizedPath.startsWith('/api/trainings') ||
        normalizedPath.startsWith('/api/clients')
    );

    if (isPublicGet) {
        return NextResponse.next();
    }

    // 3. Allow public inquiry submission (only POST)
    if (normalizedPath === '/api/inquiries' && method === 'POST') {
        return NextResponse.next();
    }

    // 4. Protect Admin UI and all other API Routes (POST/PUT/DELETE)
    const isAdminPath = normalizedPath.startsWith('/ADMINTRYITTECH-LLP');
    const isApiPath = normalizedPath.startsWith('/api/') && !normalizedPath.startsWith('/api/auth');

    if (isAdminPath || isApiPath) {
        const session = request.cookies.get('admin_session');

        // SECURITY FIX: Use session store verification to prevent fixation
        const isValid = session?.value ? await verifySessionWithStore(session.value) : false;

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
