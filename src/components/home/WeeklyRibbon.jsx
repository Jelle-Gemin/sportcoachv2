import React, { useMemo } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { RunIcon, SwimIcon, BikeIcon, GymIcon } from '../icons/SportIcons';
import { cn } from '../../lib/utils';

const WeeklyRibbon = ({ activities = [], prescribedWorkouts = [], selectedDate, onDateSelect }) => {
    // Generate Mon-Sun week containing selectedDate
    const weekDays = useMemo(() => {
        const current = new Date(selectedDate);
        const day = current.getDay(); // 0=Sun, 1=Mon
        // Calculate difference to get to Monday (if Sunday (0), go back 6 days)
        const diff = current.getDate() - day + (day === 0 ? -6 : 1);

        const monday = new Date(current.setDate(diff));

        return Array.from({ length: 7 }, (_, i) => {
            const d = new Date(monday);
            d.setDate(monday.getDate() + i);
            return {
                dateObj: d,
                day: d.toLocaleDateString('en-US', { weekday: 'short' }),
                date: d.getDate(),
                fullDate: d.toISOString().split('T')[0],
                isToday: d.toDateString() === new Date().toDateString(),
                isSelected: d.toDateString() === selectedDate.toDateString()
            };
        });
    }, [selectedDate]);

    // Calculate display schedule based on activities (for dots/indicators)
    const schedule = weekDays.map((day, i) => {
        const completedActivity = activities.find(a => {
            const actDate = new Date(a.startDate);
            return actDate.getDate() === day.dateObj.getDate() &&
                actDate.getMonth() === day.dateObj.getMonth() &&
                actDate.getFullYear() === day.dateObj.getFullYear();
        });

        // Match prescribed workout (assuming mock data is Mon-Sun)
        const prescribed = prescribedWorkouts[i];

        return {
            ...day,
            completed: !!completedActivity,
            prescribedType: prescribed?.type,
            completedType: completedActivity?.type,
            // If completed, use completed type (athlete might have swapped sports)
            // If not, use prescribed type
            displayType: completedActivity ? completedActivity.type : prescribed?.type
        };
    });

    const getIcon = (type) => {
        const iconClass = "w-5 h-5"; // Set consistent premium size
        switch (type) {
            case 'Run': return <RunIcon className={iconClass} />;
            case 'Swim': return <SwimIcon className={iconClass} />;
            case 'Bike': return <BikeIcon className={iconClass} />;
            case 'Brick': return <BikeIcon className={iconClass} />;
            case 'Gym': return <GymIcon className={iconClass} />;
            case 'Strength': return <GymIcon className={iconClass} />;
            default: return <span className="text-[10px] opacity-20">●</span>;
        }
    }

    // Handlers for navigating weeks
    const changeWeek = (offset) => {
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() + (offset * 7));
        onDateSelect(newDate);
    };

    return (
        <section className="relative">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                    {weekDays[0].dateObj.toLocaleDateString('en-US', { month: 'long' })} Week
                </h2>
                <div className="flex items-center gap-4">
                    <button onClick={() => changeWeek(-1)} className="p-1 hover:bg-slate-800 rounded-lg text-slate-400">
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button onClick={() => onDateSelect(new Date())} className="text-xs text-blue-400 font-bold hover:text-blue-300 transition-colors">
                        Today
                    </button>
                    <button onClick={() => changeWeek(1)} className="p-1 hover:bg-slate-800 rounded-lg text-slate-400">
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                {schedule.map((day, i) => (
                    <button
                        key={i}
                        onClick={() => onDateSelect(day.dateObj)}
                        className={cn(
                            "flex-1 min-w-[70px] flex flex-col items-center p-3 rounded-2xl border transition-all duration-300",
                            day.isSelected
                                ? 'bg-[#3b82f6] border-[#3b82f6] shadow-xl shadow-blue-500/20 scale-105'
                                : day.isToday
                                    ? 'bg-slate-900 border-blue-500/50'
                                    : 'bg-[#0f172a] border-slate-800/50 hover:border-slate-700',
                            !day.isSelected && !day.isToday && !day.completed && !day.prescribedType ? 'opacity-50 hover:opacity-100' : ''
                        )}
                    >
                        <span className={cn(
                            "text-[10px] font-bold mb-3",
                            day.isSelected ? 'text-blue-100' : 'text-slate-500'
                        )}>
                            {day.day} {day.date}
                        </span>
                        <div className={cn(
                            "w-9 h-9 rounded-full flex items-center justify-center font-mono text-sm font-bold transition-colors",
                            day.isSelected
                                ? 'bg-white text-blue-600'
                                : day.completed
                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                    : day.prescribedType && day.prescribedType !== 'Rest'
                                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                        : 'bg-slate-950 text-slate-300'
                        )}>
                            {day.displayType && day.displayType !== 'Rest' ? (
                                getIcon(day.displayType)
                            ) : (
                                <span className="opacity-20">•</span>
                            )}
                        </div>
                    </button>
                ))}
            </div>
        </section>
    );
};

export default WeeklyRibbon;
