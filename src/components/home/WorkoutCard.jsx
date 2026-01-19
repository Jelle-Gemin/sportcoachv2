import React from 'react';
import { Bike, Activity, Waves, Play, ArrowUpRight, ChevronRight, Calendar, Trophy, Dumbbell } from 'lucide-react';
import Metric from '../ui/Metric';
import { cn } from '@/lib/utils';

/**
 * Prescribed workout card component
 * Shows the planned workout for today with targets and intervals
 * 
 * @param {Object} props
 * @param {Object} props.workout - Workout data from useTodayWorkout hook
 */
const WorkoutCard = ({ workout }) => {
    // If no workout provided, show empty state
    if (!workout) {
        return (
            <div className="lg:col-span-2 space-y-4">
                <div className="flex justify-between items-end">
                    <h2 className="text-lg font-bold flex items-center gap-2 text-slate-500">
                        <Calendar className="w-5 h-5" /> Today's Workout
                    </h2>
                </div>
                <div className="bg-[#0f172a] rounded-[2.5rem] border border-slate-800 p-8 md:p-12 text-center">
                    <p className="text-slate-500 text-sm">No workout scheduled for today</p>
                </div>
            </div>
        );
    }

    // Rest day styling
    if (workout.type === 'Rest') {
        return (
            <div className="lg:col-span-2 space-y-4">
                <div className="flex justify-between items-end">
                    <h2 className="text-lg font-bold flex items-center gap-2 text-slate-400">
                        <Calendar className="w-5 h-5" /> Recovery Day
                    </h2>
                    <span className="px-3 py-1 bg-slate-500/20 text-slate-400 text-xs font-bold rounded-full border border-slate-500/30">
                        PRESCRIBED
                    </span>
                </div>
                <div className="bg-[#0f172a] rounded-[2.5rem] border border-slate-800 p-8 md:p-12 text-center">
                    <p className="text-slate-400 text-lg font-bold mb-2">{workout.title}</p>
                    <p className="text-slate-500 text-sm">{workout.description || 'Take it easy. Your body needs time to adapt.'}</p>
                </div>
            </div>
        );
    }

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
                    barColor: 'bg-emerald-500',
                };
            case 'Swim':
                return {
                    icon: <Waves className="w-5 h-5" />,
                    color: 'text-cyan-400',
                    bgColor: 'bg-cyan-500/10',
                    borderColor: 'border-cyan-500/30',
                    accentColor: '#06b6d4',
                    barColor: 'bg-cyan-500',
                };
            case 'Bike':
                return {
                    icon: <Bike className="w-5 h-5" />,
                    color: 'text-purple-400',
                    bgColor: 'bg-purple-500/10',
                    borderColor: 'border-purple-500/30',
                    accentColor: '#a855f7',
                    barColor: 'bg-purple-500',
                };
            case 'Brick':
                return {
                    icon: <Bike className="w-5 h-5" />,
                    color: 'text-orange-400',
                    bgColor: 'bg-orange-500/10',
                    borderColor: 'border-orange-500/30',
                    accentColor: '#f97316',
                    barColor: 'bg-orange-500',
                };
            case 'Strength':
                return {
                    icon: <Dumbbell className="w-5 h-5" />,
                    color: 'text-blue-400',
                    bgColor: 'bg-blue-500/10',
                    borderColor: 'border-blue-500/30',
                    accentColor: '#3b82f6',
                    barColor: 'bg-blue-500',
                };
            case 'Soccer':
                return {
                    icon: <Trophy className="w-5 h-5" />,
                    color: 'text-yellow-400',
                    bgColor: 'bg-yellow-500/10',
                    borderColor: 'border-yellow-500/30',
                    accentColor: '#eab308',
                    barColor: 'bg-yellow-500',
                };
            default:
                return {
                    icon: <Activity className="w-5 h-5" />,
                    color: 'text-slate-400',
                    bgColor: 'bg-slate-500/10',
                    borderColor: 'border-slate-500/30',
                    accentColor: '#94a3b8',
                    barColor: 'bg-slate-500',
                };
        }
    };

    const styles = getTypeStyles(workout.type);
    const intensityProfile = workout.intensityProfile || [15, 20, 25, 30, 85, 85, 40, 85, 85, 40, 85, 85, 30, 20];

    return (
        <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-sm font-bold flex items-center gap-2 text-slate-500 uppercase tracking-widest">
                    {styles.icon} Today's Workout
                </h2>
                <span className={cn(
                    "px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full",
                    styles.barColor, "text-white"
                )}>
                    Prescribed
                </span>
            </div>

            <div className="bg-[#0f172a] rounded-[2rem] overflow-hidden relative group">
                {/* Clean Header */}
                <div className="p-6 md:p-8 pb-0 flex justify-between items-start z-10 relative">
                    <div className="space-y-2 max-w-[70%]">
                        <p className={cn("text-xs font-black uppercase tracking-widest", styles.color)}>
                            {workout.subtitle || workout.type}
                        </p>
                        <h3 className="text-3xl md:text-4xl font-black text-white italic tracking-tight leading-none uppercase">
                            {workout.title}
                        </h3>
                    </div>
                    <div className="text-right">
                        <p className="text-3xl md:text-4xl font-black text-white leading-none">
                            {workout.duration / 60}
                        </p>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                            Minutes
                        </p>
                    </div>
                </div>

                {/* Simplified Graph */}
                <div className="h-32 mt-6 flex items-end justify-between px-6 md:px-8 gap-0.5 opacity-80">
                    {intensityProfile.map((h, i) => (
                        <div
                            key={i}
                            className={cn(
                                "w-full rounded-t-sm transition-all duration-500",
                                h > 80 ? styles.barColor : 'bg-slate-800'
                            )}
                            style={{ height: `${h}%` }}
                        />
                    ))}
                </div>

                <div className="p-6 md:p-8 bg-slate-900/30">
                    {/* Bold Targets */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        {workout.targetPower && (
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase font-bold text-slate-500 mb-1">Pwr</span>
                                <span className="text-xl font-black text-white">{workout.targetPower}</span>
                                <span className="text-xs font-bold text-slate-500">{workout.zone || 'Zone'}</span>
                            </div>
                        )}
                        {workout.targetPace && (
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase font-bold text-slate-500 mb-1">Pace</span>
                                <span className="text-xl font-black text-white">{workout.targetPace}</span>
                                <span className="text-xs font-bold text-slate-500">{workout.zone || 'Zone'}</span>
                            </div>
                        )}
                        {workout.targetCadence && (
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase font-bold text-slate-500 mb-1">Cadence</span>
                                <span className="text-xl font-black text-white">{workout.targetCadence}</span>
                                <span className="text-xs font-bold text-slate-500">{workout.type === 'Run' ? 'SPM' : 'RPM'}</span>
                            </div>
                        )}
                        {workout.targetRPE && (
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase font-bold text-slate-500 mb-1">Effort</span>
                                <span className="text-xl font-black text-white">{workout.targetRPE}</span>
                                <span className="text-xs font-bold text-slate-500">RPE</span>
                            </div>
                        )}
                    </div>

                    {/* Intervals Simplification (if huge list, maybe truncate or style minimally) */}
                    {workout.intervals && workout.intervals.length > 0 && (
                        <div className="space-y-3 mb-8">
                            {workout.intervals.slice(0, 3).map((interval, idx) => (
                                <div key={idx} className="flex items-center gap-4">
                                    <div className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs",
                                        interval.isMain ? cn(styles.barColor, "text-white") : "bg-slate-800 text-slate-400"
                                    )}>
                                        {interval.step}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold text-white leading-tight">
                                            {interval.name}
                                        </p>
                                        <p className="text-[10px] text-slate-500 uppercase font-bold">{interval.description}</p>
                                    </div>
                                </div>
                            ))}
                            {workout.intervals.length > 3 && (
                                <p className="text-xs font-bold text-slate-500 pl-12">
                                    + {workout.intervals.length - 3} more intervals
                                </p>
                            )}
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default WorkoutCard;
