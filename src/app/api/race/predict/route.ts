import { NextRequest, NextResponse } from 'next/server';
import { findAthleteByStravaId } from '@/lib/models/athlete';
import { findActivitiesForAthlete } from '@/lib/models/activity';
import { predictRaceTime } from '@/lib/utils/raceTimePredictor';
import { weeklySchedule } from '@/data/mockData';

export async function POST(request: NextRequest) {
    try {
        const stravaId = request.cookies.get('stravaId')?.value;

        if (!stravaId) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
        }

        const body = await request.json();
        const { raceDistance } = body;

        if (!raceDistance) {
            return NextResponse.json({ error: 'Race distance is required' }, { status: 400 });
        }

        const athlete = await findAthleteByStravaId(parseInt(stravaId));
        if (!athlete) {
            return NextResponse.json({ error: 'Athlete not found' }, { status: 404 });
        }

        // Get activities from last 8 weeks
        const eightWeeksAgo = new Date();
        eightWeeksAgo.setDate(eightWeeksAgo.getDate() - 56);

        const activities = await findActivitiesForAthlete(parseInt(stravaId), {
            startDate: eightWeeksAgo,
            limit: 100,
        });

        if (activities.length < 3) {
            return NextResponse.json({
                error: 'Not enough training data',
                message: 'Need at least 3 activities in the last 8 weeks to make a prediction'
            }, { status: 400 });
        }

        // Get FTP from athlete biometrics (default to 250 if not set)
        const userFtp = athlete.biometrics?.ftp || 250;

        // Calculate prediction
        const prediction = await predictRaceTime(
            activities,
            weeklySchedule,
            raceDistance,
            userFtp
        );

        if (!prediction) {
            return NextResponse.json({
                error: 'Unable to calculate prediction',
                message: 'Not enough relevant training data for this race type'
            }, { status: 400 });
        }

        return NextResponse.json(prediction);
    } catch (error) {
        console.error('Error predicting race time:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
