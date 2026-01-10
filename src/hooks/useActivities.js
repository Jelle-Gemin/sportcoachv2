import { useState, useEffect } from 'react';

export const useActivities = () => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [syncStatus, setSyncStatus] = useState(null);
    const [stravaId, setStravaId] = useState(null);

    useEffect(() => {
        // Function to get cookie by name
        const getCookie = (name) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        };

        const idFromCookie = getCookie('stravaId');

        if (idFromCookie) {
            setStravaId(idFromCookie);
            localStorage.setItem('stravaId', idFromCookie);
        } else {
            // Fallback to local storage for backward compatibility during transition
            const storedId = localStorage.getItem('stravaId');
            if (storedId) setStravaId(storedId);
        }
    }, []);

    useEffect(() => {
        if (!stravaId) {
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                const res = await fetch(`/api/activities?stravaId=${stravaId}`);
                if (res.ok) {
                    const data = await res.json();
                    setActivities(data);
                }

                const statusRes = await fetch(`/api/activities/status?stravaId=${stravaId}`);
                if (statusRes.ok) {
                    const statusData = await statusRes.json();
                    setSyncStatus(statusData.status);
                }
            } catch (err) {
                console.error('Failed to fetch activities', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        // Poll for status if syncing
        const interval = setInterval(() => {
            fetchData();
        }, 5000);

        return () => clearInterval(interval);
    }, [stravaId]);

    return { activities, loading, syncStatus, isConnected: !!stravaId };
};
