"use client";

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Calendar as CalendarIcon, Filter, ChevronLeft, ChevronRight, Clock, Zap, CheckCircle2, TrendingUp, GripVertical } from 'lucide-react';
import { RunIcon, SwimIcon, BikeIcon, GymIcon, SoccerIcon, MultiIcon } from '@/components/icons/SportIcons';
import { useWeeklyWorkouts } from '@/hooks/useWeeklyWorkouts';
import { useMonthlyWorkouts } from '@/hooks/useMonthlyWorkouts';
import { useActivities } from '@/hooks/useActivities';
import { cn } from '@/lib/utils';
import Card from '@/components/ui/Card';

// DnD Kit
import {
    DndContext,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors,
    DragOverlay,
    defaultDropAnimationSideEffects,
} from '@dnd-kit/core';
import {
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function PlanLoading() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
    );
}

export default function Plan() {
    return (
        <Suspense fallback={<PlanLoading />}>
            <PlanContent />
        </Suspense>
    );
}

// ------------------------------------------------------------------
// HELPERS
// ------------------------------------------------------------------
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

// Helper to safely parse "YYYY-MM-DD"
const parseDateSafe = (dateStr) => {
    if (!dateStr) return new Date();
    const parts = dateStr.split('-');
    return new Date(parts[0], parts[1] - 1, parts[2], 12, 0, 0); // Noon to avoid timezone issues
};

