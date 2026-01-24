import { useMemo } from 'react';
import { weeklySchedule } from '@/data/mockData';

export const useMonthlyWorkouts = (date) => {
    // Helper: Get padded full month range (including days from prev/next months to fill rows)
    const getMonthRange = (inputDate) => {
        const year = inputDate.getFullYear();
        const month = inputDate.getMonth();

        // First day of the month
        const firstDayOfMonth = new Date(year, month, 1);
        // Last day of the month
        const lastDayOfMonth = new Date(year, month + 1, 0);

        // Calculate start date (Monday of the first week)
        const startDay = firstDayOfMonth.getDay(); // 0 is Sunday
        const diffToMon = startDay === 0 ? -6 : 1 - startDay;

        const startDate = new Date(firstDayOfMonth);
        startDate.setDate(firstDayOfMonth.getDate() + diffToMon);

        // Calculate end date (Sunday of the last week)
        const endDay = lastDayOfMonth.getDay();
        const diffToSun = endDay === 0 ? 0 : 7 - endDay;

        const endDate = new Date(lastDayOfMonth);
        endDate.setDate(lastDayOfMonth.getDate() + diffToSun);

        return { start: startDate, end: endDate };
    };

    const calendarGrid = useMemo(() => {
        if (!date) return [];

        // Parse input if string
        const d = typeof date === 'string' ? new Date(date) : date;
        // Normalize time
        d.setHours(12, 0, 0, 0);

        const { start, end } = getMonthRange(d);

        // Generate all days in the range
        const days = [];
        let current = new Date(start);
        const endValue = end.valueOf();

        while (current.valueOf() <= endValue) {
            const dateStr = current.toISOString().split('T')[0];
            const isToday = dateStr === new Date().toLocaleDateString('en-CA');
            const isCurrentMonth = current.getMonth() === d.getMonth();

            // Find workouts for this day
            const workouts = weeklySchedule.filter(w => w.fullDate === dateStr);

            days.push({
                date: new Date(current),
                dateStr,
                dayNum: current.getDate(),
                isToday,
                isCurrentMonth,
                workouts
            });

            current.setDate(current.getDate() + 1);
        }

        return days;
    }, [date]);

    return { calendarGrid, loading: false };
};
