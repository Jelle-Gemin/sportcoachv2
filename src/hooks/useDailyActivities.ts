import { ActivityDocument } from '@/lib/models/activity';
import { useState, useEffect } from 'react';

/**
 * Hook to fetch activities for a specific date
 * @param {Date} date - The date to fetch activities for
 */
export const useDailyActivities = (date: Date) => {
    const [activities, setActivities] = useState<ActivityDocument[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [stravaId, setStravaId] = useState<string | null>(null);

    useEffect(() => {
        // Get stravaId from cookie or localStorage
        const getCookie = (name: string) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop()?.split(';').shift();
        };

        const idFromCookie = getCookie('stravaId');
        if (idFromCookie) {
            setStravaId(idFromCookie);
        } else {
            const storedId = localStorage.getItem('stravaId');
            if (storedId) setStravaId(storedId);
        }
    }, []);

    useEffect(() => {
        if (!stravaId || !date) {
            setLoading(false);
            return;
        }

        const fetchDailyActivities = async () => {
            try {
                setLoading(true);
                const dateStr = date.toISOString().split('T')[0];

                // If it's today, we might want to trigger a sync (optional, maybe controlled by a separate mechanism?)
                // For "today", we used to sync. Let's keep that logic only if date is today.
                const isToday = dateStr === new Date().toISOString().split('T')[0];

                if (isToday) {
                    await fetch('/api/activities/sync', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ stravaId, fullSync: false }),
                    });
                }

                const res = await fetch(`/api/activities/today?stravaId=${stravaId}&date=${dateStr}`);
                if (res.ok) {
                    const data = await res.json();
                    setActivities(data);
                } else {
                    throw new Error('Failed to fetch activities');
                }
            } catch (err: unknown) {
                console.error('Failed to fetch activities:', err);
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
                setActivities([]); // Clear on error
            } finally {
                setLoading(false);
            }
        };

        fetchDailyActivities();
    }, [stravaId, date]);

    return { activities, loading, error, isConnected: !!stravaId };
};
