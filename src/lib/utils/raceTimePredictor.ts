/**
 * Race Time Predictor
 * Calculates estimated finish times based on recent training data and execution scores
 */

import { ActivityDocument } from '../models/activity';
import { AnyWorkout } from '../models/workout';
import { calculateExecutionScore, findMatchingPlannedWorkout } from './workoutComparison';

// Standard race distances in meters
export const RACE_DISTANCES: Record<string, number> = {
    '5k Run': 5000,
    '10k Run': 10000,
    'Half Marathon': 21097.5,
    'Marathon': 42195,
    'Sprint Triathlon': 750 + 20000 + 5000,       // Swim + Bike + Run
    'Olympic Triathlon': 1500 + 40000 + 10000,    // Swim + Bike + Run
    'Ironman 70.3': 1900 + 90000 + 21097.5,       // Swim + Bike + Run
    'Ironman': 3800 + 180000 + 42195,             // Swim + Bike + Run
};

// Triathlon leg distances
export const TRIATHLON_LEGS: Record<string, { swim: number; bike: number; run: number }> = {
    'Sprint Triathlon': { swim: 750, bike: 20000, run: 5000 },
    'Olympic Triathlon': { swim: 1500, bike: 40000, run: 10000 },
    'Ironman 70.3': { swim: 1900, bike: 90000, run: 21097.5 },
    'Ironman': { swim: 3800, bike: 180000, run: 42195 },
};

interface ActivityWithScore {
    activity: ActivityDocument;
    executionScore: number;
    avgPace: number; // seconds per km (run/swim) or km/h (bike)
    type: 'Run' | 'Bike' | 'Swim';
}

interface PredictionResult {
    estimatedTimeMin: string; // HH:MM:SS format
    estimatedTimeMax: string; // HH:MM:SS format
    confidence: 'low' | 'medium' | 'high';
    dataPoints: number;
}

/**
 * Format seconds to HH:MM:SS string, rounded to nearest minute
 */
function formatTime(totalSeconds: number): string {
    // Round to nearest minute for cleaner estimates
    const roundedSeconds = Math.round(totalSeconds / 60) * 60;
    const hours = Math.floor(roundedSeconds / 3600);
    const minutes = Math.floor((roundedSeconds % 3600) / 60);
    const seconds = 0; // Always 0 after rounding to minute
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}


/**
 * Calculate average pace from activity
 * Returns seconds per km for run/swim, km/h for bike
 */
function calculatePace(activity: ActivityDocument): number {
    const distance = activity.manualDistance ?? activity.distance;
    const time = activity.manualMovingTime ?? activity.movingTime;

    if (distance <= 0 || time <= 0) return 0;

    if (activity.type === 'Ride' || activity.type === 'VirtualRide') {
        // Return km/h for bike
        return (distance / 1000) / (time / 3600);
    } else {
        // Return seconds per km for run/swim
        return (time / (distance / 1000));
    }
}

/**
 * Get sport type from activity
 */
function getSportType(activity: ActivityDocument): 'Run' | 'Bike' | 'Swim' | null {
    const typeMap: Record<string, 'Run' | 'Bike' | 'Swim'> = {
        'Run': 'Run',
        'Ride': 'Bike',
        'VirtualRide': 'Bike',
        'Swim': 'Swim',
    };
    return typeMap[activity.type] || null;
}

/**
 * Calculate weighted average pace (more recent activities have higher weight)
 */
function weightedAveragePace(activities: ActivityWithScore[]): { optimistic: number; conservative: number } {
    if (activities.length === 0) return { optimistic: 0, conservative: 0 };

    // Sort by date (most recent first)
    const sorted = [...activities].sort((a, b) =>
        new Date(b.activity.startDate).getTime() - new Date(a.activity.startDate).getTime()
    );

    // Apply recency weights (exponential decay)
    let totalWeight = 0;
    let weightedSum = 0;
    const bestPaces: number[] = [];

    sorted.forEach((item, index) => {
        const recencyWeight = Math.exp(-index * 0.2); // Decay factor
        const scoreWeight = item.executionScore / 100;
        const weight = recencyWeight * (0.5 + scoreWeight * 0.5);

        weightedSum += item.avgPace * weight;
        totalWeight += weight;
        bestPaces.push(item.avgPace);
    });

    const avgPace = weightedSum / totalWeight;

    // Sort paces to find best performances
    bestPaces.sort((a, b) => {
        // For run/swim: lower is better (less seconds per km)
        // For bike: higher is better (more km/h)
        const type = sorted[0]?.type;
        return type === 'Bike' ? b - a : a - b;
    });

    // Best 20th percentile for optimistic estimate
    const top20Count = Math.max(1, Math.ceil(bestPaces.length * 0.2));
    const bestPaceAvg = bestPaces.slice(0, top20Count).reduce((a, b) => a + b, 0) / top20Count;

    return {
        optimistic: bestPaceAvg,
        conservative: avgPace,
    };
}

/**
 * Predict race time for a running event
 */
function predictRunTime(
    activities: ActivityWithScore[],
    targetDistance: number
): { min: number; max: number } | null {
    const runActivities = activities.filter(a => a.type === 'Run' && a.avgPace > 0);

    if (runActivities.length < 2) return null;

    const { optimistic, conservative } = weightedAveragePace(runActivities);

    // Calculate base times
    const optimisticTime = (targetDistance / 1000) * optimistic;
    const conservativeTime = (targetDistance / 1000) * conservative;

    // Apply distance adjustment using Riegel formula concept
    // Longer distances need more conservative estimates
    const avgTrainingDistance = runActivities.reduce((sum, a) =>
        sum + (a.activity.manualDistance ?? a.activity.distance), 0) / runActivities.length;

    let distanceFactor = 1;
    if (targetDistance > avgTrainingDistance * 2) {
        // Target is significantly longer than training - add fatigue factor
        distanceFactor = Math.pow(targetDistance / avgTrainingDistance, 0.06);
    }

    return {
        min: optimisticTime * 0.98, // 2% optimistic buffer
        max: conservativeTime * distanceFactor * 1.05, // 5% conservative buffer + distance factor
    };
}

