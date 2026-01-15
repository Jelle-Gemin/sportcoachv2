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
    if (!mainSet || !actual.laps || actual.laps.length === 0) {
        return calculateAggregateScore(planned, actual);
    }

    const { workLaps, restLaps } = identifyLaps(actual, mainSet, planned.type);

    let volumeScore = 0;
    let qualityScore = 0;
    let restScore = 100;

    // 1. Volume Score (40%)
    if (mainSet.sets) {
        volumeScore = Math.min(100, (workLaps.length / mainSet.sets) * 100);
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
    const restWeight = mainSet.rest ? 0.2 : 0;
    const workWeight = (1 - restWeight) / 2;

    return Math.round((volumeScore * workWeight) + (qualityScore * workWeight) + (restScore * restWeight));
}

/**
 * Identify which laps are "Work" and which are "Rest"
 * Enhanced for Swim and Run specifics
 */
function identifyLaps(actual, mainSet, type) {
    if (!actual.laps) return { workLaps: [], restLaps: [] };

    const targetDist = mainSet.distance ? (mainSet.distance < 50 ? mainSet.distance * 1000 : mainSet.distance) : null;
    const targetTime = calculateTargetTime(mainSet);
    const targetRest = mainSet.rest;

    const workLaps = [];
    const restLaps = [];

    actual.laps.forEach((lap, idx) => {
        const lapDist = lap.manualDistance ?? lap.distance;
        const lapTime = lap.manualMovingTime ?? lap.movingTime;
        const speed = lapDist / (lapTime || 1); // m/s

        // 1. Check if it's a Work Match
        let isWorkMatch = false;
        if (targetDist) {
            isWorkMatch = Math.abs(lapDist - targetDist) < (targetDist * 0.20);
        } else if (targetTime) {
            isWorkMatch = Math.abs(lapTime - targetTime) < (targetTime * 0.20);
        }

        if (isWorkMatch) {
            lap.lapType = 'work';
            workLaps.push(lap);
        } else if (targetRest) {
            // 2. Check if it's a Rest Match
            let isRestMatch = false;
            const matchesRestTime = Math.abs(lapTime - targetRest) < Math.max(20, targetRest * 0.5);

            if (type === 'Swim') {
                // In swim, a rest lap MUST have minimal distance (at the wall)
                isRestMatch = matchesRestTime && (lapDist < 15);
            } else if (type === 'Run') {
                // In run, recovery must be slow OR short distance
                let isMuchSlower = false;
                if (mainSet.pace && speed > 0) {
                    const workPace = parsePace(mainSet.pace);
                    const actualPace = 1000 / speed;
                    isMuchSlower = actualPace > (workPace * 1.5);
                }
                const isMinimalDist = lapDist < (targetDist * 0.4);
                isRestMatch = matchesRestTime && (isMinimalDist || isMuchSlower || speed < 0.5);
            } else {
                isRestMatch = matchesRestTime;
            }

            if (isRestMatch) {
                lap.lapType = 'rest';
                restLaps.push(lap);
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

    if (type === 'Swim' && mainSet.RPE) {
        return 100; // Hard to measure quality without pace analysis
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
