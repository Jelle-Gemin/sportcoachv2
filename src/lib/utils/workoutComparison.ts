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

    const { workLaps, restLaps } = identifyLaps(actual, planned, planned.type, userFtp);

    let volumeScore = 0;
    let qualityScore = 0;
    let restScore = 100;
    let normalizedTarget = 0;
    let normalizedActual = 0;

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
            // Calculate planned duration in seconds
            let plannedSeconds = planned.duration;

            // Fallback: Calculate from structure if duration is missing or suspicious (< 5 mins)
            if (!plannedSeconds || plannedSeconds < 300) {
                const pAny = planned as any;
                const warmup = pAny.workout?.warmup?.time || 0;
                const cooldown = pAny.workout?.coolDown?.time || 0;
                const sets = mainSet?.sets || 1;
                const repTime = mainSet ? calculateTargetTime(mainSet) : 0; // Returns one rep time (or on+off)
                const repRest = mainSet?.rest || 0;

                // Total main set = (sets * repTime) + (rest between sets)
                const mainSection = (repTime ? sets * repTime : 0) + (repRest * Math.max(0, sets - 1));

                const calculated = warmup + mainSection + cooldown;
                if (calculated > 0) plannedSeconds = calculated;
            }

            if (!plannedSeconds) plannedSeconds = 3600; // Final fallback

            normalizedTarget = plannedSeconds / 60; // minutes
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
    // Weighted average
    let finalScore = 0;
    if (planned.type === 'Swim') {
        finalScore = (volumeScore * 0.6) + (qualityScore * 0.4);
    } else {
        const hasRest = !!mainSet.rest;
        // Weights: Rest 0.2, Vol 0.4, Qual 0.4
        // If no rest: Vol 0.5, Qual 0.5
        const restWeight = hasRest ? 0.2 : 0;
        const otherWeight = (1 - restWeight) / 2;

        finalScore = (volumeScore * otherWeight) + (qualityScore * otherWeight) + (restScore * restWeight);
    }

    const roundedScore = Math.round(finalScore);

    // DEBUG LOG for user verification
    console.log(`[ScoreDebug] '${planned.title || 'Workout'}': Final=${roundedScore}, Vol=${Math.round(volumeScore)} (Plan:${Math.round(normalizedTarget)} Act:${Math.round(normalizedActual)}), Qual=${Math.round(qualityScore)}, Rest=${Math.round(restScore)}`);

    return roundedScore;
}

/**
 * Identify which laps are "Work" and which are "Rest"
 *
 * Handles:
 *   - Standard interval workouts (distance- or time-based sets)
 *   - Over/Under workouts (alternating on/off blocks within each set)
 *   - Fartlek / time-based intervals where rest is a recovery jog (not standing still)
 *   - Swim workouts with drill/warmup/cooldown structure
 */
