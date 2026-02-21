import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';
import { generateTrainingPlan } from '@/lib/ai/service';
import { IPlanGenerationMetadata } from '@/lib/models/trainingPlan';
import { IPastPerformanceContext } from '@/lib/ai/types';
import { buildWorkoutHistory } from '@/lib/utils/workoutHistory';

export async function POST(request: Request) {
    try {
        const metadata: IPlanGenerationMetadata = await request.json();

        // 1. Get Athlete
        const athletesCollection = await getCollection('athletes');
        const athlete = await athletesCollection.findOne({});

        if (!athlete) {
            return new NextResponse("Athlete not found", { status: 404 });
        }

        // 2. Save Metadata to Athlete Profile
        await athletesCollection.updateOne(
            { _id: athlete._id },
            {
                $set: {
                    planGenerationMetadata: {
                        ...metadata,
                        updatedAt: new Date()
                    }
                }
            }
        );

        // 3. Generate Plan via AI
        const { weeklySchedule } = await import('@/data/mockData');
        const { findActivitiesForAthlete } = await import('@/lib/models/activity');

        const today = new Date();
        const scheduleStart = new Date(weeklySchedule[0]?.fullDate || today);

        const pastActivities = await findActivitiesForAthlete(athlete.stravaId, {
            startDate: scheduleStart,
            endDate: today,
            limit: 100
        });

        // Filter for past planned workouts only
        const pastPlannedWorkouts = weeklySchedule.filter(w => new Date(w.fullDate) < today);

        // Build workout history using shared helper
        const ftp = athlete.biometrics?.ftp || 250;
        const workoutHistory = buildWorkoutHistory(pastPlannedWorkouts, pastActivities, ftp);

        const pastPerformanceContext: IPastPerformanceContext = {
            workoutHistory
        };

        const generatedPlan = await generateTrainingPlan(athlete as any, metadata, pastPerformanceContext);

        return NextResponse.json({
            success: true,
            message: "Plan generated successfully",
            plan: generatedPlan
        });

    } catch (error: any) {
        console.error("Plan Generation Error:", error);
        return new NextResponse(error.message || "Internal Server Error", { status: 500 });
    }
}
