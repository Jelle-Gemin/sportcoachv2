import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';
import { findActivitiesForAthlete } from '@/lib/models/activity';
import { buildWorkoutHistory } from '@/lib/utils/workoutHistory';

/**
 * GET /api/plan/export?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
 *
 * Exports the workoutHistory (IWorkoutMatch[]) for a given date range as JSON.
 */
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');

        if (!startDate || !endDate) {
            return new NextResponse("Missing startDate or endDate query params", { status: 400 });
        }

        // Validate date format
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return new NextResponse("Invalid date format. Use YYYY-MM-DD.", { status: 400 });
        }

        if (start > end) {
            return new NextResponse("startDate must be before endDate.", { status: 400 });
        }

        // 1. Get Athlete
        const athletesCollection = await getCollection('athletes');
        const athlete = await athletesCollection.findOne({});

        if (!athlete) {
            return new NextResponse("Athlete not found", { status: 404 });
        }

        // 2. Load planned workouts and filter to range
        const { weeklySchedule } = await import('@/data/mockData');

        const plannedInRange = weeklySchedule.filter(w => {
            const d = new Date(w.fullDate);
            return d >= start && d <= end;
        });

        // 3. Load actual activities for the range
        const pastActivities = await findActivitiesForAthlete(athlete.stravaId, {
            startDate: start,
            endDate: end,
            limit: 500
        });

        // 4. Build workout history
        const ftp = athlete.biometrics?.ftp || 250;
        const workoutHistory = buildWorkoutHistory(plannedInRange, pastActivities, ftp);

        // 5. Return as downloadable JSON
        const filename = `workout-history_${startDate}_${endDate}.json`;
        const json = JSON.stringify(workoutHistory, null, 2);

        return new NextResponse(json, {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Content-Disposition': `attachment; filename="${filename}"`,
            },
        });

    } catch (error: any) {
        console.error("Export Error:", error);
        return new NextResponse(error.message || "Internal Server Error", { status: 500 });
    }
}