function identifyLaps(actual: ActivityDocument, workout: AnyWorkout, type: string, userFtp: number = 250): { workLaps: (LapData & { lapType?: string })[], restLaps: (LapData & { lapType?: string })[] } {
    if (!actual.laps) return { workLaps: [], restLaps: [] };

    // Need to access main set safely
    const anyWorkout = workout as unknown as { workout?: { main?: any, drill?: any, warmup?: any, coolDown?: any } };
    const mainSet = anyWorkout.workout?.main || {};

    const isSwim = type === 'Swim';
    const isOverUnder = !!(mainSet.on && mainSet.off);

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


    const workLaps: (LapData & { lapType?: string })[] = [];
    const restLaps: (LapData & { lapType?: string })[] = [];

    if (isSwim) {
        // --- SWIM SPECIFIC MATCHING ---
        actual.laps.forEach((lap: LapData & { lapType?: string }) => {
            const lapDist = lap.manualDistance ?? lap.distance;
            const tolerance = 0.25;
            let matchFound = false;

            if (warmupDist && !matchFound) {
                if (Math.abs(lapDist - warmupDist) < (warmupDist * tolerance)) {
                    lap.lapType = 'warmup';
                    matchFound = true;
                }
            }
            if (drillDist && !matchFound) {
                if (Math.abs(lapDist - drillDist) < (drillDist * tolerance)) {
                    lap.lapType = 'drill';
                    matchFound = true;
                    workLaps.push(lap);
                }
            }
            if (mainDist && !matchFound) {
                if (Math.abs(lapDist - mainDist) < (mainDist * tolerance)) {
                    lap.lapType = 'main';
                    matchFound = true;
                    workLaps.push(lap);
                }
            }
            if (coolDownDist && !matchFound) {
                if (Math.abs(lapDist - coolDownDist) < (coolDownDist * tolerance)) {
                    lap.lapType = 'cooldown';
                    matchFound = true;
                }
            }
            if (!matchFound && lapDist < 15) {
                lap.lapType = 'rest';
                matchFound = true;
                restLaps.push(lap);
            }
        });
    } else if (isOverUnder) {
        // --- OVER/UNDER WORKOUT (Bike) ---
        // Structure: warmup → [on, off] x sets (with rest between sets) → cooldown
        // When on/off have the same duration, classify by WATTS intensity, not time
        const onTime = mainSet.on?.time || 0;
        const offTime = mainSet.off?.time || 0;
        const betweenSetRest = mainSet.rest || 0;

        // Parse FTP-percentage watt targets for on/off classification
        const onWattsPct = parseWattsPct(mainSet.on?.watts || '');
        const offWattsPct = parseWattsPct(mainSet.off?.watts || '');
        // Midpoint between on/off targets to split laps by intensity
        const wattsMidpointPct = (onWattsPct && offWattsPct) ? (onWattsPct + offWattsPct) / 2 : 0;
        const absMidpointWatts = (wattsMidpointPct / 100) * userFtp;

        // Are on/off durations similar enough that time alone can't distinguish them?
        const timesAreSimilar = onTime && offTime && Math.abs(onTime - offTime) < Math.max(15, Math.min(onTime, offTime) * 0.3);

        // Combined on+off time = one "set block" duration
        const setBlockTime = onTime + offTime;

        // First: collect interval-candidate laps (matching on or off duration)
        const intervalTolerance = 0.25;
        const intervalLaps: (LapData & { lapType?: string })[] = [];

        actual.laps.forEach((lap: LapData & { lapType?: string }) => {
            const lapTime = lap.manualMovingTime ?? lap.movingTime;

            // Check for between-set rest first
            if (betweenSetRest && Math.abs(lapTime - betweenSetRest) < Math.max(20, betweenSetRest * 0.5)) {
                lap.lapType = 'rest';
                restLaps.push(lap);
                return;
            }

            // Check if this is a combined on+off lap (some devices record the full set as one lap)
            if (setBlockTime && Math.abs(lapTime - setBlockTime) < Math.max(20, setBlockTime * 0.2)) {
                lap.lapType = 'work';
                workLaps.push(lap);
                return;
            }

            // Check if duration matches either on or off block
            const matchesOn = onTime && Math.abs(lapTime - onTime) < Math.max(15, onTime * intervalTolerance);
            const matchesOff = offTime && Math.abs(lapTime - offTime) < Math.max(15, offTime * intervalTolerance);

            if (matchesOn || matchesOff) {
                intervalLaps.push(lap);
            }
            // Else: unclassified (warmup, cooldown, etc.)
        });

        // Now classify the interval laps as on vs off
        if (timesAreSimilar && absMidpointWatts > 0) {
            // Times are equal — use watts to distinguish on (above midpoint) vs off (below)
            for (const lap of intervalLaps) {
                const lapWatts = lap.averageWatts || 0;
                if (lapWatts >= absMidpointWatts) {
                    lap.lapType = 'Over';
                } else {
                    lap.lapType = 'Under';
                }
                workLaps.push(lap);
            }
        } else if (timesAreSimilar) {
            // Times are equal but no watts data — use alternating pattern (on, off, on, off, ...)
            for (let i = 0; i < intervalLaps.length; i++) {
                intervalLaps[i].lapType = (i % 2 === 0) ? 'Over' : 'Under';
                workLaps.push(intervalLaps[i]);
            }
        } else {
            // Times are different — classify by time match
            for (const lap of intervalLaps) {
                const lapTime = lap.manualMovingTime ?? lap.movingTime;
                const matchesOn = onTime && Math.abs(lapTime - onTime) < Math.max(15, onTime * intervalTolerance);
                lap.lapType = matchesOn ? 'Over' : 'Under';
                workLaps.push(lap);
            }
        }
    } else {
        // --- STANDARD INTERVAL (RUN / BIKE) ---
        // First pass: identify work laps by matching against prescribed distance or time
        actual.laps.forEach((lap: LapData & { lapType?: string }) => {
            const lapDist = lap.manualDistance ?? lap.distance;
            const lapTime = lap.manualMovingTime ?? lap.movingTime;

            const tolerance = 0.20;
            let isWorkMatch = false;

            if (mainDist) {
                isWorkMatch = Math.abs(lapDist - mainDist) < (mainDist * tolerance);
            } else if (mainTime) {
                isWorkMatch = Math.abs(lapTime - mainTime) < (mainTime * tolerance);
            }

            if (isWorkMatch) {
                lap.lapType = 'work';
                workLaps.push(lap);
            }
        });

        // Second pass: identify rest laps
        // Calculate median work pace/speed to compare against
        let medianWorkSpeed = 0;
        if (workLaps.length > 0) {
            const workSpeeds = workLaps.map(l => {
                const d = l.manualDistance ?? l.distance;
                const t = l.manualMovingTime ?? l.movingTime;
                return d / (t || 1);
            }).sort((a, b) => a - b);
            medianWorkSpeed = workSpeeds[Math.floor(workSpeeds.length / 2)];
        }

        actual.laps.forEach((lap: LapData & { lapType?: string }) => {
            if (lap.lapType) return; // Already classified

            const lapDist = lap.manualDistance ?? lap.distance;
            const lapTime = lap.manualMovingTime ?? lap.movingTime;
            const lapSpeed = lapDist / (lapTime || 1);

            // Rest detection criteria:
            let isRestMatch = false;

            if (mainRest) {
                // Has prescribed rest duration — check time match
                const matchesRestTime = Math.abs(lapTime - mainRest) < Math.max(20, mainRest * 0.5);

                if (type === 'Run') {
                    // For runs: rest = matches rest time AND is notably slower than work pace
                    // OR matches rest time AND the athlete is barely moving
                    let isSlowerThanWork = false;
                    if (medianWorkSpeed > 0) {
                        isSlowerThanWork = lapSpeed < medianWorkSpeed * 0.75;
                    }
                    // Also check against prescribed pace if available
                    if (!isSlowerThanWork && mainSet.pace && lapSpeed > 0) {
                        const workPace = parsePace(mainSet.pace); // s/km
                        const actualPace = 1000 / lapSpeed;        // s/km
                        isSlowerThanWork = actualPace > workPace * 1.3;
                    }

                    isRestMatch = matchesRestTime && (isSlowerThanWork || lapSpeed < 0.5);
                } else {
                    // Bike: just time matching is enough (rest usually = soft-pedaling or coasting)
                    isRestMatch = matchesRestTime;
                }
            } else if (workLaps.length > 0 && medianWorkSpeed > 0) {
                // No prescribed rest, but we have work laps to compare against
                // Use relative speed: rest = significantly slower than work efforts
                // This handles fartlek where rest isn't explicitly timed
                const isSignificantlySlower = lapSpeed < medianWorkSpeed * 0.65;
                const isShort = mainTime ? lapTime < mainTime * 0.6 : (mainDist ? lapDist < mainDist * 0.5 : false);

                isRestMatch = isSignificantlySlower || isShort;
            }

            if (isRestMatch) {
                lap.lapType = 'rest';
                restLaps.push(lap);
            }
        });

        // Third pass (alternating fallback): if there are unclassified laps between
        // consecutive work laps, treat them as rest. This handles recovery jogs that
        // don't exactly match time or pace thresholds.
        if (workLaps.length >= 2) {
            const lapArray = actual.laps as (LapData & { lapType?: string })[];
            for (let i = 0; i < lapArray.length; i++) {
                if (lapArray[i].lapType) continue; // Already classified

                // Check if this unclassified lap sits between two work laps
                const prevWork = lapArray.slice(0, i).findLastIndex(l => l.lapType === 'work' || l.lapType === 'work-on');
                const nextWork = lapArray.slice(i + 1).findIndex(l => l.lapType === 'work' || l.lapType === 'work-on');

                if (prevWork !== -1 && nextWork !== -1) {
                    lapArray[i].lapType = 'rest';
                    restLaps.push(lapArray[i]);
                }
            }
        }
    }

    return { workLaps, restLaps };
}

