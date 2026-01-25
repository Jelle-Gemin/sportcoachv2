import { useState, useEffect, useRef } from 'react';
import { ActivityDocument } from '@/lib/models/activity';

type SyncStatus = 'syncing' | 'complete' | 'rate_limited' | 'error' | null;

export const useActivities = () => {
    const [activities, setActivities] = useState<ActivityDocument[]>([]);
    const [loading, setLoading] = useState(true);
    const [syncStatus, setSyncStatus] = useState<SyncStatus>(null);
    const [stravaId, setStravaId] = useState<string | null>(null);

    // Use ref to track if sync is running to prevent double-firing updates
    const isSyncing = useRef(false);

    useEffect(() => {
        // Function to get cookie by name
        const getCookie = (name: string): string | undefined => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) {
                const popped = parts.pop();
                return popped ? popped.split(';').shift() : undefined;
            }
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

        // Fetch activities from DB to show immediately what we have
        const fetchLocalData = async () => {
            try {
                const res = await fetch(`/api/activities?stravaId=${stravaId}`);
                if (res.ok) {
                    const data = await res.json();
                    setActivities(data);
                }
            } catch (err) {
                console.error('Failed to fetch local activities', err);
            } finally {
                setLoading(false);
            }
        };

        fetchLocalData();

        // Start Smart Sync Loop
        const triggerSmartSync = async () => {
            // Prevent overlapping syncs
            if (isSyncing.current) return;
            isSyncing.current = true;
            setSyncStatus('syncing');

            try {
                let complete = false;

                // Keep looping until 'complete' (or user leaves page)
                while (!complete) {
                    const res = await fetch('/api/activities/sync', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ stravaId, fullSync: true }),
                    });

                    const data = await res.json();

                    if (res.status === 429 || data.status === 'rate_limited') {
                        setSyncStatus('rate_limited');
                        // Do NOT set complete=true. Wait and retry.
                        const waitSeconds = data.retryAfter || 60 * 15; // Default 15 mins
                        console.log(`Rate limit hit. Waiting ${waitSeconds}s before retrying...`);

                        // Simple wait
                        await new Promise(r => setTimeout(r, waitSeconds * 1000));

                        // After waiting, loop continues and tries FETCH again
                        setSyncStatus('syncing');
                    } else if (data.status === 'complete') {
                        complete = true;
                        setSyncStatus('complete');
                        await fetchLocalData();
                    } else if (data.status === 'partial') {
                        // More to fetch! Wait a tiny bit then loop again
                        await fetchLocalData();
                        await new Promise(r => setTimeout(r, 2000)); // 2s delay
                    } else {
                        // Unknown status or error
                        complete = true; // Stop on unknown error to avoid infinite loop of death
                        setSyncStatus('error');
                    }
                }
            } catch (err) {
                console.error('Smart sync failed:', err);
                setSyncStatus('error');
            } finally {
                isSyncing.current = false;
            }
        };

        triggerSmartSync();

    }, [stravaId]);

    return { activities, loading, syncStatus, isConnected: !!stravaId };
};
