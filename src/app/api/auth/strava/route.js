import { NextResponse } from 'next/server';
import { getAuthorizationUrl } from '@/lib/strava';

/**
 * GET /api/auth/strava
 * Redirects the user to Strava's OAuth authorization page
 */
export async function GET() {
    const authUrl = getAuthorizationUrl();
    return NextResponse.redirect(authUrl);
}
