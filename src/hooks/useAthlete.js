import { useState, useEffect } from 'react';

/**
 * Hook to fetch athlete profile data (biometrics, zones, etc.)
 */
export const useAthlete = () => {
    const [athlete, setAthlete] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
            } catch (err) {
                console.error('Error fetching athlete profile:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchAthlete();
    }, []);

    return { athlete, loading, error };
};
