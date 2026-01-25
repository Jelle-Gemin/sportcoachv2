import { useMemo } from 'react';
import { weeklySchedule } from '@/data/mockData';

/**
 * Hook to get prescribed workouts for an entire week
 * @param {Date} date - Any date within the targeted week
 * @returns {Array} - Array of 7 workout objects (Mon-Sun)
 */
export const useWeeklyWorkouts = (date: Date) => {
    // Suppress hydration mismatch by only calculating on client or ensuring consistent server timezone
    // But better: use pure string logic for "days".

    // Helper: Get Mon-Sun range for a given date
    const getWeekRange = (inputDate: Date) => {
        const d = new Date(inputDate);
        // Normalize to noon to avoid DST/midnight shifts
        d.setHours(12, 0, 0, 0);

        const day = d.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
        const diffToMon = day === 0 ? -6 : 1 - day;

        const monday = new Date(d);
        monday.setDate(d.getDate() + diffToMon);

        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);

        return { start: monday, end: sunday };
    }

    const workouts = useMemo(() => {
        if (!date) return [];

        const { start, end } = getWeekRange(date);

        // Convert range to YYYY-MM-DD strings for comparison
        const startStr = start.toLocaleDateString('en-CA');
        const endStr = end.toLocaleDateString('en-CA');

        const now = new Date();
        const todayStr = now.toLocaleDateString('en-CA');

        // Filter activities that fall within this week
        const weekWorkouts = weeklySchedule
            .filter(item => {
                return item.fullDate >= startStr && item.fullDate <= endStr;
            })
            .map((item: any) => ({
                ...item,
                isToday: item.fullDate === todayStr
            }));

        return weekWorkouts;
    }, [date]);

    return { workouts, loading: false };
};
