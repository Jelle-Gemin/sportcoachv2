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
                <div className="bg-[#0f172a] rounded-[2.5rem] border border-slate-800 p-12 text-center">
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
                <div className="bg-[#0f172a] rounded-[2.5rem] border border-slate-800 p-12 text-center">
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
            <div className="flex justify-between items-end">
                <h2 className={cn("text-lg font-bold flex items-center gap-2", styles.color)}>
                    {styles.icon} Today's Workout
                </h2>
                <span className={cn(
                    "px-3 py-1 text-xs font-bold rounded-full border",
                    styles.bgColor, styles.borderColor, styles.color
                )}>
                    PRESCRIBED
                </span>
            </div>

            <div className="bg-[#0f172a] rounded-[2.5rem] border border-slate-800 overflow-hidden shadow-2xl group transition-all hover:border-slate-700">
                {/* Intensity Profile Visual */}
                <div className="h-40 bg-slate-950 relative border-b border-slate-800/50">
                    <div className="absolute inset-0 p-8 flex justify-between items-start z-10">
                        <div className="space-y-1">
                            <p className={cn("text-[10px] font-bold uppercase tracking-widest", styles.color)}>
                                {workout.subtitle || workout.type}
                            </p>
                            <h3 className="text-2xl font-bold">{workout.title}</h3>
                        </div>
                        <div className="text-right">
                            <p className="text-xl font-bold">
                                {workout.duration / 60} <span className="text-xs font-normal text-slate-500">min</span>
                            </p>
                            <p className="text-[10px] font-bold text-slate-500 uppercase">
                                Est. TSS: {workout.tss || '--'}
                            </p>
                        </div>
                    </div>

                    {/* Workout Graph Representation */}
                    <div className="absolute bottom-0 left-0 right-0 h-24 flex items-end justify-between px-8 pb-4 opacity-40">
                        {intensityProfile.map((h, i) => (
                            <div
                                key={i}
                                className={cn(
                                    "w-full mx-0.5 rounded-t-sm transition-all duration-500",
                                    h > 80 ? styles.barColor : 'bg-slate-700'
                                )}
                                style={{ height: `${h}%` }}
                            />
                        ))}
                    </div>
                </div>

                <div className="p-8">
                    {/* Targets */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                        {workout.targetPower && (
                            <Metric label="Target Power" value={workout.targetPower} sub={workout.zone || 'TBD'} />
                        )}
                        {workout.targetPace && (
                            <Metric label="Target Pace" value={workout.targetPace} sub={workout.zone || 'TBD'} />
                        )}
                        {workout.targetCadence && (
                            <Metric label="Cadence" value={workout.targetCadence} sub={workout.type === 'Run' ? 'SPM' : 'RPM'} />
                        )}
                        {workout.targetRPE && (
                            <Metric label="Effort" value={workout.targetRPE} sub="RPE" />
                        )}
                    </div>

                    {/* Intervals */}
                    {workout.intervals && workout.intervals.length > 0 && (
                        <div className="space-y-4 mb-8">
                            {workout.intervals.map((interval, idx) => (
                                <div key={idx} className="flex items-center gap-4 group/item">
                                    <div className={cn(
                                        "w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-colors",
                                        interval.isMain
                                            ? cn(styles.bgColor, styles.borderColor, "border", styles.color)
                                            : "bg-slate-950 border border-slate-800 text-slate-500 group-hover/item:border-slate-600"
                                    )}>
                                        {interval.step}
                                    </div>
                                    <div className="flex-1">
                                        <p className={cn(
                                            "text-sm font-bold",
                                            interval.isMain ? "text-white" : "text-slate-300"
                                        )}>
                                            {interval.name}
                                        </p>
                                        <p className="text-xs text-slate-500">{interval.description}</p>
                                    </div>
                                    {interval.isMain && (
                                        <ChevronRight className={cn("w-5 h-5", styles.color)} />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex gap-4">
                        <button className="flex-1 bg-white text-slate-950 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors">
                            <Play className="w-4 h-4 fill-current" /> Push to Garmin
                        </button>
                        <button className="p-4 rounded-2xl bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-colors">
                            <ArrowUpRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkoutCard;