/**
 * Predict race time for a triathlon event
 */
function predictTriathlonTime(
    activities: ActivityWithScore[],
    raceType: string
): { min: number; max: number } | null {
    const legs = TRIATHLON_LEGS[raceType];
    if (!legs) return null;

    const swimActivities = activities.filter(a => a.type === 'Swim' && a.avgPace > 0);
    const bikeActivities = activities.filter(a => a.type === 'Bike' && a.avgPace > 0);
    const runActivities = activities.filter(a => a.type === 'Run' && a.avgPace > 0);

    // Need at least some data for each discipline
    if (swimActivities.length < 1 && bikeActivities.length < 1 && runActivities.length < 1) {
        return null;
    }

    let minTime = 0;
    let maxTime = 0;

    // Swim prediction (pace in seconds per 100m typically, but we store per km)
    if (swimActivities.length >= 1) {
        const { optimistic, conservative } = weightedAveragePace(swimActivities);
        minTime += (legs.swim / 1000) * optimistic;
        maxTime += (legs.swim / 1000) * conservative * 1.1;
    } else {
        // Default swim estimates if no data
        const defaultSwimPace = 120; // 2:00/100m = 1200 sec/km
        minTime += (legs.swim / 1000) * defaultSwimPace * 0.9;
        maxTime += (legs.swim / 1000) * defaultSwimPace * 1.2;
    }

    // Bike prediction (speed in km/h)
    if (bikeActivities.length >= 1) {
        const { optimistic, conservative } = weightedAveragePace(bikeActivities);
        minTime += (legs.bike / 1000) / optimistic * 3600;
        maxTime += (legs.bike / 1000) / (conservative * 0.9) * 3600;
    } else {
        // Default bike estimates
        const defaultBikeSpeed = 30; // km/h
        minTime += (legs.bike / 1000) / (defaultBikeSpeed * 1.1) * 3600;
        maxTime += (legs.bike / 1000) / (defaultBikeSpeed * 0.85) * 3600;
    }

    // Run prediction (with fatigue factor for post-bike)
    if (runActivities.length >= 1) {
        const { optimistic, conservative } = weightedAveragePace(runActivities);
        const fatigueFactor = raceType.includes('Ironman') ? 1.1 : 1.05;
        minTime += (legs.run / 1000) * optimistic * fatigueFactor;
        maxTime += (legs.run / 1000) * conservative * fatigueFactor * 1.1;
    } else {
        // Default run estimates
        const defaultRunPace = 330; // 5:30/km
        minTime += (legs.run / 1000) * defaultRunPace * 0.95;
        maxTime += (legs.run / 1000) * defaultRunPace * 1.2;
    }

    // Add transition times
    const t1 = raceType.includes('Ironman') ? 300 : 120; // 5 min or 2 min
    const t2 = raceType.includes('Ironman') ? 300 : 120;

    return {
        min: minTime + t1 + t2,
        max: maxTime + t1 * 1.5 + t2 * 1.5,
    };
}

/**
 * Main prediction function
 */
export async function predictRaceTime(
    activities: ActivityDocument[],
    plannedWorkouts: AnyWorkout[],
    raceDistance: string,
    userFtp: number = 250
): Promise<PredictionResult | null> {
    // Process activities and calculate execution scores
    const processedActivities: ActivityWithScore[] = [];

    for (const activity of activities) {
        const sportType = getSportType(activity);
        if (!sportType) continue;

        const avgPace = calculatePace(activity);
        if (avgPace <= 0) continue;

        const plannedWorkout = findMatchingPlannedWorkout(plannedWorkouts, activity);
        const executionScore = plannedWorkout
            ? calculateExecutionScore(plannedWorkout, activity, userFtp)
            : 70; // Default score if no matching workout

        processedActivities.push({
            activity,
            executionScore,
            avgPace,
            type: sportType,
        });
    }

    if (processedActivities.length < 3) {
        return null; // Not enough data
    }

    let prediction: { min: number; max: number } | null = null;

    // Determine if this is a triathlon or single-sport event
    const isTriathlon = TRIATHLON_LEGS[raceDistance] !== undefined;
    const isRunningEvent = ['5k Run', '10k Run', 'Half Marathon', 'Marathon'].includes(raceDistance);

    if (isTriathlon) {
        prediction = predictTriathlonTime(processedActivities, raceDistance);
    } else if (isRunningEvent) {
        const targetDistance = RACE_DISTANCES[raceDistance];
        if (targetDistance) {
            prediction = predictRunTime(processedActivities, targetDistance);
        }
    }

    if (!prediction) return null;

    // Calculate confidence based on data quality
    const avgScore = processedActivities.reduce((sum, a) => sum + a.executionScore, 0) / processedActivities.length;
    let confidence: 'low' | 'medium' | 'high' = 'low';
    if (processedActivities.length >= 10 && avgScore >= 70) {
        confidence = 'high';
    } else if (processedActivities.length >= 5 && avgScore >= 50) {
        confidence = 'medium';
    }

    return {
        estimatedTimeMin: formatTime(prediction.min),
        estimatedTimeMax: formatTime(prediction.max),
        confidence,
        dataPoints: processedActivities.length,
    };
}