// Format seconds to Hh Mm
const formatDuration = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${h}h ${m}m`;
};

// ------------------------------------------------------------------
// SORTABLE ITEM COMPONENT
// ------------------------------------------------------------------
function SortableWorkoutItem({ item, isOverlay }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: item._id,
        data: item,
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
        opacity: isDragging ? 0.3 : 1,
        touchAction: 'none', // Critical for touch dragging
    };

    const isItemToday = item.isToday;

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="touch-none group relative w-full"
        >
            <Card className={cn(
                "w-full p-4 border-l-4 transition-all",
                isItemToday ? "border-l-blue-500 bg-blue-500/5 shadow-blue-500/10" : "border-l-transparent bg-slate-900/50 hover:bg-slate-800/80",
                isOverlay ? "shadow-2xl border-blue-500 rotate-2 scale-105 z-50 bg-slate-900 cursor-grabbing" : ""
            )}>
                <div className="flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                            <div className={cn("w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 mt-0.5", getTypeColor(item.type))}>
                                {getIcon(item.type)}
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold border", getTypeColor(item.type))}>
                                        {item.type.toUpperCase()}
                                    </span>
                                    {item.isCompleted && <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">DONE</span>}
                                </div>
                                <h3 className={cn("font-bold text-sm truncate", isItemToday ? "text-white" : "text-slate-200")}>{item.title}</h3>
                                <p className="text-xs text-slate-500 line-clamp-1">{item.description}</p>
                            </div>
                        </div>

                        {/* Drag Handle */}
                        <div
                            {...attributes}
                            {...listeners}
                            className="p-2 -mr-2 text-slate-600 hover:text-slate-400 cursor-grab active:cursor-grabbing"
                        >
                            <GripVertical className="w-5 h-5" />
                        </div>
                    </div>

                    <div className="flex items-center gap-4 border-t border-slate-800/50 pt-3 mt-1">
                        <div className="flex items-center gap-1.5 text-slate-400">
                            <Clock className="w-3.5 h-3.5" />
                            <span className="text-xs font-medium">{item.duration ? `${item.duration / 60}m` : '---'}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400">
                            <Zap className="w-3.5 h-3.5" />
                            <span className="text-xs font-medium">{item.type === 'Rest' ? '---' : `${Math.round(item.duration * 0.8 / 60)} TSS`}</span>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}

// ------------------------------------------------------------------
// MONTH DAY ITEM (No Drag)
// ------------------------------------------------------------------
function MonthDayCell({ day, isToday, isCurrentMonth }) {
    const hasWorkouts = day.workouts && day.workouts.length > 0;

    return (
        <div className={cn("min-h-[100px] border border-slate-800 p-2 flex flex-col gap-1 transition-colors hover:bg-slate-900/50",
            isToday ? "bg-blue-500/5" : "bg-slate-900/20",
            !isCurrentMonth && "opacity-40 bg-slate-950"
        )}>
            <div className="flex justify-between items-start">
                <span className={cn("text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full",
                    isToday ? "bg-blue-500 text-white" : "text-slate-500"
                )}>
                    {day.dayNum}
                </span>
            </div>

            <div className="flex flex-col gap-1 mt-1 overflow-y-auto max-h-[80px] no-scrollbar">
                {hasWorkouts && day.workouts.map((w, i) => (
                    <div key={i} className={cn("text-[10px] px-1.5 py-1 rounded truncate border border-l-2", getTypeColor(w.type).replace('bg-', 'bg-opacity-20 '))} title={w.title}>
                        <span className="font-bold mr-1">{w.type.substring(0, 1)}</span>
                        {w.title}
                    </div>
                ))}
            </div>
        </div>
    );
}

// ------------------------------------------------------------------
// DROPPABLE DAY CONTAINER
// ------------------------------------------------------------------
function DayColumn({ dayDate, items, isToday, onDayClick }) {
    const dateObj = parseDateSafe(dayDate);
    const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
    const dayNum = dateObj.getDate();

    // We use the dayDate (YYYY-MM-DD) as the ID for the SortableContext to drop into
    const { setNodeRef } = useSortable({
        id: dayDate,
        data: { type: 'day', dateStr: dayDate },
        disabled: true, // It's a localized container, not draggable itself
    });

    return (
        <div ref={setNodeRef} className={cn("flex flex-col gap-2 min-h-[150px] rounded-xl p-2 md:p-3 transition-colors",
            isToday ? "bg-blue-500/5 border border-blue-500/20" : "bg-slate-900/20 border border-slate-800/50"
        )}>
            {/* Day Header */}
            <div
                onClick={() => onDayClick(dayDate)}
                className="flex items-center gap-2 mb-2 cursor-pointer hover:opacity-80"
            >
                <div className={cn("flex flex-col items-center justify-center w-10 h-10 rounded-xl border",
                    isToday ? "bg-blue-500 text-white border-blue-500" : "bg-slate-900 border-slate-700 text-slate-400"
                )}>
                    <span className="text-[10px] font-bold uppercase leading-none">{dayName}</span>
                    <span className="text-sm font-bold leading-none">{dayNum}</span>
                </div>
                {items.length === 0 && <span className="text-xs text-slate-600 font-medium italic">Rest Day</span>}
            </div>

            {/* Workouts List */}
            <SortableContext
                id={dayDate}
                items={items.map(i => i._id)} // Pass IDs only
                strategy={verticalListSortingStrategy}
            >
                <div className="flex flex-col gap-3 min-h-[50px]">
                    {items.map((item) => (
                        <SortableWorkoutItem key={item._id} item={item} />
                    ))}
                </div>
            </SortableContext>
        </div>
    );
}

// ------------------------------------------------------------------
// MAIN CONTENT
// ------------------------------------------------------------------
function PlanContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Base Date State
    const [selectedDate, setSelectedDate] = useState(() => {
        const now = new Date();
        const day = now.getDay();
        const diff = day === 0 ? -6 : 1 - day; // Adjust to Monday
        const monday = new Date(now);
        monday.setDate(now.getDate() + diff);
        return monday.toISOString().split('T')[0];
    });

    // View Mode & Filter State
    const viewMode = searchParams.get('view') === 'month' ? 'month' : 'week';
    const [activeFilter, setActiveFilter] = useState('All');
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const [activeSlide, setActiveSlide] = useState(0);
    const [todayStr, setTodayStr] = useState('');

    useEffect(() => {
        setTodayStr(new Date().toLocaleDateString('en-CA'));
    }, []);

    // Data Hooks
    const { workouts: plannedWorkouts } = useWeeklyWorkouts(selectedDate);
    const { calendarGrid } = useMonthlyWorkouts(selectedDate);
    const { activities } = useActivities();

    // Local State for Drag & Drop
    const [localWorkouts, setLocalWorkouts] = useState([]);

    useEffect(() => {
        if (plannedWorkouts) {
            const enhanced = plannedWorkouts.map((w, idx) => ({
                ...w,
                _id: `${w.fullDate}-${w.type}-${idx}-${Math.random().toString(36).substr(2, 9)}`,
                isCompleted: false,
                actualData: null
            }));
            setLocalWorkouts(enhanced);
        }
    }, [plannedWorkouts]);

    // Update Completion Status Logic & Filter
    const workouts = useMemo(() => {
        let list;

        if (viewMode === 'month') {
            list = calendarGrid
                .filter(day => day.isCurrentMonth)
                .flatMap(day => day.workouts);
        } else {
            list = localWorkouts;
        }

        // Apply Local Updates & Completion Logic
        const merged = list.map(planned => {
            const actual = activities.find(act => {
                const dateStr = act.start_date_local || act.start_date || act.startDate;
                if (!act || !dateStr) return false;
                try {
                    const actDate = dateStr.split('T')[0];
                    return actDate === planned.fullDate &&
                        ((planned.type === 'Run' && act.type === 'Run') ||
                            (planned.type === 'Bike' && (act.type === 'Ride' || act.type === 'VirtualRide')) ||
                            (planned.type === 'Swim' && act.type === 'Swim') ||
                            (planned.type === 'Strength' && act.type === 'WeightTraining') ||
                            planned.type === 'Soccer' && act.type === 'Soccer');
                } catch { return false; }
            });
            return { ...planned, actualData: actual, isCompleted: !!actual };
        });

        // Apply Category Filter
        if (activeFilter !== 'All') {
            return merged.filter(w => w.type === activeFilter);
        }

        return merged;
    }, [localWorkouts, calendarGrid, viewMode, activities, activeFilter]);


    // Stats Calculation
    const stats = useMemo(() => {
        let totalDuration = 0, completedDuration = 0;
        let totalDistance = 0, completedDistance = 0;
        let totalWorkouts = workouts.length, completedWorkouts = 0;

        workouts.forEach(w => {
            totalDuration += w.duration || 0;
            totalDistance += w.distance || 0;
            if (w.isCompleted && w.actualData) {
                completedDuration += (w.actualData.moving_time || 0);
                completedDistance += ((w.actualData.distance || 0) / 1000);
                completedWorkouts++;
            }
        });

        return {
            progress: totalWorkouts > 0 ? (completedWorkouts / totalWorkouts) * 100 : 0,
            totalDuration, completedDuration,
            totalDistance, completedDistance,
            totalWorkouts, completedWorkouts
        };
    }, [workouts]);


    // DnD Sensors
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
        useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const [activeId, setActiveId] = useState(null);

    const handleDragStart = (event) => {
        setActiveId(event.active.id);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        setActiveId(null);

        if (!over) return;

        const activeWorkout = localWorkouts.find(w => w._id === active.id);
        if (!activeWorkout) return;

        let newDateStr = null;

        if (over.id.toString().match(/^\d{4}-\d{2}-\d{2}$/)) {
            newDateStr = over.id;
        } else {
            const overWorkout = localWorkouts.find(w => w._id === over.id);
            if (overWorkout) newDateStr = overWorkout.fullDate;
        }

        if (newDateStr && newDateStr !== activeWorkout.fullDate) {
            setLocalWorkouts(prev => {
                const updated = prev.map(w => {
                    if (w._id === active.id) {
                        const d = parseDateSafe(newDateStr);
                        return {
                            ...w,
                            fullDate: newDateStr,
                            date: String(d.getDate()),
                            day: d.toLocaleDateString('en-US', { weekday: 'short' })
                        };
                    }
                    return w;
                });
                return updated;
            });
        }
    };


    // Generate Days for the current week
    const weekDays = useMemo(() => {
        const start = parseDateSafe(selectedDate);
        return Array.from({ length: 7 }, (_, i) => {
            const d = new Date(start);
            d.setDate(start.getDate() + i);
            return d.toISOString().split('T')[0];
        });
    }, [selectedDate]);


    // Time Navigation
    const navigateTime = (direction) => {
        setSelectedDate(prev => {
            const d = parseDateSafe(prev);
            if (viewMode === 'month') {
                d.setMonth(d.getMonth() + direction);
                d.setDate(1);
            } else {
                d.setDate(d.getDate() + (direction * 7));
            }
            return d.toISOString().split('T')[0];
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

    // Header Date Label
    const dateLabel = useMemo(() => {
        const d = parseDateSafe(selectedDate);
        if (viewMode === 'month') {
            return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        } else {
            const start = new Date(d);
            const end = new Date(start);
            end.setDate(start.getDate() + 6);
            const options = { month: 'short', day: 'numeric' };
            return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}, ${start.getFullYear()}`;
        }
    }, [selectedDate, viewMode]);


    return (
        <div className="px-4 py-6 md:px-6 md:py-8 max-w-7xl mx-auto space-y-6 md:space-y-8 select-none">
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
                    onClick={() => navigateTime(-1)}
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
                    onClick={() => navigateTime(1)}
                    className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            {/* Weekly/Monthly Summary Carousel */}
            <div className="w-full relative">
                <Card className="p-0 overflow-hidden bg-slate-900 border-slate-800 touch-pan-y">
                    <div
                        className="flex transition-transform duration-300 ease-out will-change-transform"
                        style={{ transform: `translateX(-${activeSlide * 100}%)` }}
                        onTouchStart={(e) => {
                            e.currentTarget.dataset.startX = e.touches[0].clientX;
                            e.currentTarget.dataset.isDragging = "true";
                        }}
                        onTouchMove={(_) => {
                            // Optional: track delta for live feedback if desired, but simple swipe is cleaner
                        }}
                        onTouchEnd={(e) => {
                            if (e.currentTarget.dataset.isDragging !== "true") return;
                            e.currentTarget.dataset.isDragging = "false";

                            const startX = parseFloat(e.currentTarget.dataset.startX);
                            const endX = e.changedTouches[0].clientX;
                            const delta = startX - endX;
                            const threshold = 50; // min swipe distance

                            if (Math.abs(delta) > threshold) {
                                if (delta > 0 && activeSlide < 2) {
                                    setActiveSlide(prev => prev + 1);
                                } else if (delta < 0 && activeSlide > 0) {
                                    setActiveSlide(prev => prev - 1);
                                }
                            }
                        }}
                    >
                        {/* SLIDE 1: Compliancy */}
                        <div className="min-w-full p-4 md:p-5 flex flex-col justify-between">
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
                        </div>

                        {/* SLIDE 2: Duration */}
                        <div className="min-w-full p-4 md:p-5 flex flex-col justify-between bg-slate-900">
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
                        </div>

                        {/* SLIDE 3: Distance */}
                        <div className="min-w-full p-4 md:p-5 flex flex-col justify-between bg-slate-900">
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
                        </div>
                    </div>

                    {/* Pagination Dots */}
                    <div className="flex justify-center gap-1.5 pb-4 bg-slate-900">
                        {[0, 1, 2].map(idx => (
                            <div
                                key={idx}
                                className={cn("w-1.5 h-1.5 rounded-full transition-colors duration-300",
                                    activeSlide === idx ? "bg-blue-500" : "bg-slate-700"
                                )}
                            />
                        ))}
                    </div>
                </Card>
            </div>

            {/* CALENDAR/WEEK VIEW */}
            {viewMode === 'month' ? (
                <div className="grid grid-cols-7 gap-1 md:gap-2">
                    {/* Weekday Headers */}
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                        <div key={d} className="text-center text-xs font-bold text-slate-500 py-2 uppercase">{d}</div>
                    ))}
                    {/* Days Grid */}
                    {calendarGrid.map((day, i) => (
                        <MonthDayCell
                            key={i}
                            day={day}
                            isToday={day.isToday}
                            isCurrentMonth={day.isCurrentMonth}
                        />
                    ))}
                </div>
            ) : (
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCorners}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                >
                    <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                        {weekDays.map(dayDate => {
                            const dayWorkouts = workouts.filter(w => w.fullDate === dayDate);
                            const isDayToday = dayDate === todayStr;

                            return (
                                <DayColumn
                                    key={dayDate}
                                    dayDate={dayDate}
                                    items={dayWorkouts}
                                    isToday={isDayToday}
                                    onDayClick={(d) => router.push(`/?date=${d}`)}
                                />
                            )
                        })}
                    </div>

                    <DragOverlay dropAnimation={{ sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.5' } } }) }}>
                        {activeId ? (
                            <SortableWorkoutItem
                                item={localWorkouts.find(w => w._id === activeId)}
                                isOverlay
                            />
                        ) : null}
                    </DragOverlay>
                </DndContext>
            )}
        </div>
    );
}
