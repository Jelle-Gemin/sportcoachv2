import React, { useState } from 'react';
import { Pencil } from 'lucide-react';
import ActivityLapEditor from './ActivityLapEditor';

const ActivityLaps = ({ activity, onUpdate }) => {
    const { laps, type } = activity || {};
    const [isEditing, setIsEditing] = useState(false);

    if (!laps || laps.length === 0) return null;

    const formatDuration = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const formatSpeed = (speed, type) => {
        if (!speed || speed === 0) return '--:--';

        if (type === 'Swim') {
            const secondsPer100m = 100 / speed; // speed is m/s. time = dist/speed. 100/speed gives seconds.
            const mins = Math.floor(secondsPer100m / 60);
            const secs = Math.floor(secondsPer100m % 60);
            return `${mins}:${secs.toString().padStart(2, '0')} /100m`;
        }

        if (type === 'Run') {
            const paceSecsPerKm = 1000 / speed;
            const mins = Math.floor(paceSecsPerKm / 60);
            const secs = Math.floor(paceSecsPerKm % 60);
            return `${mins}:${secs.toString().padStart(2, '0')}`;
        }

        return (speed * 3.6).toFixed(1) + ' km/h';
    };

    const isEditAllowed = (type === 'Run' && (activity.isTreadmill || activity.name.includes("Treadmill"))) || type === 'Swim';

    return (
        <div className="bg-[#0f172a] rounded-3xl border border-slate-800 overflow-hidden">
            <div className="p-4 md:p-6 border-b border-slate-800 flex justify-between items-center">
                <h3 className="text-lg md:text-xl font-bold">Lap Splits</h3>
                {isEditAllowed && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
                    >
                        <Pencil className="w-3 h-3" /> Edit Laps
                    </button>
                )}
            </div>

            {isEditing && (
                <ActivityLapEditor
                    activity={activity}
                    isOpen={true}
                    onClose={() => setIsEditing(false)}
                    onUpdate={(updatedActivity) => {
                        onUpdate(updatedActivity);
                        setIsEditing(false);
                    }}
                />
            )}

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left whitespace-nowrap">
                    <thead className="text-xs text-slate-500 uppercase bg-slate-950/50">
                        <tr>
                            <th className="px-4 md:px-6 py-4">Lap</th>
                            <th className="px-4 md:px-6 py-4">Time</th>
                            <th className="px-4 md:px-6 py-4">Dist</th>
                            <th className="px-4 md:px-6 py-4">
                                {type === 'Swim' ? 'Pace (100m)' : type === 'Run' ? 'Pace' : 'Speed'}
                            </th>
                            {type === 'Bike' || type === 'VirtualRide' && <th className="px-4 md:px-6 py-4">Avg Power</th>}
                            <th className="px-4 md:px-6 py-4">Avg HR</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {laps.map((lap, idx) => {
                            const dist = lap.manualDistance ?? lap.distance;
                            const time = lap.manualMovingTime ?? lap.movingTime;
                            const speed = dist / time;

                            return (
                                <tr key={idx} className="hover:bg-slate-800/20 transition-colors">
                                    <td className="px-4 md:px-6 py-4 font-bold text-slate-400">
                                        {idx + 1}
                                        {lap.lapType && (
                                            <span className={`ml-2 text-[10px] uppercase px-1.5 py-0.5 rounded font-bold
                                                ${lap.lapType === 'work' ? 'bg-blue-500/20 text-blue-400' : ''}
                                                ${lap.lapType === 'main' ? 'bg-cyan-500/20 text-cyan-400' : ''}
                                                ${lap.lapType === 'drill' ? 'bg-purple-500/20 text-purple-400' : ''}
                                                ${lap.lapType === 'warmup' ? 'bg-emerald-500/20 text-emerald-400' : ''}
                                                ${lap.lapType === 'cooldown' ? 'bg-indigo-500/20 text-indigo-400' : ''}
                                                ${lap.lapType === 'rest' ? 'bg-slate-700/50 text-slate-500' : ''}
                                            `}>
                                                {lap.lapType}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 md:px-6 py-4 font-mono">{formatDuration(time)}</td>
                                    <td className="px-4 md:px-6 py-4">
                                        {type === 'Swim'
                                            ? `${dist.toFixed(0)} m`
                                            : `${(dist / 1000).toFixed(2)} km`
                                        }
                                    </td>
                                    <td className={`px-4 md:px-6 py-4 font-mono font-bold ${lap.lapType === 'rest' ? 'text-slate-500' : 'text-white'}`}>
                                        {formatSpeed(speed, type)}
                                    </td>

                                    {type === 'Bike' || type === 'VirtualRide' &&
                                        <td className="px-4 md:px-6 py-4">
                                            {lap.averageWatts ? Math.round(lap.averageWatts) : '-'} <span className="text-xs text-slate-500">W</span>
                                        </td>
                                    }

                                    <td className="px-4 md:px-6 py-4">
                                        {lap.averageHeartrate ? Math.round(lap.averageHeartrate) : '-'} <span className="text-xs text-slate-500">bpm</span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ActivityLaps;
