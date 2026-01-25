import { NextRequest, NextResponse } from 'next/server';
import { findAthleteByStravaId, upsertAthlete, AthleteDocument } from '@/lib/models/athlete';

export async function GET(request: NextRequest) {
    try {
        const stravaId = request.cookies.get('stravaId')?.value;

        if (!stravaId) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
        }

        const athlete = await findAthleteByStravaId(parseInt(stravaId));

        if (!athlete) {
            return NextResponse.json({ error: 'Athlete not found' }, { status: 404 });
        }

        // Return relevant profile data
        return NextResponse.json({
            biometrics: athlete.biometrics || {},
            trainingZones: athlete.trainingZones || {},
            seasonGoals: athlete.seasonGoals || [],
            athlete: {
                id: athlete.athlete.id,
                firstname: athlete.athlete.firstname,
                lastname: athlete.athlete.lastname,
                profile: athlete.athlete.profile,
            }
        });
    } catch (error) {
        console.error('Error fetching athlete profile:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const stravaId = request.cookies.get('stravaId')?.value;

        if (!stravaId) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
        }

        const body = await request.json();
        const { biometrics, trainingZones, seasonGoals } = body;

        // Construct update object
        const updateData: Partial<AthleteDocument> = {};
        if (biometrics) updateData.biometrics = biometrics;
        if (trainingZones) updateData.trainingZones = trainingZones;
        if (seasonGoals) updateData.seasonGoals = seasonGoals;

        const updatedAthlete = await upsertAthlete(parseInt(stravaId), updateData);

        return NextResponse.json({
            biometrics: updatedAthlete?.biometrics || {},
            trainingZones: updatedAthlete?.trainingZones || {},
            seasonGoals: updatedAthlete?.seasonGoals || [],
        });
    } catch (error) {
        console.error('Error updating athlete profile:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
