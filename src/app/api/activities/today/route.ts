import { NextRequest, NextResponse } from 'next/server';
import { findActivitiesForAthlete } from '@/lib/models/activity';

/**
 * GET /api/activities/today
 * Returns activities for a specific date (defaults to today)
 * 
 * Query params:
 * - stravaId: Strava athlete ID (required)
 * - date: Optional YYYY-MM-DD string (defaults to today)
 */
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const stravaId = searchParams.get('stravaId');
    const dateParam = searchParams.get('date');

    if (!stravaId) {
        return NextResponse.json(
            { error: 'stravaId is required' },
            { status: 400 }
        );
    }

    try {
        // Determine start and end of target day
        const targetDate = dateParam ? new Date(dateParam) : new Date();
        targetDate.setHours(0, 0, 0, 0);

        const nextDay = new Date(targetDate);
        nextDay.setDate(nextDay.getDate() + 1);

        const activities = await findActivitiesForAthlete(Number(stravaId), {
            startDate: targetDate,
            endDate: nextDay
        });

        return NextResponse.json(activities);
    } catch (err) {
        console.error('Failed to fetch daily activities:', err);
        return NextResponse.json(
            { error: 'Failed to fetch activities' },
            { status: 500 }
        );
    }
}
