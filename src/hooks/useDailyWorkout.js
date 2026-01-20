import { useMemo } from 'react';
import { weeklySchedule } from '@/data/mockData';

/**
 * Hook to get prescribed workout for a specific date
 * @param {Date} date - The date to fetch workout for
 */
export const useDailyWorkout = (date) => {
    const result = useMemo(() => {
        if (!date) return { workouts: [], loading: false };

        // Format selected date to match fullDate format (YYYY-MM-DD)
        const dateStr = date.toISOString().split('T')[0];

        // Filter all workouts for this specific date
        const dailyWorkouts = weeklySchedule.filter(w => w.fullDate === dateStr);

        if (dailyWorkouts.length > 0) {
            const enrichedWorkouts = dailyWorkouts.map(w => enrichWorkout(w));
            return { workouts: enrichedWorkouts, loading: false };
        }

        return { workouts: [], loading: false };
    }, [date]);

    return result;
};

/**
 * Enrich basic workout data with detailed targets based on type
 */
function enrichWorkout(basicWorkout) {
    const isSwim = basicWorkout.type === 'Swim';

    // Helper to format distance based on sport
    const formatDistString = (distInMeters) => {
        if (!distInMeters) return '';
        if (isSwim) return `${distInMeters}m`;
        return `${distInMeters / 1000}km`;
    };

    // If the workout already has a detailed 'workout' structure (from mockData.js)
    if (basicWorkout.workout) {
        const w = basicWorkout.workout;
        const intervals = [];
        let step = 1;

        // Map warmup
        if (w.warmup) {
            intervals.push({
                step: step++,
                name: 'Warm Up',
                description: w.warmup.description ||
                    (w.warmup.time ? `${w.warmup.time / 60}m warm up` :
                        (w.warmup.distance ? `${formatDistString(w.warmup.distance)} warm up` : 'Warm Up'))
            });
        }

        // Map drill
        if (w.drill) {
            intervals.push({
                step: step++,
                name: w.drill.drill || 'Drills',
                description: `${w.drill.sets ? w.drill.sets + 'x' : ''}${formatDistString(w.drill.distance)} ${w.drill.description || ''}`.trim()
            });
        }

        // Map main set
        if (w.main) {
            const mainDist = w.main.distance ? formatDistString(w.main.distance) : '';
            intervals.push({
                step: step++,
                name: w.main.description || `Main Set: ${w.main.sets ? w.main.sets + 'x' : ''}${mainDist || (w.main.time ? w.main.time / 60 + 'm' : '')}`,
                description: `${w.main.pace ? w.main.pace : (w.main.watts ? w.main.watts : '')} ${w.main.hr_zones ? 'HR: ' + w.main.hr_zones.join(', ') : ''}`.trim(),
                isMain: true
            });
        }

        // Map cool down
        if (w.coolDown) {
            intervals.push({
                step: step++,
                name: 'Cool Down',
                description: w.coolDown.description || (w.coolDown.time ? `${w.coolDown.time / 60}m cool down` : 'Cool Down')
            });
        }

        // If it's a strength session with exercises
        if (w.main && w.main.exercises) {
            w.main.exercises.forEach((ex, idx) => {
                intervals.push({
                    step: step++,
                    name: ex,
                    description: `Set ${idx + 1}`,
                    isMain: true
                });
            });
        }

        return {
            ...basicWorkout,
            targetPace: w.main?.pace,
            targetPower: w.main?.watts,
            targetRPE: w.main?.RPE ? `${w.main.RPE}/10` : undefined,
            intervals,
            intensityProfile: generateIntensityProfile(w),
            subtitle: basicWorkout.title
        };
    }

    const workoutTemplates = {
        Bike: {
            targetPower: '245W',
            targetCadence: '90',
            targetRPE: '7/10',
            duration: 75,
            tss: 68,
            zone: 'Z3/Z4',
            intervals: [
                { step: 1, name: 'Warm Up', description: '15m ramping from 140W to 190W' },
                { step: 2, name: 'Main Set: 3 x 12m Sweet Spot', description: '245W @ 90RPM. 4m recovery between sets.', isMain: true },
                { step: 3, name: 'Cool Down', description: '10m easy spin at 120W' },
            ],
            intensityProfile: [15, 20, 25, 30, 85, 85, 40, 85, 85, 40, 85, 85, 30, 20],
        },
        Run: {
            targetPace: '5:00/km',
            targetCadence: '180',
            targetRPE: '7/10',
            duration: 60,
            tss: 55,
            zone: 'Z3/Z4',
            intervals: [
                { step: 1, name: 'Warm Up', description: '15m easy jog with strides' },
                { step: 2, name: 'Main Set: 4 x 8m Threshold', description: '4:45/km pace. 3m recovery jog.', isMain: true },
                { step: 3, name: 'Cool Down', description: '10m easy jog' },
            ],
            intensityProfile: [15, 20, 25, 85, 40, 85, 40, 85, 40, 85, 30, 20],
        },
        Swim: {
            targetPace: '1:40/100m',
            targetRPE: '6/10',
            duration: 60,
            tss: 45,
            zone: 'Z2/Z3',
            intervals: [
                { step: 1, name: 'Warm Up', description: '400m mixed stroke' },
                { step: 2, name: 'Main Set: 10 x 100m', description: '1:40/100m pace. 20s rest.', isMain: true },
                { step: 3, name: 'Cool Down', description: '200m easy' },
            ],
            intensityProfile: [20, 30, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 25, 15],
        },
        Brick: {
            targetPower: '220W',
            targetPace: '5:15/km',
            targetRPE: '7/10',
            duration: 90,
            tss: 85,
            zone: 'Z2/Z3',
            intervals: [
                { step: 1, name: 'Bike: 60k', description: '220W steady state' },
                { step: 2, name: 'Transition', description: 'Quick change, 2min max', isTransition: true },
                { step: 3, name: 'Run: 5k', description: '5:15/km off the bike', isMain: true },
            ],
            intensityProfile: [20, 60, 60, 60, 60, 60, 60, 60, 60, 10, 70, 70, 70, 30],
        },
        Rest: {
            duration: 0,
            tss: 0,
            description: 'Active recovery or complete rest',
            intervals: [],
            intensityProfile: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
        },
    };

    const template = workoutTemplates[basicWorkout.type] || workoutTemplates.Rest;

    return {
        ...basicWorkout,
        ...template,
        subtitle: basicWorkout.subtitle || (
            basicWorkout.type === 'Bike' ? 'Sweet Spot Intervals' :
                basicWorkout.type === 'Run' ? 'Threshold Intervals' :
                    basicWorkout.type === 'Swim' ? 'Endurance Set' :
                        basicWorkout.type === 'Brick' ? 'Race Simulation' : 'Recovery'
        ),
    };
}

/**
 * Generate a visual intensity profile based on the workout structure
 */
function generateIntensityProfile(workout) {
    const profile = [];

    // Warmup (ascending)
    if (workout.warmup) {
        profile.push(20, 30, 40);
    }

    // Drill (mid intensity)
    if (workout.drill) {
        profile.push(45, 55, 45);
    }

    // Main Set (high or alternating)
    if (workout.main) {
        if (workout.main.sets && workout.main.sets > 1) {
            // Alternating spikes for interval sessions
            for (let i = 0; i < Math.min(workout.main.sets, 4); i++) {
                profile.push(85, 85, 40);
            }
        } else {
            // Steady state high intensity
            profile.push(75, 75, 75, 75, 75, 75);
        }
    }

    // Cool down (descending)
    if (workout.coolDown) {
        profile.push(40, 30, 20);
    }

    // Fallback if profile is too short or empty
    if (profile.length < 5) {
        return [15, 20, 25, 30, 40, 40, 40, 30, 20, 15];
    }

    return profile;
}
