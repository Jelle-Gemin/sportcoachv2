import { IWorkoutMatch, IPerformanceActivity } from '@/lib/ai/types';
import { AnyWorkout } from '@/lib/models/workout';
import { calculateExecutionScore } from '@/lib/utils/workoutComparison';

/**
 * Shared helper to build workout history (IWorkoutMatch[]) from planned workouts
 * matched against actual Strava activities.
 *
 * Used by both the plan generate route and the export route.
 */
export function buildWorkoutHistory(
    plannedWorkouts: AnyWorkout[],
    pastActivities: any[],
    ftp: number
): IWorkoutMatch[] {
    const typeMap: Record<string, string> = {
        'Ride': 'Bike',
        'VirtualRide': 'Bike',
        'Run': 'Run',
        'Swim': 'Swim',
        'WeightTraining': 'Strength',
        'Soccer': 'Soccer'
    };

    const workoutHistory: IWorkoutMatch[] = [];

    for (const planned of plannedWorkouts) {
        const plannedDate = planned.fullDate;

        const actualMatch = pastActivities.find(act => {
            const actDate = new Date(act.startDate).toISOString().split('T')[0];
            const actType = typeMap[act.type] || act.type;
            return actDate === plannedDate && actType === planned.type;
        });

        const score = actualMatch
            ? calculateExecutionScore(planned, actualMatch, ftp)
            : 0;

        const status = actualMatch ? 'completed' : 'missed';

        let performanceActivity: IPerformanceActivity | undefined;
        if (actualMatch) {
            performanceActivity = {
                date: new Date(actualMatch.startDate).toISOString().split('T')[0],
                type: actualMatch.type,
                name: actualMatch.name,
                description: actualMatch.description,
                distance: actualMatch.manualDistance || actualMatch.distance,
                movingTime: actualMatch.manualMovingTime || actualMatch.movingTime,
                elapsedTime: actualMatch.elapsedTime,
                averageHeartrate: actualMatch.averageHeartrate,
                maxHeartrate: actualMatch.maxHeartrate,
                averageCadence: actualMatch.averageCadence,
                averageWatts: actualMatch.averageWatts,
                maxWatts: actualMatch.maxWatts,
                weightedAverageWatts: actualMatch.weightedAverageWatts,
                averageSpeed: (actualMatch.manualDistance || actualMatch.distance) / (actualMatch.manualMovingTime || actualMatch.movingTime),
                maxSpeed: actualMatch.maxSpeed,
                averagePace: formatPace(actualMatch),
                calories: actualMatch.calories,
                sufferScore: actualMatch.sufferScore,
                laps: (actualMatch.laps || []).map((lap: any) => ({
                    lapIndex: lap.lapIndex,
                    distance: lap.manualDistance || lap.distance,
                    time: lap.manualMovingTime || lap.movingTime,
                    elapsedTime: lap.elapsedTime,
                    pace: formatLapPace(lap, actualMatch.type),
                    averageHeartrate: lap.averageHeartrate,
                    averageCadence: lap.averageCadence,
                    averageWatts: lap.averageWatts,
                    isRest: (lap.manualDistance || lap.distance) < 5
                }))
            };
        }

        workoutHistory.push({
            plannedDate: planned.fullDate,
            plannedType: planned.type,
            plannedTitle: planned.title,
            workoutDescription: planned.description,
            status,
            executionScore: actualMatch ? score : undefined,
            activity: performanceActivity
        });
    }

    return workoutHistory;
}

function formatPace(act: any): string {
    const distance = act.manualDistance || act.distance;
    const movingTime = act.manualMovingTime || act.movingTime;
    if (!distance || !movingTime) return "N/A";
    if (act.type === 'Swim') {
        const paceSecs = (movingTime / (distance / 100));
        const mins = Math.floor(paceSecs / 60);
        const secs = Math.round(paceSecs % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}/100m`;
    } else if (act.type === 'Run') {
        const paceSecs = (movingTime / (distance / 1000));
        const mins = Math.floor(paceSecs / 60);
        const secs = Math.round(paceSecs % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}/km`;
    } else if (act.type === 'Ride' || act.type === 'VirtualRide' || act.type === 'Bike') {
        const speedKmh = (distance / movingTime) * 3.6;
        return `${speedKmh.toFixed(1)} km/h`;
    }
    return "N/A";
}

function formatLapPace(lap: any, type: string): string {
    const distance = lap.manualDistance || lap.distance;
    const movingTime = lap.manualMovingTime || lap.movingTime;
    if (!distance || !movingTime) return "";
    if (type === 'Swim') {
        const paceSecs = (movingTime / (distance / 100));
        const mins = Math.floor(paceSecs / 60);
        const secs = Math.round(paceSecs % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    } else if (type === 'Run') {
        const paceSecs = (movingTime / (distance / 1000));
        const mins = Math.floor(paceSecs / 60);
        const secs = Math.round(paceSecs % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    } else if (type === 'Ride' || type === 'VirtualRide' || type === 'Bike') {
        const speedKmh = (distance / movingTime) * 3.6;
        return `${speedKmh.toFixed(1)} km/h`;
    }
    return "";
}
