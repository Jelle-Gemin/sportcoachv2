import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Trophy, Dumbbell } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IPlanGenerationMetadata } from '@/lib/models/trainingPlan';
import Card from '@/components/ui/Card';

export function TrainingFocusStep({ seasonGoals }: { seasonGoals: any[] }) {
    const { watch, setValue } = useFormContext<IPlanGenerationMetadata>();
    const trainingFocus = watch('trainingFocus');
    const selectedRaceIds = watch('targetRaceIds') || [];

    const toggleRace = (raceId: string) => {
        const current = selectedRaceIds;
        if (current.includes(raceId)) {
            setValue('targetRaceIds', current.filter(id => id !== raceId));
        } else {
            setValue('targetRaceIds', [...current, raceId]);
        }
    };

    return (
        <div className="space-y-6 animate-in slide-in-from-right duration-500">
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-white">What is your primary training focus?</h2>
                <p className="text-slate-400">We'll tailor the plan intensity and phases based on this goal.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Race Focus Option */}
                <div
                    onClick={() => setValue('trainingFocus', 'race')}
                    className={cn(
                        "cursor-pointer p-6 rounded-2xl border-2 transition-all hover:bg-slate-800/50 flex flex-col items-center gap-4 text-center",
                        trainingFocus === 'race'
                            ? "bg-indigo-600/10 border-indigo-600 shadow-[0_0_20px_rgba(79,70,229,0.2)]"
                            : "bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700"
                    )}
                >
                    <div className={cn("p-4 rounded-full", trainingFocus === 'race' ? "bg-indigo-600 text-white" : "bg-slate-800")}>
                        <Trophy className="w-8 h-8" />
                    </div>
                    <div>
                        <h3 className={cn("text-lg font-bold", trainingFocus === 'race' ? "text-white" : "text-slate-300")}>Race Preparation</h3>
                        <p className="text-sm text-slate-500 mt-1">Specific preparation for upcoming events with tapering & peaking.</p>
                    </div>
                </div>

                {/* General Fitness Option */}
                <div
                    onClick={() => setValue('trainingFocus', 'general')}
                    className={cn(
                        "cursor-pointer p-6 rounded-2xl border-2 transition-all hover:bg-slate-800/50 flex flex-col items-center gap-4 text-center",
                        trainingFocus === 'general'
                            ? "bg-emerald-600/10 border-emerald-600 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                            : "bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700"
                    )}
                >
                    <div className={cn("p-4 rounded-full", trainingFocus === 'general' ? "bg-emerald-600 text-white" : "bg-slate-800")}>
                        <Dumbbell className="w-8 h-8" />
                    </div>
                    <div>
                        <h3 className={cn("text-lg font-bold", trainingFocus === 'general' ? "text-white" : "text-slate-300")}>General Fitness</h3>
                        <p className="text-sm text-slate-500 mt-1">Focus on sustainable improvement, consistency, and overall health.</p>
                    </div>
                </div>
            </div>

            {/* Race Selection (if Race Focus) */}
            {trainingFocus === 'race' && (
                <div className="mt-8 space-y-4 animate-in fade-in slide-in-from-bottom-4">
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Select Goal Races</h3>
                    {(!seasonGoals || seasonGoals.length === 0) ? (
                        <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl text-orange-400 text-sm text-center">
                            No races found in your profile. You can proceed, but adding races in your profile is recommended for better tapering.
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {seasonGoals.map((race, idx) => {
                                const isSelected = selectedRaceIds.includes(race.id || `${race.title}-${race.date}`);
                                return (
                                    <Card
                                        key={idx}
                                        onClick={() => toggleRace(race.id || `${race.title}-${race.date}`)}
                                        className={cn(
                                            "p-4 cursor-pointer transition-colors flex items-center justify-between group",
                                            isSelected ? "border-indigo-500 bg-indigo-500/5" : "hover:border-slate-700 bg-slate-900"
                                        )}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={cn(
                                                "w-5 h-5 rounded border flex items-center justify-center transition-colors",
                                                isSelected ? "bg-indigo-600 border-indigo-600" : "border-slate-600"
                                            )}>
                                                {isSelected && <Trophy className="w-3 h-3 text-white" />}
                                            </div>
                                            <div>
                                                <h4 className={cn("font-bold", isSelected ? "text-white" : "text-slate-300")}>{race.title}</h4>
                                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                                    <span>{race.date}</span>
                                                    <span>•</span>
                                                    <span className={cn(
                                                        "px-1.5 py-0.5 rounded border text-[10px]",
                                                        race.priority === 'A' ? "bg-red-500/10 border-red-500/20 text-red-400" :
                                                            race.priority === 'B' ? "bg-blue-500/10 border-blue-500/20 text-blue-400" :
                                                                "bg-slate-800 text-slate-400"
                                                    )}>{race.priority}-Race</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                )
                            })}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
