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

        // For now, since we only have one mock week, we just return the weeklySchedule.
        // In a real app, this would fetch from an API for the specific week.

        // We ensure the return is exactly 7 items and we might eventually 
        // need to map them to specific dates if the mock data becomes date-aware.
        return weeklySchedule;
    }, [date]);

    return { workouts, loading: false };
};
