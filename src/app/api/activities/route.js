import { NextResponse } from 'next/server';
import { getValidAccessToken, getActivities } from '@/lib/strava';
import { findAthleteByStravaId } from '@/lib/models/athlete';

/**
 * GET /api/activities
 * Fetches activities for an authenticated athlete
 * 
 * Query params:
 * - stravaId: Strava athlete ID (required)
 * - after: Epoch timestamp - only activities after this time
 * - before: Epoch timestamp - only activities before this time
 * - page: Page number (default: 1)
 * - perPage: Results per page (default: 30, max: 200)
 */
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const stravaId = searchParams.get('stravaId');

    if (!stravaId) {
        return NextResponse.json(
            { error: 'stravaId is required' },
            { status: 400 }
        );
    }

    try {
        // Check if athlete exists
        const athlete = await findAthleteByStravaId(Number(stravaId));

        if (!athlete) {
            return NextResponse.json(
                { error: 'Athlete not found. Please reconnect to Strava.' },
                { status: 404 }
            );
        }

        // Get valid access token (auto-refreshes if expired)
        const accessToken = await getValidAccessToken(Number(stravaId));

        // Build options from query params
        const options = {};
        const after = searchParams.get('after');
        const before = searchParams.get('before');
        const page = searchParams.get('page');
        const perPage = searchParams.get('perPage');

        if (after) options.after = Number(after);
        if (before) options.before = Number(before);
        if (page) options.page = Number(page);
        if (perPage) options.perPage = Number(perPage);

        // Fetch activities from Strava
        const activities = await getActivities(accessToken, options);

        return NextResponse.json(activities);
    } catch (err) {
        console.error('Failed to fetch activities:', err);
        return NextResponse.json(
            { error: 'Failed to fetch activities' },
            { status: 500 }
        );
    }
}
