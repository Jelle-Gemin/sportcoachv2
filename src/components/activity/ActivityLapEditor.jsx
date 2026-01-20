
import React, { useState } from 'react';
import { X, Save, AlertCircle, Trash2, Plus } from 'lucide-react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { cn } from '@/lib/utils';
import { formatDuration, parseDuration, formatTimeInput } from '@/lib/time';

// Time utilities imported from @/lib/time

const schema = yup.object().shape({
    laps: yup.array().of(
        yup.object().shape({
            distanceKm: yup.number()
                .typeError('Must be a number')
                .required('Required')
                .min(0, 'Must be zero or positive')
                .test('is-decimal', 'Max 3 decimals', val =>
                    !val || (val.toString().split('.')[1] || '').length <= 3
                ),
            timeStr: yup.string()
                .required('Required')
                .matches(/^(\d{2}:){0,2}\d{2}$/, 'Format: MM:SS or HH:MM:SS')
        })
    )
});

export default function ActivityLapEditor({ activity, isOpen, onClose, onUpdate }) {
    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState(null);
    const isSwim = activity.type === 'Swim';

    const { control, handleSubmit, formState: { errors }, register } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            laps: activity.laps.map(lap => ({
                lapIndex: lap.lapIndex,
                distanceKm: parseFloat(
                    isSwim
                        ? (lap.manualDistance ?? lap.distance).toFixed(0)
                        : ((lap.manualDistance ?? lap.distance) / 1000).toFixed(3)
                ),
                timeStr: formatDuration(lap.manualMovingTime ?? lap.movingTime, 'ms')
            }))
        }
    });

    const { fields, remove, append } = useFieldArray({
        control,
        name: "laps"
    });

    const onSubmit = async (data) => {
        setIsSaving(true);
        setSaveError(null);

        try {
            // Reconstruct full laps array
            // 1. Iterate over the SUBMITTED laps (which excludes deleted ones)
            // 2. Find the original lap data for each to preserve HR/Power etc.
            // 3. Re-index them sequentially

            const updatedLaps = data.laps.map((item, newIndex) => {
                // Find original lap by the preserved lapIndex
                const originalLap = activity.laps.find(l => l.lapIndex === item.lapIndex);

                // Base object (original data or fallback if somehow missing)
                const base = originalLap || {};

                return {
                    ...base,
                    lapIndex: newIndex, // Re-index strictly
                    manualDistance: isSwim
                        ? Math.round(item.distanceKm) // Input was meters
                        : Math.round(item.distanceKm * 1000), // Input was KM
                    manualMovingTime: parseDuration(item.timeStr),
                    // Fallback to activity averages if lap data is missing (e.g. new manual splits)
                    averageHeartrate: base.averageHeartrate ?? activity.averageHeartrate,
                    maxHeartrate: base.maxHeartrate ?? activity.maxHeartrate,
                    averageWatts: base.averageWatts ?? activity.averageWatts,
                };
            });

            const res = await fetch(`/api/activities/${activity.stravaId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    laps: updatedLaps,
                    replaceLaps: true // Signal backend to replace the array
                })
            });

            if (!res.ok) throw new Error('Failed to save');

            const updatedActivity = await res.json();
            onUpdate(updatedActivity);
            onClose();
        } catch (err) {
            console.error(err);
            setSaveError('Failed to save changes. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#0f172a] w-full max-w-2xl rounded-3xl border border-slate-800 shadow-2xl flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/50 rounded-t-3xl">
                    <h2 className="text-xl font-bold text-white">Edit Laps Actuals</h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body - Scrollable */}
                <div className="flex-1 overflow-y-auto p-6">
                    {saveError && (
                        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2 text-red-400 text-sm">
                            <AlertCircle className="w-4 h-4" /> {saveError}
                        </div>
                    )}

                    <form id="lap-editor-form" onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                        <div className="grid grid-cols-12 md:gap-4 text-xs font-bold text-slate-500 uppercase mb-2 px-2">
                            <div className="col-span-1 py-2">#</div>
                            <div className="col-span-10 grid grid-cols-2 gap-4">
                                <div>Distance ({isSwim ? 'm' : 'km'})</div>
                                <div>Time (mm:ss)</div>
                            </div>
                            <div className="col-span-1"></div>
                        </div>

                        {fields.map((field, index) => (
                            <div key={field.id} className="grid grid-cols-12 md:gap-4 items-start bg-slate-900/30 p-2 rounded-xl hover:bg-slate-900/50 transition-colors group">
                                <div className="col-span-1 py-3 text-slate-400 font-bold font-mono text-center">
                                    {index + 1}
                                </div>
                                <div className="col-span-10 grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <input
                                            {...register(`laps.${index}.distanceKm`)}
                                            type="number"
                                            step={isSwim ? "1" : "0.001"}
                                            className={cn(
                                                "w-full bg-slate-800 border rounded-lg px-3 py-2 text-white font-mono text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all",
                                                errors.laps?.[index]?.distanceKm ? "border-red-500 focus:ring-red-500" : "border-slate-700"
                                            )}
                                            placeholder={isSwim ? "0" : "0.00"}
                                        />
                                        {errors.laps?.[index]?.distanceKm && (
                                            <p className="text-[10px] text-red-400 pl-1">{errors.laps[index].distanceKm.message}</p>
                                        )}
                                    </div>
                                    <div className="space-y-1">
                                        <Controller
                                            name={`laps.${index}.timeStr`}
                                            control={control}
                                            render={({ field: { value, onChange } }) => (
                                                <input
                                                    type="text"
                                                    value={value || ''}
                                                    onChange={(e) => onChange(formatTimeInput(e.target.value))}
                                                    className={cn(
                                                        "w-full bg-slate-800 border rounded-lg px-3 py-2 text-white font-mono text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all",
                                                        errors.laps?.[index]?.timeStr ? "border-red-500 focus:ring-red-500" : "border-slate-700"
                                                    )}
                                                    placeholder="MM:SS"
                                                />
                                            )}
                                        />
                                        {errors.laps?.[index]?.timeStr && (
                                            <p className="text-[10px] text-red-400 pl-1">{errors.laps[index].timeStr.message}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="col-span-1 flex justify-center py-2">
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                        title="Remove Lap"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}

                        <div className="pt-2">
                            <button
                                type="button"
                                onClick={() => append({
                                    lapIndex: -1,
                                    distanceKm: isSwim ? 0 : 0,
                                    timeStr: "00:00"
                                })}
                                className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-slate-800 rounded-xl text-slate-500 hover:text-blue-400 hover:border-blue-400/50 hover:bg-blue-400/5 transition-all text-sm font-bold"
                            >
                                <Plus className="w-4 h-4" /> Add Manual Split
                            </button>
                        </div>
                    </form>
                </div>
                {/* Footer */}
                <div className="p-6 border-t border-slate-800 bg-slate-900/50 rounded-b-3xl flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-bold text-slate-400 hover:text-white transition-colors"
                        type="button"
                    >
                        Cancel
                    </button>
                    <button
                        form="lap-editor-form"
                        type="submit"
                        disabled={isSaving}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSaving ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4" /> Save Changes
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
