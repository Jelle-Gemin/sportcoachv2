import { useState, useEffect } from 'react';
import { weeklySchedule } from '@/data/mockData';

/**
 * Hook to get today's prescribed workout from mock data
 * In the future, this will fetch from the workout planning API
 */
export const useTodayWorkout = () => {
    const [workout, setWorkout] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get today's date info
        const today = new Date();
        const todayStr = today.toISOString().split('T')[0]; // YYYY-MM-DD

        // Find today's workout from weekly schedule
        // For now, we'll use the mock data and find the "isToday" entry
        const todayWorkout = weeklySchedule.find(w => w.isToday);

        if (todayWorkout) {
            // Enrich with more workout details based on type
            const enrichedWorkout = enrichWorkout(todayWorkout);
            setWorkout(enrichedWorkout);
        }

        setLoading(false);
    }, []);

    return { workout, loading };
};

/**
 * Enrich basic workout data with detailed targets based on type
 */
function enrichWorkout(basicWorkout) {
    // Default workout structures for different types
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
