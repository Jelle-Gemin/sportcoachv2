import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';
import path from 'path';
import { AthleteDocument } from "@/lib/models/athlete";
import { IPlanGenerationMetadata } from "@/lib/models/trainingPlan";
import { IPastPerformanceContext } from "./types";

// Initialize Gemini
// NOTE: Make sure GEMINI_API_KEY is in your .env.local
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

import { ITrainingPlanResponse } from "@/lib/models/trainingPlan";

export type GeneratedPlanResponse = ITrainingPlanResponse;

/**
 * Generates a training plan using Gemini Flash based on athlete biometrics, metadata, and race goals.
 */
export async function generateTrainingPlan(
  athlete: AthleteDocument,
  metadata: IPlanGenerationMetadata,
  pastPerformanceContext: IPastPerformanceContext
): Promise<GeneratedPlanResponse> {
  const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

  // Dynamic Data Calculations
  const age = 21; // Could be dynamic if added to biometrics
  const maxHR = athlete.biometrics?.maxHR || 195;
  const restingHR = athlete.biometrics?.restingHR || 50;
  const hrr = maxHR - restingHR;

  // Karvonen Zones
  const zones = {
    z1: { min: Math.round(0.5 * hrr + restingHR), max: Math.round(0.6 * hrr + restingHR) },
    z2: { min: Math.round(0.6 * hrr + restingHR), max: Math.round(0.7 * hrr + restingHR) },
    z3: { min: Math.round(0.7 * hrr + restingHR), max: Math.round(0.8 * hrr + restingHR) },
    z4: { min: Math.round(0.8 * hrr + restingHR), max: Math.round(0.9 * hrr + restingHR) },
    z5: { min: Math.round(0.9 * hrr + restingHR), max: Math.round(1.0 * hrr + restingHR) },
  };

  // Calculate details for all other sports
  const otherSportsSummary = metadata.otherSports.map(s => {
    const hours = (
      s.durationMode === 'fixed'
        ? (parseHHMMSS(s.hoursPerSession || "00:00:00") * s.scheduledDays.length)
        : Object.values(s.dailyHours || {}).reduce((acc, val) => acc + parseHHMMSS(val), 0)
    ).toFixed(1);

    const days = s.scheduledDays.map(d => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][d]).join(', ');

    return {
      type: s.sportType,
      hours,
      days,
      fatigueLevel: s.fatigueLevel,
      trainOnSameDays: s.trainOnSameDays
    };
  });

  const totalOtherSportsHours = otherSportsSummary.reduce((acc, s) => acc + Number(s.hours), 0).toFixed(1);

  // 1. Construct User Prompt
  const userPrompt = buildUserPrompt(athlete, metadata, pastPerformanceContext, totalOtherSportsHours, otherSportsSummary);

  // 2. System Prompt
  const systemPrompt = `
### ROLE & IDENTITY
You are "Sportcoach", an elite-level performance coach specializing in Long Distance Triathlon, Running, and Bodybuilding. You hold a Master’s degree in Nutrition and Dietetics.
- **Philosophy:** Science-based (Anno 2026), Data-driven, "No Junk Miles".
- **Primary Goal:** Increase speed on long distances while maximizing hypertrophy (upper/lower body) and injury prevention.
- **Tone:** Direct, professional, authoritative, analytical, but encouraging.

### BIO-METRICS & ZONES (KARVONEN - DYNAMIC)
- **Age:** ${age} | **Max HR:** ${maxHR} | **Resting HR:** ${restingHR} | **HRR (Reserve):** ${hrr}
- **Zone 1 (Recovery):** ${zones.z1.min} - ${zones.z1.max} bpm
- **Zone 2 (Endurance/Fat Burn):** ${zones.z2.min} - ${zones.z2.max} bpm (CRITICAL: Do not exceed ${zones.z2.max} bpm for aerobic base)
- **Zone 3 (Tempo):** ${zones.z3.min} - ${zones.z3.max} bpm
- **Zone 4 (Threshold):** ${zones.z4.min} - ${zones.z4.max} bpm
- **Zone 5 (VO2 Max):** ${zones.z5.min} - ${zones.z5.max} bpm

### ANALYSIS & PLANNING PROTOCOLS

#### 1. The "External Activity Rule" (Volume Management)
- External activities (e.g., Soccer, Tennis) are **mandatory loads**.
- **Calculation:** You must subtract the total duration of all External Activities from the \`Weekly Training Hours Cap\`.
- **Distribution & Intensity Adjustment:** 
    - Do not schedule high-intensity intervals (VO2 Max) on the same day as a "High" fatigue external activity.
    - If an external activity has "High" fatigue, the next 24 hours should be Zone 2 or Recovery.
    - If "Medium" fatigue, ensure triathlon workouts on the same day (if allowed) are not maximal efforts.
    - If "Low" fatigue, treat it as active recovery or light volume.

#### 2. Analysis Logic (Past Performance)
- **Cardiac Drift:** Check \`pace\` vs \`averageHeartrate\` in laps. If HR rises >5% while Pace is steady, the athlete is fatiguing. Response: Schedule pure Zone 2 / Recovery for the next 48h.
- **Execution Score:** 
    - >85% (Green): Increase intensity/volume.
    - <70% (Red): Reduce intensity, focus on technique/drills.

#### 3. Intensity Distribution (CRITICAL)
- **At least 1 key bike and 1 key run session a week**
- **Prioritise triathlon over strength training**. Considering the possibility of the user doing other sports next to traithlon as well.
- **At least 2 swim sessions a week**
- Analyze how the previous training sessions were executed and see how the users body handled it. This may dictate how hard the next training plan may be.

#### 4. Training Principles (Triathlon + Hypertrophy)
- **Structure (6+1):** 6 weeks Progressive Overload + 1 week Deload (50% volume cut).
- **Swim:** Must include drills (Zipper, Sculling, Catch-up). Focus on efficiency. Swim sessions are typically technique/aerobic, NOT key sessions (unless explicitly race-pace).
- **Bike:** Use % FTP. Includes Over-Unders & VO2 Max (110% FTP).
- **Run:** Specific paces based on recent bests. Intervals (400m-2km), Fartlek, Progression.
- **Brick:** Mandatory Bike -> Run transition. A brick counts as ONE key session, not two.
- **Strength (Schoenfeld 2026):**
    - Goal: Hypertrophy + Injury Prevention.
    - Timing: Separate from cardio by >6 hours.
    - Intensity: RPE 8-9 (1-2 Reps in Reserve).
- **Long Run/Bike:** alternate between brick workouts, long rides and long runs.

### OUTPUT FORMAT
- 49 days of workouts. 6 weeks progressive overload + 1 week deload.
- You strictly respond with a valid JSON object matching the provided schema.
- No markdown conversational text outside the JSON.
- Units: Duration in seconds, Distance in meters.
- **Pace Zones:** Determine 5 running pace zones (Z1-Z5) based on the "IPastPerformanceContext". List them in the "paceZones" field. Min meaning the slowest pace and max meaning the fastest pace.
`;


  try {
    const debugDir = path.join(process.cwd(), 'debug');
    if (!fs.existsSync(debugDir)) {
      fs.mkdirSync(debugDir, { recursive: true });
    }
    const filePath = path.join(debugDir, 'Prompt.md');
    fs.writeFileSync(filePath, systemPrompt);
    fs.writeFileSync(filePath, "\n User prompt: \n");
    fs.writeFileSync(filePath, userPrompt);
    console.log(`Prompt written to ${filePath}`);
  } catch (err) {
    console.error("Failed to write performance context to file:", err);
  }

  // 3. Call API
  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: userPrompt }] }],
      systemInstruction: systemPrompt,
    });

    const response = result.response;
    const text = response.text();

    // 4. Clean and Parse JSON
    // Gemini might wrap JSON in markdown blocks ```json ... ```
    const jsonStr = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const data = JSON.parse(jsonStr);

    return data as GeneratedPlanResponse;

  } catch (error) {
    console.error("AI Plan Generation Failed:", error);
    throw new Error("Failed to generate training plan.");
  }
}

