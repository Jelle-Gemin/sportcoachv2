
import React, { useState } from 'react';
import { Pencil, Ruler, Clock, Save, X } from 'lucide-react';
import { formatDuration, parseDuration, formatTimeInput } from '@/lib/time';

export default function ActivityActuals({ activity, onUpdate }) {
    const isSwim = activity.type === 'Swim';
    const isTreadmill = activity.isTreadmill;

    const [isEditing, setIsEditing] = useState(false);
    const [distanceInput, setDistanceInput] = useState(
        isSwim
            ? (activity.manualDistance ?? activity.distance).toFixed(0)
            : ((activity.manualDistance ?? activity.distance) / 1000).toFixed(2)
    );
    const [timeStr, setTimeStr] = useState(
        formatDuration(activity.manualMovingTime ?? activity.movingTime, 'colon')
    );
    const [loading, setLoading] = useState(false);

    // Only show for Swim or Treadmill
    if (!isSwim && !isTreadmill) return null;

    const handleSave = async () => {
        setLoading(true);
        try {
            const manualMovingTime = parseDuration(timeStr);
            const manualDistance = isSwim
                ? Math.round(parseFloat(distanceInput))
                : Math.round(parseFloat(distanceInput) * 1000);

            const res = await fetch(`/api/activities/${activity.stravaId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    manualDistance,
                    manualMovingTime
                })
            });

            if (res.ok) {
                const updatedActivity = await res.json();
                onUpdate(updatedActivity);
                setIsEditing(false);
            }
        } catch (error) {
            console.error('Failed to update activity', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-white font-bold flex items-center gap-2">
                    {isTreadmill && <span className="bg-orange-500/20 text-orange-400 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">Treadmill</span>}
                    {isSwim && <span className="bg-cyan-500/20 text-cyan-400 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">Swim</span>}
                    Activity Details
                </h3>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
                    >
                        <Pencil className="w-3 h-3" /> Edit Actuals
                    </button>
                )}
            </div>

            {/* Description Display */}
            {activity.description && (
                <div className="text-slate-400 text-sm italic border-l-2 border-slate-700 pl-4 py-1">
                    "{activity.description}"
                </div>
            )}

            {/* Edit Form */}
            {isEditing ? (
                <div className="bg-slate-900 rounded-xl p-4 border border-slate-700/50 space-y-4 animate-in fade-in slide-in-from-top-2">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
                                <Ruler className="w-3 h-3" /> Distance ({isSwim ? 'm' : 'km'})
                            </label>
                            <input
                                type="number"
                                step={isSwim ? "1" : "0.01"}
                                value={distanceInput}
                                onChange={(e) => setDistanceInput(e.target.value)}
                                className="w-full bg-slate-800 border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder={isSwim ? "0" : "0.00"}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
                                <Clock className="w-3 h-3" /> Time (hh:mm:ss)
                            </label>
                            <input
                                type="text"
                                value={timeStr}
                                onChange={(e) => setTimeStr(formatTimeInput(e.target.value))}
                                className="w-full bg-slate-800 border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="00:00:00"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            onClick={() => setIsEditing(false)}
                            disabled={loading}
                            className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1"
                        >
                            <X className="w-3 h-3" /> Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 text-white hover:bg-blue-500 transition-colors flex items-center gap-1 disabled:opacity-50"
                        >
                            <Save className="w-3 h-3" /> {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
