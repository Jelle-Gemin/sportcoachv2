"use client";

import React from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend, BarChart, Bar
} from 'recharts';
import { analyticsData } from '@/data/mockData';
import Card from '@/components/ui/Card';
import { TrendingUp, Activity, Target, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const KPI = ({ label, value, delta, icon }) => (
    <Card className="p-5">
        <div className="flex justify-between items-start mb-2">
            <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                {icon}
            </div>
            <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded-lg border", delta.startsWith('+') ? "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" : "text-orange-400 bg-orange-400/10 border-orange-400/20")}>
                {delta}
            </span>
        </div>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</p>
        <p className="text-2xl font-bold text-white mt-1">{value}</p>
    </Card>
);

const Last7DaysOption = () => <option>Last 7 Days</option>;

export default function Analytics() {
    return (
        <div className="px-6 py-8 max-w-7xl mx-auto space-y-8">
            {/* Page Header */}
            <header>
                <h1 className="text-3xl font-bold text-white mb-1">Performance Analytics</h1>
                <p className="text-slate-400">Deep dive into your training progression</p>
            </header>

            {/* Top Level KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <KPI label="Fitness (CTL)" value="69" delta="+4" icon={<Activity className="text-blue-400" />} />
                <KPI label="Fatigue (ATL)" value="82" delta="+12" icon={<TrendingUp className="text-orange-400" />} />
                <KPI label="Form (TSB)" value="-13" delta="-8" icon={<Zap className="text-yellow-400" />} />
                <KPI label="Compliance" value="94%" delta="+2%" icon={<Target className="text-emerald-400" />} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Performance Management Chart */}
                <Card className="lg:col-span-2 p-6 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="font-bold text-lg">Training Load (PMC)</h2>
                        <select className="bg-slate-900 border border-slate-700 text-xs font-bold rounded-lg px-3 py-1.5 focus:outline-none">
                            <Last7DaysOption />
                            <option>Last 30 Days</option>
                            <option>Year to Date</option>
                        </select>
                    </div>
                    <div className="h-[300px] w-full mt-auto">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={analyticsData.fitness}>
                                <defs>
                                    <linearGradient id="colorCtl" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                <XAxis dataKey="day" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '12px' }}
                                    itemStyle={{ fontSize: '12px' }}
                                />
                                <Area type="monotone" dataKey="ctl" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCtl)" strokeWidth={3} name="Fitness" />
                                <Area type="monotone" dataKey="atl" stroke="#f97316" fill="transparent" strokeWidth={2} strokeDasharray="5 5" name="Fatigue" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Intensity Zone Distribution */}
                <Card className="p-6 flex flex-col">
                    <h2 className="font-bold text-lg mb-6">Time in Zones</h2>
                    <div className="h-[250px] w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={analyticsData.zoneDistribution}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {analyticsData.zoneDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '12px' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="text-center">
                                <p className="text-2xl font-bold">Z2</p>
                                <p className="text-[10px] text-slate-500 font-bold uppercase">Main Effort</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 space-y-2">
                        {analyticsData.zoneDistribution.map((zone, i) => (
                            <div key={i} className="flex justify-between items-center text-xs">
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: zone.color }}></div>
                                    <span className="text-slate-400 font-medium">{zone.name} - Intensity</span>
                                </div>
                                <span className="font-bold">{zone.value}%</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Discipline Specific Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-12">
                <Card className="p-6">
                    <h2 className="font-bold text-lg mb-6">Weekly Volume per Discipline</h2>
                    <div className="h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={[
                                { name: 'Swim', value: 3.5, color: '#06b6d4' },
                                { name: 'Bike', value: 8.2, color: '#a855f7' },
                                { name: 'Run', value: 4.8, color: '#10b981' },
                            ]}>
                                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                    {[0, 1, 2].map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index === 0 ? '#06b6d4' : index === 1 ? '#a855f7' : '#10b981'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card className="p-6 bg-indigo-500/5 border-indigo-500/20">
                    <h2 className="font-bold text-indigo-400 text-lg mb-2">AI Season Projection</h2>
                    <p className="text-sm text-slate-400 leading-relaxed mb-4">
                        Based on your current CTL ramp rate of <span className="text-white font-bold">4.2 points/week</span>, you are projected to reach a fitness peak of <span className="text-white font-bold">102</span> just in time for Ironman 70.3 Mallorca.
                    </p>
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                        <p className="text-xs font-bold text-slate-500 uppercase mb-2">Readiness Score</p>
                        <div className="flex items-end gap-1">
                            <span className="text-3xl font-bold text-indigo-400">88</span>
                            <span className="text-sm text-slate-600 mb-1">/ 100</span>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