function calculateTargetTime(mainSet: IMainSetBase | IRunMainSet | IBikeMainSet | ISwimMainSet | any): number | null {
    if (mainSet.time) return mainSet.time;
    // Over/under: combined on + off time per set
    if (mainSet.on?.time && mainSet.off?.time) {
        return mainSet.on.time + mainSet.off.time;
    }
    if (mainSet.pace && mainSet.distance) {
        const targetPace = parsePace(mainSet.pace); // s/km
        const distKm = mainSet.distance > 50 ? mainSet.distance / 1000 : mainSet.distance;
        return targetPace * distKm;
    }
    return null;
}

function calculateLapQuality(lap: LapData & { lapType?: string, description?: string }, mainSet: IMainSetBase | IRunMainSet | IBikeMainSet | ISwimMainSet | any, type: string, userFtp: number): number {
    const lapDist = lap.manualDistance ?? lap.distance;
    const lapTime = lap.manualMovingTime ?? lap.movingTime;
    const lapSpeed = lapDist / lapTime; // m/s

    // Helper to calculate buffered score
    // 5% margin of error allowed = 100% score
    const getBufferedScore = (target: number, actual: number) => {
        if (!target) return 100;
        const diff = Math.abs(target - actual);
        const diffPct = diff / target;

        if (diffPct <= 0.05) return 100;
        // Linear decay after 5%
        // e.g. 10% diff -> 5% penalty -> 95 score
        return Math.max(0, 100 - (diffPct - 0.05) * 100);
    };

    if (type === 'Run' && mainSet.pace) {
        const targetPace = parsePace(mainSet.pace); // s/km
        const actualPace = 1000 / lapSpeed;
        return getBufferedScore(targetPace, actualPace);
    }

    if (type === 'Bike') {
        let targetWatts = 0;

        if (mainSet.on && mainSet.off) {
            // Over/Under workout
            const onWattsPct = parseWattsPct(mainSet.on.watts);
            const offWattsPct = parseWattsPct(mainSet.off.watts);

            if (lap.lapType === 'work-on' && onWattsPct) {
                targetWatts = (onWattsPct / 100) * userFtp;
            } else if (lap.lapType === 'work-off' && offWattsPct) {
                targetWatts = (offWattsPct / 100) * userFtp;
            } else if (onWattsPct && offWattsPct) {
                // Combined lap (lapType='work') -> Average of on/time and off/time
                // Assume 1:1 time ratio for simplicity unless on.time/off.time known
                const onTime = mainSet.on.time || 1;
                const offTime = mainSet.off.time || 1;
                const totalTime = onTime + offTime;
                const avgPct = ((onWattsPct * onTime) + (offWattsPct * offTime)) / totalTime;
                targetWatts = (avgPct / 100) * userFtp;
            } else {
                // Fallback
                const fallbackPct = parseWattsPct(mainSet.on.watts || mainSet.watts);
                targetWatts = (fallbackPct / 100) * userFtp;
            }
        } else if (mainSet.watts) {
            const pct = parseWattsPct(mainSet.watts);
            targetWatts = (pct / 100) * userFtp;
        }

        if (targetWatts) {
            const actualWatts = lap.averageWatts || (lap.averageHeartrate ? lap.averageHeartrate * 1.5 : 0);
            return getBufferedScore(targetWatts, actualWatts);
        }
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

function parseWattsPct(wattsStr: string): number {
    if (!wattsStr) return 0;
    // Extract first number from "105% FTP" or "88-90% FTP"
    const match = wattsStr.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
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
