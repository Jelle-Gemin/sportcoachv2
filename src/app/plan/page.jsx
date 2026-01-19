"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Calendar as CalendarIcon, Filter, ChevronLeft, ChevronRight, Activity, Waves, Bike, Clock, Zap, Dumbbell, CheckCircle2, TrendingUp } from 'lucide-react';
import { RunIcon, SwimIcon, BikeIcon, GymIcon, SoccerIcon, MultiIcon } from '@/components/icons/SportIcons';
import { useWeeklyWorkouts } from '@/hooks/useWeeklyWorkouts';
import { useActivities } from '@/hooks/useActivities';
import { cn } from '@/lib/utils';
import Card from '@/components/ui/Card';
import { weeklySchedule } from '@/data/mockData';

export default function Plan() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // START WITH STRING STATE to avoid hydration mismatch (server date != client date)
    // Default to current week (Monday)
    const [selectedDate, setSelectedDate] = useState(() => {
        const now = new Date();
        const day = now.getDay();
        const diff = day === 0 ? -6 : 1 - day; // Adjust to Monday
        const monday = new Date(now);
        monday.setDate(now.getDate() + diff);
        return monday.toISOString().split('T')[0];
    });
    const [todayStr, setTodayStr] = useState(''); // Client-only date to prevent hydration mismatch

    // View Mode & Filter State
    const viewMode = searchParams.get('view') === 'month' ? 'month' : 'week';
    const [activeFilter, setActiveFilter] = useState('All'); // 'All', 'Run', 'Bike', 'Swim', etc.
    const [showFilterMenu, setShowFilterMenu] = useState(false);

    useEffect(() => {
        // Set today's date only on client to avoid hydration mismatch
        setTodayStr(new Date().toLocaleDateString('en-CA'));
    }, []);

    const { workouts: plannedWorkouts, loading: planLoading } = useWeeklyWorkouts(selectedDate);
    const { activities, loading: activitiesLoading } = useActivities();

    const loading = planLoading || activitiesLoading;

    // Helper to safely parse "YYYY-MM-DD" as local noon to avoid timezone shifts
    const parseDateSafe = (dateStr) => {
        if (!dateStr) return new Date();
        const parts = dateStr.split('-');
        return new Date(parts[0], parts[1] - 1, parts[2], 12, 0, 0);
    };

    // Helper to format "YYYY-MM-DD" to "Jan 5"
    const formatDateStr = (dateStr) => {
        if (!dateStr) return '';
        const date = parseDateSafe(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

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


    const getTypeColor = (type) => {
        switch (type) {
            case 'Run': return "bg-emerald-500/10 border-emerald-500/20 text-emerald-400";
            case 'Swim': return "bg-cyan-500/10 border-cyan-500/20 text-cyan-400";
            case 'Bike': return "bg-purple-500/10 border-purple-500/20 text-purple-400";
            case 'Brick': return "bg-orange-500/10 border-orange-500/20 text-orange-400";
            case 'Strength': return "bg-blue-500/10 border-blue-500/20 text-blue-400";
            default: return "bg-slate-500/10 border-slate-500/20 text-slate-400";
        }
    }

    const dateLabel = useMemo(() => {
        const start = parseDateSafe(selectedDate);

        if (viewMode === 'month') {
            return start.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        }

        // Calculate range from selectedDate (Monday) to Sunday
        const end = new Date(start);
        end.setDate(start.getDate() + 6);

        // Check if same month
        if (start.getMonth() === end.getMonth()) {
            return `${start.toLocaleDateString('en-US', { month: 'short' })} ${start.getDate()} - ${end.getDate()}, ${start.getFullYear()}`;
        }

        const options = { month: 'short', day: 'numeric' };
        return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}, ${start.getFullYear()}`;
    }, [selectedDate, viewMode]);


    // Merge Planned with Actuals and Adjust for View Mode / Filter
    const workouts = useMemo(() => {
        let baseWorkouts = [];

        if (viewMode === 'week') {
            baseWorkouts = plannedWorkouts;
        } else {
            // Month View: Filter ALL weeklySchedule for the selected month
            // We use the selectedDate (which defaults to a Monday) to determine the "view month".
            // However, selectedDate moves by week. 
            // If we are in Month view, selectedDate hopefully reflects the month we clearly expect.
            // Let's assume selectedDate's month is the target.
            const current = parseDateSafe(selectedDate);
            const monthStr = current.toISOString().slice(0, 7); // YYYY-MM

            baseWorkouts = weeklySchedule.filter(item => item.fullDate.startsWith(monthStr));
        }

        // Apply completion/actuals logic
        const merged = baseWorkouts.map(planned => {
            // Find finding actual activity
            const actual = activities.find(act => {
                const dateStr = act.start_date_local || act.start_date || act.startDate;
                if (!act || !dateStr) return false;

                try {
                    const actDate = dateStr.split('T')[0];
                    const isSameDate = actDate === planned.fullDate;

                    // Simple type matching
                    let isSameType = false;
                    if (planned.type === 'Run' && act.type === 'Run') isSameType = true;
                    if (planned.type === 'Bike' && (act.type === 'Ride' || act.type === 'VirtualRide')) isSameType = true;
                    if (planned.type === 'Swim' && act.type === 'Swim') isSameType = true;
                    if (planned.type === 'Strength' && act.type === 'WeightTraining') isSameType = true;
                    if (planned.type === 'Soccer' && act.type === 'Soccer') isSameType = true;
                    if (planned.type === 'Brick') isSameType = (act.type === 'Ride' || act.type === 'Run'); // Loose match for brick

                    return isSameDate && isSameType;
                } catch (err) {
                    return false;
                }
            });

            return {
                ...planned,
                actualData: actual, // Attach actual data
                isCompleted: !!actual // Completed ONLY if actual exists
            };
        });

        // Apply Category Filter
        if (activeFilter !== 'All') {
            return merged.filter(w => w.type === activeFilter);
        }

        return merged;
    }, [plannedWorkouts, activities, viewMode, selectedDate, activeFilter]);


    // Calculate Weekly Totals
    const stats = useMemo(() => {
        let totalDuration = 0;
        let completedDuration = 0;
        let totalDistance = 0;
        let completedDistance = 0;
        let totalWorkouts = workouts.length;
        let completedWorkouts = 0;

        workouts.forEach(workout => {
            const duration = workout.duration || 0; // Planned duration (seconds)
            const distance = workout.distance || 0; // Planned distance (km)

            totalDuration += duration;
            totalDistance += distance;

            if (workout.isCompleted && workout.actualData) {
                // Use Actual data for "Completed" totals
                const actualTime = workout.actualData.moving_time || workout.actualData.movingTime || 0; // seconds
                const actualDist = (workout.actualData.distance || 0) / 1000; // meters to km

                completedDuration += actualTime;
                completedDistance += actualDist;
                completedWorkouts += 1;
            }
        });

        const progress = totalWorkouts > 0 ? (completedWorkouts / totalWorkouts) * 100 : 0;

        return {
            totalDuration,
            completedDuration,
            totalDistance,
            completedDistance,
            progress,
            totalWorkouts,
            completedWorkouts
        };
    }, [workouts]);

    const formatDuration = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        return `${h}h ${m}m`;
    };

    const navigateWeek = (direction) => {
        setSelectedDate(prevStr => {
            const date = parseDateSafe(prevStr);
            if (viewMode === 'month') {
                // Move by month
                date.setMonth(date.getMonth() + direction);
                // Reset to first of month to avoid overflow/underflow issues? 
                // Actually safer to keep "some monday" logic if we switch back, 
                // but for month view, just ensuring we are in the target month is key.
                // Let's set to the 1st of the new month to be safe.
                date.setDate(1);
            } else {
                // Move by week
                date.setDate(date.getDate() + (direction * 7));
            }
            return date.toISOString().split('T')[0];
        });
    }

    // Determine week number based on start date
    const weekNumber = useMemo(() => {
        const startOfPlan = parseDateSafe('2026-01-05');
        const current = parseDateSafe(selectedDate);
        const diffTime = Math.abs(current - startOfPlan);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        return Math.floor(diffDays / 7) + 1;
    }, [selectedDate]);

    const handleDayClick = (dateStr) => {
        router.push(`/?date=${dateStr}`);
    };

    return (
        <div className="px-4 py-6 md:px-6 md:py-8 max-w-7xl mx-auto space-y-6 md:space-y-8">
            {/* Page Header */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Training Plan</h1>
                    <p className="text-sm md:text-base text-slate-400">Week {weekNumber} • Build Phase {Math.ceil(weekNumber / 4)}</p>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="flex bg-slate-900 rounded-xl p-1 border border-slate-800 flex-1 md:flex-none">
                        <button
                            onClick={() => router.replace('/plan?view=week')}
                            className={cn("flex-1 md:flex-none px-4 py-2 text-sm font-bold rounded-lg transition-all", viewMode === 'week' ? "bg-[#3b82f6] text-white shadow-lg shadow-blue-500/20" : "text-slate-500 hover:text-slate-300")}
                        >
                            Week
                        </button>
                        <button
                            onClick={() => router.replace('/plan?view=month')}
                            className={cn("flex-1 md:flex-none px-4 py-2 text-sm font-bold rounded-lg transition-all", viewMode === 'month' ? "bg-[#3b82f6] text-white shadow-lg shadow-blue-500/20" : "text-slate-500 hover:text-slate-300")}
                        >
                            Month
                        </button>
                    </div>

                    {/* Filter Button */}
                    <div className="relative">
                        <button
                            onClick={() => setShowFilterMenu(!showFilterMenu)}
                            className={cn("p-2.5 rounded-xl border transition-colors",
                                activeFilter !== 'All' ? "bg-blue-500/10 border-blue-500/20 text-blue-400" : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                            )}
                        >
                            <Filter className="w-5 h-5" />
                        </button>
                        {showFilterMenu && (
                            <div className="absolute right-0 top-12 z-50 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-xl overflow-hidden">
                                {['All', 'Run', 'Bike', 'Swim', 'Strength', 'Soccer'].map(type => (
                                    <button
                                        key={type}
                                        onClick={() => { setActiveFilter(type); setShowFilterMenu(false); }}
                                        className={cn("w-full text-left px-4 py-3 text-sm font-medium hover:bg-slate-800 transition-colors",
                                            activeFilter === type ? "text-blue-400 bg-blue-500/5" : "text-slate-400"
                                        )}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Week Selector */}
            <div className="flex items-center justify-between bg-slate-900/50 p-3 md:p-4 rounded-2xl border border-slate-800">
                <button
                    onClick={() => navigateWeek(-1)}
                    className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2">
                    <div className="hidden md:block">
                        <CalendarIcon className="w-4 h-4 text-blue-400" />
                    </div>
                    <span className="font-bold text-sm md:text-base">{dateLabel}</span>
                </div>
                <button
                    onClick={() => navigateWeek(1)}
                    className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            {/* Weekly/Monthly Summary Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                <Card className="p-4 md:p-5 flex flex-col justify-between border-l-4 border-l-blue-500 bg-blue-500/5">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">{viewMode === 'month' ? 'Monthly' : 'Weekly'} Compliancy</p>
                            <h3 className="text-xl md:text-2xl font-bold text-white">{Math.round(stats.progress)}%</h3>
                        </div>
                        <div className="bg-blue-500/20 p-2 rounded-lg">
                            <CheckCircle2 className="w-5 h-5 text-blue-400" />
                        </div>
                    </div>
                    <div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-blue-500 h-full rounded-full transition-all duration-500" style={{ width: `${stats.progress}%` }}></div>
                        </div>
                        <p className="text-xs text-slate-500 mt-2 font-medium">{stats.completedWorkouts} of {stats.totalWorkouts} workouts completed</p>
                    </div>
                </Card>

                <Card className="p-4 md:p-5 flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Total Duration</p>
                            <div className="flex items-baseline gap-2">
                                <h3 className="text-xl md:text-2xl font-bold text-white">{formatDuration(stats.completedDuration)}</h3>
                                <span className="text-xs md:text-sm font-medium text-slate-500">/ {formatDuration(stats.totalDuration)}</span>
                            </div>
                        </div>
                        <div className="bg-slate-800 p-2 rounded-lg">
                            <Clock className="w-5 h-5 text-slate-400" />
                        </div>
                    </div>
                    <div className="mt-2">
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                            <div
                                className={cn("h-full rounded-full transition-all duration-500",
                                    stats.completedDuration >= stats.totalDuration ? "bg-emerald-500" : "bg-slate-500"
                                )}
                                style={{ width: `${Math.min(100, (stats.completedDuration / stats.totalDuration) * 100)}%` }}
                            ></div>
                        </div>
                        <p className="text-xs text-slate-500 mt-2 font-medium">Actual vs Planned Time</p>
                    </div>
                </Card>

                <Card className="p-4 md:p-5 flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Total Distance</p>
                            <div className="flex items-baseline gap-2">
                                <h3 className="text-xl md:text-2xl font-bold text-white">{stats.completedDistance.toFixed(1)} km</h3>
                                <span className="text-xs md:text-sm font-medium text-slate-500">/ {stats.totalDistance.toFixed(1)} km</span>
                            </div>
                        </div>
                        <div className="bg-slate-800 p-2 rounded-lg">
                            <TrendingUp className="w-5 h-5 text-slate-400" />
                        </div>
                    </div>
                    <div className="mt-2">
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                            <div
                                className={cn("h-full rounded-full transition-all duration-500",
                                    stats.completedDistance >= stats.totalDistance ? "bg-emerald-500" : "bg-slate-500"
                                )}
                                style={{ width: `${stats.totalDistance > 0 ? Math.min(100, (stats.completedDistance / stats.totalDistance) * 100) : 0}%` }}
                            ></div>
                        </div>
                        <p className="text-xs text-slate-500 mt-2 font-medium">Actual vs Planned Distance</p>
                    </div>
                </Card>
            </div>

            {/* Schedule List or Month Grid */}
            <div className="space-y-4 pb-12">
                {loading ? (
                    <div className="py-20 text-center text-slate-500 animate-pulse">Loading schedule...</div>
                ) : viewMode === 'month' ? (
                    /* MONTH VIEW GRID */
                    <div className="grid grid-cols-7 gap-1 md:gap-2">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                            <div key={day} className="text-center text-xs font-bold text-slate-500 py-2 uppercase tracking-widest">
                                {day}
                            </div>
                        ))}

                        {(() => {
                            const startOfMonth = parseDateSafe(selectedDate);
                            startOfMonth.setDate(1); // Ensure 1st
                            // Get day of week (0=Sun, 1=Mon...)
                            const startDay = startOfMonth.getDay();
                            const shift = startDay === 0 ? 6 : startDay - 1; // 0=Mon, 6=Sun

                            // Generate blanks
                            const blanks = Array(shift).fill(null);

                            // Generate days
                            const daysInMonth = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, 0).getDate();
                            const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

                            return [...blanks, ...days].map((day, i) => {
                                if (!day) return <div key={`blank-${i}`} className="min-h-[80px] md:min-h-[120px] bg-slate-900/20 rounded-xl border border-transparent"></div>;

                                const currentStr = `${startOfMonth.getFullYear()}-${String(startOfMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                                const isToday = currentStr === todayStr;
                                const dayWorkouts = workouts.filter(w => w.fullDate === currentStr);

                                return (
                                    <div
                                        key={day}
                                        onClick={() => handleDayClick(currentStr)}
                                        className={cn("min-h-[80px] md:min-h-[120px] bg-slate-900/50 rounded-xl border p-1 md:p-2 flex flex-col gap-1 transition-colors hover:bg-slate-800/50 relative cursor-pointer hover:border-blue-500/30",
                                            isToday ? "border-blue-500/50" : "border-slate-800"
                                        )}>
                                        <div className="flex justify-between items-start">
                                            <span className={cn("text-xs md:text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center", isToday ? "bg-blue-500 text-white" : "text-slate-400")}>{day}</span>
                                            {dayWorkouts.length > 0 && <span className="text-[10px] text-slate-600 font-mono hidden md:block">{dayWorkouts.length}</span>}
                                        </div>

                                        <div className="flex-1 flex flex-col gap-1 overflow-hidden">
                                            {dayWorkouts.map((w, idx) => (
                                                <div key={idx} className={cn("w-full h-1.5 md:h-auto md:p-1 rounded md:rounded-lg flex items-center gap-1.5 view-workout-item", getTypeColor(w.type))}>
                                                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 shrink-0 md:bg-current rounded-full" />
                                                    <span className="text-[10px] font-bold truncate hidden md:block leading-none pb-0.5">{w.type}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            });
                        })()}
                    </div>
                ) : workouts.length === 0 ? (
                    <div className="py-20 text-center text-slate-500">No activities scheduled for this view.</div>
                ) : (
                    workouts.map((item, idx) => {
                        const isItemToday = item.fullDate === todayStr;
                        return (
                            <div key={idx} className={cn(
                                "group relative flex flex-col md:flex-row items-start md:gap-6 gap-2",
                                isItemToday ? "opacity-100" : "opacity-80 hover:opacity-100 transition-opacity"
                            )}>
                                {/* Left Timeline Marker */}
                                <div className="flex md:flex-col flex-row items-center md:items-center min-w-[50px] pt-1 gap-3 md:gap-0">
                                    <span className={cn("text-xs font-bold uppercase tracking-widest mb-1", isItemToday ? "text-blue-400" : "text-slate-600")}>{item.day}</span>
                                    <span className={cn("text-xl font-mono font-bold", isItemToday ? "text-white" : "text-slate-400")}>{item.date}</span>
                                    {idx !== workouts.length - 1 && <div className="hidden md:block w-px h-24 bg-slate-800 my-4"></div>}
                                </div>

                                {/* Workout Card */}
                                <Card className={cn(
                                    "flex-1 w-full p-4 md:p-5 border-t-4 md:border-t-0 md:border-l-4",
                                    isItemToday ? "border-t-blue-500 md:border-l-blue-500 bg-blue-500/5" : "border-transparent bg-slate-900/50"
                                )}>
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className={cn("w-10 h-10 md:w-12 md:h-12 rounded-2xl border flex items-center justify-center shrink-0", getTypeColor(item.type))}>
                                                {getIcon(item.type)}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold border", getTypeColor(item.type))}>
                                                        {item.type.toUpperCase()}
                                                    </span>
                                                    {item.isCompleted && <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">DONE</span>}
                                                </div>
                                                <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors">{item.title}</h3>
                                                <p className="text-sm text-slate-500 line-clamp-1">{item.description}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between md:justify-end gap-4 md:gap-6 mt-2 md:mt-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800/50 md:border-none">
                                            <div className="flex items-center gap-2 text-slate-400">
                                                <Clock className="w-4 h-4" />
                                                <span className="text-sm font-medium">{item.duration ? `${item.duration / 60}m` : '---'}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-400">
                                                <Zap className="w-4 h-4" />
                                                <span className="text-sm font-medium">{item.type === 'Rest' ? '---' : `${Math.round(item.duration * 0.8 / 60)} TSS`}</span>
                                            </div>
                                            <button className="p-2 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-400 hover:text-white transition-colors hidden md:block">
                                                <ChevronRight className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </Card>

                                {/* Today Indicator Pulsing Dot - Mobile optimized position */}
                                {isItemToday && (
                                    <div className="absolute left-[-6px] top-6 md:left-[-6px] md:top-8 w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.8)] animate-pulse hidden md:block"></div>
                                )}
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    );
}
