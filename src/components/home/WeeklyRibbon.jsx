import React, { useMemo } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { RunIcon, SwimIcon, BikeIcon, GymIcon, SoccerIcon, MultiIcon } from '../icons/SportIcons';
import { cn } from '../../lib/utils';

const WeeklyRibbon = ({ activities = [], prescribedWorkouts = [], selectedDate, onDateSelect }) => {
    // Group prescribed workouts by date for efficient lookup
    const prescribedByDate = useMemo(() => {
        const grouped = {};
        prescribedWorkouts.forEach(pw => {
            if (!grouped[pw.fullDate]) grouped[pw.fullDate] = [];
            grouped[pw.fullDate].push(pw);
        });
        return grouped;
    }, [prescribedWorkouts]);

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

    // Calculate display schedule based on activities and grouped prescribed workouts
    const schedule = weekDays.map((day) => {
        const dailyActivities = activities.filter(a => {
            if (!a.startDate) return false;
            try {
                const actDate = new Date(a.startDate).toISOString().split('T')[0];
                return actDate === day.fullDate;
            } catch (e) {
                return false;
            }
        });

        const dailyPrescribed = prescribedByDate[day.fullDate] || [];
        const isCompleted = dailyActivities.length > 0;

        // Determination logic for icon
        let displayType = null;
        if (dailyPrescribed.length > 1) {
            displayType = 'Multi';
        } else if (dailyPrescribed.length === 1) {
            displayType = dailyPrescribed[0].type;
        } else if (isCompleted) {
            // Fallback to completed activity type if nothing prescribed
            displayType = dailyActivities[0].type;
        }

        // Special handling for common alternatives
        if (displayType === 'Gym' || displayType === 'Strength') displayType = 'Gym';
        if (displayType === 'Ride' || displayType === 'VirtualRide') displayType = 'Bike';

        return {
            ...day,
            completed: isCompleted,
            prescribedType: dailyPrescribed.length > 0 ? (dailyPrescribed.length > 1 ? 'Multi' : dailyPrescribed[0].type) : null,
            displayType
        };
    });

    const getIcon = (type) => {
        const iconClass = "w-3 h-3";
        switch (type) {
            case 'Run': return <RunIcon className={iconClass} />;
            case 'Swim': return <SwimIcon className={iconClass} />;
            case 'Bike': return <BikeIcon className={iconClass} />;
            case 'Brick': return <BikeIcon className={iconClass} />;
            case 'Gym': return <GymIcon className={iconClass} />;
            case 'Strength': return <GymIcon className={iconClass} />;
            case 'Soccer': return <SoccerIcon className={iconClass} />;
            case 'Multi': return <MultiIcon className={iconClass} />;
            default: return null;
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
            <div className="grid grid-cols-7 gap-1">
                {schedule.map((day, i) => (
                    <button
                        key={i}
                        onClick={() => onDateSelect(day.dateObj)}
                        className={cn(
                            "flex flex-col items-center py-3 rounded-full transition-all duration-300 relative group",
                            day.isSelected
                                ? 'bg-blue-600 shadow-lg shadow-blue-500/30 text-white transform scale-105 z-10'
                                : 'text-slate-500 hover:text-slate-300'
                        )}
                    >
                        <span className={cn(
                            "text-[10px] uppercase font-bold tracking-widest mb-1",
                            day.isSelected ? "text-blue-200" : ""
                        )}>
                            {day.day[0]}
                        </span>
                        <span className="text-xl font-black font-sans tracking-tighter leading-none mb-1">
                            {day.date}
                        </span>

                        {/* Indicator Dot/Icon */}
                        <div className="h-4 flex items-center justify-center">
                            {day.displayType && day.displayType !== 'Rest' ? (
                                <div className={cn(
                                    "transition-all",
                                    day.isSelected ? "text-white" : "text-blue-500"
                                )}>
                                    {getIcon(day.displayType)}
                                </div>
                            ) : day.completed ? (
                                <div className={cn(
                                    "w-1.5 h-1.5 rounded-full",
                                    day.isSelected ? "bg-white/50" : "bg-emerald-500"
                                )}></div>
                            ) : (
                                <div className="w-1.5 h-1.5 rounded-full bg-transparent"></div>
                            )}
                        </div>
                    </button>
                ))}
            </div>
        </section>
    );
};

export default WeeklyRibbon;
