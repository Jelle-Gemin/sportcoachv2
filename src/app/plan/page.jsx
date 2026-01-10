import React from 'react';
import { Calendar as CalendarIcon, Filter, ChevronLeft, ChevronRight, Activity, Waves, Bike, Clock, Zap } from 'lucide-react';
import { weeklySchedule } from '@/data/mockData';
import { cn } from '@/lib/utils';
import Card from '@/components/ui/Card';

export default function Plan() {
    const getIcon = (type) => {
        switch (type) {
            case 'Run': return <Activity className="w-5 h-5 text-emerald-400" />;
            case 'Swim': return <Waves className="w-5 h-5 text-cyan-400" />;
            case 'Bike': return <Bike className="w-5 h-5 text-purple-400" />;
            case 'Brick': return <Bike className="w-5 h-5 text-orange-400" />;
            default: return <Clock className="w-5 h-5 text-slate-500" />;
        }
    }

    const getTypeColor = (type) => {
        switch (type) {
            case 'Run': return "bg-emerald-500/10 border-emerald-500/20 text-emerald-400";
            case 'Swim': return "bg-cyan-500/10 border-cyan-500/20 text-cyan-400";
            case 'Bike': return "bg-purple-500/10 border-purple-500/20 text-purple-400";
            case 'Brick': return "bg-orange-500/10 border-orange-500/20 text-orange-400";
            default: return "bg-slate-500/10 border-slate-500/20 text-slate-400";
        }
    }

    return (
        <div className="px-6 py-8 max-w-7xl mx-auto space-y-8">
            {/* Page Header */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-1">Training Plan</h1>
                    <p className="text-slate-400">Week 4 • Build Phase 1</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex bg-slate-900 rounded-xl p-1 border border-slate-800">
                        <button className="px-4 py-2 text-sm font-bold bg-[#3b82f6] text-white rounded-lg shadow-lg shadow-blue-500/20 transition-all">Week</button>
                        <button className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-300 transition-colors">Month</button>
                    </div>
                    <button className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors">
                        <Filter className="w-5 h-5" />
                    </button>
                </div>
            </header>

            {/* Week Selector */}
            <div className="flex items-center justify-between bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
                <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors"><ChevronLeft className="w-5 h-5" /></button>
                <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-blue-400" />
                    <span className="font-bold">Jan 12 - Jan 18, 2024</span>
                </div>
                <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors"><ChevronRight className="w-5 h-5" /></button>
            </div>

            {/* Schedule List */}
            <div className="space-y-4 pb-12">
                {weeklySchedule.map((item, idx) => (
                    <div key={idx} className={cn(
                        "group relative flex items-start gap-6",
                        item.isToday ? "opacity-100" : "opacity-80 hover:opacity-100 transition-opacity"
                    )}>
                        {/* Left Timeline Marker */}
                        <div className="flex flex-col items-center min-w-[40px] pt-1">
                            <span className={cn("text-xs font-bold uppercase tracking-widest mb-1", item.isToday ? "text-blue-400" : "text-slate-600")}>{item.day}</span>
                            <span className={cn("text-xl font-mono font-bold", item.isToday ? "text-white" : "text-slate-400")}>{item.date}</span>
                            {idx !== weeklySchedule.length - 1 && <div className="w-px h-24 bg-slate-800 my-4"></div>}
                        </div>

                        {/* Workout Card */}
                        <Card className={cn(
                            "flex-1 p-5 border-l-4",
                            item.isToday ? "border-l-blue-500 bg-blue-500/5" : "border-l-transparent"
                        )}>
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className={cn("w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0", getTypeColor(item.type))}>
                                        {getIcon(item.type)}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold border", getTypeColor(item.type))}>
                                                {item.type.toUpperCase()}
                                            </span>
                                            {item.completed && <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">DONE</span>}
                                        </div>
                                        <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors">{item.title}</h3>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-2 text-slate-400">
                                        <Clock className="w-4 h-4" />
                                        <span className="text-sm font-medium">{item.type === 'Rest' ? '---' : '1h 15m'}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-400">
                                        <Zap className="w-4 h-4" />
                                        <span className="text-sm font-medium">{item.type === 'Rest' ? '---' : '68 TSS'}</span>
                                    </div>
                                    {item.completed && item.score && (
                                        <div className="text-right">
                                            <span className={cn("text-xl font-mono font-bold", item.score >= 90 ? "text-emerald-400" : "text-yellow-400")}>{item.score}</span>
                                            <p className="text-[8px] font-bold text-slate-500">SCORE</p>
                                        </div>
                                    )}
                                    <button className="p-2 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-400 hover:text-white transition-colors">
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </Card>

                        {/* Today Indicator Pulsing Dot */}
                        {item.isToday && (
                            <div className="absolute -left-1.5 top-8 w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.8)] animate-pulse"></div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
