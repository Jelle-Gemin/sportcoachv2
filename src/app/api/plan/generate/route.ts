import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';
import { generateTrainingPlan } from '@/lib/ai/service';
import { IPlanGenerationMetadata } from '@/lib/models/trainingPlan';

export async function POST(request: Request) {
    try {
        const metadata: IPlanGenerationMetadata = await request.json();

        // 1. Get Athlete
        // In a real scenario, get stravaId from session/token
        // For now, we fetch the first athlete or a specific test one to ensure it works for dev
        const athletesCollection = await getCollection('athletes');
        const athlete = await athletesCollection.findOne({});

        if (!athlete) {
            return new NextResponse("Athlete not found", { status: 404 });
        }

        // 2. Save Metadata to Athlete Profile (Persistence)
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
        // Gather Past Performance Context
        const { weeklySchedule } = await import('@/data/mockData');
        const { findActivitiesForAthlete } = await import('@/lib/models/activity');
        const { calculateExecutionScore } = await import('@/lib/utils/workoutComparison');

        // Determine date range: Start of mock schedule to Today
        const today = new Date();
        const scheduleStart = new Date(weeklySchedule[0]?.fullDate || today); // Fallback to today if empty

        // Fetch actual activities for the training block (up to today)
        const pastActivities = await findActivitiesForAthlete(athlete.stravaId, {
            startDate: scheduleStart,
            endDate: today,
            limit: 100
        });

        // 3. Build Sport Profiles (for Level Detection)
        const sportProfile = calculateSportProfile(pastActivities);

        // 4. Build execution summary string
        let pastPerformanceContext = "**Recent Performance Summary:**\n";
        pastPerformanceContext += `- Swim: ${sportProfile.Swim.avgPace} /100m (${(sportProfile.Swim.totalDistance / 1000).toFixed(1)}km total)\n`;
        pastPerformanceContext += `- Bike: ${sportProfile.Bike.avgWatts}W / ${sportProfile.Bike.avgSpeed}km/h (${(sportProfile.Bike.totalDistance / 1000).toFixed(1)}km total)\n`;
        pastPerformanceContext += `- Run: ${sportProfile.Run.avgPace}/km (${(sportProfile.Run.totalDistance / 1000).toFixed(1)}km total)\n\n`;

        pastPerformanceContext += "**Detailed Execution History:**\n";

        // Filter for past planned workouts only
        const pastPlannedWorkouts = weeklySchedule.filter(w => new Date(w.fullDate) < today);

        if (pastPlannedWorkouts.length === 0) {
            pastPerformanceContext += "No planned workouts found in the past window.\n";
        }

        for (const planned of pastPlannedWorkouts) {
            const plannedDate = planned.fullDate;
            const actualMatch = pastActivities.find(act => {
                const actDate = new Date(act.startDate).toISOString().split('T')[0];
                const typeMap: Record<string, string> = { 'Ride': 'Bike', 'VirtualRide': 'Bike', 'Run': 'Run', 'Swim': 'Swim', 'WeightTraining': 'Strength', 'Soccer': 'Soccer' };
                const actType = typeMap[act.type] || act.type;
                return actDate === plannedDate && actType === planned.type;
            });

            const score = actualMatch
                ? calculateExecutionScore(planned, actualMatch, athlete.biometrics?.ftp || 250)
                : 0;

            const status = actualMatch ? `Completed (Score: ${score}%)` : "Missed";

            pastPerformanceContext += `- ${planned.fullDate} [${planned.type}] ${planned.title}: ${status}\n`;
            if (actualMatch && score < 70) {
                pastPerformanceContext += `  -> Performance Note: Execution score was low (${score}%).\n`;
            }
        }

        // This invokes our service which constructs the prompt and calls Gemini
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

/**
 * Calculates average metrics for each sport to help AI detect intensity levels
 */
function calculateSportProfile(activities: any[]) {
    const profile = {
        Swim: { totalDistance: 0, totalTime: 0, count: 0, avgPace: "N/A" },
        Bike: { totalDistance: 0, totalTime: 0, totalWatts: 0, count: 0, avgSpeed: "N/A", avgWatts: "N/A" },
        Run: { totalDistance: 0, totalTime: 0, count: 0, avgPace: "N/A" }
    };

    activities.forEach(act => {
        const type = act.type === 'Ride' || act.type === 'VirtualRide' ? 'Bike' : act.type;
        if (profile[type as keyof typeof profile]) {
            const p = profile[type as keyof typeof profile] as any;
            p.totalDistance += act.distance;
            p.totalTime += act.movingTime;
            p.count += 1;
            if (type === 'Bike' && act.averageWatts) {
                p.totalWatts += act.averageWatts;
            }
        }
    });

    // Format metrics
    if (profile.Swim.count > 0) {
        const paceSecs = (profile.Swim.totalTime / (profile.Swim.totalDistance / 100));
        const mins = Math.floor(paceSecs / 60);
        const secs = Math.round(paceSecs % 60);
        profile.Swim.avgPace = `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    if (profile.Bike.count > 0) {
        profile.Bike.avgSpeed = ((profile.Bike.totalDistance / profile.Bike.totalTime) * 3.6).toFixed(1);
        profile.Bike.avgWatts = Math.round(profile.Bike.totalWatts / profile.Bike.count).toString();
    }

    if (profile.Run.count > 0) {
        const paceSecs = (profile.Run.totalTime / (profile.Run.totalDistance / 1000));
        const mins = Math.floor(paceSecs / 60);
        const secs = Math.round(paceSecs % 60);
        profile.Run.avgPace = `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    return profile;
}
