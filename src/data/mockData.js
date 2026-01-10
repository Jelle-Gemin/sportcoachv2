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
    { day: "M", date: "12", fullDate: "2024-01-12", type: "Rest", completed: true, score: null, title: "Recovery Day" },
    { day: "T", date: "13", fullDate: "2024-01-13", type: "Run", completed: true, score: 92, title: "Threshold Intervals 4x8'" },
    { day: "W", date: "14", fullDate: "2024-01-14", type: "Swim", completed: true, score: 74, title: "Endurance Swim 2.5k" },
    { day: "T", date: "15", fullDate: "2024-01-15", type: "Bike", isToday: true, completed: false, score: null, title: "Sweet Spot 3x12'" },
    { day: "F", date: "16", fullDate: "2024-01-16", type: "Swim", completed: false, score: null, title: "Technique Drills" },
    { day: "S", date: "17", fullDate: "2024-01-17", type: "Run", completed: false, score: null, title: "Long Run 18k" },
    { day: "S", date: "18", fullDate: "2024-01-18", type: "Brick", completed: false, score: null, title: "Bike 60k + Run 5k" },
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
