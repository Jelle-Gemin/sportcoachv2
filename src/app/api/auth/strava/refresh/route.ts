import { NextResponse, NextRequest } from 'next/server';
import { refreshAccessToken } from '@/lib/strava';
import { findAthleteByStravaId, updateAthleteTokens } from '@/lib/models/athlete';

/**
 * POST /api/auth/strava/refresh
 * Refreshes an expired access token
 * 
 * Body: { stravaId: number }
 */
export async function POST(request: NextRequest) {
    try {
        const { stravaId } = await request.json();

        if (!stravaId) {
            return NextResponse.json(
                { error: 'stravaId is required' },
                { status: 400 }
            );
        }

        // Find athlete in database
        const athlete = await findAthleteByStravaId(Number(stravaId));

        if (!athlete) {
            return NextResponse.json(
                { error: 'Athlete not found' },
                { status: 404 }
            );
        }

        // Refresh tokens
        const tokens = await refreshAccessToken(athlete.refreshToken);

        // Update tokens in database
        await updateAthleteTokens(
            Number(stravaId),
            tokens.accessToken,
            tokens.refreshToken,
            tokens.expiresAt
        );

        return NextResponse.json({
            success: true,
            expiresAt: tokens.expiresAt,
        });
    } catch (err) {
        console.error('Failed to refresh token:', err);
        return NextResponse.json(
            { error: 'Failed to refresh token' },
            { status: 500 }
        );
    }
}
