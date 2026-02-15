import { AnyWorkout } from './workout';

/**
 * Interface for AI-predicted race times after following a training plan.
 * Provides a range (min/max) to account for different execution levels and factors.
 */
export interface IAIPredictedRaceTime {
    raceTitle: string;
    raceType: string;         // e.g. "5k Run", "Marathon", "Olympic Triathlon"
    estimatedTimeMin: string; // HH:MM:SS format
    estimatedTimeMax: string; // HH:MM:SS format
    confidence: 'low' | 'medium' | 'high';
    rationale?: string;        // AI's explanation for the prediction
}

/**
 * Main response structure for the AI training plan generator.
 */
export interface ITrainingPlanResponse {
    planTitle: string;
    planDescription: string;
    workouts: AnyWorkout[];
    paceZones: Array<{ name: string; min: string; max: string }>;
    predictedRaceTimes: IAIPredictedRaceTime[];
}

/**
 * Other sport activity configuration
 */
export interface IOtherSportConfig {
    sportType: string;           // e.g. "Soccer", "Tennis", "Basketball"
    scheduledDays: number[];     // 0=Monday, 1=Tuesday, ..., 6=Sunday
    trainOnSameDays: boolean;    // Train extra on these days?
    durationMode: 'fixed' | 'daily';
    fatigueLevel: 'low' | 'medium' | 'high'; // Added fatigue level
    hoursPerSession?: string;    // Used if durationMode is 'fixed'. HH:MM:SS format
    dailyHours?: Record<number, string>; // Used if durationMode is 'daily' (key is day index 0-6, Value is HH:MM:SS)
}

/**
 * Metadata gathered from the step-by-step wizard for plan generation
 */
export interface IPlanGenerationMetadata {
    // Step 1: Training Focus
    trainingFocus: 'race' | 'general';
    targetRaceIds?: string[];      // IDs from seasonGoals if race-focused

    // Step 2: Other Sports
    hasOtherSports: boolean;
    otherSports: IOtherSportConfig[];

    // Step 3: Weekly Hours
    totalWeeklyHours: number;      // Including other sports

    // Step 4: Double Training Days
    doubleTrainingDays: number[];  // Days allowing 2 sessions (0=Monday, ..., 6=Sunday)

    // Step 5: Rest Days
    mandatoryRestDays: number[];   // Days with no sports allowed (0=Monday, ..., 6=Sunday)

    // Step 6: Start Date
    startDate: string;             // YYYY-MM-DD format

    // Metadata
    createdAt: Date;
    updatedAt: Date;
}
