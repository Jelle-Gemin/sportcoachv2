import { NextResponse } from 'next/server';
import { findActivityByStravaId, upsertActivity } from '@/lib/models/activity';

/**
 * GET /api/activities/[id]
 * Fetch a single activity by Strava ID
 */
export async function GET(request, { params }) {
    try {
        const { id } = await params; // Next.js 15+ needs await on params

        if (!id) {
            return NextResponse.json(
                { error: 'Activity ID is required' },
                { status: 400 }
            );
        }

        const activity = await findActivityByStravaId(Number(id));

        if (!activity) {
            return NextResponse.json(
                { error: 'Activity not found' },
                { status: 404 }
            );
        }

        // Lazy Migration: Check if activity should be a treadmill run but isn't flagged
        // (For existing data that wasn't processed by new sync logic)
        if (activity.isTreadmill === undefined && activity.type === 'Run' && (activity.name === 'Treadmill' || activity.name.includes('Treadmill'))) {
            // It's a treadmill run! Update it.
            const { upsertActivity } = await import('@/lib/models/activity');

            // We set the flag
            activity.isTreadmill = true;

            // Persist to DB asynchronously (don't block response too much, but await is safer)
            await upsertActivity(activity.stravaId, { isTreadmill: true });

            // Log it
            console.log(`Lazy migration: Market activity ${activity.stravaId} as Treadmill run`);
        }

        return NextResponse.json(activity);
    } catch (err) {
        console.error('Failed to fetch activity:', err);
        return NextResponse.json(
            { error: 'Failed to fetch activity' },
            { status: 500 }
        );
    }
}

/**
 * PATCH /api/activities/[id]
 * Manually update activity details (e.g., treadmill distance/time)
 */
export async function PATCH(request, { params }) {
    try {
        const { id } = await params;
        const body = await request.json();

        if (!id) {
            return NextResponse.json({ error: 'Activity ID is required' }, { status: 400 });
        }

        // Validate allowed fields
        const { manualDistance, manualMovingTime, laps } = body;
        const updateData = {};

        if (manualDistance !== undefined) updateData.manualDistance = Number(manualDistance);
        if (manualMovingTime !== undefined) updateData.manualMovingTime = Number(manualMovingTime);

        // Handle Laps Update
        if (laps && Array.isArray(laps)) {
            // Check if we are REPLACING the entire laps array (e.g. deletion/reordering)
            if (body.replaceLaps) {
                updateData.laps = laps;
            } else {
                // Partial update of specific fields in specific laps (legacy/default)
                laps.forEach((lap, index) => {
                    const idx = lap.lapIndex !== undefined ? lap.lapIndex : index;

                    if (lap.manualDistance !== undefined) {
                        updateData[`laps.${idx}.manualDistance`] = Number(lap.manualDistance);
                    }
                    if (lap.manualMovingTime !== undefined) {
                        updateData[`laps.${idx}.manualMovingTime`] = Number(lap.manualMovingTime);
                    }
                });
            }
        }

        if (Object.keys(updateData).length === 0) {
            return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
        }

        // We use upsertActivity which uses $set, perfect for partial updates
        // We'll trust the ID is the stravaId since that's how we route
        const result = await upsertActivity(Number(id), updateData);

        // In MongoDB v7, findOneAndUpdate returns the document directly if includeResultMetadata is false (default)
        // Check if result has .value (old style) or is the doc
        const updatedActivity = result.value ? result.value : result;

        if (!updatedActivity) {
            throw new Error('Update failed, document not returned');
        }

        // Sanitize: Convert _id to string or remove it to avoid serialization errors with Next.js
        const sanitized = {
            ...updatedActivity,
            _id: updatedActivity._id?.toString()
        };

        return NextResponse.json(sanitized);

    } catch (err) {
        console.error('Failed to update activity:', err);
        return NextResponse.json(
            { error: 'Failed to update activity' },
            { status: 500 }
        );
    }
}
