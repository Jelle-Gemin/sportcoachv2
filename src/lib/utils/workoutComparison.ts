/**
 * Calculation for execution score (0-100)
 * Compares prescribed metrics with actual metrics
 */

import { AnyWorkout, IRunMainSet, IBikeMainSet, ISwimMainSet, IMainSetBase } from "../models/workout";
import { ActivityDocument, LapData } from "../models/activity";

/**
 * Calculation for execution score (0-100)
 * Compares prescribed metrics with actual metrics, focusing on main sets
 */
export function calculateExecutionScore(planned: AnyWorkout | null, actual: ActivityDocument | null, userFtp: number = 250): number {
    if (!planned || !actual) return 0;

    const workout = planned.workout;
    // Cast to unknown first to handle the union type access safely or check type
    const mainSet = workout?.main as unknown as (IRunMainSet | IBikeMainSet | ISwimMainSet);

    // Use aggregate logic if no main set is defined or no laps available
    if (!mainSet || !actual.laps || actual.laps.length === 0) {
        return calculateAggregateScore(planned, actual);
    }

    const { workLaps, restLaps } = identifyLaps(actual, planned, planned.type);

    let volumeScore = 0;
    let qualityScore = 0;
    let restScore = 100;

    // 1. Volume Score (40%)
    if (mainSet.sets) {
        let targetSets: number = mainSet.sets;
        if (planned.type === 'Swim') {
            const swimWorkout = planned as unknown as { workout?: { drill?: { sets?: number } } };
            const drillSets = swimWorkout.workout?.drill?.sets || 0;
            targetSets += drillSets;
        }

        const validTarget = targetSets > 0 ? targetSets : 1;
        volumeScore = Math.min(100, (workLaps.length / validTarget) * 100);
    } else {
        // Logic below assumes targetVolume matches units of actualVolume.
        // If distance is present, it's usually meters in mainSet? No, interface says meters or km? IWorkout says distance is km, mainSet usually meters?
        // Let's assume consistent units or normalization happens.
        // existing code: const targetVolume = mainSet.distance || (mainSet.time ? mainSet.time / 60 : planned.duration);
        // existing actualVolume: actual.distance / 1000 || actual.movingTime / 60;

        let normalizedTarget = 0;
        let normalizedActual = 0;

        if ((mainSet as any).distance) {
            const mDist = (mainSet as any).distance;
            normalizedTarget = mDist < 50 ? mDist : mDist / 1000; // Assume target is KM if small? Or existing code logic: mainSet.distance
            // Existing logic: const targetVolume = mainSet.distance ...
            // Wait, existing check: (mainSet.distance < 50 ? mainSet.distance * 1000 : mainSet.distance) in identifyLaps.
            // Here it uses mainSet.distance directly.
            // Let's check IRunMainSet: distance in meters.
            // actual.distance is meters.

            if (mDist > 100) {
                // Assume meters
                normalizedTarget = mDist / 1000;
            } else {
                // Assume KM
                normalizedTarget = mDist;
            }
            normalizedActual = actual.distance / 1000;
        } else {
            normalizedTarget = ((mainSet as any).time ? (mainSet as any).time / 60 : planned.duration / 60); // minutes
            normalizedActual = actual.movingTime / 60;
        }

        if (normalizedTarget > 0) {
            volumeScore = Math.max(0, 100 - (Math.abs(normalizedTarget - normalizedActual) / normalizedTarget) * 100);
        } else {
            volumeScore = 100;
        }
    }

    // 2. Quality Score (40%) - Work Laps
    if (workLaps.length > 0) {
        const qualityPercentages = workLaps.map(lap => calculateLapQuality(lap, mainSet, planned.type, userFtp));
        qualityScore = qualityPercentages.reduce((a, b) => a + b, 0) / workLaps.length;
    } else {
        qualityScore = calculateIntensityScore(planned, actual);
    }

    // 3. Rest Score (20% if prescribed) - Rest timing compliance
    if (mainSet.rest && workLaps.length > 1) {
        const targetRest = mainSet.rest;
        const expectedRestCount = workLaps.length - 1;

        if (restLaps.length > 0) {
            const restPercentages = restLaps.map(lap => {
                const lapTime = lap.manualMovingTime ?? lap.movingTime;
                const actualRest = lapTime;
                const diff = Math.abs(actualRest - targetRest);
                const tolerance = Math.max(15, targetRest * 0.2);
                if (diff <= tolerance) return 100;
                return Math.max(0, 100 - ((diff - tolerance) / targetRest) * 100);
            });
            const complianceScore = restPercentages.reduce((a, b) => a + b, 0) / restLaps.length;

            const countCompliance = expectedRestCount > 0 ? Math.min(1, restLaps.length / expectedRestCount) : 1;
            restScore = complianceScore * countCompliance;
        } else {
            restScore = 0;
        }
    }


    // Weighted average
    let finalScore;
    if (planned.type === 'Swim') {
        finalScore = (volumeScore * 0.6) + (qualityScore * 0.4);
    } else {
        const restWeight = mainSet.rest ? 0.2 : 0;
        const workWeight = (1 - restWeight) / 2;
        finalScore = (volumeScore * workWeight) + (qualityScore * workWeight) + (restScore * restWeight);
    }

    return Math.round(finalScore);
}

