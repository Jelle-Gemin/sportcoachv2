"use client";

import React, { Suspense } from 'react';
import { Bell } from 'lucide-react';
import WeeklyRibbon from '@/components/home/WeeklyRibbon';
import WorkoutCard from '@/components/home/WorkoutCard';
import TodayActivityCard from '@/components/home/TodayActivityCard';
import { useActivities } from '@/hooks/useActivities';
import { useDailyActivities } from '@/hooks/useDailyActivities';
import { useDailyWorkout } from '@/hooks/useDailyWorkout';
import { useWeeklyWorkouts } from '@/hooks/useWeeklyWorkouts';
import { findMatchingPlannedWorkout } from '@/lib/utils/workoutComparison';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

function HomeLoading() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
    );
}

export default function Home() {
    return (
        <Suspense fallback={<HomeLoading />}>
            <HomeContent />
        </Suspense>
    );
}

function HomeContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    // Initialize date from URL or default to today
    const [selectedDate, setSelectedDate] = React.useState(() => {
        const dateParam = searchParams.get('date');
        if (dateParam) {
            const parsed = new Date(dateParam);
            if (!isNaN(parsed.getTime())) return parsed;
        }
        return new Date();
    });

    // Update URL when date changes
    React.useEffect(() => {
        const dateStr = selectedDate.toISOString().split('T')[0];
        const current = new Date(searchParams.get('date') || new Date()).toISOString().split('T')[0];

        if (dateStr !== current) {
            const params = new URLSearchParams(searchParams.toString());
            params.set('date', dateStr);
            router.replace(`${pathname}?${params.toString()}`, { scroll: false });
        }
    }, [selectedDate, pathname, router, searchParams]);

    // Fetch overall activities for the ribbon (uses existing hook logic)
    const { activities, syncStatus, isConnected } = useActivities();

    // Fetch weekly workouts for the ribbon icons
    const { workouts: weeklyWorkouts } = useWeeklyWorkouts(selectedDate);

    // Fetch specific date data using new daily hooks
    const { activities: dailyActivities, loading: dailyLoading } = useDailyActivities(selectedDate);
    const { workouts, loading: workoutLoading } = useDailyWorkout(selectedDate);

    // Sort completed activities to match the order of prescribed workouts
    const sortedActivities = React.useMemo<any[]>(() => {
        if (!dailyActivities || dailyActivities.length === 0) return [];
        if (!workouts || workouts.length === 0) return dailyActivities;

        return [...dailyActivities].sort((a: any, b: any) => {
            const plannedA = findMatchingPlannedWorkout(workouts, a);
            const plannedB = findMatchingPlannedWorkout(workouts, b);

            const indexA = plannedA ? workouts.indexOf(plannedA) : Infinity;
            const indexB = plannedB ? workouts.indexOf(plannedB) : Infinity;

            return indexA - indexB;
        });
    }, [dailyActivities, workouts]);

    // Format header date
    const dateString = selectedDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric'
    });

    const isToday = selectedDate.toDateString() === new Date().toDateString();

    // Get greeting based on time (only if today, otherwise just "Viewing")
    const getGreeting = () => {
        if (!isToday) return `Viewing ${dateString}`;
        const hour = new Date().getHours();
        return hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
    };

    return (
        <>
            {/* Header */}
            <header className="px-4 md:px-6 py-8 flex justify-between items-center">
                <div>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">
                        {isToday ? "Today's Focus" : "Archive View"}
                    </p>
                    <h1 className="text-2xl font-bold">
                        {isToday ? `${getGreeting()}, Athlete!` : dateString}
                    </h1>
                </div>
                {!isConnected ? (
                    <a href="/api/auth/strava" className="px-4 py-2 bg-[#fc4c02] text-white text-sm font-bold rounded-lg hover:bg-[#e34402] transition-colors">
                        Connect Strava
                    </a>
                ) : (
                    <div className="flex gap-2">
                        {(syncStatus === 'syncing' || dailyLoading) && (
                            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold rounded-full animate-pulse">
                                Syncing...
                            </span>
                        )}
                        <button className="relative p-2.5 rounded-xl bg-[#0f172a] border border-slate-800 hover:border-slate-700 transition-colors">
                            <Bell className="w-5 h-5 text-slate-400" />
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#ef4444] rounded-full border-2 border-[#0f172a]"></span>
                        </button>
                    </div>
                )}
            </header>

            <div className="px-4 md:px-6 max-w-7xl mx-auto space-y-6 md:space-y-8">
                <WeeklyRibbon
                    activities={activities}
                    prescribedWorkouts={weeklyWorkouts}
                    selectedDate={selectedDate}
                    onDateSelect={setSelectedDate}
                />

                {/* {isToday && <InsightBanner />} */}

                {/* Daily Content Section */}
                < div className="space-y-6">
                    {/* Prescribed Workout(s) */}
                    {!workoutLoading && workouts && workouts.length > 0 && (
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                                {isToday ? "Planned Workouts" : `Planned for ${selectedDate.toLocaleDateString('en-US', { weekday: 'short' })}`}
                            </h3>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {workouts.map((w: any, idx: number) => (
                                    <React.Fragment key={`${w.fullDate}-${w.type}-${idx}`}>
                                        <WorkoutCard workout={w} />
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Completed Activities for Selected Date */}
                    {!dailyLoading && sortedActivities && sortedActivities.length > 0 && (
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                                {isToday ? "Today's Completed Activities" : `Activities for ${selectedDate.toLocaleDateString('en-US', { weekday: 'short' })}`}
                            </h3>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
                                {sortedActivities.map((activity: any) => (
                                    <TodayActivityCard key={activity.stravaId} activity={activity} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Empty state when no prescribed workout AND no activity */}
                    {!workoutLoading && workouts.length === 0 && (!dailyActivities || dailyActivities.length === 0) && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
                            <WorkoutCard workout={null} />
                            <div className="lg:col-span-1 bg-[#0f172a] rounded-[2.5rem] border border-slate-800 p-8 flex items-center justify-center text-center">
                                <p className="text-slate-500">No data for this day.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div >
        </>
    );
}
