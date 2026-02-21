/**
 * AI Service Types for Past Performance Context
 * These interfaces structure the activity data passed to the LLM for training plan generation.
 */

/**
 * Lap-level performance data for AI context
 */
export interface IPerformanceLap {
    lapIndex: number;
    distance: number;          // meters
    time: number;              // seconds (moving time)
    elapsedTime: number;       // seconds
    pace?: string;             // e.g., "4:35/km" or "1:45/100m" or "32.5 km/h"
    averageHeartrate?: number; // bpm
    averageCadence?: number;
    averageWatts?: number;     // for bike
    isRest: boolean;
}

/**
 * Full activity data for AI context
 */
export interface IPerformanceActivity {
    date: string;              // YYYY-MM-DD
    type: string;              // Run, Bike, Swim, etc.
    name: string;
    description?: string;
    distance: number;          // meters
    movingTime: number;        // seconds
    elapsedTime: number;       // seconds
    averageHeartrate?: number; // bpm
    maxHeartrate?: number;     // bpm
    averageCadence?: number;
    averageWatts?: number;     // for bike
    maxWatts?: number;         // for bike
    weightedAverageWatts?: number;
    averageSpeed?: number;     // m/s
    maxSpeed?: number;         // m/s
    averagePace?: string;      // formatted pace string
    calories?: number;
    sufferScore?: number;
    laps: IPerformanceLap[];
}

/**
 * Workout match with planned vs actual
 */
export interface IWorkoutMatch {
    plannedDate: string;
    plannedType: string;
    plannedTitle: string;
    workoutDescription: string; // From the planned workout
    status: 'completed' | 'missed';
    executionScore?: number;   // 0-100
    activity?: IPerformanceActivity;
}

/**
 * Sport-specific performance summary
 */
export interface ISportSummary {
    avgPace?: string;
    avgWatts?: string;
    avgSpeed?: string;
    totalDistance: number;
}

/**
 * Main container for past performance context
 */
export interface IPastPerformanceContext {
    workoutHistory: IWorkoutMatch[];
}
