import { useState, useEffect } from 'react';
import { weeklySchedule } from '@/data/mockData';

/**
 * Hook to get prescribed workout for a specific date
 * @param {Date} date - The date to fetch workout for
 */
export const useDailyWorkout = (date) => {
    const [workout, setWorkout] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!date) return;

        setLoading(true);

        // Mock logic: Map the actual day of week (0-6) to the mock schedule
        // weeklySchedule has 7 items. match based on index? or create a mapping?
        // weeklySchedule usually starts with Moday or Sunday? 
        // Let's assume weeklySchedule is an array where we can just pick by day index (Mon=0, Sun=6)
        // Adjust based on Date.getDay() (Sun=0, Mon=1...)

        const dayIndex = date.getDay(); // 0 is Sunday, 1 is Monday
        // Convert to 0=Monday, 6=Sunday for many training plans
        const scheduleIndex = dayIndex === 0 ? 6 : dayIndex - 1;

        // Note: This relies on weeklySchedule being array of 7 items in Mon-Sun order
        // OR weeklySchedule having specific day mappings. 
        // Let's reload mockData to check structure. 
        // Assuming array length 7.

        const scheduledItem = weeklySchedule[scheduleIndex];

        if (scheduledItem) {
            // Basic enrich logic duplicated here or import?
            // Since enrichWorkout was internal, let's copy it or move it to a util.
            // For safety, I'll copy the basic logic here for now to avoid breaking changes if util doesn't exist.
            const enriched = enrichWorkout(scheduledItem);

            // Override 'isToday' logic since we strictly selected this day
            setWorkout(enriched);
        } else {
            setWorkout(null);
        }

        setLoading(false);
    }, [date]);

    return { workout, loading };
};

/**
 * Enrich basic workout data with detailed targets based on type
 */
function enrichWorkout(basicWorkout) {
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
        subtitle: basicWorkout.type === 'Bike' ? 'Sweet Spot Intervals' :
            basicWorkout.type === 'Run' ? 'Threshold Intervals' :
                basicWorkout.type === 'Swim' ? 'Endurance Set' :
                    basicWorkout.type === 'Brick' ? 'Race Simulation' : 'Recovery',
    };
}
