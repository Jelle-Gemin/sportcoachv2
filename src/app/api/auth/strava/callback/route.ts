import { NextRequest, NextResponse } from 'next/server';
import { exchangeCodeForTokens } from '@/lib/strava';
import { upsertAthlete } from '@/lib/models/athlete';

/**
 * GET /api/auth/strava/callback
 * Handles the OAuth callback from Strava
 * Exchanges the authorization code for tokens and saves athlete data to MongoDB
 */
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    // Handle user denial or errors
    if (error) {
        console.error('Strava OAuth error:', error);
        return NextResponse.redirect(new URL('/?error=auth_denied', request.url));
    }

    if (!code) {
        console.error('No authorization code received');
        return NextResponse.redirect(new URL('/?error=no_code', request.url));
    }

    try {
        // Exchange code for tokens
        const { accessToken, refreshToken, expiresAt, athlete } = await exchangeCodeForTokens(code) as { accessToken: string, refreshToken: string, expiresAt: number, athlete: any };

        // Save athlete data to MongoDB
        await upsertAthlete(athlete.id, {
            accessToken,
            refreshToken,
            expiresAt,
            athlete,
        });

        console.log(`Athlete ${athlete.id} (${athlete.firstname || ''} ${athlete.lastname || ''}) authenticated successfully`);

        // Create response and set cookie
        const response = NextResponse.redirect(new URL('/', request.url));

        // Set cookie for middleware and persistence (30 days)
        response.cookies.set('stravaId', athlete.id.toString(), {
            path: '/',
            maxAge: 60 * 60 * 24 * 30, // 30 days
            httpOnly: false, // Set to false to allow client-side access if needed, but true for security
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        });

        return response;
    } catch (err) {
        console.error('Failed to complete Strava authentication:', err);
        return NextResponse.redirect(new URL('/login?error=auth_failed', request.url));
    }
}
