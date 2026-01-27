import { GoogleGenerativeAI } from "@google/generative-ai";
import { AthleteDocument } from "@/lib/models/athlete";
import { IPlanGenerationMetadata } from "@/lib/models/trainingPlan";

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
  pastPerformanceContext: string = ""
): Promise<GeneratedPlanResponse> {

  const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

  // 1. Construct User Prompt
  const userPrompt = buildUserPrompt(athlete, metadata, pastPerformanceContext);

  // 2. System Prompt
  const systemPrompt = `
1. The Minimum Effective Dose (MED) Engine

When an athlete has limited time, the AI must pivot from volume accumulation to physiological density. The AI will utilize the following volume floors for successful race completion:

Race Distance	Minimum Floor (Finish)	Recommended (Perform)
5k / Sprint Triathlon	3–5 Hours/Week	6–8 Hours/Week
Olympic / Marathon	6–8 Hours/Week	10–12 Hours/Week
70.3 / 50k Ultra	8–10 Hours/Week	12–14 Hours/Week
Ironman / 100M Ultra	9–11 Hours/Week	15–18 Hours/Week

Logic

Success is not a linear relationship between distance and hours; high-quality structure can compensate for lower volume.

The “Minimum–Maximum” Rule:
For ultra-distances (50k+), the athlete must hit a minimum of 6–9 hours/week for at least 3–6 weeks during the peak phase.

2. Intensity Pivot: Pyramidal over Polarized

While 80/20 Polarization is optimal for high-volume athletes (15+ hours/week), the AI must switch to a Pyramidal (PYR) distribution for athletes training 6–12 hours/week.

PYR Distribution

~70% Zone 1 (Low)

~20% Zone 2 (Moderate / Sweet Spot)

~10% Zone 3 (High)

Rationale

Time-constrained athletes need Sweet Spot work (≈75–90% FTP) to generate sufficient stimulus in shorter sessions.

Efficiency Rule

If only 45 minutes are available, execute a Fartlek or Interval session rather than a “junk” recovery plod.

3. Multi-Sport & Allostatic Load Integration

The AI must treat all sports (e.g., ISoccerWorkout) as part of the athlete’s Total Allostatic Load — the cumulative cost of all stress on the body.

The Allostatic Rule

The body does not compartmentalise stress.

High-intensity team sports (Soccer, Basketball) must be categorised as Hard Days (Zone 4/5 equivalent) due to:

Neuromuscular fatigue

Glycogen depletion

Adjustment Command

IF an athlete performs a 60–90 min “Other Sport” (Soccer, Tennis)
THEN the following triathlon session must be Recovery (Zone 1) or Technique.

IF total weekly hours (Triathlon + Other Sports) exceed the previous week by >10%
THEN reduce triathlon intensity to maintain musculoskeletal safety.

4. Eliminating “Junk Miles”

Every workout must have a defined biological purpose:

Load

Recovery

Preparation

Load Days

2–4 per week

The only days designed to “move the needle”

Delete Junk

If the athlete cannot explain why they are doing a 3-hour general aerobic ride, replace it with a shorter, targeted session (e.g., climbing intervals) addressing a specific limiter.

The Energy Finit(y) Rule

Athletes have a finite energy budget.

In low-volume plans, priority is given to:

Strength (HRT)

Key Intervals

Arbitrary base volume is deprioritised.

5. Strategic Strength Integration

For the time-crunched athlete, Heavy Resistance Training (HRT) is a non-negotiable efficiency tool.

Dosage

2 × 30–45 min sessions per week

Low reps, >85% 1RM

Benefit

Higher return for:

Durability

Running economy

Compared to an additional 10 miles of “easy” running

AI Final Mandate

“If time is short, the goal is density.
If life stress is high, the goal is recovery.
Never let a moderate-intensity ‘Other Sport’ turn a rest day into a Gray Zone trap.”
      `;

  // 3. Call API
  try {
    console.log("PastPerformanceContext: ", pastPerformanceContext)
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
 * Helper to build the detailed user prompt with context.
 */
function buildUserPrompt(athlete: AthleteDocument, metadata: IPlanGenerationMetadata, pastPerformanceContext: string): string {
  const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const bio = athlete.biometrics;

  // Format Goal Races with DATES for context
  const raceContext = athlete.seasonGoals?.map(g =>
    `- ${g.title} (${g.priority}-Race): ${g.date} [Distance: ${g.distance || 'Unknown'}]`
  ).join('\n') || "No specific goal races.";

  // Format Other Sports
  const otherSportsContext = metadata.hasOtherSports
    ? metadata.otherSports.map(s => {
      const duration = s.durationMode === 'fixed'
        ? `${s.hoursPerSession}h total`
        : Object.entries(s.dailyHours || {}).map(([day, hrs]) => `${DAYS[Number(day)]}: ${hrs}h`).join(', ');
      return `- ${s.sportType}: ${duration} on days [${s.scheduledDays.map(d => DAYS[d]).join(',')}]`;
    }).join('\n')
    : "None";


  return `
    GENERATION TASK:
    Create a ${metadata.trainingFocus === 'race' ? 'Race-Specific' : 'General Fitness'} training plan.
    
    TRAINING BLOCK STRUCTURE:
    - Total Duration: Exactly **49 days (7 full weeks)**.
    - WEEK 1-6: Progressive Overload. Increase volume and/or intensity gradually each week.
    - WEEK 7: Deload/Recovery Week. Reduce total volume by 40-60% compared to Week 6, but maintain some high-intensity intervals (short duration) to keep the engine sharp while shedding fatigue.
    
    ATHLETE PROFILE:
    - Name: ${athlete.athlete?.firstname || 'Athlete'}
    - Fitness Level: Check recent perfomances
    - FTP: ${bio?.ftp || 'N/A'} W
    - Max HR: ${bio?.maxHR || 'N/A'} bpm
    
    CURRENT CONSTRAINTS:
    - Weekly Training Hours Cap: ${metadata.totalWeeklyHours} hours
    - Day Mapping: 0=Monday, 1=Tuesday, 2=Wednesday, 3=Thursday, 4=Friday, 5=Saturday, 6=Sunday.
    - Mandatory Rest Days: [${metadata.mandatoryRestDays.map(d => DAYS[d]).join(', ')}]
    - Double Training Allowed On: [${metadata.doubleTrainingDays.map(d => DAYS[d]).join(', ')}]
    - Other Sports Commitments:
    ${otherSportsContext}
    
    GOAL RACES (CRITICAL FOR TAPERING):
    ${raceContext}
    
    PAST PERFORMANCE & ADHERENCE (Last Training Block):
    ${pastPerformanceContext || "No past performance data available."}
    
    INSTRUCTIONS:
    1. PLAN DURATION: Generate exactly **49 days (7 full weeks)** of training starting from the current date. 
    2. STRUCTURE: Every single day must have a workout entry. Use "Rest" or "Recovery" type for rest days.
    3. BLOCK PROGRESSION (STRICT): 
       - Week 1-6: Progressive Overload. Increase TSS/Volume by ~5-10% weekly.
       - Week 7: Deload/Recovery. Reduce volume by 50% but keep 1-2 short high-intensity touches.
    4. WORKOUT DIVERSITY (MANDATORY): Do NOT repeat the same workout description every week. Use variety:
       - Run: Intervals, Fartleks, Tempos, Long Runs, Progression Runs.
       - Bike: Sweet Spot, Over-Unders, VO2 Max, Threshold, Endurance.
       - Swim: Tech sets (Catch-up, Fist Drill, Sculling), Endurance sets, Sprint sets.
       - Bricks: At least one Bike -> Run transition session in Week 4, 5, and 6.
    5. METRIC PRECISION:
       - Bike: Use "% of FTP" (e.g. 90% FTP).
       - Run: Use specific paces (e.g. 4:10/km) based on their "Recent Performance Summary".
       - Swim: Use RPE (1-10) and specific rest intervals (e.g. "20s rest").
    6. GYM SESSIONS: Include 1-2 "Strength" sessions per week if hours allow. Schedule them on easier days. Prioritize Swim/Bike/Run for the primary weekly volume.
    7. SCHEMA: Generate a valid JSON object matching the *Response Structure* below.
    8. STRICTLY follow the 'AnyWorkout' union types.
    9. MANDATORY: Every triathlon workout MUST include "warmup", "main", and "coolDown" blocks. Swim sessions MUST include a "drill" block.
    10. CHALLENGE LEVEL: Analyze the [PAST PERFORMANCE] and [SPORT LEVELS]. If the athlete has high adherence, push the limits of their volume cap.
    11. FORMAT: Durations MUST be in seconds. Do NOT wrap in markdown code blocks.
    
    RESPONSE STRUCTURE (JSON Schema):
    {
      "planTitle": "string",
      "planDescription": "string",
      "predictedRaceTimes": [
        {
          "raceTitle": "string",
          "raceType": "string",
          "estimatedTimeMin": "HH:MM:SS",
          "estimatedTimeMax": "HH:MM:SS",
          "confidence": "low|medium|high",
          "rationale": "string"
        }
      ],
      "workouts": [
        // 1. RUN
        {
          "type": "Run",
          "fullDate": "YYYY-MM-DD",
          "title": "string",
          "description": "string",
          "completed": false,
          "duration": number (total seconds),
          "workout": {
            "warmup": { "time": number, "description": "string" },
            "main": {
              "distance": number (meters),
              "pace": "string (e.g. 5:00/km)",
              "description": "string"
            },
            "coolDown": { "time": number, "description": "string" }
          }
        },
        
        // 2. BIKE
        {
          "type": "Bike",
          "fullDate": "YYYY-MM-DD",
          "title": "string",
          "description": "string",
          "completed": false,
          "duration": number (total seconds),
          "workout": {
            "warmup": { "time": number, "description": "string" },
            "main": {
              "time": number (seconds),
              "watts": "string (e.g. 200W or 80% FTP)",
              "description": "string"
            },
            "coolDown": { "time": number, "description": "string" }
          }
        },

        // 3. BIKE (Over-Under)
        {
          "type": "Bike",
          "fullDate": "YYYY-MM-DD",
          "title": "string",
          "description": "string",
          "completed": false,
          "duration": number (total seconds),
          "workout": {
            "warmup": { "time": number, "description": "string" },
            "main": {
              "sets": number,
              "rest": number (seconds),
              "on": { "time": number (seconds), "watts": "string (e.g. 105% FTP)", "description": "string" },
              "off": { "time": number (seconds), "watts": "string (e.g. 95% FTP)", "description": "string" }
            },
            "coolDown": { "time": number, "description": "string" }
          }
        },
        
        // 4. SWIM
        {
          "type": "Swim",
          "fullDate": "YYYY-MM-DD",
          "title": "string",
          "description": "string",
          "completed": false,
          "duration": number (total seconds),
          "workout": {
             "warmup": { "distance": number, "description": "string" },
             "drill": { "distance": number, "drill": "string" },
             "main": { "distance": number, "description": "string" },
             "coolDown": { "distance": number, "description": "string" }
          }
        },
        
        // 5. STRENGTH
        {
          "type": "Strength",
          "fullDate": "YYYY-MM-DD",
          "title": "string",
          "description": "string",
          "completed": false,
          "duration": number (seconds),
          "workout": {
             "warmup": { "time": number, "description": "string" },
             "main": { "exercises": ["string", "string"] },
             "coolDown": { "time": number, "description": "string" }
          }
        }
      ]
    }
    `;
}