/**
 * Identify which laps are "Work" and which are "Rest"
 */
function identifyLaps(actual: ActivityDocument, workout: AnyWorkout, type: string): { workLaps: LapData[], restLaps: LapData[] } {
    if (!actual.laps) return { workLaps: [], restLaps: [] };

    // Need to access main set safely
    const anyWorkout = workout as unknown as { workout?: { main?: any, drill?: any, warmup?: any, coolDown?: any } };
    const mainSet = anyWorkout.workout?.main || {};

    // Only separate drill/warmup/cooldown for Swim
    const isSwim = type === 'Swim';

    // Extract targets
    const mainDist = mainSet.distance ? (mainSet.distance < 50 ? mainSet.distance * 1000 : mainSet.distance) : null;
    const mainTime = calculateTargetTime(mainSet);
    const mainRest = mainSet.rest;

    // Swim specific targets
    const drillSet = anyWorkout.workout?.drill || {};
    const drillDist = drillSet.distance ? (drillSet.distance < 50 ? drillSet.distance * 1000 : drillSet.distance) : null;

    const warmupSet = anyWorkout.workout?.warmup || {};
    const warmupDist = warmupSet.distance ? (warmupSet.distance < 50 ? warmupSet.distance * 1000 : warmupSet.distance) : null;

    const coolDownSet = anyWorkout.workout?.coolDown || {};
    const coolDownDist = coolDownSet.distance ? (coolDownSet.distance < 50 ? coolDownSet.distance * 1000 : coolDownSet.distance) : null;


    const workLaps: LapData[] = [];
    const restLaps: LapData[] = [];

    actual.laps.forEach((lap: LapData & { lapType?: string }) => {
        const lapDist = lap.manualDistance ?? lap.distance;
        const lapTime = lap.manualMovingTime ?? lap.movingTime;
        const speed = lapDist / (lapTime || 1); // m/s

        let matchFound = false;

        // --- SWIM SPECIFIC MATCHING ---
        if (isSwim) {
            // Tolerance (25%)
            const tolerance = 0.25;

            // 1. Check Warmup
            if (warmupDist && !matchFound) {
                if (Math.abs(lapDist - warmupDist) < (warmupDist * tolerance)) {
                    lap.lapType = 'warmup';
                    matchFound = true;
                }
            }

            // 2. Check Drill
            if (drillDist && !matchFound) {
                if (Math.abs(lapDist - drillDist) < (drillDist * tolerance)) {
                    lap.lapType = 'drill';
                    matchFound = true;
                    workLaps.push(lap); // Count drills as work
                }
            }

            // 3. Check Main
            if (mainDist && !matchFound) {
                if (Math.abs(lapDist - mainDist) < (mainDist * tolerance)) {
                    lap.lapType = 'main';
                    matchFound = true;
                    workLaps.push(lap);
                }
            }

            // 4. Check CoolDown
            if (coolDownDist && !matchFound) {
                if (Math.abs(lapDist - coolDownDist) < (coolDownDist * tolerance)) {
                    lap.lapType = 'cooldown';
                    matchFound = true;
                }
            }

            // 5. Rest (Short distance)
            if (!matchFound && lapDist < 15) {
                lap.lapType = 'rest';
                matchFound = true;
                restLaps.push(lap);
            }

        } else {
            // --- NON-SWIM (RUN/BIKE) EXISTING LOGIC ---

            // 1. Check if it's a Work Match
            let isWorkMatch = false;
            const tolerance = 0.20;
            if (mainDist) {
                isWorkMatch = Math.abs(lapDist - mainDist) < (mainDist * tolerance);
            } else if (mainTime) {
                isWorkMatch = Math.abs(lapTime - mainTime) < (mainTime * tolerance);
            }

            if (isWorkMatch) {
                lap.lapType = 'work';
                workLaps.push(lap);
            } else if (mainRest) {
                // 2. Check if it's a Rest Match
                let isRestMatch = false;
                const matchesRestTime = Math.abs(lapTime - mainRest) < Math.max(20, mainRest * 0.5);

                if (type === 'Run') {
                    // In run, recovery must be slow OR short distance
                    let isMuchSlower = false;
                    if (mainSet.pace && speed > 0) {
                        const workPace = parsePace(mainSet.pace);
                        const actualPace = 1000 / speed;
                        isMuchSlower = actualPace > (workPace * 1.5);
                    }
                    const isMinimalDist = lapDist < (mainDist * 0.4);
                    isRestMatch = matchesRestTime && (isMinimalDist || isMuchSlower || speed < 0.5);
                } else {
                    isRestMatch = matchesRestTime;
                }

                if (isRestMatch) {
                    lap.lapType = 'rest';
                    restLaps.push(lap);
                }
            }
        }
    });

    return { workLaps, restLaps };
}

