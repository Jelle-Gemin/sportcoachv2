import { NextResponse } from 'next/server';

/**
 * GET /api/auth/logout
 * Clears the authentication cookie and redirects to the login page
 */
export async function GET(request) {
    const response = NextResponse.redirect(new URL('/login', request.url));

    // Clear the stravaId cookie
    response.cookies.set('stravaId', '', {
        path: '/',
        maxAge: 0,
    });

    return response;
}
