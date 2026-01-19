import React from 'react';
import Link from 'next/link';
import { Activity, Waves, Bike, CheckCircle, Clock, Zap, Heart, ArrowUpRight } from 'lucide-react';
import Metric from '../ui/Metric';
import { cn } from '@/lib/utils';

/**
 * Card component for displaying a completed activity from Strava
 */
const TodayActivityCard = ({ activity }) => {
    if (!activity) return null;

    // Get sport-specific styling
    const getTypeStyles = (type) => {
        switch (type) {
            case 'Run':
                return {
                    icon: <Activity className="w-5 h-5" />,
                    color: 'text-emerald-400',
                    bgColor: 'bg-emerald-500/10',
                    borderColor: 'border-emerald-500/30',
                    accentColor: '#22c55e',
                };
            case 'Swim':
                return {
                    icon: <Waves className="w-5 h-5" />,
                    color: 'text-cyan-400',
                    bgColor: 'bg-cyan-500/10',
                    borderColor: 'border-cyan-500/30',
                    accentColor: '#06b6d4',
                };
            case 'Ride':
            case 'VirtualRide':
                return {
                    icon: <Bike className="w-5 h-5" />,
                    color: 'text-purple-400',
                    bgColor: 'bg-purple-500/10',
                    borderColor: 'border-purple-500/30',
                    accentColor: '#a855f7',
                };
            default:
                return {
                    icon: <Activity className="w-5 h-5" />,
                    color: 'text-blue-400',
                    bgColor: 'bg-blue-500/10',
                    borderColor: 'border-blue-500/30',
                    accentColor: '#3b82f6',
                };
        }
    };

    const styles = getTypeStyles(activity.type);

    // Format helpers
    const formatDuration = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        if (hrs > 0) return `${hrs}h ${mins}m`;
        return `${mins}m ${secs}s`;
    };

    const formatDistance = (meters) => {
        const km = meters / 1000;
        return km < 10 ? km.toFixed(2) : km.toFixed(1);
    };

    const formatPace = (speed) => {
        if (!speed || speed === 0) return '--:--';
        const paceSecsPerKm = 1000 / speed;
        const mins = Math.floor(paceSecsPerKm / 60);
        const secs = Math.floor(paceSecsPerKm % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const formatSpeed = (metersPerSec) => {
        if (!metersPerSec) return '--';
        return (metersPerSec * 3.6).toFixed(1); // km/h
    };

    return (
        <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center">
                <h2 className={cn("text-sm font-bold flex items-center gap-2 uppercase tracking-widest", styles.color)}>
                    {styles.icon} Completed
                </h2>
                <span className="px-3 py-1 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> DONE
                </span>
            </div>

            <div className={cn(
                "rounded-[2rem] overflow-hidden shadow-xl transition-all relative group",
                styles.bgColor // Subtle tint background
            )}>
                {/* Clean Header */}
                <div className="p-6 md:p-8 pb-4 flex justify-between items-start z-10 relative">
                    <div className="space-y-2 max-w-[70%]">
                        <p className={cn("text-xs font-black uppercase tracking-widest", styles.color)}>
                            {activity.type}
                        </p>
                        <h3 className="text-2xl md:text-3xl font-black text-white italic tracking-tight leading-none uppercase">
                            {activity.name}
                        </h3>
                    </div>
                    <div className="text-right">
                        <p className="text-3xl md:text-4xl font-black text-white leading-none">
                            {formatDuration(activity.manualMovingTime ?? activity.movingTime).split(/[hm]/)[0]}
                        </p>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                            {formatDuration(activity.manualMovingTime ?? activity.movingTime).includes('h') ? 'Hours' : 'Minutes'}
                        </p>
                    </div>
                </div>

                <div className="p-5 md:p-8 pt-2">
                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 mt-4">
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase font-bold text-slate-500 mb-1">Distance</span>
                            <span className="text-xl font-black text-white">{formatDistance(activity.manualDistance ?? activity.distance)}</span>
                            <span className="text-xs font-bold text-slate-500">km</span>
                        </div>
                        {activity.type === 'Run' ? (
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase font-bold text-slate-500 mb-1">Pace</span>
                                <span className="text-xl font-black text-white">{formatPace(activity.averageSpeed)}</span>
                                <span className="text-xs font-bold text-slate-500">/km</span>
                            </div>
                        ) : (
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase font-bold text-slate-500 mb-1">Speed</span>
                                <span className="text-xl font-black text-white">{formatSpeed(activity.averageSpeed)}</span>
                                <span className="text-xs font-bold text-slate-500">km/h</span>
                            </div>
                        )}
                        {activity.averageHeartrate && (
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase font-bold text-slate-500 mb-1">Avg HR</span>
                                <span className="text-xl font-black text-white">{Math.round(activity.averageHeartrate)}</span>
                                <span className="text-xs font-bold text-slate-500">bpm</span>
                            </div>
                        )}
                        {activity.averageWatts && (
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase font-bold text-slate-500 mb-1">Power</span>
                                <span className="text-xl font-black text-white">{Math.round(activity.averageWatts)}</span>
                                <span className="text-xs font-bold text-slate-500">W</span>
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4">
                        <Link
                            href={`/activities/${activity.stravaId}?returnDate=${new Date(activity.startDate).toISOString().split('T')[0]}`}
                            className={cn(
                                "flex-1 py-4 rounded-xl font-black uppercase tracking-wider text-sm flex items-center justify-center gap-2 transition-colors border-2",
                                styles.borderColor, styles.color, "hover:bg-white/5"
                            )}
                        >
                            View Analysis <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TodayActivityCard;
