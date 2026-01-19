import React from 'react';
import { Activity, Waves, Bike, Trophy, Zap, Clock } from 'lucide-react';

export const user = {
    name: "Alex",
    race: "Ironman 70.3 Mallorca",
    daysLeft: 42,
    hrvStatus: "High",
    fatigue: "Low",
    ftp: 285,
    weight: 72,
    height: 180
};

export const weeklySchedule = [
    // WEEK 1 — Quality Baseline (05/01/2026 - 11/01/2026)
    { day: "Mon", date: "05", fullDate: "2026-01-05", type: "Swim", completed: true, title: "Swim Tech", description: "Catch-up met pull-buoy & steady sets.", duration: 2100, distance: 0.95, workout: { warmup: { distance: 100 }, drill: { distance: 25, drill: "Catch-up met pull-buoy", rest: 15, sets: 8 }, main: { distance: 50, RPE: 6, rest: 20, sets: 12 }, coolDown: { distance: 50 } } },
    { day: "Tue", date: "06", fullDate: "2026-01-06", type: "Soccer", completed: true, title: "Soccer Practice", description: "Soccer practice", duration: 5400 },
    { day: "Wed", date: "07", fullDate: "2026-01-07", type: "Run", completed: true, title: "Key Session: Run Intervals", description: "Run: 8x400m @ 4:05/km.", duration: 2700, workout: { warmup: { time: 600 }, main: { distance: 400, rest: 60, sets: 8, pace: "4:05/km" }, coolDown: { time: 600 } } },
    { day: "Wed", date: "07", fullDate: "2026-01-07", type: "Bike", completed: true, title: "Key Session: Bike Intervals", description: "Sweet Spot Intervals. 2x10 min @ 88–90% FTP.", duration: 2700, workout: { warmup: { time: 600 }, main: { time: 600, rest: 300, sets: 2, watts: "88-90% FTP" }, coolDown: { time: 600 } } },
    { day: "Thu", date: "08", fullDate: "2026-01-08", type: "Soccer", completed: true, title: "Soccer Practice", description: "Soccer practice", duration: 5400 },
    { day: "Fri", date: "09", fullDate: "2026-01-09", type: "Swim", completed: true, title: "Swim Endurance", description: "Fist Drill & 10x50m @ RPE 7.", duration: 1800, distance: 0.7, workout: { warmup: { distance: 100 }, drill: { distance: 50, drill: "Fist Drill", rest: 15, sets: 6 }, main: { distance: 50, RPE: 7, rest: 15, sets: 10, description: "met pull-buoy" }, coolDown: { distance: 50 } } },
    { day: "Sat", date: "10", fullDate: "2026-01-10", type: "Run", completed: true, title: "Fartlek training", description: "8x 2' @ 3:50-3:55 (rec: 2’ jog).", duration: 3000, distance: 8.5, workout: { warmup: { time: 600 }, main: { time: 120, rest: 120, sets: 8, pace: "3:50-3:55" }, coolDown: { time: 300 } } },
    { day: "Sun", date: "11", fullDate: "2026-01-11", type: "Bike", completed: true, title: "Key Session: Brick (Bike)", description: "Bike: 60 min @ 75% FTP.", duration: 3600, workout: { main: { time: 3600, watts: "75% FTP" } } },
    { day: "Sun", date: "11", fullDate: "2026-01-11", type: "Run", completed: true, title: "Key Session: Brick (Run)", description: "Run: 15 min @ 4:40/km.", duration: 900, workout: { main: { time: 900, pace: "4:40/km" } } },

    // WEEK 2 — Threshold Progression (12/01/2026 - 18/01/2026)
    { day: "Mon", date: "12", fullDate: "2026-01-12", type: "Swim", completed: false, title: "Swim Tech", description: "8x25m Zipper Drill. 6x100m gebroken.", duration: 2400, distance: 1, workout: { warmup: { distance: 100 }, drill: { distance: 25, drill: "Zipper Drill", sets: 8 }, main: { distance: 100, description: "Gebroken als 4x25m met 10' rust", sets: 6, RPE: 7 } } },
    { day: "Tue", date: "13", fullDate: "2026-01-13", type: "Soccer", completed: false, title: "Soccer Practice", description: "Regular training session.", duration: 5400 },
    { day: "Wed", date: "14", fullDate: "2026-01-14", type: "Run", completed: false, title: "Key Session: Run Intervals", description: "3x2km @ 4:15/km (rec: 3' jog).", duration: 3000, workout: { warmup: { time: 900 }, main: { distance: 2000, sets: 3, pace: "4:15/km", rest: 180 }, coolDown: { time: 300 } } },
    { day: "Wed", date: "14", fullDate: "2026-01-14", type: "Bike", completed: false, title: "Key Session: Threshold Intervals", description: "3x8 min @ 95–100% FTP.", duration: 3000, workout: { warmup: { time: 600 }, main: { time: 480, sets: 3, watts: "95% FTP", rest: 240 }, coolDown: { time: 480 } } },
    { day: "Thu", date: "15", fullDate: "2026-01-15", type: "Soccer", completed: false, title: "Soccer Practice", description: "Regular training session.", duration: 5400 },
    { day: "Fri", date: "16", fullDate: "2026-01-16", type: "Swim", completed: false, title: "Swim Strength", description: "4x50m Sculling. 8x75m (25 drill/50 swim).", duration: 2700, distance: 1.0, workout: { warmup: { distance: 150 }, drill: { distance: 50, drill: "Sculling", sets: 4 }, main: { distance: 75, sets: 8, RPE: 7, description: "25m drill / 50m swim met pull-buoy" } } },
    { day: "Sat", date: "17", fullDate: "2026-01-17", type: "Soccer", completed: false, title: "Soccer Match", description: "Weekly competition.", duration: 5400 },
    { day: "Sun", date: "18", fullDate: "2026-01-18", type: "Run", completed: false, title: "Key Session: Long Run", description: "14 km @ 5:20/km (Steady Z2).", duration: 4500, distance: 14.0, workout: { main: { distance: 14000, pace: "5:20/km", hr_zones: ["Z2"] } } },

    // WEEK 3 — Peak MED Intensity (19/01/2026 - 25/01/2026)
    { day: "Mon", date: "19", fullDate: "2026-01-19", type: "Swim", completed: false, title: "Swim Tech", description: "8x25m Sighting drills. 10x50m @ RPE 8.", duration: 2400, distance: 0.8, workout: { warmup: { distance: 100 }, drill: { distance: 25, drill: "Sighting", sets: 8 }, main: { distance: 50, sets: 10, RPE: 8, rest: 20 } } },
    { day: "Tue", date: "20", fullDate: "2026-01-20", type: "Soccer", completed: false, title: "Soccer Practice", description: "Regular training session.", duration: 5400 },
    { day: "Wed", date: "21", fullDate: "2026-01-21", type: "Run", completed: false, title: "Key Session: Run Intervals", description: "10x400m @ 4:00/km (rec: 1' jog).", duration: 2700, workout: { warmup: { time: 600 }, main: { distance: 400, sets: 10, pace: "4:00/km", rest: 60 }, coolDown: { time: 600 } } },
    { day: "Wed", date: "21", fullDate: "2026-01-21", type: "Bike", completed: false, title: "Key Session: Over-Under Session", description: "3 sets van (2 min @ 95% + 2 min @ 105% FTP).", duration: 2700, workout: { warmup: { time: 600 }, main: { sets: 3, description: "2 min @ 95% + 2 min @ 105% FTP", rest: 300 } } },
    { day: "Thu", date: "22", fullDate: "2026-01-22", type: "Soccer", completed: false, title: "Soccer Practice", description: "Regular training session.", duration: 5400 },
    { day: "Fri", date: "23", fullDate: "2026-01-23", type: "Swim", completed: false, title: "Swim Endurance", description: "6x50m (25m Fist / 25m Free). 4x200m @ RPE 7.", duration: 2700, distance: 1.2, workout: { warmup: { distance: 100 }, drill: { distance: 50, drill: "25m Fist / 25m Free", sets: 6 }, main: { distance: 200, sets: 4, RPE: 7, rest: 30, description: "Freestyle met pull-buoy" } } },
    { day: "Sat", date: "24", fullDate: "2026-01-24", type: "Soccer", completed: false, title: "Soccer Match", description: "Weekly competition.", duration: 5400 },
    { day: "Sun", date: "25", fullDate: "2026-01-25", type: "Bike", completed: false, title: "Key Session: Brick (Bike)", description: "75 min (inclusief 4x8' @ 92% FTP).", duration: 4500, workout: { main: { time: 4500, description: "incl. 4x8' @ 92% FTP" } } },
    { day: "Sun", date: "25", fullDate: "2026-01-25", type: "Run", completed: false, title: "Key Session: Brick (Run)", description: "20 min @ 4:30/km.", duration: 1200, workout: { main: { time: 1200, pace: "4:30/km" } } },

    // WEEK 4 — Specific Power & Tempo (26/01/2026 - 01/02/2026)
    { day: "Mon", date: "26", fullDate: "2026-01-26", type: "Swim", completed: false, title: "Swim Tech", description: "8x25m 6-1-6 rotation focus. 12x50m @ RPE 7.", duration: 2400, distance: 0.9, workout: { warmup: { distance: 100 }, drill: { distance: 25, drill: "6-1-6 rotation", sets: 8 }, main: { distance: 50, sets: 12, RPE: 7, rest: 15 } } },
    { day: "Tue", date: "27", fullDate: "2026-01-27", type: "Soccer", completed: false, title: "Soccer Practice", description: "Regular training session.", duration: 5400 },
    { day: "Wed", date: "28", fullDate: "2026-01-28", type: "Run", completed: false, title: "Key Session: Run Quality", description: "2x4km @ 4:15/km (rec: 1km EZ).", duration: 3600, workout: { warmup: { time: 900 }, main: { distance: 4000, sets: 2, pace: "4:15/km", rest: 300 }, coolDown: { time: 300 } } },
    { day: "Wed", date: "28", fullDate: "2026-01-28", type: "Bike", completed: false, title: "Key Session: VO2 Max Boost", description: "5x3 min @ 110% FTP (HR Z5, rec: 3' Z1).", duration: 2700, workout: { warmup: { time: 600 }, main: { time: 180, sets: 5, watts: "110% FTP", rest: 180 }, coolDown: { time: 300 } } },
    { day: "Thu", date: "29", fullDate: "2026-01-29", type: "Soccer", completed: false, title: "Soccer Practice", description: "Regular training session.", duration: 5400 },
    { day: "Fri", date: "30", fullDate: "2026-01-30", type: "Swim", completed: false, title: "Swim Strength", description: "6x50m (25m Sighting / 25m Free). 15x50m met pull-buoy.", duration: 2700, distance: 1.25, workout: { warmup: { distance: 150 }, drill: { distance: 50, drill: "25m Sighting / 25m Free", sets: 6 }, main: { distance: 50, sets: 15, RPE: 7, rest: 10, description: "met pull-buoy" } } },
    { day: "Sat", date: "31", fullDate: "2026-01-31", type: "Soccer", completed: false, title: "Soccer Match", description: "Weekly competition.", duration: 5400 },
    { day: "Sun", date: "01", fullDate: "2026-02-01", type: "Run", completed: false, title: "Key Session: Long Run", description: "16 km @ 5:15/km.", duration: 5100, distance: 16.0, workout: { main: { distance: 16000, pace: "5:15/km" } } },

    // WEEK 5 — Performance Peak (02/02/2026 - 08/02/2026)
    { day: "Mon", date: "02", fullDate: "2026-02-02", type: "Swim", completed: false, title: "Swim Tech", description: "4x50m Single Arm. 6x100m @ RPE 8.", duration: 2700, distance: 1.0, workout: { warmup: { distance: 100 }, drill: { distance: 50, drill: "Single Arm", sets: 4 }, main: { distance: 100, sets: 6, RPE: 8, rest: 25 } } },
    { day: "Tue", date: "03", fullDate: "2026-02-03", type: "Soccer", completed: false, title: "Soccer Practice", description: "Regular training session.", duration: 5400 },
    { day: "Wed", date: "04", fullDate: "2026-02-04", type: "Run", completed: false, title: "Key Session: Run Quality", description: "6km @ 4:25/km + 2x1km @ 4:05/km.", duration: 3600, workout: { warmup: { time: 900 }, main: { description: "6km @ 4:25 + 2x1km @ 4:05" }, coolDown: { time: 600 } } },
    { day: "Wed", date: "04", fullDate: "2026-02-04", type: "Bike", completed: false, title: "Key Session: Threshold Simulation", description: "2x15 min @ 100% FTP (HR Z4, rec: 5' Z1).", duration: 3000, workout: { warmup: { time: 600 }, main: { time: 900, sets: 2, watts: "100% FTP", rest: 300 }, coolDown: { time: 600 } } },
    { day: "Thu", date: "05", fullDate: "2026-02-05", type: "Soccer", completed: false, title: "Soccer Practice", description: "Regular training session.", duration: 5400 },
    { day: "Fri", date: "06", fullDate: "2026-02-06", type: "Swim", completed: false, title: "Swim Performance", description: "8x25m Fist Drill. 20x50m @ Race Pace RPE 8.", duration: 3000, distance: 1.3, workout: { warmup: { distance: 100 }, drill: { distance: 25, drill: "Fist Drill", sets: 8 }, main: { distance: 50, sets: 20, RPE: 8, rest: 15, description: "Race Pace" } } },
    { day: "Sat", date: "07", fullDate: "2026-02-07", type: "Soccer", completed: false, title: "Soccer Match", description: "Weekly competition.", duration: 5400 },
    { day: "Sun", date: "08", fullDate: "2026-02-08", type: "Bike", completed: false, title: "Big Brick (Bike Simulation)", description: "90 min @ 85% FTP.", duration: 5400, workout: { main: { time: 5400, watts: "85% FTP" } } },
    { day: "Sun", date: "08", fullDate: "2026-02-08", type: "Run", completed: false, title: "Big Brick (Run Simulation)", description: "30 min @ 4:25/km.", duration: 1800, workout: { main: { time: 1800, pace: "4:25/km" } } },

    // WEEK 6 — Maximale Adaptatie (09/02/2026 - 15/02/2026)
    { day: "Mon", date: "09", fullDate: "2026-02-09", type: "Swim", completed: false, title: "Swim Tech", description: "6x50m Catch-up. 10x50m FAST @ RPE 9.", duration: 2700, distance: 0.9, workout: { warmup: { distance: 100 }, drill: { distance: 50, drill: "Catch-up (DPS focus)", sets: 6 }, main: { distance: 50, sets: 10, RPE: 9, rest: 30, description: "FAST" } } },
    { day: "Tue", date: "10", fullDate: "2026-02-10", type: "Soccer", completed: false, title: "Soccer Practice", description: "Regular training session.", duration: 5400 },
    { day: "Wed", date: "11", fullDate: "2026-02-11", type: "Run", completed: false, title: "Key Session: Peak Intervals", description: "4x2km @ 4:10/km.", duration: 4200, workout: { warmup: { time: 900 }, main: { distance: 2000, sets: 4, pace: "4:10/km" }, coolDown: { time: 600 } } },
    { day: "Wed", date: "11", fullDate: "2026-02-11", type: "Bike", completed: false, title: "Key Session: Peak Over-Unders", description: "4 sets van (2 min @ 95% / 2 min @ 110% FTP).", duration: 2700, workout: { warmup: { time: 600 }, main: { sets: 4, description: "2 min @ 95% / 2 min @ 110% FTP" }, coolDown: { time: 420 } } },
    { day: "Thu", date: "12", fullDate: "2026-02-12", type: "Soccer", completed: false, title: "Soccer Practice", description: "Regular training session.", duration: 5400 },
    { day: "Fri", date: "13", fullDate: "2026-02-13", type: "Strength", completed: false, title: "Kracht B", description: "Explosieve reps.", duration: 1200 },
    { day: "Fri", date: "13", fullDate: "2026-02-13", type: "Swim", completed: false, title: "Swim Strength", description: "4x50m Sculling. 400m non-stop Tijdrit.", duration: 3000, distance: 0.7, workout: { warmup: { distance: 100 }, drill: { distance: 50, drill: "Sculling", sets: 4 }, main: { distance: 400, description: "Tijdrit non-stop met pull-buoy" } } },
    { day: "Sat", date: "14", fullDate: "2026-02-14", type: "Soccer", completed: false, title: "Soccer Match", description: "Weekly competition.", duration: 5400 },
    { day: "Sun", date: "15", fullDate: "2026-02-15", type: "Run", completed: false, title: "Key Session: Long Run (Peak Distance)", description: "18 km @ 5:20/km.", duration: 6000, distance: 18.0, workout: { main: { distance: 18000, pace: "5:20/km" } } },

    // WEEK 7 — DELOAD / CONSOLIDATION (16/02/2026 - 22/02/2026)
    { day: "Mon", date: "16", fullDate: "2026-02-16", type: "Strength", completed: false, title: "Kracht (Maintenance)", description: "1 set per oefening, 8-10 reps.", duration: 600 },
    { day: "Mon", date: "16", fullDate: "2026-02-16", type: "Swim", completed: false, title: "Swim (EZ)", description: "Drills only (EZ).", duration: 1500, distance: 0.5, workout: { warmup: { distance: 100 }, drill: { description: "Drills only EZ" } } },
    { day: "Tue", date: "17", fullDate: "2026-02-17", type: "Soccer", completed: false, title: "Soccer Practice", description: "Regular training session.", duration: 5400 },
    { day: "Wed", date: "18", fullDate: "2026-02-18", type: "Run", completed: false, title: "Run (Maintenance)", description: "2x1km @ 4:15/km.", duration: 1800, workout: { warmup: { time: 600 }, main: { distance: 1000, sets: 2, pace: "4:15/km" }, coolDown: { time: 300 } } },
    { day: "Wed", date: "18", fullDate: "2026-02-18", type: "Bike", completed: false, title: "Bike (Maintenance)", description: "3x3 min @ 100% FTP (Openers).", duration: 1500, workout: { warmup: { time: 600 }, main: { time: 180, sets: 3, watts: "100% FTP" }, coolDown: { time: 360 } } },
    { day: "Thu", date: "19", fullDate: "2026-02-19", type: "Soccer", completed: false, title: "Soccer Practice", description: "Regular training session.", duration: 5400 },
    { day: "Fri", date: "20", fullDate: "2026-02-20", type: "Strength", completed: false, title: "Kracht (Maintenance)", description: "1 set per oefening.", duration: 600 },
    { day: "Fri", date: "20", fullDate: "2026-02-20", type: "Swim", completed: false, title: "Swim (EZ)", description: "400m EZ.", duration: 1500, distance: 0.4, workout: { main: { distance: 400, description: "EZ" } } },
    { day: "Sat", date: "21", fullDate: "2026-02-21", type: "Soccer", completed: false, title: "Soccer Match", description: "Low intensity football match.", duration: 5400 },
    { day: "Sun", date: "22", fullDate: "2026-02-22", type: "Run", completed: false, title: "Short Run", description: "8 km @ 5:40/km (Z1).", duration: 2700, distance: 8.0, workout: { main: { distance: 8000, pace: "5:40/km", hr_zones: ["Z1"] } } },
];

export const analyticsData = {
    fitness: [
        { day: 'Mon', ctl: 65, atl: 70, tsb: -5 },
        { day: 'Tue', ctl: 66, atl: 75, tsb: -9 },
        { day: 'Wed', ctl: 66, atl: 72, tsb: -6 },
        { day: 'Thu', ctl: 67, atl: 80, tsb: -13 },
        { day: 'Fri', ctl: 67, atl: 75, tsb: -8 },
        { day: 'Sat', ctl: 68, atl: 85, tsb: -17 },
        { day: 'Sun', ctl: 69, atl: 82, tsb: -13 },
    ],
    zoneDistribution: [
        { name: 'Z1', value: 20, color: '#94a3b8' },
        { name: 'Z2', value: 55, color: '#22c55e' },
        { name: 'Z3', value: 15, color: '#eab308' },
        { name: 'Z4', value: 8, color: '#f97316' },
        { name: 'Z5', value: 2, color: '#ef4444' },
    ]
};
