import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Layers } from 'lucide-react';
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

export function DoubleTrainingStep() {
    const { watch, setValue } = useFormContext<IPlanGenerationMetadata>();
    const doubleDays = watch('doubleTrainingDays') || [];

    const toggleDay = (dayIndex: number) => {
        if (doubleDays.includes(dayIndex)) {
            setValue('doubleTrainingDays', doubleDays.filter(d => d !== dayIndex));
        } else {
            setValue('doubleTrainingDays', [...doubleDays, dayIndex]);
        }
    };

    return (
        <div className="space-y-8 animate-in slide-in-from-right duration-500">
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-white">Double Days</h2>
                <p className="text-slate-400">On which days can you handle two workouts (e.g., morning run + evening swim)?</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {DAYS.map((day, idx) => {
                    const isSelected = doubleDays.includes(idx);
                    return (
                        <div
                            key={day.name}
                            onClick={() => toggleDay(idx)}
                            className={cn(
                                "cursor-pointer rounded-2xl border-2 p-4 flex flex-col items-center gap-2 transition-all relative overflow-hidden",
                                isSelected
                                    ? "bg-indigo-600/20 border-indigo-600 text-white"
                                    : "bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700 hover:bg-slate-800"
                            )}
                        >
                            <span className="text-sm font-bold uppercase tracking-wider">{day.short}</span>

                            <div className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                                isSelected ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30" : "bg-slate-800 text-slate-600"
                            )}>
                                {isSelected ? (
                                    <span className="font-black text-lg">2x</span>
                                ) : (
                                    <span className="font-bold text-sm">1x</span>
                                )}
                            </div>

                            {isSelected && (
                                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex items-start gap-3 max-w-2xl mx-auto">
                <Layers className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-400">
                    Selecting days here allows the AI to stack workouts (like a Brick or Swim+Gym) when optimal. We won't force double days unless necessary for your volume goals.
                </p>
            </div>
        </div>
    );
}
