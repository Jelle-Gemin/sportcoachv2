"use client";

import React from 'react';
import { Bell } from 'lucide-react';
import WeeklyRibbon from '@/components/home/WeeklyRibbon';
import InsightBanner from '@/components/home/InsightBanner';
import WorkoutCard from '@/components/home/WorkoutCard';
import ExecutionScore from '@/components/home/ExecutionScore';
import { useActivities } from '@/hooks/useActivities';

export default function Home() {
    const { activities, loading, syncStatus, isConnected } = useActivities();

    return (
        <>
            {/* Header */}
            <header className="px-6 py-8 flex justify-between items-center">
                <div>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Thursday, Jan 15</p>
                    <h1 className="text-2xl font-bold">Ready to push, Athlete?</h1>
                </div>
                {!isConnected ? (
                    <a href="/api/auth/strava" className="px-4 py-2 bg-[#fc4c02] text-white text-sm font-bold rounded-lg hover:bg-[#e34402] transition-colors">
                        Connect Strava
                    </a>
                ) : (
                    <div className="flex gap-2">
                        {syncStatus === 'syncing' && (
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
                <WeeklyRibbon activities={activities} />
                <InsightBanner />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
                    <WorkoutCard />
                    <ExecutionScore />
                </div>
            </div>
        </>
    );
}
