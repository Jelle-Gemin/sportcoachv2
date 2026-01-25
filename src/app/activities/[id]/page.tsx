"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { weeklySchedule } from '@/data/mockData';
import { calculateExecutionScore, findMatchingPlannedWorkout } from '@/lib/utils/workoutComparison';
import { useAthlete } from '@/hooks/useAthlete';
import { ActivityDocument } from '@/lib/models/activity';
import { AnyWorkout } from '@/lib/models/workout';
import ActivityHeader from '@/components/activity/ActivityHeader';
import ActivityCharts from '@/components/activity/ActivityCharts';
import ActivityLaps from '@/components/activity/ActivityLaps';
import ActivityActuals from '@/components/activity/ActivityActuals';

export default function ActivityDetails() {
    const params = useParams();
    const router = useRouter();
    const { athlete } = useAthlete();
    const { id } = params;

    const [activity, setActivity] = useState<ActivityDocument | null>(null);
    const [plannedWorkout, setPlannedWorkout] = useState<AnyWorkout | null>(null);
    const [executionScore, setExecutionScore] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const activityId = Array.isArray(id) ? id[0] : id;

        const fetchActivity = async () => {
            try {
                const res = await fetch(`/api/activities/${activityId}`);

                if (!res.ok) {
                    if (res.status === 404) {
                        setError('Activity not found');
                    } else {
                        throw new Error('Failed to fetch activity');
                    }
                    return;
                }

                const data = await res.json();
                setActivity(data);
            } catch (err: any) {
                console.error(err);
                setError(err.message || 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchActivity();
    }, [id]);

    // Recalculate score when activity or athlete data changes
    useEffect(() => {
        if (activity) {
            const match = findMatchingPlannedWorkout(weeklySchedule, activity);
            setPlannedWorkout(match);

            if (match && athlete?.biometrics) {
                const score = calculateExecutionScore(match, activity, athlete.biometrics.ftp);
                setExecutionScore(score);
            }
        }
    }, [activity, athlete]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-slate-400 font-bold animate-pulse">Loading Activity...</p>
                </div>
            </div>
        );
    }

    if (error || !activity) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6">
                <div className="max-w-md w-full bg-[#0f172a] p-8 rounded-3xl border border-slate-800 text-center">
                    <h2 className="text-xl font-bold text-red-400 mb-2">Error</h2>
                    <p className="text-slate-500 mb-6">{error || 'Activity not found'}</p>
                    <button
                        onClick={() => router.push('/')}
                        className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-colors"
                    >
                        Return to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-20">
            <div className="max-w-7xl mx-auto px-6 py-8 space-y-10">
                <ActivityHeader
                    activity={activity}
                    plannedWorkout={plannedWorkout}
                    executionScore={executionScore}
                />
                <ActivityActuals activity={activity} onUpdate={setActivity} />

                <div className="space-y-8">
                    <section>
                        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Performance Charts</h2>
                        <ActivityCharts streams={activity.streams || {}} type={activity.type} />
                    </section>

                    <section>
                        <ActivityLaps activity={activity} onUpdate={setActivity} />
                    </section>
                </div>
            </div>
        </div>
    );
}
