import { NextRequest, NextResponse } from 'next/server';
import { findAthleteByStravaId } from '@/lib/models/athlete';

/**
 * GET /api/activities/status
 * Returns sync status for an athlete
 * 
 * Query params:
 * - stravaId: Strava athlete ID (required)
 */
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const stravaId = searchParams.get('stravaId');

    if (!stravaId) {
        return NextResponse.json(
            { error: 'stravaId is required' },
            { status: 400 }
        );
    }

    try {
        const athlete = await findAthleteByStravaId(Number(stravaId));

        if (!athlete) {
            return NextResponse.json(
                { error: 'Athlete not found' },
                { status: 404 }
            );
        }

        // For now, return a simple status
        // This can be expanded later to track sync progress
        return NextResponse.json({
            status: 'ready',
            athleteId: athlete.stravaId,
            athleteName: `${athlete.athlete?.firstname || ''} ${athlete.athlete?.lastname || ''}`.trim(),
            lastUpdated: athlete.updatedAt,
        });
    } catch (err) {
        console.error('Failed to get status:', err);
        return NextResponse.json(
            { error: 'Failed to get status' },
            { status: 500 }
        );
    }
}
