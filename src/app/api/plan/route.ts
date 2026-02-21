import { NextResponse } from 'next/server';
import { findPlannedWorkouts } from '@/lib/models/plannedWorkout';

// Mock session - in real app use actual auth
const MOCK_STRAVA_ID = 123456;

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const start = searchParams.get('start');
    const end = searchParams.get('end');

    if (!start || !end) {
        return new NextResponse("Missing start/end date parameters", { status: 400 });
    }

    try {
        const athleteStravaId = MOCK_STRAVA_ID; // Replace with auth session ID
        const workouts = await findPlannedWorkouts(athleteStravaId, start, end);

        return NextResponse.json(workouts);
    } catch (error: any) {
        console.error("Failed to fetch planned workouts:", error);
        return new NextResponse(error.message || "Internal Server Error", { status: 500 });
    }
}