/**
 * Helper to parse HH:MM:SS to decimal hours
 */
function parseHHMMSS(timeStr: string): number {
  const parts = timeStr.split(':');
  const hrs = parseInt(parts[0]) || 0;
  const mins = parseInt(parts[1]) || 0;
  const secs = parseInt(parts[2]) || 0;
  return hrs + (mins / 60) + (secs / 3600);
}

/**
 * Helper to build the detailed user prompt with context.
 */
function buildUserPrompt(
  athlete: AthleteDocument,
  metadata: IPlanGenerationMetadata,
  pastPerformanceContext: IPastPerformanceContext,
  totalOtherSportsHours: string,
  otherSportsSummary: Array<{ type: string, hours: string, days: string, fatigueLevel: string, trainOnSameDays: boolean }>
): string {
  const athleteName = athlete.athlete?.firstname || 'Athlete';
  const ftp = athlete.biometrics?.ftp || 'N/A';
  const weeklyHoursCap = metadata.totalWeeklyHours;
  const currentDate = new Date().toISOString().split('T')[0];

  return `
### GENERATION TASK
Create a **${metadata.trainingFocus === 'race' ? 'Race-Specific' : 'General Fitness'}** training plan for a full **7-week block** (49 days). 
Follow a 6+1 structure: 6 weeks of progressive overload followed by 1 week of deload.

### ATHLETE CONSTRAINTS & CONTEXT
1. **Profile:**
   - Name: ${athleteName}
   - FTP: ${ftp} W
   - Pace zones: check the laps in the past performance context to determine the pace zones.

2. **Time Budget:**
   - **Total Cap:** ${weeklyHoursCap} hours per week
   - **External Activities Load:** ${totalOtherSportsHours} hours
   - **Available for Triathlon:** ${(weeklyHoursCap - Number(totalOtherSportsHours)).toFixed(1)} hours.

3. **Schedule Structure:**
   - Current Date: ${currentDate}
   - Start Date: ${metadata.startDate}
   - Days Mapping: 0=Monday, 6=Sunday.
   - External Activities:
     ${otherSportsSummary.map(s => `- ${s.type}: ${s.hours}h on [${s.days}] (Fatigue: ${s.fatigueLevel}, Train on same day: ${s.trainOnSameDays})`).join('\n     ')}
   - Long Run/Ride Day: Sunday (preferred).
   - Mandatory Rest Days: [${metadata.mandatoryRestDays.join(', ')}]
   - Double Training Allowed On: [${metadata.doubleTrainingDays.join(', ')}]

4. **Goal Races:**
   ${JSON.stringify(athlete.seasonGoals || [], null, 2)}

### PAST PERFORMANCE ANALYSIS (CRITICAL)
Analyze the following raw JSON data to adjust intensities. If "Execution Score" is low, reduce difficulty.
**Note:** In swimming workouts there are rest laps, but these do count toward the average pace. So the average pace isn't actually moving time. 

${JSON.stringify(pastPerformanceContext, null, 2)}

### INSTRUCTIONS
1. **Volume Management:** Strictly adhere to the "Available for Triathlon" time budget calculated above. Do not overschedule.
2. **Workout Variety:** 
   - **Swim:** Technical drills are mandatory.
   - **Bike:** If previous Over-Under session failed (score <70), replace with Sweet Spot (88-92% FTP).
   - **Run:** If total external load is high (>4h/week) or many High fatigue days exist, keep run volume low intensity (Zone 2) to prevent injury.
3. **Brick:** A brick workout is one bike workout (following the interface below) immediately followed by one run workout (following the interface below). It's two workout planned on the same day.
4. **Strength:** Schedule 1-2 sessions on days with lowest cardio load.
5. **Deload Check:** Week 7 MUST cut the *Main Set* duration by 50% relative to Week 6.

### JSON RESPONSE SCHEMA
Generate a valid JSON object. You MUST use the exact interfaces below for each workout type.

**CRITICAL — Per-Set vs Total Rule:**
- When \`sets\` IS present: \`distance\`, \`time\`, \`rest\`, and \`pace\` describe ONE individual set (e.g. sets: 8, distance: 400 → 8 x 400m).
- When \`sets\` is ABSENT: \`distance\` and \`time\` describe the TOTAL for the entire main block (e.g. distance: 14000 → 14km continuous).
- NEVER return the total accumulated distance/time in the \`distance\`/\`time\` field when \`sets\` is present.

**Note:** The title should always contain W{week number} followed by the title of the workout. 

**1. Run Workout:**
{
  "type": "Run",
  "fullDate": "YYYY-MM-DD",
  "title": "string",
  "description": "string",
  "duration": number (total seconds),
  "workout": {
    "warmup": { "time": number, "description": "string" },
    "main": {
      "distance": number (meters — PER SET if sets present, TOTAL if no sets),
      "time": number (seconds — PER SET if sets present, TOTAL if no sets),
      "pace": "string (e.g. 4:05/km)",
      "description": "string",
      "rest": number (seconds between sets),
      "sets": number (omit for continuous efforts)
    },
    "coolDown": { "time": number, "description": "string" }
  }
}

**2. Bike Workout (Standard):**
{
  "type": "Bike",
  "fullDate": "YYYY-MM-DD",
  "title": "string",
  "description": "string",
  "duration": number (total seconds),
  "workout": {
    "warmup": { "time": number, "description": "string" },
    "main": {
      "time": number (seconds — PER SET if sets present, TOTAL if no sets),
      "watts": "string (e.g. 88-90% FTP)",
      "restWatts": "string (e.g. 65% FTP, optional)",
      "description": "string",
      "rest": number (seconds between sets),
      "sets": number (omit for continuous efforts)
    },
    "coolDown": { "time": number, "description": "string" }
  }
}

**3. Bike Workout (Over-Under):**
{
  "type": "Bike",
  "fullDate": "YYYY-MM-DD",
  "title": "string",
  "description": "string",
  "duration": number (total seconds),
  "workout": {
    "warmup": { "time": number, "description": "string" },
    "main": { "sets": number, "on": { "time": number, "watts": "string" }, "off": { "time": number, "watts": "string" }, "rest": number, "description": "string" },
    "coolDown": { "time": number, "description": "string" }
  }
}

**4. Swim Workout:**
{
  "type": "Swim",
  "fullDate": "YYYY-MM-DD",
  "title": "string",
  "description": "string",
  "duration": number (total seconds),
  "workout": {
    "warmup": { "distance": number (meters, total), "description": "string" },
    "drill": {
      "distance": number (meters PER SET),
      "drill": "string (drill name)",
      "sets": number,
      "rest": number (seconds between sets)
    },
    "main": {
      "distance": number (meters — PER SET if sets present, TOTAL if no sets),
      "RPE": number (1-10),
      "description": "string",
      "rest": number (seconds between sets),
      "sets": number (omit for continuous efforts like a time trial)
    },
    "coolDown": { "distance": number (meters, total), "description": "string" }
  }
}

**5. Strength Workout:**
{
  "type": "Strength",
  "fullDate": "YYYY-MM-DD",
  "title": "string",
  "description": "string",
  "duration": number,
  "workout": {
    "warmup": { "time": number, "description": "string" },
    "main": { "exercises": ["string"], "sets": number, "rest": number },
    "coolDown": { "time": number, "description": "string" }
  }
}

**Main Response Structure:**
{
  "planTitle": "string",
  "planDescription": "string",
  "paceZones": [
    { "name": "Z1 Recovery", "min": "string (MM:SS)", "max": "string (MM:SS)" },
    { "name": "Z2 Endurance", "min": "string", "max": "string" },
    { "name": "Z3 Tempo", "min": "string", "max": "string" },
    { "name": "Z4 Threshold", "min": "string", "max": "string" },
    { "name": "Z5 VO2 Max", "min": "string", "max": "string" }
  ],
  "predictedRaceTimes": [
    { "raceTitle": "string", "raceType": "string", "estimatedTimeMin": "HH:MM:SS", "estimatedTimeMax": "HH:MM:SS", "confidence": "low|medium|high", "rationale": "string" }
  ],
  "workouts": [ ... ]
}
`;
}
