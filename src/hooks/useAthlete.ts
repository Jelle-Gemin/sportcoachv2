import { useState, useEffect } from 'react';
import { AthleteDocument } from '@/lib/models/athlete';

/**
 * Hook to fetch athlete profile data (biometrics, zones, etc.)
 */
export const useAthlete = () => {
    const [athlete, setAthlete] = useState<AthleteDocument | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchAthlete() {
            try {
                const res = await fetch('/api/athlete/profile');
                if (!res.ok) {
                    if (res.status === 401) {
                        setError('Not authenticated');
                    } else {
                        throw new Error('Failed to fetch athlete profile');
                    }
                    return;
                }
                const data = await res.json();
                setAthlete(data);
            } catch (err: unknown) {
                console.error('Error fetching athlete profile:', err);
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        }

        fetchAthlete();
    }, []);

    return { athlete, loading, error };
};
