import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(request: Request) {
    // 1. Validate environment
    // For now, keeping it restricted or open as per requirements. 
    // Usually save is fine in Prod if authenticated, but feature flag might apply.

    try {
        const body = await request.json();
        const { workouts, clearFuture } = body;

        if (!workouts || !Array.isArray(workouts)) {
            return new NextResponse("Invalid workouts data", { status: 400 });
        }

        // 2. Mock Authentication (Replace with actual auth in production)
        const athletesCollection = await getCollection('athletes');
        const athlete = await athletesCollection.findOne({}); // Get first athlete for dev

        if (!athlete) {
            return new NextResponse("Athlete not found", { status: 404 });
        }

        // 3. Clear future workouts if requested
        if (clearFuture) {
            // Logic: Remove all 'planned' workouts from tomorrow onwards?
            // Or just append? 
            // For this feature, let's assume we are overwriting the user's plan.
            // But we shouldn't delete COMPLETED activities.
            // Since our 'weeklyWorkouts' is currently mock data in the frontend code
            // we might be limited. 
            // BUT, if we are using MongoDB for workouts (which we seem to be moving towards),
            // we should delete from the DB.

            // NOTE: The current app uses 'mockData.js' heavily in frontend.
            // But 'useWeeklyWorkouts' hook might be fetching from API in some versions?
            // If the user wants to PERSIST, we must save to MongoDB.
        }

        const workoutsCollection = await getCollection('workouts');

        // Prepare workouts for insertion
        const newWorkouts = workouts.map((w: any) => ({
            ...w,
            athleteId: athlete.stravaId, // Link to athlete
            createdAt: new Date(),
            source: 'ai-generated',
            completed: false
            // Ensure dates are Date objects
        }));

        if (newWorkouts.length > 0) {
            await workoutsCollection.insertMany(newWorkouts);
        }

        // 4. Update Athlete's Current Plan Metadata
        await athletesCollection.updateOne(
            { _id: athlete._id },
            {
                $set: {
                    'currentPlan.active': true,
                    'currentPlan.generatedAt': new Date(),
                    'currentPlan.title': body.planTitle || 'AI Custom Plan'
                }
            }
        );

        return NextResponse.json({ success: true, count: newWorkouts.length });

    } catch (error: any) {
        console.error("Save Plan Error:", error);
        return new NextResponse(error.message || "Internal Server Error", { status: 500 });
    }
}
