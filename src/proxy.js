import { NextResponse } from 'next/server';

export function proxy(request) {
    const { pathname } = request.nextUrl;
    const stravaId = request.cookies.get('stravaId')?.value;

    // Define public paths that don't require authentication
    const isPublicPath = pathname === '/login' ||
        pathname.startsWith('/api/auth') ||
        pathname.startsWith('/_next') ||
        pathname === '/favicon.ico';

    // Redirect to login if not authenticated and trying to access a protected path
    if (!stravaId && !isPublicPath) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Redirect to home if authenticated and trying to access login page
    if (stravaId && pathname === '/login') {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
