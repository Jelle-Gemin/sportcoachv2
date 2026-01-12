"use client";

import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import WeeklyRibbon from '@/components/home/WeeklyRibbon';
import InsightBanner from '@/components/home/InsightBanner';
import WorkoutCard from '@/components/home/WorkoutCard';
import TodayActivityCard from '@/components/home/TodayActivityCard';
import ExecutionScore from '@/components/home/ExecutionScore';
import { useActivities } from '@/hooks/useActivities';
import { useDailyActivities } from '@/hooks/useDailyActivities';
import { useDailyWorkout } from '@/hooks/useDailyWorkout';
import { useWeeklyWorkouts } from '@/hooks/useWeeklyWorkouts';

export default function Home() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Fetch overall activities for the ribbon (uses existing hook logic)
    const { activities, loading: activitiesLoading, syncStatus, isConnected } = useActivities();

    // Fetch weekly workouts for the ribbon icons
    const { workouts: weeklyWorkouts } = useWeeklyWorkouts(selectedDate);

    // Fetch specific date data using new daily hooks
    const { activities: dailyActivities, loading: dailyLoading } = useDailyActivities(selectedDate);
    const { workout, loading: workoutLoading } = useDailyWorkout(selectedDate);

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
            <header className="px-6 py-8 flex justify-between items-center">
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

            <div className="px-6 max-w-7xl mx-auto space-y-8">
                <WeeklyRibbon
                    activities={activities}
                    prescribedWorkouts={weeklyWorkouts}
                    selectedDate={selectedDate}
                    onDateSelect={setSelectedDate}
                />

                {isToday && <InsightBanner />}

                {/* Daily Content Section */}
                <div className="space-y-6">
                    {/* Prescribed Workout */}
                    {!workoutLoading && workout && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <WorkoutCard workout={workout} />
                            <ExecutionScore />
                        </div>
                    )}

                    {/* Completed Activities for Selected Date */}
                    {!dailyLoading && dailyActivities && dailyActivities.length > 0 && (
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                                {isToday ? "Today's Completed Activities" : `Activities for ${selectedDate.toLocaleDateString('en-US', { weekday: 'short' })}`}
                            </h3>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
                                {dailyActivities.map((activity) => (
                                    <TodayActivityCard key={activity.stravaId} activity={activity} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Empty state when no prescribed workout AND no activity */}
                    {!workoutLoading && !workout && (!dailyActivities || dailyActivities.length === 0) && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
                            <WorkoutCard workout={null} />
                            <div className="lg:col-span-1 bg-[#0f172a] rounded-[2.5rem] border border-slate-800 p-8 flex items-center justify-center text-center">
                                <p className="text-slate-500">No data for this day.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
