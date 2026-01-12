import { useState, useEffect } from 'react';

/**
 * Hook to fetch today's completed activities from the database
 * Also triggers a sync if activities are stale
 */
export const useTodayActivities = () => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [stravaId, setStravaId] = useState(null);

    useEffect(() => {
        // Get stravaId from cookie or localStorage
        const getCookie = (name) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
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
        if (!stravaId) {
            setLoading(false);
            return;
        }

        const fetchTodayActivities = async () => {
            try {
                setLoading(true);

                // First, trigger a sync to get latest activities
                await fetch('/api/activities/sync', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ stravaId, fullSync: false }),
                });

                // Then fetch today's activities from DB
                const res = await fetch(`/api/activities/today?stravaId=${stravaId}`);
                if (res.ok) {
                    const data = await res.json();
                    setActivities(data);
                } else {
                    throw new Error('Failed to fetch activities');
                }
            } catch (err) {
                console.error('Failed to fetch today\'s activities:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTodayActivities();
    }, [stravaId]);

    return { activities, loading, error, isConnected: !!stravaId };
};
