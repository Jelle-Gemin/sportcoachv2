import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { cn } from '@/lib/utils';

const ActivityCharts = ({ streams, type }) => {
    const [activeChart, setActiveChart] = useState(type === 'Run' || type === 'Swim' ? 'hr' : 'power');

    if (!streams || Object.keys(streams).length === 0) {
        return (
            <div className="bg-[#0f172a] p-8 rounded-3xl border border-slate-800 text-center">
                <p className="text-slate-500">No detailed chart data available for this activity.</p>
            </div>
        );
    }

    // Process streams into Recharts format
    const data = streams.time.map((t, i) => ({
        time: t,
        timeFormatted: new Date(t * 1000).toISOString().substr(11, 8),
        heartrate: streams.heartrate ? streams.heartrate[i] : null,
        watts: streams.watts ? streams.watts[i] : null,
        cadence: streams.cadence ? streams.cadence[i] : null,
        velocity: streams.velocity_smooth ? streams.velocity_smooth[i] : null,
        altitude: streams.altitude ? streams.altitude[i] : null,
        pace: streams.velocity_smooth ? (1000 / Math.max(streams.velocity_smooth[i], 0.1) / 60) : null,
    })).filter((_, i) => i % 5 === 0); // Downsample for performance (every 5th point)

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg shadow-xl">
                    <p className="text-slate-400 text-xs mb-2 font-mono">{payload[0].payload.timeFormatted}</p>
                    {payload.map((entry, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm font-bold">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
                            <span className="capitalize text-slate-300">{entry.name}:</span>
                            <span style={{ color: entry.color }}>
                                {entry.name === 'pace'
                                    ? `${Math.floor(entry.value)}:${Math.floor((entry.value % 1) * 60).toString().padStart(2, '0')}/km`
                                    : Math.round(entry.value)
                                }
                                {entry.unit && <span className="text-[10px] ml-0.5 opacity-70">{entry.unit}</span>}
                            </span>
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-[#0f172a] p-4 md:p-6 rounded-3xl border border-slate-800 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h3 className="text-lg md:text-xl font-bold">Performance Analysis</h3>
                <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800/50 overflow-x-auto">
                    {['power', 'hr', 'pace'].map((metric) => (
                        (metric === 'power' && !streams.watts) || (metric === 'hr' && !streams.heartrate) ? null :
                            <button
                                key={metric}
                                onClick={() => setActiveChart(metric)}
                                className={cn(
                                    "px-4 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap",
                                    activeChart === metric
                                        ? "bg-slate-800 text-white shadow-lg"
                                        : "text-slate-500 hover:text-slate-300"
                                )}
                            >
                                {metric === 'power' ? 'Power' : metric === 'hr' ? 'Heart Rate' : 'Pace'}
                            </button>
                    ))}
                </div>
            </div>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorHr" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorPower" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorPace" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                        <XAxis
                            dataKey="timeFormatted"
                            stroke="#475569"
                            tick={{ fontSize: 10 }}
                            tickLine={false}
                            axisLine={false}
                            minTickGap={50}
                        />
                        <YAxis
                            stroke="#475569"
                            tick={{ fontSize: 10 }}
                            tickLine={false}
                            axisLine={false}
                        />
                        <Tooltip content={<CustomTooltip />} />

                        {activeChart === 'hr' && (
                            <Area
                                type="monotone"
                                dataKey="heartrate"
                                stroke="#ef4444"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorHr)"
                                name="Heart Rate"
                                unit="bpm"
                            />
                        )}

                        {activeChart === 'power' && (
                            <Area
                                type="monotone"
                                dataKey="watts"
                                stroke="#8b5cf6"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorPower)"
                                name="Power"
                                unit="W"
                            />
                        )}

                        {activeChart === 'pace' && (
                            <Area
                                type="monotone"
                                dataKey="pace"
                                stroke="#3b82f6"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorPace)"
                                name="Pace"
                                unit="min/km"
                            // Invert axis for pace? usually lower is better/higher visually
                            />
                        )}
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ActivityCharts;
