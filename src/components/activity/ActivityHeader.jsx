import React from 'react';
import { ChevronLeft, Calendar, Clock, MapPin } from 'lucide-react';
import Link from 'next/link';
import Metric from '@/components/ui/Metric';
import { cn } from '@/lib/utils';

const ActivityHeader = ({ activity, plannedWorkout, executionScore }) => {
    // Format helpers
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatDuration = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs}h ${mins}m ${secs}s`;
    };

    // Calculate intensity / TSS approximation if not available
    // (This is a simplified calculation for display)
    const intensity = activity.sufferScore || Math.round((activity.averageHeartrate || 130) * 0.5);

    return (
        <header className="space-y-6">
            <Link
                href="/"
                className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-bold"
            >
                <ChevronLeft className="w-4 h-4" /> Back to Dashboard
            </Link>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {formatDate(activity.startDate)}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {formatTime(activity.startDate)}</span>
                    </div>
                    <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">{activity.name}</h1>
                    <p className="text-slate-400 capitalize text-sm md:text-base">{activity.type} • {activity.sportType?.replace(/([A-Z])/g, ' $1').trim()}</p>
                </div>

                <div className="flex gap-2">
                    <div className="flex-1 bg-slate-900/50 px-4 py-2 rounded-xl border border-slate-800 text-center">
                        <p className="text-[10px] text-slate-500 font-bold uppercase">Suffer Score</p>
                        <p className={cn("text-xl font-bold", intensity > 100 ? "text-red-500" : "text-orange-400")}>
                            {activity.sufferScore || '--'}
                        </p>
                    </div>
                    <div className="flex-1 bg-slate-900/50 px-4 py-2 rounded-xl border border-slate-800 text-center">
                        <p className="text-[10px] text-slate-500 font-bold uppercase">Calories</p>
                        <p className="text-xl font-bold text-white">{activity.calories || '--'}</p>
                    </div>
                    {executionScore !== null && (
                        <div className="flex-1 bg-blue-500/10 px-4 py-2 rounded-xl border border-blue-500/20 text-center shadow-lg shadow-blue-500/5">
                            <p className="text-[10px] text-blue-400 font-bold uppercase">Exec. Score</p>
                            <p className="text-2xl font-mono font-bold text-blue-400">
                                {executionScore}%
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {plannedWorkout && (
                <div className="bg-slate-900/30 border border-slate-800/50 rounded-2xl p-4 flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Prescribed Workout</p>
                        <h3 className="text-white font-bold">{plannedWorkout.title}</h3>
                        <p className="text-xs text-slate-400">{plannedWorkout.description}</p>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-[#0f172a] p-4 rounded-2xl border border-slate-800">
                    <p className="text-slate-500 text-xs font-bold uppercase mb-1">Distance</p>
                    <p className="text-2xl font-bold text-white">
                        {activity.type === 'Swim'
                            ? (activity.manualDistance ?? activity.distance).toFixed(0)
                            : ((activity.manualDistance ?? activity.distance) / 1000).toFixed(2)
                        }
                        <span className="text-sm text-slate-500 ml-1">{activity.type === 'Swim' ? 'm' : 'km'}</span>
                    </p>
                </div>
                <div className="bg-[#0f172a] p-4 rounded-2xl border border-slate-800">
                    <p className="text-slate-500 text-xs font-bold uppercase mb-1">Moving Time</p>
                    <p className="text-2xl font-bold text-white">{formatDuration(activity.manualMovingTime ?? activity.movingTime)}</p>
                </div>
                <div className="bg-[#0f172a] p-4 rounded-2xl border border-slate-800">
                    <p className="text-slate-500 text-xs font-bold uppercase mb-1">Elevation</p>
                    <p className="text-2xl font-bold text-white">{activity.totalElevationGain}<span className="text-sm text-slate-500 ml-1">m</span></p>
                </div>
                <div className="bg-[#0f172a] p-4 rounded-2xl border border-slate-800">
                    <p className="text-slate-500 text-xs font-bold uppercase mb-1">Avg Speed</p>
                    <p className="text-2xl font-bold text-white">
                        {(() => {
                            const dist = activity.manualDistance ?? activity.distance;
                            const time = activity.manualMovingTime ?? activity.movingTime;
                            const speed = dist / time; // m/s

                            if (activity.type === 'Swim') {
                                const secondsPer100m = time / (dist / 100);
                                const mins = Math.floor(secondsPer100m / 60);
                                const secs = Math.floor(secondsPer100m % 60);
                                return `${mins}:${secs.toString().padStart(2, '0')}`;
                            }

                            return activity.type === 'Run'
                                ? `${Math.floor(1000 / speed / 60)}:${Math.floor((1000 / speed) % 60).toString().padStart(2, '0')}`
                                : (speed * 3.6).toFixed(1);
                        })()}
                        <span className="text-sm text-slate-500 ml-1">
                            {activity.type === 'Run' ? '/km' : activity.type === 'Swim' ? '/100m' : 'km/h'}
                        </span>
                    </p>
                </div>
            </div>
        </header>
    );
};

export default ActivityHeader;
