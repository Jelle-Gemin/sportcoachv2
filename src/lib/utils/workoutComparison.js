/**
 * Calculation for execution score (0-100)
 * Compares prescribed metrics with actual metrics
 */
/**
 * Calculation for execution score (0-100)
 * Compares prescribed metrics with actual metrics, focusing on main sets
 */
export function calculateExecutionScore(planned, actual, userFtp) {
    if (!planned || !actual) return 0;
    if (planned.type === 'Rest') return actual.movingTime > 0 ? 50 : 100;

    const workout = planned.workout;
    const mainSet = workout?.main;

    // Use aggregate logic if no main set is defined or no laps available
    // For Swim, we might have drill sets even if main is simple, but typically structure exists.
    if (!mainSet || !actual.laps || actual.laps.length === 0) {
        return calculateAggregateScore(planned, actual);
    }

    const { workLaps, restLaps } = identifyLaps(actual, workout, planned.type);

    let volumeScore = 0;
    let qualityScore = 0;
    let restScore = 100;

    // 1. Volume Score (40%)
    if (mainSet.sets) {
        // For swim, 'workLaps' includes drill and main.
        // We need to compare against total expected sets (drill sets + main sets) or just main?
        // Current logic: volumeScore based on mainSet.sets.
        // If we want to include drills in volume, we should calculate total target sets.
        let targetSets = mainSet.sets;
        if (planned.type === 'Swim') {
            const drillSets = workout.drill?.sets || 0;
            targetSets += drillSets;
        }

        volumeScore = Math.min(100, (workLaps.length / targetSets) * 100);
    } else {
        const targetVolume = mainSet.distance || (mainSet.time ? mainSet.time / 60 : planned.duration);
        const actualVolume = actual.distance / 1000 || actual.movingTime / 60;
        volumeScore = Math.max(0, 100 - (Math.abs(targetVolume - actualVolume) / targetVolume) * 100);
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
        // For swim, identifying rest laps is trickier with mixed drill/main
        // We'll stick to basic logic for now or improve if needed.
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

            // Penalize if fewer rest laps found than expected (e.g. 4 work laps = 3 rests)
            const countCompliance = Math.min(1, restLaps.length / expectedRestCount);
            restScore = complianceScore * countCompliance;
        } else {
            restScore = 0;
        }
    }


    // Weighted average: Volume(40%), Quality(40%), Rest(20% if prescribed, else 0%)
    // SPECIAL WEIGHTS FOR SWIM: Volume 60%, Quality 40% (Rest omitted or rolled into volume)
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
 * Enhanced for Swim to distinguish drill, main, warmup, cooldown
 */
