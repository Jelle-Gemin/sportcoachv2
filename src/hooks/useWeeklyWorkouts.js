import { useState, useEffect, useMemo } from 'react';
import { weeklySchedule } from '@/data/mockData';

/**
 * Hook to get prescribed workouts for an entire week
 * @param {Date} date - Any date within the targeted week
 * @returns {Array} - Array of 7 workout objects (Mon-Sun)
 */
export const useWeeklyWorkouts = (date) => {
    const workouts = useMemo(() => {
        if (!date) return [];

        // Find the Monday of the week for the given date
        const targetDate = new Date(date);
        const day = targetDate.getDay(); // 0 is Sunday, 1 is Monday
        const diff = targetDate.getDate() - day + (day === 0 ? -6 : 1); // Adjust to get Monday
        const monday = new Date(targetDate.setDate(diff));
        monday.setHours(0, 0, 0, 0);

        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);
        sunday.setHours(23, 59, 59, 999);

        const now = new Date();
        const todayStr = now.toISOString().split('T')[0];

        // Filter activities that fall within this week and add isToday flag
        return weeklySchedule
            .filter(item => {
                const itemDate = new Date(item.fullDate);
                return itemDate >= monday && itemDate <= sunday;
            })
            .map(item => ({
                ...item,
                isToday: item.fullDate === todayStr
            }));
    }, [date]);

    return { workouts, loading: false };
};
