import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IPlanGenerationMetadata } from '@/lib/models/trainingPlan';

export function StartDateStep() {
    const { register, watch, setValue } = useFormContext<IPlanGenerationMetadata>();
    const startDate = watch('startDate');

    // Helper to get next Monday
    const getNextMonday = () => {
        const d = new Date();
        d.setDate(d.getDate() + ((7 - d.getDay()) % 7) + 1);
        return d.toISOString().split('T')[0];
    };

    const nextMonday = getNextMonday();
    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="space-y-6 animate-in slide-in-from-right duration-500">
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-white">When should the plan start?</h2>
                <p className="text-slate-400">Plans are generated in 7-week blocks. Starting on a Monday is highly recommended.</p>
            </div>

            <div className="max-w-md mx-auto space-y-4">
                {/* quick select Next Monday */}
                <div
                    onClick={() => setValue('startDate', nextMonday)}
                    className={cn(
                        "cursor-pointer p-6 rounded-2xl border-2 transition-all hover:bg-slate-800/50 flex items-center gap-4",
                        startDate === nextMonday
                            ? "bg-indigo-600/10 border-indigo-600 shadow-[0_0_20px_rgba(79,70,229,0.2)]"
                            : "bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700"
                    )}
                >
                    <div className={cn("p-3 rounded-full", startDate === nextMonday ? "bg-indigo-600 text-white" : "bg-slate-800")}>
                        <Calendar className="w-6 h-6" />
                    </div>
                    <div className="flex-1 text-left">
                        <h3 className={cn("text-lg font-bold", startDate === nextMonday ? "text-white" : "text-slate-300")}>Next Monday</h3>
                        <p className="text-sm text-slate-500 mt-1">{new Date(nextMonday).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                    </div>
                </div>

                {/* Custom Date */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Calendar className="w-5 h-5 text-slate-500" />
                    </div>
                    <input
                        type="date"
                        {...register('startDate')}
                        min={today}
                        className="w-full bg-slate-900 border-2 border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-600 transition-colors"
                    />
                </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 text-center max-w-2xl mx-auto">
                <p className="text-sm text-slate-400">
                    <span className="text-indigo-400 font-bold">Pro Tip:</span> Starting on a Monday ensures your long activities align with the weekend.
                </p>
            </div>
        </div>
    );
}