function identifyLaps(actual, workout, type) {
    if (!actual.laps) return { workLaps: [], restLaps: [] };

    const mainSet = workout.main || {};
    // Only separate drill/warmup/cooldown for Swim
    const isSwim = type === 'Swim';

    // Extract targets
    const mainDist = mainSet.distance ? (mainSet.distance < 50 ? mainSet.distance * 1000 : mainSet.distance) : null;
    const mainTime = calculateTargetTime(mainSet);
    const mainRest = mainSet.rest;

    // Swim specific targets
    const drillSet = workout.drill || {};
    const drillDist = drillSet.distance ? (drillSet.distance < 50 ? drillSet.distance * 1000 : drillSet.distance) : null;

    const warmupSet = workout.warmup || {};
    const warmupDist = warmupSet.distance ? (warmupSet.distance < 50 ? warmupSet.distance * 1000 : warmupSet.distance) : null;

    const coolDownSet = workout.coolDown || {};
    const coolDownDist = coolDownSet.distance ? (coolDownSet.distance < 50 ? coolDownSet.distance * 1000 : coolDownSet.distance) : null;


    const workLaps = [];
    const restLaps = [];

    actual.laps.forEach((lap) => {
        const lapDist = lap.manualDistance ?? lap.distance;
        const lapTime = lap.manualMovingTime ?? lap.movingTime;
        const speed = lapDist / (lapTime || 1); // m/s

        let matchFound = false;

        // --- SWIM SPECIFIC MATCHING ---
        if (isSwim) {
            // Tolerance (25%)
            const tolerance = 0.25;

            // 1. Check Warmup (usually first few laps, but we just check distance match for now)
            // Ideally we check order, but set matching is robust enough.
            if (warmupDist && !matchFound) {
                if (Math.abs(lapDist - warmupDist) < (warmupDist * tolerance)) {
                    lap.lapType = 'warmup';
                    matchFound = true;
                    // Warmup doesn't count as 'work' for intensity scoring usually, but maybe for volume?
                    // For now, let's NOT push to workLaps unless we want to score it. 
                    // Task says "Drill to Drill, Main to Main".
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



// This function is now replaced by identifyLaps


function calculateTargetTime(mainSet) {
    if (mainSet.time) return mainSet.time;
    if (mainSet.pace && mainSet.distance) {
        const targetPace = parsePace(mainSet.pace); // s/km
        // Convert distance to km if it's meters
        const distKm = mainSet.distance > 50 ? mainSet.distance / 1000 : mainSet.distance;
        return targetPace * distKm;
    }
    return null;
}

function calculateLapQuality(lap, mainSet, type, userFtp) {
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
        const actualWatts = lap.averageWatts || (lap.averageHeartrate * 1.5); // Fallback
        console.log("targetWatts", targetWatts);
        console.log("actualWatts", actualWatts);
        if (!targetWatts) return 100;
        return Math.max(0, 100 - (Math.abs(targetWatts - actualWatts) / targetWatts) * 100);
    }

    if (type === 'Swim') {
        // If it's a drill, skip strict pace comparison
        const isDrill = lap.lapType === 'drill' || lap.description?.toLowerCase().includes('drill') || mainSet.description?.toLowerCase().includes('drill');

        if (mainSet.pace) {
            const targetPace = parsePace(mainSet.pace); // s/100m
            const actualPace = (100 / lapSpeed); // s/100m

            // Lenient buffer for swimming: ±15s per 100m
            const buffer = isDrill ? 30 : 15;
            const diff = Math.abs(targetPace - actualPace);

            if (diff <= buffer) return 100;
            return Math.max(0, 100 - ((diff - buffer) / targetPace) * 100);
        }

        if (mainSet.RPE) {
            // Check HR to ensure effort was made (> 100bpm or > 60% of estimated max)
            if (lap.averageHeartrate && lap.averageHeartrate < 100) {
                return 75; // Penalize slightly if HR is very low for an RPE session
            }
            return 100;
        }

        return 100;
    }

    return 100;
}

function calculateAggregateScore(planned, actual) {
    // Original logic as fallback
    let totalScore = 0;
    const actualMinutes = actual.movingTime / 60;
    const durDiff = Math.abs(planned.duration - actualMinutes);
    totalScore += Math.max(0, 100 - (durDiff / planned.duration) * 100) * 0.5;
    totalScore += calculateIntensityScore(planned, actual) * 0.5;
    return Math.round(totalScore);
}

function calculateIntensityScore(planned, actual) {
    const plannedTSS = planned.tss || (planned.duration * 0.8 / 60);
    const actualTSS = actual.sufferScore || (actual.movingTime / 60 * 0.7);
    const diff = Math.abs(plannedTSS - actualTSS);
    return Math.max(0, 100 - (diff / Math.max(1, plannedTSS)) * 100);
}

function parsePace(paceStr) {
    if (!paceStr || typeof paceStr !== 'string') return 300;
    const parts = paceStr.split(':');
    if (parts.length !== 2) return 300;
    return parseInt(parts[0]) * 60 + parseInt(parts[1]);
}

/**
 * Find matching planned workout for an actual activity
 */
export function findMatchingPlannedWorkout(schedule, actual) {
    if (!schedule || !actual) return null;

    const actualDate = new Date(actual.startDate).toISOString().split('T')[0];
    const typeMap = {
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
        (item.type === 'Brick' && (actualType === 'Bike' || actualType === 'Run'))
    );

    return typeMatch || dateMatches[0];
}