function calculateTargetTime(mainSet: IMainSetBase | IRunMainSet | IBikeMainSet | ISwimMainSet | any): number | null {
    if (mainSet.time) return mainSet.time;
    if (mainSet.pace && mainSet.distance) {
        const targetPace = parsePace(mainSet.pace); // s/km
        // Convert distance to km if it's meters
        const distKm = mainSet.distance > 50 ? mainSet.distance / 1000 : mainSet.distance;
        return targetPace * distKm;
    }
    return null;
}

function calculateLapQuality(lap: LapData & { lapType?: string, description?: string }, mainSet: IMainSetBase | IRunMainSet | IBikeMainSet | ISwimMainSet | any, type: string, userFtp: number): number {
    const lapDist = lap.manualDistance ?? lap.distance;
    const lapTime = lap.manualMovingTime ?? lap.movingTime;
    const lapSpeed = lapDist / lapTime; // m/s

    if (type === 'Run' && mainSet.pace) {
        const targetPace = parsePace(mainSet.pace); // s/km
        const actualPace = 1000 / lapSpeed;
        return Math.max(0, 100 - (Math.abs(targetPace - actualPace) / targetPace) * 100);
    }

    if (type === 'Bike' && mainSet.watts) {
        const targetWatts = (parseInt(mainSet.watts) / 100) * userFtp;
        const avgWatts = lap.averageWatts || (lap.averageHeartrate ? lap.averageHeartrate * 1.5 : 0);
        const actualWatts = avgWatts;
        if (!targetWatts) return 100;
        return Math.max(0, 100 - (Math.abs(targetWatts - actualWatts) / targetWatts) * 100);
    }

    if (type === 'Swim') {
        const isDrill = lap.lapType === 'drill' || lap.description?.toLowerCase().includes('drill') || mainSet.description?.toLowerCase().includes('drill');

        if (mainSet.pace) {
            const targetPace = parsePace(mainSet.pace); // s/100m
            const actualPace = (100 / (lapSpeed || 0.1)); // s/100m

            const buffer = isDrill ? 30 : 15;
            const diff = Math.abs(targetPace - actualPace);

            if (diff <= buffer) return 100;
            return Math.max(0, 100 - ((diff - buffer) / targetPace) * 100);
        }

        if (mainSet.RPE) {
            if (lap.averageHeartrate && lap.averageHeartrate < 100) {
                return 75;
            }
            return 100;
        }

        return 100;
    }

    return 100;
}

