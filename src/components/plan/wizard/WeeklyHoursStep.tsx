import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Clock } from 'lucide-react';
import { IPlanGenerationMetadata } from '@/lib/models/trainingPlan';

export function WeeklyHoursStep() {
    const { register, watch } = useFormContext<IPlanGenerationMetadata>();
    const hours = watch('totalWeeklyHours') || 10;

    return (
        <div className="space-y-8 animate-in slide-in-from-right duration-500 max-w-lg mx-auto">
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-white">How much time can you train?</h2>
                <p className="text-slate-400">Total hours per week, including your other sports.</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-8">
                <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="text-5xl font-bold text-white tabular-nums tracking-tight">
                        {hours}
                        <span className="text-lg text-slate-500 font-medium ml-2">hrs/week</span>
                    </div>
                    <div className="flex items-center gap-2 text-indigo-400 text-sm font-bold bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                        <Clock className="w-4 h-4" />
                        Approx. {Math.round(hours / 7 * 10) / 10}h / day
                    </div>
                </div>

                <div className="relative pt-6 pb-2">
                    <input
                        type="range"
                        min="3"
                        max="25"
                        step="0.5"
                        {...register('totalWeeklyHours', { valueAsNumber: true })}
                        className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    />
                    <div className="flex justify-between text-xs text-slate-500 font-bold mt-4 uppercase tracking-widest">
                        <span>3 Hours</span>
                        <span>15 Hours</span>
                        <span>25 Hours</span>
                    </div>
                </div>

                <p className="text-xs text-center text-slate-500 leading-relaxed">
                    We recommend starting with a manageable volume. We can always adjust this later if you find you have more or less time.
                </p>
            </div>
        </div>
    );
}
