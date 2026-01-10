import React from 'react';
import { Activity, Waves, Bike, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

const WeeklyRibbon = ({ activities = [] }) => {
    // Generate last 7 days
    const days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        return {
            dateObj: d,
            day: d.toLocaleDateString('en-US', { weekday: 'short' }),
            date: d.getDate(),
            isToday: i === 6
        };
    });

    const schedule = days.map(day => {
        const activity = activities.find(a => {
            const actDate = new Date(a.startDate);
            return actDate.getDate() === day.dateObj.getDate() &&
                actDate.getMonth() === day.dateObj.getMonth();
        });

        return {
            ...day,
            completed: !!activity,
            type: activity?.type,
            score: null // Score calc not implemented yet
        };
    });
    // Helper for Execution Score Colors
    const getScoreColor = (score) => {
        if (score === null) return "text-slate-500";
        if (score >= 90) return "text-[#22c55e]"; // Score Green
        if (score >= 70) return "text-[#eab308]"; // Score Yellow
        return "text-[#ef4444]"; // Score Red
    };

    const getIcon = (type) => {
        switch (type) {
            case 'Run': return <Activity className="w-4 h-4" />;
            case 'Swim': return <Waves className="w-4 h-4" />;
            case 'Bike': return <Bike className="w-4 h-4" />;
            case 'Brick': return <Bike className="w-4 h-4" />;
            default: return null;
        }
    }

    return (
        <section className="relative">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Training Week 4</h2>
                <button className="text-xs text-blue-400 font-bold flex items-center gap-1 hover:text-blue-300 transition-colors">Month View <ChevronRight className="w-3 h-3" /></button>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                {schedule.map((day, i) => (
                    <div key={i} className={cn(
                        "flex-1 min-w-[70px] flex flex-col items-center p-3 rounded-2xl border transition-all duration-300",
                        day.isToday
                            ? 'bg-[#3b82f6] border-[#3b82f6] shadow-xl shadow-blue-500/20 scale-105'
                            : 'bg-[#0f172a] border-slate-800/50',
                        !day.completed && !day.isToday ? 'opacity-50' : ''
                    )}>
                        <span className={cn("text-[10px] font-bold mb-3", day.isToday ? 'text-blue-100' : 'text-slate-500')}>{day.day} {day.date}</span>
                        <div className={cn(
                            "w-9 h-9 rounded-full flex items-center justify-center font-mono text-sm font-bold",
                            day.isToday ? 'bg-white text-blue-600' : 'bg-slate-950 text-slate-300'
                        )}>
                            {day.completed && day.score ? (
                                <span className={day.isToday ? '' : getScoreColor(day.score)}>{day.score}</span>
                            ) : (
                                getIcon(day.type) || <span className="opacity-20">•</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WeeklyRibbon;
