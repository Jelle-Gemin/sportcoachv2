import React from 'react';
import { ArrowLeft, Check, Calendar, Trophy, Zap, Clock, Activity, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ITrainingPlanResponse } from '@/lib/models/trainingPlan';
import Card from '@/components/ui/Card';
import { AnyWorkout, WorkoutType } from '@/lib/models/workout';

// Mapping style based on the strict literal type from the interface
const WORKOUT_STYLES: Partial<Record<WorkoutType, string>> = {
    Run: "bg-amber-500/10 text-amber-500",
    Bike: "bg-blue-500/10 text-blue-500",
    Swim: "bg-cyan-500/10 text-cyan-500",
    Strength: "bg-purple-500/10 text-purple-500",
    Soccer: "bg-emerald-500/10 text-emerald-500",
    Brick: "bg-red-500/10 text-red-500",
    Rest: "bg-slate-800/50 text-slate-500",
};

interface PlanPreviewProps {
    plan: ITrainingPlanResponse;
    onConfirm: () => void;
    onCancel: () => void;
    isSaving: boolean;
}

export function PlanPreview({ plan, onConfirm, onCancel, isSaving }: PlanPreviewProps) {
    const workouts: AnyWorkout[] = React.useMemo(() => plan.workouts || [], [plan.workouts]);
    const { planTitle, planDescription, predictedRaceTimes } = plan;
    const [expandedWorkout, setExpandedWorkout] = React.useState<number | null>(null);

    // Group workouts by week
    const workoutsByWeek = React.useMemo(() => {
        const groups: Record<number, AnyWorkout[]> = {};
        if (workouts.length === 0) return groups;

        // Find the Monday of the first workout's week
        const firstWorkoutDate = new Date(workouts[0].fullDate);
        const day = firstWorkoutDate.getDay(); // 0 is Sunday, 1 is Monday...
        const diff = (day === 0 ? 6 : day - 1); // Days since Monday (0 if Monday)
        const startOfFirstWeek = new Date(firstWorkoutDate);
        startOfFirstWeek.setDate(firstWorkoutDate.getDate() - diff);
        startOfFirstWeek.setHours(0, 0, 0, 0);

        workouts.forEach((w) => {
            const currentDate = new Date(w.fullDate);
            currentDate.setHours(0, 0, 0, 0);
            const msDiff = currentDate.getTime() - startOfFirstWeek.getTime();
            const daysFromStart = Math.floor(msDiff / (1000 * 60 * 60 * 24));
            const weekNum = Math.floor(daysFromStart / 7) + 1;

            if (!groups[weekNum]) groups[weekNum] = [];
            groups[weekNum].push(w);
        });
        return groups;
    }, [workouts]);

    const formatSeconds = (s: number) => {
        if (!s) return '0:00';
        const hrs = Math.floor(s / 3600);
        const mins = Math.floor((s % 3600) / 60);
        const secs = s % 60;
        if (hrs > 0) return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium">
                    <SparklesIcon className="w-4 h-4 text-indigo-400" />
                    <span>AI Optimized Plan</span>
                </div>
                <h2 className="text-3xl font-bold text-white tracking-tight">{planTitle}</h2>
                <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
                    {planDescription}
                </p>

                {/* Predicted Race Times if available */}
                {predictedRaceTimes && predictedRaceTimes.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-3 mt-6">
                        {predictedRaceTimes.map((rt, i) => (
                            <Card key={i} className="px-4 py-3 bg-slate-900/40 border-slate-800/60 backdrop-blur-sm flex items-center gap-3 ring-1 ring-white/5">
                                <Trophy className="w-5 h-5 text-amber-500" />
                                <div className="text-left">
                                    <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{rt.raceTitle || rt.raceType}</p>
                                    <p className="text-white font-mono font-bold text-sm tracking-tighter">{rt.estimatedTimeMin} - {rt.estimatedTimeMax}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            {/* Plan Content */}
            <div className="space-y-6">
                <div className="flex items-center justify-between px-2">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-indigo-400" />
                        Schedule Preview
                    </h3>
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="text-sm font-medium text-slate-500 bg-slate-900/50 px-3 py-1.5 rounded-xl border border-slate-800">
                            Planned Weeks: <span className="text-white font-mono font-bold">{Object.keys(workoutsByWeek).length}</span>
                        </div>
                        <div className="text-sm font-medium text-slate-500 bg-slate-900/50 px-3 py-1.5 rounded-xl border border-slate-800">
                            Total Sessions: <span className="text-white font-mono font-bold">{workouts.length}</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-10 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                    {Object.entries(workoutsByWeek).map(([week, weekWorkouts]) => (
                        <div key={week} className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500" style={{ animationDelay: `${Number(week) * 100}ms` }}>
                            <div className="flex items-center gap-4">
                                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-slate-800" />
                                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Week {week}</h4>
                                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-slate-800" />
                            </div>
                            <div className="grid gap-3">
                                {weekWorkouts.map((workout, idx) => {
                                    const overallIdx = (Number(week) - 1) * 7 + idx;
                                    const isExpanded = expandedWorkout === overallIdx;
                                    const hasDetails = (workout as any).workout;

                                    return (
                                        <Card
                                            key={idx}
                                            className={cn(
                                                "group overflow-hidden bg-slate-950/40 border-slate-800/50 hover:border-slate-700 transition-all cursor-pointer",
                                                isExpanded && "ring-1 ring-indigo-500/30 bg-slate-900/40"
                                            )}
                                            onClick={() => setExpandedWorkout(isExpanded ? null : overallIdx)}
                                        >
                                            <div className="p-4 flex items-center gap-4">
                                                <div className={cn(
                                                    "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-inner transition-transform group-hover:scale-105",
                                                    WORKOUT_STYLES[workout.type as WorkoutType] || "bg-slate-800 text-slate-400"
                                                )}>
                                                    <Activity className="w-6 h-6" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between mb-0.5">
                                                        <h5 className="font-bold text-white text-base truncate group-hover:text-indigo-300 transition-colors">{workout.title}</h5>
                                                        <span className="text-[10px] font-mono font-bold text-slate-400 flex items-center gap-1.5 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                                                            <Clock className="w-3 h-3" />
                                                            {formatSeconds(workout.duration)}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-slate-400 line-clamp-1">{workout.description}</p>
                                                </div>
                                                {hasDetails && (
                                                    <div className="text-slate-600 group-hover:text-slate-400 transition-colors px-1">
                                                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Detailed Blocks */}
                                            {isExpanded && hasDetails && (
                                                <div className="px-4 pb-4 pt-0 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                                                    <div className="h-px bg-slate-800/50 w-full mb-3" />

                                                    {/* Description Expansion */}
                                                    <div className="text-xs text-slate-300 leading-relaxed bg-slate-950/30 p-3 rounded-xl border border-slate-800/30">
                                                        <span className="text-[10px] font-black uppercase text-indigo-400 tracking-widest block mb-1">Prescription</span>
                                                        {workout.description}
                                                    </div>

                                                    {/* Warmup / Main / CoolDown */}
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-[10px]">
                                                        {(workout as any).workout.warmup && (
                                                            <div className="bg-amber-500/5 border border-amber-500/10 p-2.5 rounded-xl">
                                                                <span className="font-black uppercase text-amber-500/60 block mb-1 tracking-wider">Warmup</span>
                                                                <p className="text-slate-300 line-clamp-2">{(workout as any).workout.warmup.description || '-'}</p>
                                                                <div className="mt-1 text-amber-500/80 font-mono">{(workout as any).workout.warmup.time ? formatSeconds((workout as any).workout.warmup.time) : (workout as any).workout.warmup.distance ? `${(workout as any).workout.warmup.distance}m` : ''}</div>
                                                            </div>
                                                        )}
                                                        {(workout as any).workout.main && (
                                                            <div className="bg-indigo-500/5 border border-indigo-500/10 p-2.5 rounded-xl md:col-span-1">
                                                                <span className="font-black uppercase text-indigo-400/60 block mb-1 tracking-wider">Main Set</span>
                                                                {(workout as any).workout.main.on ? (
                                                                    <div className="space-y-1.5">
                                                                        <div className="flex items-center justify-between text-[9px] text-slate-400 uppercase font-black">
                                                                            <span>{(workout as any).workout.main.sets} sets</span>
                                                                            <span>Rest: {(workout as any).workout.main.rest}s</span>
                                                                        </div>
                                                                        <div className="space-y-1">
                                                                            <div className="flex items-center gap-2 bg-indigo-500/10 p-1.5 rounded-lg border border-indigo-500/20">
                                                                                <div className="w-1 h-1 rounded-full bg-red-400 animate-pulse" />
                                                                                <span className="font-bold text-slate-200">On: {formatSeconds((workout as any).workout.main.on.time)} @ {(workout as any).workout.main.on.watts}</span>
                                                                            </div>
                                                                            <div className="flex items-center gap-2 bg-slate-500/5 p-1.5 rounded-lg border border-slate-500/10">
                                                                                <div className="w-1 h-1 rounded-full bg-blue-400" />
                                                                                <span className="font-medium text-slate-400">Off: {formatSeconds((workout as any).workout.main.off.time)} @ {(workout as any).workout.main.off.watts}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    <>
                                                                        <p className="text-slate-200 line-clamp-3">{(workout as any).workout.main.description || '-'}</p>
                                                                        <div className="mt-1 flex gap-2 font-mono text-indigo-300">
                                                                            {(workout as any).workout.main.distance && <span>{(workout as any).workout.main.distance}m</span>}
                                                                            {(workout as any).workout.main.pace && <span>@ {(workout as any).workout.main.pace}</span>}
                                                                            {(workout as any).workout.main.watts && <span>@ {(workout as any).workout.main.watts}</span>}
                                                                            {(workout as any).workout.main.sets && <span>x{(workout as any).workout.main.sets}</span>}
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </div>
                                                        )}
                                                        {(workout as any).workout.coolDown && (
                                                            <div className="bg-blue-500/5 border border-blue-500/10 p-2.5 rounded-xl">
                                                                <span className="font-black uppercase text-blue-500/60 block mb-1 tracking-wider">CoolDown</span>
                                                                <p className="text-slate-300 line-clamp-2">{(workout as any).workout.coolDown.description || '-'}</p>
                                                                <div className="mt-1 text-blue-500/80 font-mono">{(workout as any).workout.coolDown.time ? formatSeconds((workout as any).workout.coolDown.time) : (workout as any).workout.coolDown.distance ? `${(workout as any).workout.coolDown.distance}m` : ''}</div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </Card>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Actions */}
            <div className="sticky bottom-4 pt-6 pb-2 px-2 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent flex flex-col md:flex-row items-center justify-between gap-4">
                <button
                    onClick={onCancel}
                    disabled={isSaving}
                    className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-2xl font-bold transition-all order-2 md:order-1"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Adjust Settings
                </button>

                <button
                    onClick={onConfirm}
                    disabled={isSaving}
                    className="w-full md:w-auto flex items-center justify-center gap-2 px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black shadow-[0_0_30px_-10px_rgba(79,70,229,0.5)] transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-75 disabled:cursor-wait order-1 md:order-2"
                >
                    {isSaving ? (
                        <div className="flex items-center gap-3">
                            <span className="w-5 h-5 border-2 border-indigo-200 border-t-transparent rounded-full animate-spin" />
                            Activating...
                        </div>
                    ) : (
                        <>
                            <Check className="w-5 h-5" />
                            Confirm & Activate Plan
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}

function SparklesIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
            <path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" />
        </svg>
    );
}
