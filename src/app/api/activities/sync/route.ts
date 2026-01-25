import { NextRequest, NextResponse } from 'next/server';
import { getValidAccessToken, getActivities, getCompleteActivity } from '@/lib/strava';
import { findAthleteByStravaId } from '@/lib/models/athlete';
import { upsertActivity, findExistingStravaIds } from '@/lib/models/activity';

/**
 * POST /api/activities/sync
 * Smart Sync: Fetches last 50 days, diffs against DB, and processes missing items in batches.
 * 
 * Body params:
 * - stravaId: Strava athlete ID (required)
 * - fullSync: If true, checks last 50 days. If false, syncs incrementally.
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { stravaId } = body;

        if (!stravaId) {
            return NextResponse.json({ error: 'stravaId is required' }, { status: 400 });
        }

        const athlete = await findAthleteByStravaId(Number(stravaId));
        if (!athlete) {
            return NextResponse.json({ error: 'Athlete not found' }, { status: 404 });
        }

        const accessToken = await getValidAccessToken(Number(stravaId));

        // 1. Determine Fetch Window
        // Use 50 days as the default window to ensure history is populated
        const syncWindowDays = 50;
        const windowDate = new Date();
        windowDate.setDate(windowDate.getDate() - syncWindowDays);
        const afterTimestamp = Math.floor(windowDate.getTime() / 1000);

        // 2. Fetch Summary List from Strava (Cheap call)
        // We fetch ALL activities in this window to ensure we know what SHOULD be there.
        const stravaActivities = await getActivities(accessToken, {
            after: afterTimestamp,
            perPage: 100, // Max per page
        });

        if (stravaActivities.length === 0) {
            return NextResponse.json({ success: true, synced: 0, status: 'complete' });
        }

        // 3. Diff against Database (Optimized check)
        const stravaActivityIds = stravaActivities.map((a: any) => a.id);
        const existingIds = await findExistingStravaIds(stravaActivityIds);

        // Filter out what we already have
        const missingActivities = stravaActivities.filter((a: any) => !existingIds.includes(a.id));

        if (missingActivities.length === 0) {
            return NextResponse.json({ success: true, synced: 0, status: 'complete', message: 'All up to date' });
        }

        // 4. Process Batch of Missing Items
        // We only process a small batch to avoid timeouts and allow client to show progress
        const BATCH_SIZE = 5;
        const batchToProcess = missingActivities.slice(0, BATCH_SIZE);
        const remainingCount = missingActivities.length - batchToProcess.length;

        let syncedCount = 0;
        const errors: { id: number; error: string }[] = [];

        await Promise.all(batchToProcess.map(async (activitySummary: any) => {
            try {
                // Fetch full details + laps + streams (Expensive calls)
                const { detail, laps, streams } = await getCompleteActivity(accessToken, activitySummary.id);

                // Transform & Save
                const activityDoc = transformToSchema(detail, laps, streams, stravaId);
                await upsertActivity(detail.id, activityDoc);
                syncedCount++;
            } catch (err: unknown) {
                console.error(`Failed to sync activity ${activitySummary.id}`, err);
                const errorMessage = err instanceof Error ? err.message : 'Unknown error';
                errors.push({ id: activitySummary.id, error: errorMessage });

                // Check for rate limits in error (simplified)
                if (errorMessage.includes('429')) {
                    throw new Error('RATE_LIMIT');
                }
            }
        }));

        // 5. Return Status
        // If remaining > 0, client should call again immediately (after small delay)
        return NextResponse.json({
            success: true,
            synced: syncedCount,
            totalFound: missingActivities.length,
            remaining: remainingCount,
            status: remainingCount > 0 ? 'partial' : 'complete',
            errors: errors.length > 0 ? errors : undefined
        });

    } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        if (errorMessage === 'RATE_LIMIT') {
            return NextResponse.json({
                status: 'rate_limited',
                message: 'Strava API rate limit exceeded',
                retryAfter: 60 * 15 // Default 15 min wait suggestion
            }, { status: 429 });
        }

        console.error('Failed to sync activities:', err);
        return NextResponse.json(
            { error: 'Failed to sync activities', details: errorMessage },
            { status: 500 }
        );
    }
}

// Helper to transform Strava format to our DB schema
function transformToSchema(detail: any, laps: any[], streams: any, stravaId: number | string) {
    return {
        stravaId: detail.id,
        athleteStravaId: Number(stravaId),
        name: detail.name,
        type: detail.type,
        sportType: detail.sport_type,
        startDate: new Date(detail.start_date),
        startDateLocal: new Date(detail.start_date_local),
        timezone: detail.timezone,
        distance: detail.distance,
        movingTime: detail.moving_time,
        elapsedTime: detail.elapsed_time,
        totalElevationGain: detail.total_elevation_gain,
        averageSpeed: detail.average_speed,
        maxSpeed: detail.max_speed,
        averageHeartrate: detail.average_heartrate,
        maxHeartrate: detail.max_heartrate,
        averageWatts: detail.average_watts,
        maxWatts: detail.max_watts,
        weightedAverageWatts: detail.weighted_average_watts,
        averageCadence: detail.average_cadence,
        calories: detail.calories,
        sufferScore: detail.suffer_score,
        hasHeartrate: detail.has_heartrate,
        deviceWatts: detail.device_watts,
        description: detail.description,
        isTreadmill: detail.type === 'Run' && (detail.name === 'Treadmill' || detail.name.includes('Treadmill')) && (!detail.map || !detail.map.summary_polyline),
        laps: laps.map((lap: any, index: number) => ({
            lapIndex: index,
            startIndex: lap.start_index,
            endIndex: lap.end_index,
            elapsedTime: lap.elapsed_time,
            movingTime: lap.moving_time,
            distance: lap.distance,
            averageSpeed: lap.average_speed,
            maxSpeed: lap.max_speed,
            averageHeartrate: lap.average_heartrate,
            maxHeartrate: lap.max_heartrate,
            averageWatts: lap.average_watts,
            averageCadence: lap.average_cadence,
        })),
        streams,
    };
}
