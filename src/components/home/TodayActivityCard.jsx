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
            <div className="flex justify-between items-end">
                <h2 className={cn("text-lg font-bold flex items-center gap-2", styles.color)}>
                    {styles.icon} Completed Activity
                </h2>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> DONE
                </span>
            </div>

            <div className={cn(
                "bg-[#0f172a] rounded-[2.5rem] border overflow-hidden shadow-2xl transition-all hover:border-slate-700",
                styles.borderColor
            )}>
                {/* Activity Header */}
                <div className={cn("h-32 relative border-b border-slate-800/50", styles.bgColor)}>
                    <div className="absolute inset-0 p-8 flex justify-between items-start z-10">
                        <div className="space-y-1">
                            <p className={cn("text-[10px] font-bold uppercase tracking-widest", styles.color)}>
                                {activity.type}
                            </p>
                            <h3 className="text-2xl font-bold text-white">{activity.name}</h3>
                        </div>
                        <div className="text-right">
                            <p className="text-xl font-bold text-white">
                                {formatDuration(activity.movingTime)}
                            </p>
                            <p className="text-[10px] font-bold text-slate-500 uppercase">
                                {new Date(activity.startDate).toLocaleTimeString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-8">
                    {/* Metrics Grid */}
                    <div className="grid grid-cols-4 gap-4 mb-8">
                        <Metric
                            label="Distance"
                            value={`${formatDistance(activity.distance)}`}
                            sub="km"
                        />
                        {activity.type === 'Run' ? (
                            <Metric
                                label="Avg Pace"
                                value={formatPace(activity.averageSpeed)}
                                sub="/km"
                            />
                        ) : (
                            <Metric
                                label="Avg Speed"
                                value={formatSpeed(activity.averageSpeed)}
                                sub="km/h"
                            />
                        )}
                        {activity.averageHeartrate && (
                            <Metric
                                label="Avg HR"
                                value={Math.round(activity.averageHeartrate)}
                                sub="bpm"
                            />
                        )}
                        {activity.averageWatts && (
                            <Metric
                                label="Avg Power"
                                value={Math.round(activity.averageWatts)}
                                sub="W"
                            />
                        )}
                        {!activity.averageHeartrate && !activity.averageWatts && (
                            <Metric
                                label="Elevation"
                                value={Math.round(activity.totalElevationGain || 0)}
                                sub="m"
                            />
                        )}
                    </div>

                    {/* Lap Summary (if available) */}
                    {activity.laps && activity.laps.length > 1 && (
                        <div className="mb-8">
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                                Lap Splits
                            </p>
                            <div className="flex gap-2 overflow-x-auto pb-2">
                                {activity.laps.slice(0, 6).map((lap, idx) => (
                                    <div key={idx} className="flex-shrink-0 bg-slate-950/50 px-3 py-2 rounded-xl border border-slate-800/50">
                                        <p className="text-[9px] font-bold text-slate-600 uppercase">Lap {idx + 1}</p>
                                        <p className="text-sm font-bold text-white">
                                            {activity.type === 'Run'
                                                ? formatPace(lap.averageSpeed)
                                                : formatDuration(lap.movingTime)
                                            }
                                        </p>
                                    </div>
                                ))}
                                {activity.laps.length > 6 && (
                                    <div className="flex-shrink-0 bg-slate-950/50 px-3 py-2 rounded-xl border border-slate-800/50 flex items-center">
                                        <p className="text-xs text-slate-500">+{activity.laps.length - 6} more</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-4">
                        <Link
                            href={`/activities/${activity.stravaId}`}
                            className={cn(
                                "flex-1 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-colors",
                                styles.bgColor, styles.borderColor, "border", styles.color,
                                "hover:opacity-80"
                            )}
                        >
                            <ArrowUpRight className="w-4 h-4" /> View Details
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TodayActivityCard;