function calculateAggregateScore(planned: AnyWorkout, actual: ActivityDocument): number {
    let totalScore = 0;
    const actualMinutes = actual.movingTime / 60;
    // planned.duration is in minutes? IWorkout says seconds.
    // Wait, IWorkout interface says duration: number // seconds.
    // Line 110 of existing code said `planned.duration`.
    // Let's assume duration is minutes or seconds? Most Strava data is seconds.
    // existing: const actualMinutes = actual.movingTime / 60;
    // existing: const durDiff = Math.abs(planned.duration - actualMinutes);
    // This implies planned.duration is MINUTES.
    // But IWorkout says seconds.

    // I'll stick to original logic but convert if needed.
    // If planned.duration > 1000, it's likely seconds.
    const plannedDur = planned.duration > 1000 ? planned.duration / 60 : planned.duration;

    const diff = Math.abs(plannedDur - actualMinutes);

    totalScore += Math.max(0, 100 - (diff / plannedDur) * 100) * 0.5;
    totalScore += calculateIntensityScore(planned, actual) * 0.5;
    return Math.round(totalScore);
}

function calculateIntensityScore(planned: AnyWorkout, actual: ActivityDocument): number {
    // TSS logic
    // planned.tss does not exist on IWorkout interface, so we cast to any or use optional access if added
    const pAny = planned as AnyWorkout & { tss?: number };
    const plannedTSS = pAny.tss || (planned.duration * 0.8 / 60); // assuming duration is seconds, this formula is weird if duration is seconds.
    // If duration is seconds: seconds * 0.8 / 60 = minutes * 0.8.

    const actualTSS = actual.sufferScore || (actual.movingTime / 60 * 0.7);
    const diff = Math.abs(plannedTSS - actualTSS);
    return Math.max(0, 100 - (diff / Math.max(1, plannedTSS)) * 100);
}

function parsePace(paceStr: string): number {
    if (!paceStr || typeof paceStr !== 'string') return 300;
    const parts = paceStr.split(':');
    if (parts.length !== 2) return 300;
    return parseInt(parts[0]) * 60 + parseInt(parts[1]);
}

/**
 * Find matching planned workout for an actual activity
 */
export function findMatchingPlannedWorkout<T extends AnyWorkout>(schedule: T[], actual: ActivityDocument | null): T | null {
    if (!schedule || !actual) return null;

    const actualDate = new Date(actual.startDate).toISOString().split('T')[0];
    const typeMap: Record<string, string> = {
        'Ride': 'Bike',
        'VirtualRide': 'Bike',
        'Run': 'Run',
        'Swim': 'Swim',
        'WeightTraining': 'Strength',
        'Soccer': 'Soccer'
    };

    const actualType = typeMap[actual.type] || actual.type;

    // Find sessions on same date
    const dateMatches = schedule.filter(item => item.fullDate === actualDate);

    if (dateMatches.length === 0) return null;
    if (dateMatches.length === 1) return dateMatches[0];

    // More than one session? Match by type
    const typeMatch = dateMatches.find(item =>
        item.type === actualType ||
        (item.type as string === 'Brick' && (actualType === 'Bike' || actualType === 'Run'))
    );

    return typeMatch || dateMatches[0];
}
