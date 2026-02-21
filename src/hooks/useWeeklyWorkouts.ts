import { useMemo, useState, useEffect } from 'react';
import { weeklySchedule } from '@/data/mockData';

/**
 * Hook to get prescribed workouts for an entire week
 * @param {Date} date - Any date within the targeted week
 * @returns {Array} - Array of 7 workout objects (Mon-Sun)
 */
export const useWeeklyWorkouts = (date: Date) => {
    const [fetchedWorkouts, setFetchedWorkouts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Helper: Get Mon-Sun range for a given date
    const getWeekRange = (inputDate: Date) => {
        const d = new Date(inputDate);
        d.setHours(12, 0, 0, 0); // Normalize

        const day = d.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
        const diffToMon = day === 0 ? -6 : 1 - day;

        const monday = new Date(d);
        monday.setDate(d.getDate() + diffToMon);

        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);

        return { start: monday, end: sunday };
    }

    // Fetch real plan from API
    useEffect(() => {
        if (!date) return;

        const fetchPlan = async () => {
            setIsLoading(true);
            const { start, end } = getWeekRange(date);
            const startStr = start.toLocaleDateString('en-CA');
            const endStr = end.toLocaleDateString('en-CA');

            try {
                const res = await fetch(`/api/plan?start=${startStr}&end=${endStr}`);
                if (res.ok) {
                    const data = await res.json();
                    setFetchedWorkouts(data);
                }
            } catch (err) {
                console.error("Failed to fetch plan", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPlan();
    }, [date]);

    const workouts = useMemo(() => {
        if (!date) return [];

        const { start, end } = getWeekRange(date);
        const startStr = start.toLocaleDateString('en-CA');
        const endStr = end.toLocaleDateString('en-CA');
        const todayStr = new Date().toLocaleDateString('en-CA');

        // 1. Get Mock Data for this week
        const mockWeekWorkouts = weeklySchedule.filter(item =>
            item.fullDate >= startStr && item.fullDate <= endStr
        );

        // 2. Merge Strategies:
        // Real plan overrides Mock plan if present for the same day/type? 
        // Or simply: If we have ANY real data for this week, prefer it? 
        // Let's overlay real data on top of empty schedule, but if mock exists, maybe we should hide it if we have real data?
        // Current decision: Real Data > Mock Data. If real data exists for a day, use it.

        // Actually, simplest is: Use Fetched if available, else Mock.
        // But we might have a mix (old mock data + new generated data).

        const combined = [...mockWeekWorkouts];

        fetchedWorkouts.forEach(real => {
            // Check if we already have this workout from mock (duplicate check)
            const idx = combined.findIndex(m => m.fullDate === real.fullDate && m.type === real.type);
            if (idx >= 0) {
                combined[idx] = real; // Override
            } else {
                combined.push(real);
            }
        });

        // Filter again to be safe and sort
        return combined
            .filter(item => item.fullDate >= startStr && item.fullDate <= endStr)
            .sort((a, b) => a.fullDate.localeCompare(b.fullDate))
            .map((item: any) => ({
                ...item,
                isToday: item.fullDate === todayStr
            }));

    }, [date, fetchedWorkouts]);

    return { workouts, loading: isLoading };
};
