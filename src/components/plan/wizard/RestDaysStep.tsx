import React from 'react';
import { useFormContext } from 'react-hook-form';
import { CalendarOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IPlanGenerationMetadata } from '@/lib/models/trainingPlan';

const DAYS = [
    { name: 'Monday', short: 'Mon' },
    { name: 'Tuesday', short: 'Tue' },
    { name: 'Wednesday', short: 'Wed' },
    { name: 'Thursday', short: 'Thu' },
    { name: 'Friday', short: 'Fri' },
    { name: 'Saturday', short: 'Sat' },
    { name: 'Sunday', short: 'Sun' },
];

export function RestDaysStep() {
    const { watch, setValue } = useFormContext<IPlanGenerationMetadata>();
    const restDays = watch('mandatoryRestDays') || [];

    const toggleDay = (dayIndex: number) => {
        if (restDays.includes(dayIndex)) {
            setValue('mandatoryRestDays', restDays.filter(d => d !== dayIndex));
        } else {
            setValue('mandatoryRestDays', [...restDays, dayIndex]);
        }
    };

    return (
        <div className="space-y-8 animate-in slide-in-from-right duration-500">
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-white">Blocked Days</h2>
                <p className="text-slate-400">Are there any days you absolutely cannot train? (Rest Days)</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {DAYS.map((day, idx) => {
                    const isSelected = restDays.includes(idx);
                    return (
                        <div
                            key={day.name}
                            onClick={() => toggleDay(idx)}
                            className={cn(
                                "cursor-pointer rounded-2xl border-2 p-4 flex flex-col items-center gap-2 transition-all relative overflow-hidden",
                                isSelected
                                    ? "bg-slate-100 border-slate-300 text-slate-900 opacity-80"
                                    : "bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700 hover:bg-slate-800"
                            )}
                        >
                            <span className="text-sm font-bold uppercase tracking-wider">{day.short}</span>

                            <div className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                                isSelected ? "bg-red-500 text-white" : "bg-slate-800 text-green-500/50"
                            )}>
                                {isSelected ? (
                                    <CalendarOff className="w-5 h-5" />
                                ) : (
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                )}
                            </div>

                            {isSelected && (
                                <div className="absolute inset-0 bg-stripe-pattern opacity-10 pointer-events-none" />
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 text-center max-w-2xl mx-auto">
                <p className="text-sm text-slate-400">
                    If you don't select any days, the AI will intelligently schedule rest days based on load.
                    <br />
                    <span className="text-slate-500 text-xs italic">Only select days here if you physically cannot train (e.g. busy work day).</span>
                </p>
            </div>
        </div>
    );
}
