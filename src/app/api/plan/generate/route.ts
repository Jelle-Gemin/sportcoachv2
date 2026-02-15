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

        // Build Sport Profile
        const sportProfile = calculateSportProfile(pastActivities);

        // Filter for past planned workouts only
        const pastPlannedWorkouts = weeklySchedule.filter(w => new Date(w.fullDate) < today);

        // Build workout history using shared helper
        const ftp = athlete.biometrics?.ftp || 250;
        const workoutHistory = buildWorkoutHistory(pastPlannedWorkouts, pastActivities, ftp);

        const pastPerformanceContext: IPastPerformanceContext = {
            sportSummary: {
                swim: {
                    avgPace: sportProfile.Swim.avgPace,
                    totalDistance: sportProfile.Swim.totalDistance
                },
                bike: {
                    avgWatts: sportProfile.Bike.avgWatts,
                    avgSpeed: sportProfile.Bike.avgSpeed,
                    totalDistance: sportProfile.Bike.totalDistance
                },
                run: {
                    avgPace: sportProfile.Run.avgPace,
                    totalDistance: sportProfile.Run.totalDistance
                }
            },
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
            p.totalDistance += (act.manualDistance || act.distance);
            p.totalTime += (act.manualMovingTime || act.movingTime);
            p.count += 1;
            if (type === 'Bike' && act.averageWatts) {
                p.totalWatts += act.averageWatts;
            }
        }
    });

    if (profile.Swim.count > 0 && profile.Swim.totalDistance > 0) {
        const paceSecs = (profile.Swim.totalTime / (profile.Swim.totalDistance / 100));
        const mins = Math.floor(paceSecs / 60);
        const secs = Math.round(paceSecs % 60);
        profile.Swim.avgPace = `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    if (profile.Bike.count > 0 && profile.Bike.totalTime > 0) {
        profile.Bike.avgSpeed = ((profile.Bike.totalDistance / profile.Bike.totalTime) * 3.6).toFixed(1);
        profile.Bike.avgWatts = Math.round(profile.Bike.totalWatts / profile.Bike.count).toString();
    }

    if (profile.Run.count > 0 && profile.Run.totalDistance > 0) {
        const paceSecs = (profile.Run.totalTime / (profile.Run.totalDistance / 1000));
        const mins = Math.floor(paceSecs / 60);
        const secs = Math.round(paceSecs % 60);
        profile.Run.avgPace = `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    return profile;
}
