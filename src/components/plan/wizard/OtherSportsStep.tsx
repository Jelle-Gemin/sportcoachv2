import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Plus, X, Calendar, Clock, Settings2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IPlanGenerationMetadata } from '@/lib/models/trainingPlan';
import Card from '@/components/ui/Card';
import { formatTimeInput } from '@/lib/time';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function OtherSportsStep() {
    const { register, control, watch, setValue } = useFormContext<IPlanGenerationMetadata>();
    const hasOtherSports = watch('hasOtherSports');

    const { fields, append, remove } = useFieldArray({
        control,
        name: "otherSports"
    });

    return (
        <div className="space-y-6 animate-in slide-in-from-right duration-500 pb-10">
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-white">Do you practice other sports?</h2>
                <p className="text-slate-400">We'll schedule your training around these commitments.</p>
            </div>

            <div className="flex justify-center gap-4">
                <button
                    type="button"
                    onClick={() => setValue('hasOtherSports', true)}
                    className={cn(
                        "px-6 py-3 rounded-xl font-bold border-2 transition-all",
                        hasOtherSports
                            ? "bg-indigo-600 border-indigo-600 text-white"
                            : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                    )}
                >
                    Yes, I do
                </button>
                <button
                    type="button"
                    onClick={() => {
                        setValue('hasOtherSports', false);
                        setValue('otherSports', []);
                    }}
                    className={cn(
                        "px-6 py-3 rounded-xl font-bold border-2 transition-all",
                        !hasOtherSports
                            ? "bg-slate-700 border-slate-700 text-white"
                            : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                    )}
                >
                    No, just triathlon
                </button>
            </div>

            {hasOtherSports && (
                <div className="space-y-6 pt-4 animate-in fade-in slide-in-from-bottom-4">
                    {fields.map((field, index) => {
                        const durationMode = watch(`otherSports.${index}.durationMode`);
                        const scheduledDays = watch(`otherSports.${index}.scheduledDays`) || [];

                        return (
                            <Card key={field.id} className="p-6 relative bg-slate-900/50 border-slate-800 ring-1 ring-slate-800 shadow-xl">
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="absolute top-4 right-4 text-slate-600 hover:text-red-400 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                <div className="space-y-6">
                                    {/* Sport Type */}
                                    <div className="space-y-1 max-w-sm">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Sport Type</label>
                                        <input
                                            {...register(`otherSports.${index}.sportType` as const, { required: true })}
                                            placeholder="e.g. Soccer, Tennis"
                                            className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all shadow-inner"
                                        />
                                    </div>

                                    {/* Duration Mode & Fatigue Level Row */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Duration Mode Toggle */}
                                        <div className="space-y-3">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                                <Settings2 className="w-3 h-3" /> Duration Mode
                                            </label>
                                            <div className="flex bg-slate-950/50 p-1 rounded-xl border border-slate-800 w-fit">
                                                <button
                                                    type="button"
                                                    onClick={() => setValue(`otherSports.${index}.durationMode`, 'fixed')}
                                                    className={cn(
                                                        "px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                                                        durationMode === 'fixed' ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" : "text-slate-500 hover:text-slate-300"
                                                    )}
                                                >
                                                    Same every day
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setValue(`otherSports.${index}.durationMode`, 'daily')}
                                                    className={cn(
                                                        "px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                                                        durationMode === 'daily' ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" : "text-slate-500 hover:text-slate-300"
                                                    )}
                                                >
                                                    Differs per day
                                                </button>
                                            </div>
                                        </div>

                                        {/* Fatigue Level Selector */}
                                        <div className="space-y-3">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                                <Sparkles className="w-3 h-3" /> Fatigue Level
                                            </label>
                                            <div className="flex bg-slate-950/50 p-1 rounded-xl border border-slate-800 w-fit">
                                                {(['low', 'medium', 'high'] as const).map((level) => (
                                                    <button
                                                        key={level}
                                                        type="button"
                                                        onClick={() => setValue(`otherSports.${index}.fatigueLevel`, level)}
                                                        className={cn(
                                                            "px-4 py-1.5 rounded-lg text-xs font-bold transition-all capitalize",
                                                            watch(`otherSports.${index}.fatigueLevel`) === level
                                                                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                                                                : "text-slate-500 hover:text-slate-300"
                                                        )}
                                                    >
                                                        {level}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Days & Durations */}
                                    <div className="space-y-4">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                            <Calendar className="w-3 h-3" /> Scheduled Days & Intensity
                                        </label>
                                        <div className="flex flex-wrap gap-3">
                                            {DAYS.map((day, dayIdx) => {
                                                const isSelected = scheduledDays.includes(dayIdx);
                                                const dailyHourValue = watch(`otherSports.${index}.dailyHours.${dayIdx}` as any);

                                                return (
                                                    <div key={day} className="space-y-2 flex flex-col items-center">
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                const newDays = isSelected
                                                                    ? scheduledDays.filter((d: number) => d !== dayIdx)
                                                                    : [...scheduledDays, dayIdx];
                                                                setValue(`otherSports.${index}.scheduledDays`, newDays);
                                                            }}
                                                            className={cn(
                                                                "w-12 h-12 rounded-xl text-xs font-bold border transition-all flex items-center justify-center",
                                                                isSelected
                                                                    ? "bg-indigo-500 text-white border-indigo-500 shadow-lg shadow-indigo-500/20"
                                                                    : "bg-slate-950/50 text-slate-500 border-slate-800 hover:border-slate-700"
                                                            )}
                                                        >
                                                            {day}
                                                        </button>
                                                        {isSelected && durationMode === 'daily' && (
                                                            <div className="relative group">
                                                                <input
                                                                    type="text"
                                                                    {...register(`otherSports.${index}.dailyHours.${dayIdx}` as any, {
                                                                        required: true,
                                                                        pattern: /^([0-9][0-9]):([0-5][0-9]):([0-5][0-9])$/
                                                                    })}
                                                                    value={dailyHourValue || ''}
                                                                    onChange={(e) => setValue(`otherSports.${index}.dailyHours.${dayIdx}` as any, formatTimeInput(e.target.value))}
                                                                    placeholder="01:30:00"
                                                                    className="w-20 bg-slate-950/50 border border-slate-800 rounded-lg px-1.5 py-1 text-center text-[10px] text-white focus:border-indigo-500 outline-none font-mono"
                                                                />
                                                                <Clock className="w-2 h-2 absolute top-1 right-1 text-slate-600" />
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Fixed Duration Input (Conditional) */}
                                    {
                                        durationMode === 'fixed' && scheduledDays.length > 0 && (
                                            <div className="space-y-2 animate-in fade-in slide-in-from-left-2">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Duration per session (hh:mm:ss)</label>
                                                <div className="flex items-center gap-3">
                                                    <input
                                                        type="text"
                                                        {...register(`otherSports.${index}.hoursPerSession` as const, {
                                                            required: true,
                                                            pattern: /^([0-9][0-9]):([0-5][0-9]):([0-5][0-9])$/
                                                        })}
                                                        value={watch(`otherSports.${index}.hoursPerSession`) || ''}
                                                        onChange={(e) => setValue(`otherSports.${index}.hoursPerSession`, formatTimeInput(e.target.value))}
                                                        placeholder="01:30:00"
                                                        className="w-32 bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:border-indigo-500 outline-none font-mono"
                                                    />
                                                    <span className="text-sm text-slate-500 font-medium">per session</span>
                                                </div>
                                            </div>
                                        )
                                    }

                                    {/* Same Day Checkbox */}
                                    <div className="flex items-center gap-3 pt-2">
                                        <div className="relative flex items-center h-5">
                                            <input
                                                type="checkbox"
                                                {...register(`otherSports.${index}.trainOnSameDays` as const)}
                                                className="w-5 h-5 rounded-lg border-slate-800 bg-slate-950/50 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-slate-900"
                                                id={`sameDay-${index}`}
                                            />
                                        </div>
                                        <label htmlFor={`sameDay-${index}`} className="text-sm text-slate-400 cursor-pointer select-none hover:text-slate-300 transition-colors">
                                            Include triathlon workouts on these days
                                        </label>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}

                    <button
                        type="button"
                        onClick={() => append({
                            sportType: '',
                            scheduledDays: [],
                            trainOnSameDays: false,
                            durationMode: 'fixed',
                            fatigueLevel: 'medium',
                            hoursPerSession: '01:00:00',
                            dailyHours: {}
                        })}
                        className="w-full py-6 rounded-2xl border-dashed border-2 border-slate-800 text-slate-500 hover:text-white hover:border-slate-600 hover:bg-slate-900/40 transition-all font-bold flex items-center justify-center gap-2 group"
                    >
                        <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        Add Another Activity
                    </button>
                </div >
            )}
        </div >
    );
}
