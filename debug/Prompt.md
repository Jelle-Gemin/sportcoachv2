
### GENERATION TASK
Create a **Race-Specific** training plan for a full **7-week block** (49 days). 
Follow a 6+1 structure: 6 weeks of progressive overload followed by 1 week of deload.

### ATHLETE CONSTRAINTS & CONTEXT
1. **Profile:**
   - Name: Jelle
   - FTP: 235 W
   - Pace zones: check the laps in the past performance context to determine the pace zones.

2. **Time Budget:**
   - **Total Cap:** 10 hours per week
   - **External Activities Load:** 4.5 hours
   - **Available for Triathlon:** 5.5 hours.

3. **Schedule Structure:**
   - Current Date: 2026-02-15
   - Start Date: 2026-02-23
   - Days Mapping: 0=Monday, 6=Sunday.
   - External Activities:
     - Soccer: 4.5h on [Tuesday, Thursday, Saturday] (Fatigue: low, Train on same day: false)
   - Long Run/Ride Day: Sunday (preferred).
   - Mandatory Rest Days: []
   - Double Training Allowed On: [0, 2, 6, 4]

4. **Goal Races:**
   [
  {
    "goalTime": "02:30:00",
    "location": "Izegem",
    "distance": "Olympic Triathlon",
    "priority": "A",
    "date": "2026-05-14",
    "title": "Triathlon Izegem",
    "estimatedTimeMin": "02:42:00",
    "estimatedTimeMax": "03:11:00"
  },
  {
    "goalTime": "01:30:00",
    "location": "Torhout",
    "distance": "Half Marathon",
    "priority": "A",
    "date": "2026-06-19",
    "title": "Nacht van Vlaanderen",
    "estimatedTimeMin": "01:33:00",
    "estimatedTimeMax": "01:51:00"
  }
]

### PAST PERFORMANCE ANALYSIS (CRITICAL)
Analyze the following raw JSON data to adjust intensities. If "Execution Score" is low, reduce difficulty.
**Note:** In swimming workouts there are rest laps, but these do count toward the average pace. So the average pace isn't actually moving time. 

{
  "sportSummary": {
    "swim": {
      "avgPace": "2:54",
      "totalDistance": 11900
    },
    "bike": {
      "avgWatts": "180",
      "avgSpeed": "32.1",
      "totalDistance": 287543.5
    },
    "run": {
      "avgPace": "4:53",
      "totalDistance": 124101.59999999999
    }
  },
  "workoutHistory": [
    {
      "plannedDate": "2026-01-05",
      "plannedType": "Swim",
      "plannedTitle": "Swim Tech",
      "workoutDescription": "8 x 25mCatch-up met pull-buoy & 12 x 50m steady sets.",
      "status": "completed",
      "executionScore": 33,
      "activity": {
        "date": "2026-01-05",
        "type": "Swim",
        "name": "Afternoon Swim",
        "description": "* 1000m:\n100m WU\n4x 50m catch up drill\n12x 50m crawl\n100m CD",
        "distance": 950,
        "movingTime": 1968,
        "elapsedTime": 1968,
        "averageHeartrate": 135.4,
        "maxHeartrate": 152,
        "averageCadence": 18.9,
        "averageWatts": null,
        "maxWatts": null,
        "weightedAverageWatts": null,
        "averageSpeed": 0.48272357723577236,
        "maxSpeed": 5,
        "averagePace": "3:27/100m",
        "calories": 243,
        "sufferScore": null,
        "laps": [
          {
            "lapIndex": 0,
            "distance": 25,
            "time": 48,
            "elapsedTime": 48,
            "pace": "3:12",
            "averageHeartrate": 124,
            "averageCadence": 19,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 1,
            "distance": 25,
            "time": 32,
            "elapsedTime": 32,
            "pace": "2:08",
            "averageHeartrate": 135.6,
            "averageCadence": 18.9,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 2,
            "distance": 25,
            "time": 35,
            "elapsedTime": 35,
            "pace": "2:20",
            "averageHeartrate": 138.3,
            "averageCadence": 15.1,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 3,
            "distance": 25,
            "time": 36,
            "elapsedTime": 36,
            "pace": "2:24",
            "averageHeartrate": 145.2,
            "averageCadence": 18.1,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 4,
            "distance": 25,
            "time": 59,
            "elapsedTime": 59,
            "pace": "3:56",
            "averageHeartrate": 135.8,
            "averageCadence": 20.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 5,
            "distance": 25,
            "time": 74,
            "elapsedTime": 74,
            "pace": "4:56",
            "averageHeartrate": 138.1,
            "averageCadence": 12,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 6,
            "distance": 25,
            "time": 81,
            "elapsedTime": 81,
            "pace": "5:24",
            "averageHeartrate": 135.7,
            "averageCadence": 12,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 7,
            "distance": 25,
            "time": 50,
            "elapsedTime": 50,
            "pace": "3:20",
            "averageHeartrate": 136.1,
            "averageCadence": 15,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 8,
            "distance": 25,
            "time": 89,
            "elapsedTime": 89,
            "pace": "5:56",
            "averageHeartrate": 115.1,
            "averageCadence": 15,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 9,
            "distance": 25,
            "time": 47,
            "elapsedTime": 47,
            "pace": "3:08",
            "averageHeartrate": 128,
            "averageCadence": 13,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 10,
            "distance": 25,
            "time": 84,
            "elapsedTime": 84,
            "pace": "5:36",
            "averageHeartrate": 121.4,
            "averageCadence": 15,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 11,
            "distance": 25,
            "time": 49,
            "elapsedTime": 49,
            "pace": "3:16",
            "averageHeartrate": 130.6,
            "averageCadence": 12.1,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 12,
            "distance": 25,
            "time": 59,
            "elapsedTime": 59,
            "pace": "3:56",
            "averageHeartrate": 123.6,
            "averageCadence": 15.1,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 13,
            "distance": 25,
            "time": 32,
            "elapsedTime": 32,
            "pace": "2:08",
            "averageHeartrate": 129.2,
            "averageCadence": 18.2,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 14,
            "distance": 25,
            "time": 62,
            "elapsedTime": 62,
            "pace": "4:08",
            "averageHeartrate": 129.2,
            "averageCadence": 23.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 15,
            "distance": 25,
            "time": 31,
            "elapsedTime": 31,
            "pace": "2:04",
            "averageHeartrate": 134.9,
            "averageCadence": 13.4,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 16,
            "distance": 25,
            "time": 66,
            "elapsedTime": 66,
            "pace": "4:24",
            "averageHeartrate": 139.4,
            "averageCadence": 23.9,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 17,
            "distance": 25,
            "time": 36,
            "elapsedTime": 36,
            "pace": "2:24",
            "averageHeartrate": 143.6,
            "averageCadence": 18.1,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 18,
            "distance": 25,
            "time": 64,
            "elapsedTime": 64,
            "pace": "4:16",
            "averageHeartrate": 133,
            "averageCadence": 21.9,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 19,
            "distance": 25,
            "time": 32,
            "elapsedTime": 32,
            "pace": "2:08",
            "averageHeartrate": 135.2,
            "averageCadence": 16.3,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 20,
            "distance": 25,
            "time": 72,
            "elapsedTime": 72,
            "pace": "4:48",
            "averageHeartrate": 134.3,
            "averageCadence": 23.9,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 21,
            "distance": 25,
            "time": 31,
            "elapsedTime": 31,
            "pace": "2:04",
            "averageHeartrate": 139.6,
            "averageCadence": 16.3,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 22,
            "distance": 25,
            "time": 65,
            "elapsedTime": 65,
            "pace": "4:20",
            "averageHeartrate": 137.5,
            "averageCadence": 23.9,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 23,
            "distance": 25,
            "time": 30,
            "elapsedTime": 30,
            "pace": "2:00",
            "averageHeartrate": 142.6,
            "averageCadence": 15.3,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 24,
            "distance": 25,
            "time": 64,
            "elapsedTime": 64,
            "pace": "4:16",
            "averageHeartrate": 138.5,
            "averageCadence": 24.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 25,
            "distance": 25,
            "time": 35,
            "elapsedTime": 35,
            "pace": "2:20",
            "averageHeartrate": 143,
            "averageCadence": 15.2,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 26,
            "distance": 25,
            "time": 81,
            "elapsedTime": 81,
            "pace": "5:24",
            "averageHeartrate": 130,
            "averageCadence": 21,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 27,
            "distance": 25,
            "time": 31,
            "elapsedTime": 31,
            "pace": "2:04",
            "averageHeartrate": 140.8,
            "averageCadence": 21.1,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 28,
            "distance": 25,
            "time": 72,
            "elapsedTime": 72,
            "pace": "4:48",
            "averageHeartrate": 135.3,
            "averageCadence": 23.9,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 29,
            "distance": 25,
            "time": 32,
            "elapsedTime": 32,
            "pace": "2:08",
            "averageHeartrate": 142.3,
            "averageCadence": 15.3,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 30,
            "distance": 25,
            "time": 66,
            "elapsedTime": 66,
            "pace": "4:24",
            "averageHeartrate": 145.5,
            "averageCadence": 23.9,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 31,
            "distance": 25,
            "time": 31,
            "elapsedTime": 31,
            "pace": "2:04",
            "averageHeartrate": 147.6,
            "averageCadence": 15.4,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 32,
            "distance": 25,
            "time": 57,
            "elapsedTime": 57,
            "pace": "3:48",
            "averageHeartrate": 142.1,
            "averageCadence": 26.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 33,
            "distance": 25,
            "time": 39,
            "elapsedTime": 39,
            "pace": "2:36",
            "averageHeartrate": 145.6,
            "averageCadence": 18.2,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 34,
            "distance": 25,
            "time": 67,
            "elapsedTime": 67,
            "pace": "4:28",
            "averageHeartrate": 142.4,
            "averageCadence": 23.9,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 35,
            "distance": 25,
            "time": 35,
            "elapsedTime": 35,
            "pace": "2:20",
            "averageHeartrate": 145.1,
            "averageCadence": 18.2,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 36,
            "distance": 25,
            "time": 61,
            "elapsedTime": 61,
            "pace": "4:04",
            "averageHeartrate": 142.2,
            "averageCadence": 23.9,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 37,
            "distance": 25,
            "time": 33,
            "elapsedTime": 33,
            "pace": "2:12",
            "averageHeartrate": 148.2,
            "averageCadence": 15.3,
            "averageWatts": null,
            "isRest": false
          }
        ]
      }
    },
    {
      "plannedDate": "2026-01-06",
      "plannedType": "Soccer",
      "plannedTitle": "Soccer Practice",
      "workoutDescription": "Soccer practice",
      "status": "completed",
      "executionScore": 38,
      "activity": {
        "date": "2026-01-06",
        "type": "Soccer",
        "name": "Evening Football (Soccer)",
        "description": null,
        "distance": 2300.4,
        "movingTime": 2188,
        "elapsedTime": 2391,
        "averageHeartrate": 160.1,
        "maxHeartrate": 180,
        "averageCadence": null,
        "averageWatts": null,
        "maxWatts": null,
        "weightedAverageWatts": null,
        "averageSpeed": 1.0513711151736747,
        "maxSpeed": 4.26,
        "averagePace": "N/A",
        "calories": 467,
        "sufferScore": null,
        "laps": [
          {
            "lapIndex": 0,
            "distance": 2300,
            "time": 2188,
            "elapsedTime": 2389,
            "pace": "",
            "averageHeartrate": 160.1,
            "averageCadence": null,
            "averageWatts": null,
            "isRest": false
          }
        ]
      }
    },
    {
      "plannedDate": "2026-01-07",
      "plannedType": "Run",
      "plannedTitle": "Key Session: Run Intervals",
      "workoutDescription": "Run: 8x400m @ 4:05/km.",
      "status": "completed",
      "executionScore": 97,
      "activity": {
        "date": "2026-01-07",
        "type": "Run",
        "name": "Treadmill",
        "description": "10' inlopen @ 5:45/km\n4x 400m @ 4:00/km (1 min)\n4x 400m @ 3:45/km (1 min)\n10' uitlopen @ 5:30/km",
        "distance": 7850,
        "movingTime": 2483,
        "elapsedTime": 2483,
        "averageHeartrate": 155.5,
        "maxHeartrate": 177,
        "averageCadence": 78.2,
        "averageWatts": null,
        "maxWatts": null,
        "weightedAverageWatts": null,
        "averageSpeed": 3.161498187676198,
        "maxSpeed": 2.36,
        "averagePace": "5:16/km",
        "calories": 466,
        "sufferScore": null,
        "laps": [
          {
            "lapIndex": 0,
            "distance": 1020,
            "time": 598,
            "elapsedTime": 598,
            "pace": "9:46",
            "averageHeartrate": 141.9,
            "averageCadence": 78.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 1,
            "distance": 400,
            "time": 98,
            "elapsedTime": 98,
            "pace": "4:05",
            "averageHeartrate": 163.6,
            "averageCadence": 83.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 2,
            "distance": 90,
            "time": 62,
            "elapsedTime": 62,
            "pace": "11:29",
            "averageHeartrate": 156.4,
            "averageCadence": 64,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 3,
            "distance": 400,
            "time": 113,
            "elapsedTime": 113,
            "pace": "4:43",
            "averageHeartrate": 155.9,
            "averageCadence": 81.7,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 4,
            "distance": 90,
            "time": 60,
            "elapsedTime": 60,
            "pace": "11:07",
            "averageHeartrate": 157.5,
            "averageCadence": 66,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 5,
            "distance": 400,
            "time": 109,
            "elapsedTime": 109,
            "pace": "4:33",
            "averageHeartrate": 158.1,
            "averageCadence": 82.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 6,
            "distance": 80,
            "time": 59,
            "elapsedTime": 59,
            "pace": "12:18",
            "averageHeartrate": 159.6,
            "averageCadence": 66.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 7,
            "distance": 400,
            "time": 97,
            "elapsedTime": 97,
            "pace": "4:03",
            "averageHeartrate": 159.5,
            "averageCadence": 83.2,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 8,
            "distance": 70,
            "time": 61,
            "elapsedTime": 61,
            "pace": "14:31",
            "averageHeartrate": 160.2,
            "averageCadence": 66.1,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 9,
            "distance": 400,
            "time": 96,
            "elapsedTime": 96,
            "pace": "4:00",
            "averageHeartrate": 162.6,
            "averageCadence": 84.4,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 10,
            "distance": 100,
            "time": 61,
            "elapsedTime": 61,
            "pace": "10:10",
            "averageHeartrate": 164.5,
            "averageCadence": 69.7,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 11,
            "distance": 400,
            "time": 88,
            "elapsedTime": 88,
            "pace": "3:40",
            "averageHeartrate": 165.1,
            "averageCadence": 84.4,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 12,
            "distance": 70,
            "time": 57,
            "elapsedTime": 57,
            "pace": "13:34",
            "averageHeartrate": 165.4,
            "averageCadence": 62,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 13,
            "distance": 400,
            "time": 93,
            "elapsedTime": 93,
            "pace": "3:53",
            "averageHeartrate": 165.6,
            "averageCadence": 84.9,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 14,
            "distance": 110,
            "time": 61,
            "elapsedTime": 61,
            "pace": "9:15",
            "averageHeartrate": 166.6,
            "averageCadence": 67.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 15,
            "distance": 400,
            "time": 86,
            "elapsedTime": 86,
            "pace": "3:35",
            "averageHeartrate": 165.6,
            "averageCadence": 84.7,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 16,
            "distance": 50,
            "time": 49,
            "elapsedTime": 49,
            "pace": "16:20",
            "averageHeartrate": 166.1,
            "averageCadence": 60.5,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 17,
            "distance": 4730,
            "time": 635,
            "elapsedTime": 635,
            "pace": "2:14",
            "averageHeartrate": 155.9,
            "averageCadence": 80.4,
            "averageWatts": null,
            "isRest": false
          }
        ]
      }
    },
    {
      "plannedDate": "2026-01-07",
      "plannedType": "Bike",
      "plannedTitle": "Key Session: Bike Intervals",
      "workoutDescription": "Sweet Spot Intervals. 2x10 min @ 88–90% FTP.",
      "status": "completed",
      "executionScore": 86,
      "activity": {
        "date": "2026-01-07",
        "type": "VirtualRide",
        "name": "MyWhoosh - W1 - Sweet Spot Intervals",
        "description": null,
        "distance": 26047.1,
        "movingTime": 3006,
        "elapsedTime": 3006,
        "averageHeartrate": 134.3,
        "maxHeartrate": 157,
        "averageCadence": 79.5,
        "averageWatts": 163.6,
        "maxWatts": 330,
        "weightedAverageWatts": 176,
        "averageSpeed": 8.665036593479707,
        "maxSpeed": 12.64,
        "averagePace": "31.2 km/h",
        "calories": 491,
        "sufferScore": null,
        "laps": [
          {
            "lapIndex": 0,
            "distance": 4762.82,
            "time": 600,
            "elapsedTime": 600,
            "pace": "28.6 km/h",
            "averageHeartrate": 118.5,
            "averageCadence": 73.1,
            "averageWatts": 138.1,
            "isRest": false
          },
          {
            "lapIndex": 1,
            "distance": 5742.99,
            "time": 600,
            "elapsedTime": 600,
            "pace": "34.5 km/h",
            "averageHeartrate": 147.2,
            "averageCadence": 86.1,
            "averageWatts": 210.3,
            "isRest": false
          },
          {
            "lapIndex": 2,
            "distance": 2384.94,
            "time": 300,
            "elapsedTime": 300,
            "pace": "28.6 km/h",
            "averageHeartrate": 127.8,
            "averageCadence": 78.8,
            "averageWatts": 118.2,
            "isRest": false
          },
          {
            "lapIndex": 3,
            "distance": 5750.6,
            "time": 600,
            "elapsedTime": 600,
            "pace": "34.5 km/h",
            "averageHeartrate": 148.3,
            "averageCadence": 84,
            "averageWatts": 210.3,
            "isRest": false
          },
          {
            "lapIndex": 4,
            "distance": 2372.32,
            "time": 300,
            "elapsedTime": 300,
            "pace": "28.5 km/h",
            "averageHeartrate": 127.6,
            "averageCadence": 77.2,
            "averageWatts": 120.5,
            "isRest": false
          },
          {
            "lapIndex": 5,
            "distance": 4965.39,
            "time": 600,
            "elapsedTime": 600,
            "pace": "29.8 km/h",
            "averageHeartrate": 129.7,
            "averageCadence": 76.3,
            "averageWatts": 140.5,
            "isRest": false
          }
        ]
      }
    },
    {
      "plannedDate": "2026-01-08",
      "plannedType": "Soccer",
      "plannedTitle": "Soccer Practice",
      "workoutDescription": "Soccer practice",
      "status": "missed"
    },
    {
      "plannedDate": "2026-01-09",
      "plannedType": "Swim",
      "plannedTitle": "Swim Endurance",
      "workoutDescription": "6 x 50mFist Drill & 10x50m @ RPE 7 met pull-buoy.",
      "status": "completed",
      "executionScore": 35,
      "activity": {
        "date": "2026-01-09",
        "type": "Swim",
        "name": "Afternoon Swim",
        "description": "100m WU\n6x 50m fist drill (15s recovery)\n10x 50m met pull buoy (15s recovery)\n100m CD",
        "distance": 1000,
        "movingTime": 1799,
        "elapsedTime": 1799,
        "averageHeartrate": 142.8,
        "maxHeartrate": 154,
        "averageCadence": 21,
        "averageWatts": null,
        "maxWatts": null,
        "weightedAverageWatts": null,
        "averageSpeed": 0.5558643690939411,
        "maxSpeed": 5,
        "averagePace": "2:60/100m",
        "calories": 284,
        "sufferScore": null,
        "laps": [
          {
            "lapIndex": 0,
            "distance": 25,
            "time": 40,
            "elapsedTime": 40,
            "pace": "2:40",
            "averageHeartrate": 134.2,
            "averageCadence": 19,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 1,
            "distance": 25,
            "time": 33,
            "elapsedTime": 33,
            "pace": "2:12",
            "averageHeartrate": 148.4,
            "averageCadence": 19.2,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 2,
            "distance": 25,
            "time": 35,
            "elapsedTime": 35,
            "pace": "2:20",
            "averageHeartrate": 148.2,
            "averageCadence": 24,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 3,
            "distance": 25,
            "time": 32,
            "elapsedTime": 32,
            "pace": "2:08",
            "averageHeartrate": 149.4,
            "averageCadence": 24,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 4,
            "distance": 25,
            "time": 70,
            "elapsedTime": 70,
            "pace": "4:40",
            "averageHeartrate": 143,
            "averageCadence": 23.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 5,
            "distance": 25,
            "time": 29,
            "elapsedTime": 29,
            "pace": "1:56",
            "averageHeartrate": 146,
            "averageCadence": 13.6,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 6,
            "distance": 25,
            "time": 54,
            "elapsedTime": 54,
            "pace": "3:36",
            "averageHeartrate": 145.4,
            "averageCadence": 29.7,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 7,
            "distance": 25,
            "time": 35,
            "elapsedTime": 35,
            "pace": "2:20",
            "averageHeartrate": 143.6,
            "averageCadence": 15.3,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 8,
            "distance": 25,
            "time": 70,
            "elapsedTime": 70,
            "pace": "4:40",
            "averageHeartrate": 143.2,
            "averageCadence": 23.9,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 9,
            "distance": 25,
            "time": 33,
            "elapsedTime": 33,
            "pace": "2:12",
            "averageHeartrate": 146.2,
            "averageCadence": 15.3,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 10,
            "distance": 25,
            "time": 64,
            "elapsedTime": 64,
            "pace": "4:16",
            "averageHeartrate": 136.5,
            "averageCadence": 24.9,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 11,
            "distance": 25,
            "time": 38,
            "elapsedTime": 38,
            "pace": "2:32",
            "averageHeartrate": 139.5,
            "averageCadence": 18.1,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 12,
            "distance": 25,
            "time": 72,
            "elapsedTime": 72,
            "pace": "4:48",
            "averageHeartrate": 138.8,
            "averageCadence": 21.9,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 13,
            "distance": 25,
            "time": 40,
            "elapsedTime": 40,
            "pace": "2:40",
            "averageHeartrate": 143.1,
            "averageCadence": 15.2,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 14,
            "distance": 25,
            "time": 66,
            "elapsedTime": 66,
            "pace": "4:24",
            "averageHeartrate": 139.1,
            "averageCadence": 20.9,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 15,
            "distance": 25,
            "time": 34,
            "elapsedTime": 34,
            "pace": "2:16",
            "averageHeartrate": 139.5,
            "averageCadence": 15.3,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 16,
            "distance": 25,
            "time": 87,
            "elapsedTime": 87,
            "pace": "5:48",
            "averageHeartrate": 135.6,
            "averageCadence": 23.9,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 17,
            "distance": 25,
            "time": 31,
            "elapsedTime": 31,
            "pace": "2:04",
            "averageHeartrate": 139.1,
            "averageCadence": 12.2,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 18,
            "distance": 25,
            "time": 49,
            "elapsedTime": 49,
            "pace": "3:16",
            "averageHeartrate": 140,
            "averageCadence": 18,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 19,
            "distance": 25,
            "time": 33,
            "elapsedTime": 33,
            "pace": "2:12",
            "averageHeartrate": 144.9,
            "averageCadence": 18.2,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 20,
            "distance": 25,
            "time": 50,
            "elapsedTime": 50,
            "pace": "3:20",
            "averageHeartrate": 143.2,
            "averageCadence": 24.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 21,
            "distance": 25,
            "time": 31,
            "elapsedTime": 31,
            "pace": "2:04",
            "averageHeartrate": 146.8,
            "averageCadence": 15.4,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 22,
            "distance": 25,
            "time": 52,
            "elapsedTime": 52,
            "pace": "3:28",
            "averageHeartrate": 146.1,
            "averageCadence": 26.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 23,
            "distance": 25,
            "time": 32,
            "elapsedTime": 32,
            "pace": "2:08",
            "averageHeartrate": 149.2,
            "averageCadence": 16.3,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 24,
            "distance": 25,
            "time": 51,
            "elapsedTime": 51,
            "pace": "3:24",
            "averageHeartrate": 147.5,
            "averageCadence": 26.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 25,
            "distance": 25,
            "time": 37,
            "elapsedTime": 37,
            "pace": "2:28",
            "averageHeartrate": 149.7,
            "averageCadence": 15.2,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 26,
            "distance": 25,
            "time": 51,
            "elapsedTime": 51,
            "pace": "3:24",
            "averageHeartrate": 146.8,
            "averageCadence": 23.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 27,
            "distance": 25,
            "time": 33,
            "elapsedTime": 33,
            "pace": "2:12",
            "averageHeartrate": 149.2,
            "averageCadence": 15.3,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 28,
            "distance": 25,
            "time": 65,
            "elapsedTime": 65,
            "pace": "4:20",
            "averageHeartrate": 140,
            "averageCadence": 23.9,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 29,
            "distance": 25,
            "time": 38,
            "elapsedTime": 38,
            "pace": "2:32",
            "averageHeartrate": 144.3,
            "averageCadence": 15.2,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 30,
            "distance": 25,
            "time": 49,
            "elapsedTime": 49,
            "pace": "3:16",
            "averageHeartrate": 141.4,
            "averageCadence": 20.9,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 31,
            "distance": 25,
            "time": 36,
            "elapsedTime": 36,
            "pace": "2:24",
            "averageHeartrate": 144.8,
            "averageCadence": 15.2,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 32,
            "distance": 25,
            "time": 49,
            "elapsedTime": 49,
            "pace": "3:16",
            "averageHeartrate": 139.9,
            "averageCadence": 21.9,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 33,
            "distance": 25,
            "time": 36,
            "elapsedTime": 36,
            "pace": "2:24",
            "averageHeartrate": 143,
            "averageCadence": 15.3,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 34,
            "distance": 25,
            "time": 51,
            "elapsedTime": 51,
            "pace": "3:24",
            "averageHeartrate": 137.5,
            "averageCadence": 23.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 35,
            "distance": 25,
            "time": 34,
            "elapsedTime": 34,
            "pace": "2:16",
            "averageHeartrate": 140.9,
            "averageCadence": 15.4,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 36,
            "distance": 25,
            "time": 52,
            "elapsedTime": 52,
            "pace": "3:28",
            "averageHeartrate": 142.7,
            "averageCadence": 29.7,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 37,
            "distance": 25,
            "time": 35,
            "elapsedTime": 35,
            "pace": "2:20",
            "averageHeartrate": 145.7,
            "averageCadence": 15.3,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 38,
            "distance": 25,
            "time": 35,
            "elapsedTime": 35,
            "pace": "2:20",
            "averageHeartrate": 147,
            "averageCadence": 24,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 39,
            "distance": 25,
            "time": 37,
            "elapsedTime": 37,
            "pace": "2:28",
            "averageHeartrate": 147.6,
            "averageCadence": 24,
            "averageWatts": null,
            "isRest": false
          }
        ]
      }
    },
    {
      "plannedDate": "2026-01-10",
      "plannedType": "Run",
      "plannedTitle": "Fartlek training",
      "workoutDescription": "8x 2' @ 3:50-3:55 (rec: 2’ jog).",
      "status": "completed",
      "executionScore": 71,
      "activity": {
        "date": "2026-01-10",
        "type": "Run",
        "name": "Morning Run",
        "description": "Fartlek training:\n10' inlopen\n8x 2' @ 3:50-3:55/km (2 min jog)\n5' uitlopen",
        "distance": 10217.4,
        "movingTime": 3110,
        "elapsedTime": 3410,
        "averageHeartrate": 160.9,
        "maxHeartrate": 189,
        "averageCadence": 82.3,
        "averageWatts": 318.8,
        "maxWatts": 466,
        "weightedAverageWatts": 322,
        "averageSpeed": 3.285337620578778,
        "maxSpeed": 5.4,
        "averagePace": "5:04/km",
        "calories": 636,
        "sufferScore": null,
        "laps": [
          {
            "lapIndex": 0,
            "distance": 2680,
            "time": 901,
            "elapsedTime": 1159,
            "pace": "5:36",
            "averageHeartrate": 137.1,
            "averageCadence": 80.5,
            "averageWatts": 284.2,
            "isRest": false
          },
          {
            "lapIndex": 1,
            "distance": 490,
            "time": 120,
            "elapsedTime": 120,
            "pace": "4:05",
            "averageHeartrate": 174.4,
            "averageCadence": 84.9,
            "averageWatts": 382.1,
            "isRest": false
          },
          {
            "lapIndex": 2,
            "distance": 330,
            "time": 120,
            "elapsedTime": 120,
            "pace": "6:04",
            "averageHeartrate": 164.4,
            "averageCadence": 79.8,
            "averageWatts": 288.1,
            "isRest": false
          },
          {
            "lapIndex": 3,
            "distance": 500,
            "time": 119,
            "elapsedTime": 119,
            "pace": "3:58",
            "averageHeartrate": 172.9,
            "averageCadence": 84.7,
            "averageWatts": 397.9,
            "isRest": false
          },
          {
            "lapIndex": 4,
            "distance": 330,
            "time": 120,
            "elapsedTime": 120,
            "pace": "6:04",
            "averageHeartrate": 164.9,
            "averageCadence": 80.1,
            "averageWatts": 271.6,
            "isRest": false
          },
          {
            "lapIndex": 5,
            "distance": 510,
            "time": 121,
            "elapsedTime": 121,
            "pace": "3:57",
            "averageHeartrate": 173.3,
            "averageCadence": 85.9,
            "averageWatts": 408.1,
            "isRest": false
          },
          {
            "lapIndex": 6,
            "distance": 320,
            "time": 120,
            "elapsedTime": 120,
            "pace": "6:15",
            "averageHeartrate": 167.7,
            "averageCadence": 80.1,
            "averageWatts": 276.1,
            "isRest": false
          },
          {
            "lapIndex": 7,
            "distance": 520,
            "time": 120,
            "elapsedTime": 120,
            "pace": "3:51",
            "averageHeartrate": 175.5,
            "averageCadence": 86.2,
            "averageWatts": 407.1,
            "isRest": false
          },
          {
            "lapIndex": 8,
            "distance": 330,
            "time": 120,
            "elapsedTime": 150,
            "pace": "6:04",
            "averageHeartrate": 160.9,
            "averageCadence": 80.3,
            "averageWatts": 264.2,
            "isRest": false
          },
          {
            "lapIndex": 9,
            "distance": 530,
            "time": 120,
            "elapsedTime": 120,
            "pace": "3:46",
            "averageHeartrate": 174.9,
            "averageCadence": 87.2,
            "averageWatts": 419.7,
            "isRest": false
          },
          {
            "lapIndex": 10,
            "distance": 340,
            "time": 120,
            "elapsedTime": 120,
            "pace": "5:53",
            "averageHeartrate": 168.8,
            "averageCadence": 80.8,
            "averageWatts": 280.9,
            "isRest": false
          },
          {
            "lapIndex": 11,
            "distance": 510,
            "time": 120,
            "elapsedTime": 120,
            "pace": "3:55",
            "averageHeartrate": 176.4,
            "averageCadence": 87.1,
            "averageWatts": 388.7,
            "isRest": false
          },
          {
            "lapIndex": 12,
            "distance": 310,
            "time": 120,
            "elapsedTime": 120,
            "pace": "6:27",
            "averageHeartrate": 171.7,
            "averageCadence": 80.3,
            "averageWatts": 271.9,
            "isRest": false
          },
          {
            "lapIndex": 13,
            "distance": 510,
            "time": 120,
            "elapsedTime": 120,
            "pace": "3:55",
            "averageHeartrate": 179.9,
            "averageCadence": 87.6,
            "averageWatts": 410.1,
            "isRest": false
          },
          {
            "lapIndex": 14,
            "distance": 310,
            "time": 120,
            "elapsedTime": 120,
            "pace": "6:27",
            "averageHeartrate": 174.8,
            "averageCadence": 79.9,
            "averageWatts": 272.9,
            "isRest": false
          },
          {
            "lapIndex": 15,
            "distance": 530,
            "time": 120,
            "elapsedTime": 120,
            "pace": "3:46",
            "averageHeartrate": 181.7,
            "averageCadence": 87.6,
            "averageWatts": 419.7,
            "isRest": false
          },
          {
            "lapIndex": 16,
            "distance": 300,
            "time": 117,
            "elapsedTime": 120,
            "pace": "6:30",
            "averageHeartrate": 171.5,
            "averageCadence": 79.9,
            "averageWatts": 255.8,
            "isRest": false
          },
          {
            "lapIndex": 17,
            "distance": 860,
            "time": 292,
            "elapsedTime": 301,
            "pace": "5:40",
            "averageHeartrate": 160.6,
            "averageCadence": 81.4,
            "averageWatts": 292.9,
            "isRest": false
          }
        ]
      }
    },
    {
      "plannedDate": "2026-01-11",
      "plannedType": "Bike",
      "plannedTitle": "Key Session: Brick (Bike)",
      "workoutDescription": "Bike: 60 min @ 75% FTP.",
      "status": "completed",
      "executionScore": 98,
      "activity": {
        "date": "2026-01-11",
        "type": "VirtualRide",
        "name": "MyWhoosh - 60' @ 75% FTP",
        "description": "Brick workout (1/2)",
        "distance": 31907.2,
        "movingTime": 3604,
        "elapsedTime": 3604,
        "averageHeartrate": 135.5,
        "maxHeartrate": 152,
        "averageCadence": 85,
        "averageWatts": 170.6,
        "maxWatts": 435,
        "weightedAverageWatts": 171,
        "averageSpeed": 8.853274139844617,
        "maxSpeed": 13.48,
        "averagePace": "31.9 km/h",
        "calories": 615,
        "sufferScore": null,
        "laps": [
          {
            "lapIndex": 0,
            "distance": 31864.6,
            "time": 3600,
            "elapsedTime": 3600,
            "pace": "31.9 km/h",
            "averageHeartrate": 135.5,
            "averageCadence": 85,
            "averageWatts": 170.6,
            "isRest": false
          }
        ]
      }
    },
    {
      "plannedDate": "2026-01-11",
      "plannedType": "Run",
      "plannedTitle": "Key Session: Brick (Run)",
      "workoutDescription": "Run: 15 min @ 4:40/km.",
      "status": "completed",
      "executionScore": 84,
      "activity": {
        "date": "2026-01-11",
        "type": "Run",
        "name": "Treadmill",
        "description": "Brick workout (2/2)",
        "distance": 4011.9,
        "movingTime": 1117,
        "elapsedTime": 1117,
        "averageHeartrate": 163.6,
        "maxHeartrate": 171,
        "averageCadence": 81.5,
        "averageWatts": null,
        "maxWatts": null,
        "weightedAverageWatts": null,
        "averageSpeed": 3.591674127126231,
        "maxSpeed": 5.06,
        "averagePace": "4:38/km",
        "calories": 235,
        "sufferScore": null,
        "laps": [
          {
            "lapIndex": 0,
            "distance": 4011,
            "time": 1117,
            "elapsedTime": 1110,
            "pace": "4:38",
            "averageHeartrate": 163.6,
            "averageCadence": 81.5,
            "averageWatts": null,
            "isRest": false
          }
        ]
      }
    },
    {
      "plannedDate": "2026-01-12",
      "plannedType": "Swim",
      "plannedTitle": "Swim Tech",
      "workoutDescription": "8x25m Zipper Drill. 6x100m gebroken.",
      "status": "completed",
      "executionScore": 29,
      "activity": {
        "date": "2026-01-12",
        "type": "Swim",
        "name": "Afternoon Swim",
        "description": "1000m*:\n100m WU\n4x 50m catch up drill\n6x 100m\n100m CD",
        "distance": 925,
        "movingTime": 1998,
        "elapsedTime": 1998,
        "averageHeartrate": 140.1,
        "maxHeartrate": 159,
        "averageCadence": 15.9,
        "averageWatts": null,
        "maxWatts": null,
        "weightedAverageWatts": null,
        "averageSpeed": 0.46296296296296297,
        "maxSpeed": 5,
        "averagePace": "3:36/100m",
        "calories": 305,
        "sufferScore": null,
        "laps": [
          {
            "lapIndex": 0,
            "distance": 25,
            "time": 47,
            "elapsedTime": 47,
            "pace": "3:08",
            "averageHeartrate": 118,
            "averageCadence": 15,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 1,
            "distance": 25,
            "time": 26,
            "elapsedTime": 26,
            "pace": "1:44",
            "averageHeartrate": 134.8,
            "averageCadence": 15.6,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 2,
            "distance": 25,
            "time": 55,
            "elapsedTime": 55,
            "pace": "3:40",
            "averageHeartrate": 133.6,
            "averageCadence": 29.7,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 3,
            "distance": 25,
            "time": 157,
            "elapsedTime": 157,
            "pace": "10:28",
            "averageHeartrate": 126,
            "averageCadence": 15,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 4,
            "distance": 25,
            "time": 67,
            "elapsedTime": 67,
            "pace": "4:28",
            "averageHeartrate": 124.3,
            "averageCadence": 14.9,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 5,
            "distance": 25,
            "time": 46,
            "elapsedTime": 46,
            "pace": "3:04",
            "averageHeartrate": 129.1,
            "averageCadence": 9.1,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 6,
            "distance": 25,
            "time": 54,
            "elapsedTime": 54,
            "pace": "3:36",
            "averageHeartrate": 130.8,
            "averageCadence": 12.9,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 7,
            "distance": 25,
            "time": 55,
            "elapsedTime": 55,
            "pace": "3:40",
            "averageHeartrate": 136,
            "averageCadence": 10,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 8,
            "distance": 25,
            "time": 53,
            "elapsedTime": 53,
            "pace": "3:32",
            "averageHeartrate": 135.1,
            "averageCadence": 12,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 9,
            "distance": 25,
            "time": 166,
            "elapsedTime": 166,
            "pace": "11:04",
            "averageHeartrate": 124.3,
            "averageCadence": 13,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 10,
            "distance": 25,
            "time": 108,
            "elapsedTime": 108,
            "pace": "7:12",
            "averageHeartrate": 135.8,
            "averageCadence": 12.1,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 11,
            "distance": 25,
            "time": 40,
            "elapsedTime": 40,
            "pace": "2:40",
            "averageHeartrate": 139.7,
            "averageCadence": 18,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 12,
            "distance": 25,
            "time": 44,
            "elapsedTime": 44,
            "pace": "2:56",
            "averageHeartrate": 139,
            "averageCadence": 18,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 13,
            "distance": 25,
            "time": 40,
            "elapsedTime": 40,
            "pace": "2:40",
            "averageHeartrate": 142,
            "averageCadence": 16.1,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 14,
            "distance": 25,
            "time": 44,
            "elapsedTime": 44,
            "pace": "2:56",
            "averageHeartrate": 139.7,
            "averageCadence": 18,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 15,
            "distance": 25,
            "time": 43,
            "elapsedTime": 43,
            "pace": "2:52",
            "averageHeartrate": 138.6,
            "averageCadence": 16,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 16,
            "distance": 25,
            "time": 43,
            "elapsedTime": 43,
            "pace": "2:52",
            "averageHeartrate": 151.6,
            "averageCadence": 18,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 17,
            "distance": 25,
            "time": 45,
            "elapsedTime": 45,
            "pace": "3:00",
            "averageHeartrate": 152.7,
            "averageCadence": 18,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 18,
            "distance": 25,
            "time": 46,
            "elapsedTime": 46,
            "pace": "3:04",
            "averageHeartrate": 155.3,
            "averageCadence": 18,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 19,
            "distance": 25,
            "time": 43,
            "elapsedTime": 43,
            "pace": "2:52",
            "averageHeartrate": 151.7,
            "averageCadence": 18,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 20,
            "distance": 25,
            "time": 46,
            "elapsedTime": 46,
            "pace": "3:04",
            "averageHeartrate": 151,
            "averageCadence": 18,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 21,
            "distance": 25,
            "time": 50,
            "elapsedTime": 50,
            "pace": "3:20",
            "averageHeartrate": 151.9,
            "averageCadence": 15.9,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 22,
            "distance": 25,
            "time": 47,
            "elapsedTime": 47,
            "pace": "3:08",
            "averageHeartrate": 145.9,
            "averageCadence": 13,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 23,
            "distance": 25,
            "time": 46,
            "elapsedTime": 46,
            "pace": "3:04",
            "averageHeartrate": 147,
            "averageCadence": 15,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 24,
            "distance": 25,
            "time": 46,
            "elapsedTime": 46,
            "pace": "3:04",
            "averageHeartrate": 152,
            "averageCadence": 15.1,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 25,
            "distance": 25,
            "time": 46,
            "elapsedTime": 46,
            "pace": "3:04",
            "averageHeartrate": 150.5,
            "averageCadence": 19,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 26,
            "distance": 25,
            "time": 47,
            "elapsedTime": 47,
            "pace": "3:08",
            "averageHeartrate": 150,
            "averageCadence": 17.9,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 27,
            "distance": 25,
            "time": 46,
            "elapsedTime": 46,
            "pace": "3:04",
            "averageHeartrate": 151.6,
            "averageCadence": 15.1,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 28,
            "distance": 25,
            "time": 47,
            "elapsedTime": 47,
            "pace": "3:08",
            "averageHeartrate": 149.8,
            "averageCadence": 20.9,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 29,
            "distance": 25,
            "time": 44,
            "elapsedTime": 44,
            "pace": "2:56",
            "averageHeartrate": 149.2,
            "averageCadence": 15,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 30,
            "distance": 25,
            "time": 43,
            "elapsedTime": 43,
            "pace": "2:52",
            "averageHeartrate": 144.9,
            "averageCadence": 16,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 31,
            "distance": 25,
            "time": 42,
            "elapsedTime": 42,
            "pace": "2:48",
            "averageHeartrate": 149.5,
            "averageCadence": 18,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 32,
            "distance": 25,
            "time": 47,
            "elapsedTime": 47,
            "pace": "3:08",
            "averageHeartrate": 151.6,
            "averageCadence": 17.9,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 33,
            "distance": 25,
            "time": 41,
            "elapsedTime": 41,
            "pace": "2:44",
            "averageHeartrate": 149.9,
            "averageCadence": 15,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 34,
            "distance": 25,
            "time": 67,
            "elapsedTime": 67,
            "pace": "4:28",
            "averageHeartrate": 143.2,
            "averageCadence": 16,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 35,
            "distance": 25,
            "time": 33,
            "elapsedTime": 33,
            "pace": "2:12",
            "averageHeartrate": 151.8,
            "averageCadence": 16.2,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 36,
            "distance": 25,
            "time": 38,
            "elapsedTime": 38,
            "pace": "2:32",
            "averageHeartrate": 156.2,
            "averageCadence": 22.1,
            "averageWatts": null,
            "isRest": false
          }
        ]
      }
    },
    {
      "plannedDate": "2026-01-13",
      "plannedType": "Soccer",
      "plannedTitle": "Soccer Practice",
      "workoutDescription": "Regular training session.",
      "status": "completed",
      "executionScore": 72,
      "activity": {
        "date": "2026-01-13",
        "type": "Soccer",
        "name": "Evening Football (Soccer)",
        "description": null,
        "distance": 6190.8,
        "movingTime": 4142,
        "elapsedTime": 4799,
        "averageHeartrate": 138.9,
        "maxHeartrate": 179,
        "averageCadence": null,
        "averageWatts": null,
        "maxWatts": null,
        "weightedAverageWatts": null,
        "averageSpeed": 1.4946402704007726,
        "maxSpeed": 5.6,
        "averagePace": "N/A",
        "calories": 761,
        "sufferScore": null,
        "laps": [
          {
            "lapIndex": 0,
            "distance": 6190,
            "time": 4142,
            "elapsedTime": 4798,
            "pace": "",
            "averageHeartrate": 138.9,
            "averageCadence": null,
            "averageWatts": null,
            "isRest": false
          }
        ]
      }
    },
    {
      "plannedDate": "2026-01-14",
      "plannedType": "Run",
      "plannedTitle": "Key Session: Run Intervals",
      "workoutDescription": "3x2km @ 4:15/km (rec: 3' jog).",
      "status": "completed",
      "executionScore": 100,
      "activity": {
        "date": "2026-01-14",
        "type": "Run",
        "name": "Treadmill",
        "description": "10' inlopen\n3x 2km @ 4:15 (3' jog)\n",
        "distance": 9220,
        "movingTime": 2676,
        "elapsedTime": 2676,
        "averageHeartrate": 160.9,
        "maxHeartrate": 178,
        "averageCadence": 81.9,
        "averageWatts": null,
        "maxWatts": null,
        "weightedAverageWatts": null,
        "averageSpeed": 3.445440956651719,
        "maxSpeed": 2.24,
        "averagePace": "4:50/km",
        "calories": 546,
        "sufferScore": null,
        "laps": [
          {
            "lapIndex": 0,
            "distance": 1010,
            "time": 594,
            "elapsedTime": 594,
            "pace": "9:48",
            "averageHeartrate": 137.9,
            "averageCadence": 79.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 1,
            "distance": 2000,
            "time": 510,
            "elapsedTime": 508,
            "pace": "4:15",
            "averageHeartrate": 169,
            "averageCadence": 84,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 2,
            "distance": 270,
            "time": 180,
            "elapsedTime": 180,
            "pace": "11:07",
            "averageHeartrate": 153.3,
            "averageCadence": 77.1,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 3,
            "distance": 2000,
            "time": 510,
            "elapsedTime": 510,
            "pace": "4:15",
            "averageHeartrate": 171.1,
            "averageCadence": 84.1,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 4,
            "distance": 270,
            "time": 179,
            "elapsedTime": 179,
            "pace": "11:03",
            "averageHeartrate": 156.7,
            "averageCadence": 77.2,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 5,
            "distance": 2000,
            "time": 510,
            "elapsedTime": 510,
            "pace": "4:15",
            "averageHeartrate": 173,
            "averageCadence": 83.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 6,
            "distance": 4840,
            "time": 195,
            "elapsedTime": 195,
            "pace": "0:40",
            "averageHeartrate": 161.9,
            "averageCadence": 80.2,
            "averageWatts": null,
            "isRest": false
          }
        ]
      }
    },
    {
      "plannedDate": "2026-01-14",
      "plannedType": "Bike",
      "plannedTitle": "Key Session: Threshold Intervals",
      "workoutDescription": "3x8 min @ 95–100% FTP.",
      "status": "completed",
      "executionScore": 96,
      "activity": {
        "date": "2026-01-14",
        "type": "VirtualRide",
        "name": "MyWhoosh - W2 - Threshold intervals",
        "description": null,
        "distance": 28405.5,
        "movingTime": 3246,
        "elapsedTime": 3246,
        "averageHeartrate": 135.5,
        "maxHeartrate": 159,
        "averageCadence": 80.8,
        "averageWatts": 176.1,
        "maxWatts": 379,
        "weightedAverageWatts": 192,
        "averageSpeed": 8.750924214417745,
        "maxSpeed": 11.96,
        "averagePace": "31.5 km/h",
        "calories": 571,
        "sufferScore": null,
        "laps": [
          {
            "lapIndex": 0,
            "distance": 4740.22,
            "time": 600,
            "elapsedTime": 600,
            "pace": "28.4 km/h",
            "averageHeartrate": 122.1,
            "averageCadence": 77.6,
            "averageWatts": 142.3,
            "isRest": false
          },
          {
            "lapIndex": 1,
            "distance": 4666.11,
            "time": 480,
            "elapsedTime": 480,
            "pace": "35.0 km/h",
            "averageHeartrate": 146.7,
            "averageCadence": 84,
            "averageWatts": 228.2,
            "isRest": false
          },
          {
            "lapIndex": 2,
            "distance": 1938.89,
            "time": 240,
            "elapsedTime": 240,
            "pace": "29.1 km/h",
            "averageHeartrate": 126.9,
            "averageCadence": 77.4,
            "averageWatts": 118.4,
            "isRest": false
          },
          {
            "lapIndex": 3,
            "distance": 4660.12,
            "time": 480,
            "elapsedTime": 480,
            "pace": "35.0 km/h",
            "averageHeartrate": 148,
            "averageCadence": 84.2,
            "averageWatts": 229.6,
            "isRest": false
          },
          {
            "lapIndex": 4,
            "distance": 1946.29,
            "time": 240,
            "elapsedTime": 240,
            "pace": "29.2 km/h",
            "averageHeartrate": 127.7,
            "averageCadence": 75.1,
            "averageWatts": 120.9,
            "isRest": false
          },
          {
            "lapIndex": 5,
            "distance": 4662.3,
            "time": 480,
            "elapsedTime": 480,
            "pace": "35.0 km/h",
            "averageHeartrate": 149.3,
            "averageCadence": 85.5,
            "averageWatts": 229.8,
            "isRest": false
          },
          {
            "lapIndex": 6,
            "distance": 1936,
            "time": 240,
            "elapsedTime": 240,
            "pace": "29.0 km/h",
            "averageHeartrate": 128.6,
            "averageCadence": 70.8,
            "averageWatts": 119,
            "isRest": false
          },
          {
            "lapIndex": 7,
            "distance": 3791.15,
            "time": 480,
            "elapsedTime": 480,
            "pace": "28.4 km/h",
            "averageHeartrate": 126.8,
            "averageCadence": 82.9,
            "averageWatts": 144,
            "isRest": false
          }
        ]
      }
    },
    {
      "plannedDate": "2026-01-15",
      "plannedType": "Soccer",
      "plannedTitle": "Soccer Practice",
      "workoutDescription": "Regular training session.",
      "status": "completed",
      "executionScore": 75,
      "activity": {
        "date": "2026-01-15",
        "type": "Soccer",
        "name": "Evening Football (Soccer)",
        "description": null,
        "distance": 6090.2,
        "movingTime": 4324,
        "elapsedTime": 5350,
        "averageHeartrate": 111.4,
        "maxHeartrate": 162,
        "averageCadence": null,
        "averageWatts": null,
        "maxWatts": null,
        "weightedAverageWatts": null,
        "averageSpeed": 1.408464384828862,
        "maxSpeed": 5.24,
        "averagePace": "N/A",
        "calories": 539,
        "sufferScore": null,
        "laps": [
          {
            "lapIndex": 0,
            "distance": 6090,
            "time": 4324,
            "elapsedTime": 5348,
            "pace": "",
            "averageHeartrate": 111.4,
            "averageCadence": null,
            "averageWatts": null,
            "isRest": false
          }
        ]
      }
    },
    {
      "plannedDate": "2026-01-16",
      "plannedType": "Swim",
      "plannedTitle": "Swim Strength",
      "workoutDescription": "4x50m Sculling. 8x75m (25 drill/50 swim).",
      "status": "completed",
      "executionScore": 100,
      "activity": {
        "date": "2026-01-16",
        "type": "Swim",
        "name": "Evening Swim",
        "description": "1050m*:\n150m WU\n4x 50m sculling\n8x 25 drill + 50m\n100m CD\n",
        "distance": 1050,
        "movingTime": 1771,
        "elapsedTime": 1771,
        "averageHeartrate": 141.6,
        "maxHeartrate": 155,
        "averageCadence": 19.8,
        "averageWatts": null,
        "maxWatts": null,
        "weightedAverageWatts": null,
        "averageSpeed": 0.5928853754940712,
        "maxSpeed": 5,
        "averagePace": "2:49/100m",
        "calories": 298,
        "sufferScore": null,
        "laps": [
          {
            "lapIndex": 0,
            "distance": 150,
            "time": 207,
            "elapsedTime": 36,
            "pace": "2:18",
            "averageHeartrate": 146.8,
            "averageCadence": 26.9,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 1,
            "distance": 50,
            "time": 89,
            "pace": "2:58",
            "isRest": false
          },
          {
            "lapIndex": 2,
            "time": 20,
            "pace": "",
            "isRest": false
          },
          {
            "lapIndex": 3,
            "distance": 50,
            "time": 81,
            "pace": "2:42",
            "isRest": false
          },
          {
            "lapIndex": 4,
            "time": 20,
            "pace": "",
            "isRest": false
          },
          {
            "lapIndex": 5,
            "distance": 50,
            "time": 90,
            "pace": "3:00",
            "isRest": false
          },
          {
            "lapIndex": 7,
            "time": 20,
            "pace": "",
            "isRest": false
          },
          {
            "lapIndex": 8,
            "distance": 50,
            "time": 92,
            "pace": "3:04",
            "isRest": false
          },
          {
            "lapIndex": 9,
            "time": 20,
            "pace": "",
            "isRest": false
          },
          {
            "lapIndex": 10,
            "distance": 25,
            "time": 65,
            "pace": "4:20",
            "isRest": false
          },
          {
            "lapIndex": 11,
            "distance": 50,
            "time": 68,
            "pace": "2:16",
            "isRest": false
          },
          {
            "lapIndex": 12,
            "time": 10,
            "pace": "",
            "isRest": false
          },
          {
            "lapIndex": 13,
            "distance": 25,
            "time": 41,
            "pace": "2:44",
            "isRest": false
          },
          {
            "lapIndex": 14,
            "distance": 50,
            "time": 71,
            "pace": "2:22",
            "isRest": false
          },
          {
            "lapIndex": 15,
            "time": 10,
            "pace": "",
            "isRest": false
          },
          {
            "lapIndex": 16,
            "distance": 25,
            "time": 51,
            "pace": "3:24",
            "isRest": false
          },
          {
            "lapIndex": 17,
            "distance": 50,
            "time": 65,
            "pace": "2:10",
            "isRest": false
          },
          {
            "lapIndex": 18,
            "time": 10,
            "pace": "",
            "isRest": false
          },
          {
            "lapIndex": 19,
            "distance": 25,
            "time": 53,
            "pace": "3:32",
            "isRest": false
          },
          {
            "lapIndex": 19,
            "distance": 50,
            "time": 65,
            "pace": "2:10",
            "isRest": false
          },
          {
            "lapIndex": 20,
            "time": 10,
            "pace": "",
            "isRest": false
          },
          {
            "lapIndex": 21,
            "distance": 25,
            "time": 33,
            "pace": "2:12",
            "isRest": false
          },
          {
            "lapIndex": 22,
            "distance": 50,
            "time": 71,
            "pace": "2:22",
            "isRest": false
          },
          {
            "lapIndex": 23,
            "time": 10,
            "pace": "",
            "isRest": false
          },
          {
            "lapIndex": 24,
            "distance": 25,
            "time": 51,
            "pace": "3:24",
            "isRest": false
          },
          {
            "lapIndex": 25,
            "distance": 50,
            "time": 71,
            "pace": "2:22",
            "isRest": false
          },
          {
            "lapIndex": 26,
            "time": 10,
            "pace": "",
            "isRest": false
          },
          {
            "lapIndex": 27,
            "distance": 25,
            "time": 39,
            "pace": "2:36",
            "isRest": false
          },
          {
            "lapIndex": 28,
            "distance": 50,
            "time": 72,
            "pace": "2:24",
            "isRest": false
          },
          {
            "lapIndex": 29,
            "time": 10,
            "pace": "",
            "isRest": false
          },
          {
            "lapIndex": 30,
            "distance": 25,
            "time": 43,
            "pace": "2:52",
            "isRest": false
          },
          {
            "lapIndex": 31,
            "distance": 50,
            "time": 59,
            "pace": "1:58",
            "isRest": false
          },
          {
            "lapIndex": 32,
            "time": 10,
            "pace": "",
            "isRest": false
          },
          {
            "lapIndex": 33,
            "distance": 100,
            "time": 138,
            "pace": "2:18",
            "isRest": false
          }
        ]
      }
    },
    {
      "plannedDate": "2026-01-17",
      "plannedType": "Soccer",
      "plannedTitle": "Soccer Match",
      "workoutDescription": "Weekly competition.",
      "status": "completed",
      "executionScore": 94,
      "activity": {
        "date": "2026-01-17",
        "type": "Soccer",
        "name": "Merkem - Beaufort",
        "description": "",
        "distance": 0,
        "movingTime": 5400,
        "elapsedTime": 5400,
        "averageHeartrate": null,
        "maxHeartrate": null,
        "averageCadence": null,
        "averageWatts": null,
        "maxWatts": null,
        "weightedAverageWatts": null,
        "averageSpeed": 0,
        "maxSpeed": 0,
        "averagePace": "N/A",
        "calories": 0,
        "sufferScore": null,
        "laps": []
      }
    },
    {
      "plannedDate": "2026-01-18",
      "plannedType": "Run",
      "plannedTitle": "Key Session: Long Run",
      "workoutDescription": "14 km @ 5:20/km (Steady Z2).",
      "status": "missed"
    },
    {
      "plannedDate": "2026-01-19",
      "plannedType": "Swim",
      "plannedTitle": "Swim Tech",
      "workoutDescription": "8x25m Sighting drills. 10x50m @ RPE 8.",
      "status": "missed"
    },
    {
      "plannedDate": "2026-01-20",
      "plannedType": "Soccer",
      "plannedTitle": "Soccer Practice",
      "workoutDescription": "Regular training session.",
      "status": "completed",
      "executionScore": 66,
      "activity": {
        "date": "2026-01-20",
        "type": "Soccer",
        "name": "Evening Football (Soccer)",
        "description": "Na twee verplichte rustdagen door snotneuze ",
        "distance": 5351.2,
        "movingTime": 3822,
        "elapsedTime": 4676,
        "averageHeartrate": 123.8,
        "maxHeartrate": 170,
        "averageCadence": null,
        "averageWatts": null,
        "maxWatts": null,
        "weightedAverageWatts": null,
        "averageSpeed": 1.4001046572475144,
        "maxSpeed": 7.4,
        "averagePace": "N/A",
        "calories": 617,
        "sufferScore": null,
        "laps": [
          {
            "lapIndex": 0,
            "distance": 5351,
            "time": 3822,
            "elapsedTime": 4670,
            "pace": "",
            "averageHeartrate": 123.8,
            "averageCadence": null,
            "averageWatts": null,
            "isRest": false
          }
        ]
      }
    },
    {
      "plannedDate": "2026-01-21",
      "plannedType": "Run",
      "plannedTitle": "Key Session: Run Intervals",
      "workoutDescription": "10x400m @ 4:00/km (rec: 1' jog).",
      "status": "completed",
      "executionScore": 97,
      "activity": {
        "date": "2026-01-21",
        "type": "Run",
        "name": "Lunch Run",
        "description": "Toch nie ideaal met verkoudheid\n10' inlopen\n10x 400m @ 3:40/km (1' recovery)\n5' uitlopen",
        "distance": 7761.7,
        "movingTime": 2378,
        "elapsedTime": 2659,
        "averageHeartrate": 155.9,
        "maxHeartrate": 186,
        "averageCadence": 79.7,
        "averageWatts": 298.6,
        "maxWatts": 456,
        "weightedAverageWatts": 309,
        "averageSpeed": 3.2639613120269133,
        "maxSpeed": 5.36,
        "averagePace": "5:06/km",
        "calories": 472,
        "sufferScore": null,
        "laps": [
          {
            "lapIndex": 0,
            "distance": 1870,
            "time": 595,
            "elapsedTime": 860,
            "pace": "5:18",
            "averageHeartrate": 107.5,
            "averageCadence": 81.5,
            "averageWatts": 292.9,
            "isRest": false
          },
          {
            "lapIndex": 1,
            "distance": 400,
            "time": 87,
            "elapsedTime": 87,
            "pace": "3:38",
            "averageHeartrate": 175.9,
            "averageCadence": 89.6,
            "averageWatts": 411.4,
            "isRest": false
          },
          {
            "lapIndex": 2,
            "distance": 150,
            "time": 60,
            "elapsedTime": 60,
            "pace": "6:40",
            "averageHeartrate": 170.6,
            "averageCadence": 79.2,
            "averageWatts": 279.6,
            "isRest": false
          },
          {
            "lapIndex": 3,
            "distance": 400,
            "time": 87,
            "elapsedTime": 87,
            "pace": "3:38",
            "averageHeartrate": 175.4,
            "averageCadence": 89.3,
            "averageWatts": 406.9,
            "isRest": false
          },
          {
            "lapIndex": 4,
            "distance": 120,
            "time": 60,
            "elapsedTime": 60,
            "pace": "8:20",
            "averageHeartrate": 172,
            "averageCadence": 70.5,
            "averageWatts": 220.8,
            "isRest": false
          },
          {
            "lapIndex": 5,
            "distance": 400,
            "time": 90,
            "elapsedTime": 90,
            "pace": "3:45",
            "averageHeartrate": 180.1,
            "averageCadence": 89.6,
            "averageWatts": 406.8,
            "isRest": false
          },
          {
            "lapIndex": 6,
            "distance": 120,
            "time": 54,
            "elapsedTime": 60,
            "pace": "7:30",
            "averageHeartrate": 174.7,
            "averageCadence": 73.1,
            "averageWatts": 197.3,
            "isRest": false
          },
          {
            "lapIndex": 7,
            "distance": 400,
            "time": 92,
            "elapsedTime": 92,
            "pace": "3:50",
            "averageHeartrate": 179.7,
            "averageCadence": 88.1,
            "averageWatts": 363.1,
            "isRest": false
          },
          {
            "lapIndex": 8,
            "distance": 80,
            "time": 50,
            "elapsedTime": 60,
            "pace": "10:25",
            "averageHeartrate": 167.2,
            "averageCadence": 58.3,
            "averageWatts": 116.3,
            "isRest": false
          },
          {
            "lapIndex": 9,
            "distance": 400,
            "time": 92,
            "elapsedTime": 92,
            "pace": "3:50",
            "averageHeartrate": 172.3,
            "averageCadence": 86.8,
            "averageWatts": 382.6,
            "isRest": false
          },
          {
            "lapIndex": 10,
            "distance": 90,
            "time": 60,
            "elapsedTime": 60,
            "pace": "11:07",
            "averageHeartrate": 168.3,
            "averageCadence": 59.5,
            "averageWatts": 140.3,
            "isRest": false
          },
          {
            "lapIndex": 11,
            "distance": 400,
            "time": 88,
            "elapsedTime": 88,
            "pace": "3:40",
            "averageHeartrate": 173.5,
            "averageCadence": 87.6,
            "averageWatts": 387.8,
            "isRest": false
          },
          {
            "lapIndex": 12,
            "distance": 90,
            "time": 60,
            "elapsedTime": 60,
            "pace": "11:07",
            "averageHeartrate": 171.3,
            "averageCadence": 59.4,
            "averageWatts": 137.9,
            "isRest": false
          },
          {
            "lapIndex": 13,
            "distance": 400,
            "time": 85,
            "elapsedTime": 85,
            "pace": "3:33",
            "averageHeartrate": 175,
            "averageCadence": 89.3,
            "averageWatts": 389.8,
            "isRest": false
          },
          {
            "lapIndex": 14,
            "distance": 80,
            "time": 60,
            "elapsedTime": 60,
            "pace": "12:30",
            "averageHeartrate": 169.6,
            "averageCadence": 58.1,
            "averageWatts": 131.5,
            "isRest": false
          },
          {
            "lapIndex": 15,
            "distance": 400,
            "time": 92,
            "elapsedTime": 92,
            "pace": "3:50",
            "averageHeartrate": 174.5,
            "averageCadence": 87.9,
            "averageWatts": 394.3,
            "isRest": false
          },
          {
            "lapIndex": 16,
            "distance": 90,
            "time": 60,
            "elapsedTime": 60,
            "pace": "11:07",
            "averageHeartrate": 172.9,
            "averageCadence": 58.4,
            "averageWatts": 127.5,
            "isRest": false
          },
          {
            "lapIndex": 17,
            "distance": 400,
            "time": 95,
            "elapsedTime": 95,
            "pace": "3:58",
            "averageHeartrate": 178.1,
            "averageCadence": 88,
            "averageWatts": 390.4,
            "isRest": false
          },
          {
            "lapIndex": 18,
            "distance": 90,
            "time": 60,
            "elapsedTime": 60,
            "pace": "11:07",
            "averageHeartrate": 174.9,
            "averageCadence": 58.7,
            "averageWatts": 132.8,
            "isRest": false
          },
          {
            "lapIndex": 19,
            "distance": 400,
            "time": 91,
            "elapsedTime": 91,
            "pace": "3:48",
            "averageHeartrate": 176,
            "averageCadence": 88.1,
            "averageWatts": 383.7,
            "isRest": false
          },
          {
            "lapIndex": 20,
            "distance": 80,
            "time": 60,
            "elapsedTime": 60,
            "pace": "12:30",
            "averageHeartrate": 170.5,
            "averageCadence": 58.4,
            "averageWatts": 138.7,
            "isRest": false
          },
          {
            "lapIndex": 21,
            "distance": 900,
            "time": 300,
            "elapsedTime": 300,
            "pace": "5:33",
            "averageHeartrate": 160.7,
            "averageCadence": 81.5,
            "averageWatts": 294.5,
            "isRest": false
          }
        ]
      }
    },
    {
      "plannedDate": "2026-01-21",
      "plannedType": "Bike",
      "plannedTitle": "Key Session: Over-Under Session",
      "workoutDescription": "3 sets van (2 min @ 95% + 2 min @ 105% FTP).",
      "status": "completed",
      "executionScore": 57,
      "activity": {
        "date": "2026-01-21",
        "type": "VirtualRide",
        "name": "MyWhoosh - W3 - Over-Under",
        "description": null,
        "distance": 24353.6,
        "movingTime": 2826,
        "elapsedTime": 2826,
        "averageHeartrate": 136.5,
        "maxHeartrate": 166,
        "averageCadence": 85.3,
        "averageWatts": 164.2,
        "maxWatts": 388,
        "weightedAverageWatts": 180,
        "averageSpeed": 8.617692852087757,
        "maxSpeed": 14.26,
        "averagePace": "31.0 km/h",
        "calories": 463,
        "sufferScore": null,
        "laps": [
          {
            "lapIndex": 0,
            "distance": 4791.11,
            "time": 600,
            "elapsedTime": 600,
            "pace": "28.7 km/h",
            "averageHeartrate": 121.3,
            "averageCadence": 79.9,
            "averageWatts": 138.1,
            "isRest": false
          },
          {
            "lapIndex": 1,
            "distance": 1190.43,
            "time": 120,
            "elapsedTime": 120,
            "pace": "35.7 km/h",
            "averageHeartrate": 152,
            "averageCadence": 88.4,
            "averageWatts": 251.9,
            "isRest": false
          },
          {
            "lapIndex": 2,
            "distance": 1129.32,
            "time": 120,
            "elapsedTime": 120,
            "pace": "33.9 km/h",
            "averageHeartrate": 157.2,
            "averageCadence": 97.7,
            "averageWatts": 225,
            "isRest": false
          },
          {
            "lapIndex": 3,
            "distance": 2447.49,
            "time": 300,
            "elapsedTime": 300,
            "pace": "29.4 km/h",
            "averageHeartrate": 131.2,
            "averageCadence": 76.2,
            "averageWatts": 119,
            "isRest": false
          },
          {
            "lapIndex": 4,
            "distance": 1194.58,
            "time": 120,
            "elapsedTime": 120,
            "pace": "35.8 km/h",
            "averageHeartrate": 152.5,
            "averageCadence": 90.6,
            "averageWatts": 251.8,
            "isRest": false
          },
          {
            "lapIndex": 5,
            "distance": 1187.27,
            "time": 120,
            "elapsedTime": 120,
            "pace": "35.6 km/h",
            "averageHeartrate": 158.9,
            "averageCadence": 92.5,
            "averageWatts": 224.4,
            "isRest": false
          },
          {
            "lapIndex": 6,
            "distance": 2333.14,
            "time": 300,
            "elapsedTime": 300,
            "pace": "28.0 km/h",
            "averageHeartrate": 132.8,
            "averageCadence": 79.8,
            "averageWatts": 122.7,
            "isRest": false
          },
          {
            "lapIndex": 7,
            "distance": 1270.85,
            "time": 120,
            "elapsedTime": 120,
            "pace": "38.1 km/h",
            "averageHeartrate": 150.5,
            "averageCadence": 88.5,
            "averageWatts": 253.8,
            "isRest": false
          },
          {
            "lapIndex": 8,
            "distance": 1206.19,
            "time": 120,
            "elapsedTime": 120,
            "pace": "36.2 km/h",
            "averageHeartrate": 162,
            "averageCadence": 90.7,
            "averageWatts": 227.5,
            "isRest": false
          },
          {
            "lapIndex": 9,
            "distance": 2329.43,
            "time": 300,
            "elapsedTime": 300,
            "pace": "28.0 km/h",
            "averageHeartrate": 132.1,
            "averageCadence": 82.7,
            "averageWatts": 130.2,
            "isRest": false
          },
          {
            "lapIndex": 10,
            "distance": 5221.8,
            "time": 600,
            "elapsedTime": 600,
            "pace": "31.3 km/h",
            "averageHeartrate": 135.7,
            "averageCadence": 91.9,
            "averageWatts": 160.7,
            "isRest": false
          }
        ]
      }
    },
    {
      "plannedDate": "2026-01-22",
      "plannedType": "Soccer",
      "plannedTitle": "Soccer Practice",
      "workoutDescription": "Regular training session.",
      "status": "completed",
      "executionScore": 83,
      "activity": {
        "date": "2026-01-22",
        "type": "Soccer",
        "name": "Evening Football (Soccer)",
        "description": null,
        "distance": 6608.4,
        "movingTime": 4777,
        "elapsedTime": 5535,
        "averageHeartrate": 111.9,
        "maxHeartrate": 159,
        "averageCadence": null,
        "averageWatts": null,
        "maxWatts": null,
        "weightedAverageWatts": null,
        "averageSpeed": 1.3833786895541134,
        "maxSpeed": 5.68,
        "averagePace": "N/A",
        "calories": 579,
        "sufferScore": null,
        "laps": [
          {
            "lapIndex": 0,
            "distance": 6608,
            "time": 4777,
            "elapsedTime": 5532,
            "pace": "",
            "averageHeartrate": 111.9,
            "averageCadence": null,
            "averageWatts": null,
            "isRest": false
          }
        ]
      }
    },
    {
      "plannedDate": "2026-01-23",
      "plannedType": "Swim",
      "plannedTitle": "Swim Endurance",
      "workoutDescription": "6x50m (25m Fist / 25m Free). 4x200m @ RPE 7.",
      "status": "completed",
      "executionScore": 100,
      "activity": {
        "date": "2026-01-23",
        "type": "Swim",
        "name": "Afternoon Swim",
        "description": "1300m*:\n100m WU\n6x 50m (25 fist drill / 25 freestyle)\n4x 200m met pull buoy\n100m CD",
        "distance": 1300,
        "movingTime": 2208,
        "elapsedTime": 2208,
        "averageHeartrate": 140.5,
        "maxHeartrate": 165,
        "averageCadence": 22.2,
        "averageWatts": null,
        "maxWatts": null,
        "weightedAverageWatts": null,
        "averageSpeed": 0.5887681159420289,
        "maxSpeed": 5,
        "averagePace": "2:50/100m",
        "calories": 345,
        "sufferScore": null,
        "laps": [
          {
            "lapIndex": 0,
            "distance": 100,
            "time": 170,
            "elapsedTime": 50,
            "pace": "2:50",
            "averageHeartrate": 115.9,
            "averageCadence": 21,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 1,
            "distance": 50,
            "time": 68,
            "pace": "2:16",
            "averageHeartrate": 140.5,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 2,
            "time": 10,
            "pace": "",
            "averageHeartrate": 140.5,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 3,
            "distance": 50,
            "time": 90,
            "pace": "3:00",
            "averageHeartrate": 140.5,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 4,
            "time": 10,
            "pace": "",
            "averageHeartrate": 140.5,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 5,
            "distance": 50,
            "time": 68,
            "pace": "2:16",
            "averageHeartrate": 140.5,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 6,
            "time": 10,
            "pace": "",
            "averageHeartrate": 140.5,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 7,
            "distance": 50,
            "time": 74,
            "pace": "2:28",
            "averageHeartrate": 140.5,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 8,
            "time": 10,
            "pace": "",
            "averageHeartrate": 140.5,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 9,
            "distance": 50,
            "time": 74,
            "pace": "2:28",
            "averageHeartrate": 140.5,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 10,
            "time": 10,
            "pace": "",
            "averageHeartrate": 140.5,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 11,
            "distance": 50,
            "time": 74,
            "pace": "2:28",
            "averageHeartrate": 140.5,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 12,
            "time": 10,
            "pace": "",
            "averageHeartrate": 140.5,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 13,
            "distance": 200,
            "time": 266,
            "pace": "2:13",
            "averageHeartrate": 140.5,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 14,
            "time": 30,
            "pace": "",
            "averageHeartrate": 140.5,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 15,
            "distance": 200,
            "time": 264,
            "pace": "2:12",
            "averageHeartrate": 140.5,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 16,
            "time": 30,
            "pace": "",
            "averageHeartrate": 140.5,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 17,
            "distance": 200,
            "time": 257,
            "pace": "2:09",
            "averageHeartrate": 140.5,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 18,
            "time": 30,
            "pace": "",
            "averageHeartrate": 140.5,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 19,
            "distance": 200,
            "time": 265,
            "pace": "2:13",
            "averageHeartrate": 140.5,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 20,
            "time": 30,
            "pace": "",
            "averageHeartrate": 140.5,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 21,
            "distance": 100,
            "time": 140,
            "pace": "2:20",
            "averageHeartrate": 140.5,
            "averageWatts": null,
            "isRest": false
          }
        ]
      }
    },
    {
      "plannedDate": "2026-01-24",
      "plannedType": "Bike",
      "plannedTitle": "Key Session: Brick (Bike)",
      "workoutDescription": "75 min (inclusief 4x8' @ 92% FTP).",
      "status": "completed",
      "executionScore": 60,
      "activity": {
        "date": "2026-01-24",
        "type": "VirtualRide",
        "name": "MyWhoosh - W3 - Sweet Spot",
        "description": "Brick workout (1/2)",
        "distance": 43397.3,
        "movingTime": 4804,
        "elapsedTime": 4804,
        "averageHeartrate": 143,
        "maxHeartrate": 161,
        "averageCadence": 91.9,
        "averageWatts": 181.6,
        "maxWatts": 312,
        "weightedAverageWatts": 188,
        "averageSpeed": 9.033576186511242,
        "maxSpeed": 12.48,
        "averagePace": "32.5 km/h",
        "calories": 872,
        "sufferScore": null,
        "laps": [
          {
            "lapIndex": 0,
            "distance": 4905.78,
            "time": 600,
            "elapsedTime": 600,
            "pace": "29.4 km/h",
            "averageHeartrate": 125.1,
            "averageCadence": 81.9,
            "averageWatts": 148.5,
            "isRest": false
          },
          {
            "lapIndex": 1,
            "distance": 4649.27,
            "time": 480,
            "elapsedTime": 480,
            "pace": "34.9 km/h",
            "averageHeartrate": 148.7,
            "averageCadence": 96.4,
            "averageWatts": 216.5,
            "isRest": false
          },
          {
            "lapIndex": 2,
            "distance": 2606.96,
            "time": 300,
            "elapsedTime": 300,
            "pace": "31.3 km/h",
            "averageHeartrate": 140,
            "averageCadence": 88.2,
            "averageWatts": 155.9,
            "isRest": false
          },
          {
            "lapIndex": 3,
            "distance": 4649.55,
            "time": 480,
            "elapsedTime": 480,
            "pace": "34.9 km/h",
            "averageHeartrate": 152,
            "averageCadence": 95.8,
            "averageWatts": 217.1,
            "isRest": false
          },
          {
            "lapIndex": 4,
            "distance": 2578.78,
            "time": 300,
            "elapsedTime": 300,
            "pace": "30.9 km/h",
            "averageHeartrate": 142.1,
            "averageCadence": 87.8,
            "averageWatts": 155.8,
            "isRest": false
          },
          {
            "lapIndex": 5,
            "distance": 4665.15,
            "time": 480,
            "elapsedTime": 480,
            "pace": "35.0 km/h",
            "averageHeartrate": 153.9,
            "averageCadence": 98.1,
            "averageWatts": 218.3,
            "isRest": false
          },
          {
            "lapIndex": 6,
            "distance": 2592.47,
            "time": 300,
            "elapsedTime": 300,
            "pace": "31.1 km/h",
            "averageHeartrate": 142.3,
            "averageCadence": 88.3,
            "averageWatts": 154.3,
            "isRest": false
          },
          {
            "lapIndex": 7,
            "distance": 4646.14,
            "time": 480,
            "elapsedTime": 480,
            "pace": "34.8 km/h",
            "averageHeartrate": 153.4,
            "averageCadence": 98.2,
            "averageWatts": 216.7,
            "isRest": false
          },
          {
            "lapIndex": 8,
            "distance": 12066,
            "time": 1380,
            "elapsedTime": 1380,
            "pace": "31.5 km/h",
            "averageHeartrate": 139.1,
            "averageCadence": 91.3,
            "averageWatts": 163.6,
            "isRest": false
          }
        ]
      }
    },
    {
      "plannedDate": "2026-01-24",
      "plannedType": "Run",
      "plannedTitle": "Key Session: Brick (Run)",
      "workoutDescription": "20 min @ 4:30/km.",
      "status": "completed",
      "executionScore": 97,
      "activity": {
        "date": "2026-01-24",
        "type": "Run",
        "name": "Lunch Run",
        "description": "Brick workout (2/2)\nLactaat zuur🫠",
        "distance": 4307.3,
        "movingTime": 1147,
        "elapsedTime": 1214,
        "averageHeartrate": 167.8,
        "maxHeartrate": 177,
        "averageCadence": 85.9,
        "averageWatts": 348.6,
        "maxWatts": 420,
        "weightedAverageWatts": 336,
        "averageSpeed": 3.755274629468178,
        "maxSpeed": 4.72,
        "averagePace": "4:26/km",
        "calories": 249,
        "sufferScore": null,
        "laps": [
          {
            "lapIndex": 0,
            "distance": 4308,
            "time": 1147,
            "elapsedTime": 1150,
            "pace": "4:26",
            "averageHeartrate": 167.8,
            "averageCadence": 85.9,
            "averageWatts": 348.6,
            "isRest": false
          }
        ]
      }
    },
    {
      "plannedDate": "2026-01-25",
      "plannedType": "Soccer",
      "plannedTitle": "Soccer Match",
      "workoutDescription": "Weekly competition.",
      "status": "completed",
      "executionScore": 94,
      "activity": {
        "date": "2026-01-25",
        "type": "Soccer",
        "name": "Elverdinge - Merkem",
        "description": "",
        "distance": 0,
        "movingTime": 5400,
        "elapsedTime": 5400,
        "averageHeartrate": null,
        "maxHeartrate": null,
        "averageCadence": null,
        "averageWatts": null,
        "maxWatts": null,
        "weightedAverageWatts": null,
        "averageSpeed": 0,
        "maxSpeed": 0,
        "averagePace": "N/A",
        "calories": 0,
        "sufferScore": null,
        "laps": []
      }
    },
    {
      "plannedDate": "2026-01-26",
      "plannedType": "Run",
      "plannedTitle": "Key Session: Run Quality",
      "workoutDescription": "2x4km @ 4:15/km (rec: 1km EZ).",
      "status": "completed",
      "executionScore": 100,
      "activity": {
        "date": "2026-01-26",
        "type": "Run",
        "name": "Treadmill",
        "description": null,
        "distance": 12000,
        "movingTime": 3359,
        "elapsedTime": 3359,
        "averageHeartrate": 155.6,
        "maxHeartrate": 170,
        "averageCadence": 81.7,
        "averageWatts": null,
        "maxWatts": null,
        "weightedAverageWatts": null,
        "averageSpeed": 3.572491813039595,
        "maxSpeed": 2.28,
        "averagePace": "4:40/km",
        "calories": 653,
        "sufferScore": null,
        "laps": [
          {
            "lapIndex": 0,
            "distance": 2000,
            "time": 676,
            "elapsedTime": 676,
            "pace": "5:38",
            "averageHeartrate": 129.7,
            "averageCadence": 78.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 1,
            "distance": 4000,
            "time": 1020,
            "elapsedTime": 1020,
            "pace": "4:15",
            "averageHeartrate": 163.7,
            "averageCadence": 82.9,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 2,
            "distance": 1000,
            "time": 334,
            "elapsedTime": 334,
            "pace": "5:34",
            "averageHeartrate": 150.1,
            "averageCadence": 78.2,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 3,
            "distance": 4000,
            "time": 1020,
            "elapsedTime": 1020,
            "pace": "4:15",
            "averageHeartrate": 165.6,
            "averageCadence": 83.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 4,
            "distance": 1000,
            "time": 309,
            "elapsedTime": 309,
            "pace": "5:09",
            "averageHeartrate": 157.8,
            "averageCadence": 81.5,
            "averageWatts": null,
            "isRest": false
          }
        ]
      }
    },
    {
      "plannedDate": "2026-01-26",
      "plannedType": "Swim",
      "plannedTitle": "Swim Tech",
      "workoutDescription": "8x25m 6-1-6 rotation focus. 12x50m @ RPE 7.",
      "status": "completed",
      "executionScore": 88,
      "activity": {
        "date": "2026-01-26",
        "type": "Swim",
        "name": "Evening Swim",
        "description": null,
        "distance": 1000,
        "movingTime": 1643,
        "elapsedTime": 1700,
        "averageHeartrate": 158,
        "maxHeartrate": 172,
        "averageCadence": 20.3,
        "averageWatts": null,
        "maxWatts": null,
        "weightedAverageWatts": null,
        "averageSpeed": 0.6086427267194157,
        "maxSpeed": 5,
        "averagePace": "2:44/100m",
        "calories": 331,
        "sufferScore": null,
        "laps": [
          {
            "lapIndex": 0,
            "distance": 100,
            "time": 145,
            "elapsedTime": 40,
            "pace": "2:25",
            "averageHeartrate": 153.1,
            "averageCadence": 24.9,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 1,
            "distance": 50,
            "time": 77,
            "pace": "2:34",
            "averageHeartrate": 158,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 2,
            "time": 10,
            "pace": "",
            "averageHeartrate": 158,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 3,
            "distance": 50,
            "time": 71,
            "pace": "2:22",
            "averageHeartrate": 158,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 4,
            "time": 10,
            "pace": "",
            "averageHeartrate": 158,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 5,
            "distance": 50,
            "time": 74,
            "pace": "2:28",
            "averageHeartrate": 158,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 6,
            "time": 10,
            "pace": "",
            "averageHeartrate": 158,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 7,
            "distance": 50,
            "time": 98,
            "pace": "3:16",
            "averageHeartrate": 158,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 8,
            "time": 10,
            "pace": "",
            "averageHeartrate": 158,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 9,
            "distance": 50,
            "time": 64,
            "pace": "2:08",
            "averageHeartrate": 158,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 10,
            "time": 15,
            "pace": "",
            "averageHeartrate": 158,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 11,
            "distance": 50,
            "time": 71,
            "pace": "2:22",
            "averageHeartrate": 158,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 12,
            "time": 15,
            "pace": "",
            "averageHeartrate": 158,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 13,
            "distance": 50,
            "time": 62,
            "pace": "2:04",
            "averageHeartrate": 158,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 14,
            "time": 15,
            "pace": "",
            "averageHeartrate": 158,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 15,
            "distance": 50,
            "time": 67,
            "pace": "2:14",
            "averageHeartrate": 158,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 16,
            "time": 15,
            "pace": "",
            "averageHeartrate": 158,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 17,
            "distance": 50,
            "time": 65,
            "pace": "2:10",
            "averageHeartrate": 158,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 18,
            "time": 15,
            "pace": "",
            "averageHeartrate": 158,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 19,
            "distance": 50,
            "time": 68,
            "pace": "2:16",
            "averageHeartrate": 158,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 20,
            "time": 15,
            "pace": "",
            "averageHeartrate": 158,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 21,
            "distance": 50,
            "time": 72,
            "pace": "2:24",
            "averageHeartrate": 158,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 22,
            "time": 15,
            "pace": "",
            "averageHeartrate": 158,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 23,
            "distance": 50,
            "time": 65,
            "pace": "2:10",
            "averageHeartrate": 158,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 24,
            "time": 15,
            "pace": "",
            "averageHeartrate": 158,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 25,
            "distance": 50,
            "time": 65,
            "pace": "2:10",
            "averageHeartrate": 158,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 26,
            "time": 15,
            "pace": "",
            "averageHeartrate": 158,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 27,
            "distance": 50,
            "time": 62,
            "pace": "2:04",
            "averageHeartrate": 158,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 28,
            "time": 15,
            "pace": "",
            "averageHeartrate": 158,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 29,
            "distance": 50,
            "time": 66,
            "pace": "2:12",
            "averageHeartrate": 158,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 30,
            "time": 15,
            "pace": "",
            "averageHeartrate": 158,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 31,
            "distance": 50,
            "time": 64,
            "pace": "2:08",
            "averageHeartrate": 158,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 32,
            "time": 15,
            "pace": "",
            "averageHeartrate": 158,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 33,
            "distance": 100,
            "time": 136,
            "pace": "2:16",
            "averageHeartrate": 158,
            "averageWatts": null,
            "isRest": false
          }
        ]
      }
    },
    {
      "plannedDate": "2026-01-27",
      "plannedType": "Soccer",
      "plannedTitle": "Soccer Practice",
      "workoutDescription": "Regular training session.",
      "status": "missed"
    },
    {
      "plannedDate": "2026-01-28",
      "plannedType": "Bike",
      "plannedTitle": "Key Session: VO2 Max Boost",
      "workoutDescription": "5x3 min @ 110% FTP (HR Z5, rec: 3' Z1).",
      "status": "completed",
      "executionScore": 70,
      "activity": {
        "date": "2026-01-28",
        "type": "VirtualRide",
        "name": "MyWhoosh - Medellin City",
        "description": null,
        "distance": 23556.2,
        "movingTime": 2706,
        "elapsedTime": 2706,
        "averageHeartrate": 140.3,
        "maxHeartrate": 169,
        "averageCadence": 86.8,
        "averageWatts": 183.1,
        "maxWatts": 459,
        "weightedAverageWatts": 203,
        "averageSpeed": 8.705173688100517,
        "maxSpeed": 15.96,
        "averagePace": "31.3 km/h",
        "calories": 495,
        "sufferScore": null,
        "laps": [
          {
            "lapIndex": 0,
            "distance": 4658.75,
            "time": 600,
            "elapsedTime": 600,
            "pace": "28.0 km/h",
            "averageHeartrate": 120.9,
            "averageCadence": 80.7,
            "averageWatts": 150.9,
            "isRest": false
          },
          {
            "lapIndex": 1,
            "distance": 1832.37,
            "time": 180,
            "elapsedTime": 180,
            "pace": "36.6 km/h",
            "averageHeartrate": 153.1,
            "averageCadence": 96.9,
            "averageWatts": 260.6,
            "isRest": false
          },
          {
            "lapIndex": 2,
            "distance": 1414.35,
            "time": 180,
            "elapsedTime": 180,
            "pace": "28.3 km/h",
            "averageHeartrate": 135.4,
            "averageCadence": 73.2,
            "averageWatts": 121,
            "isRest": false
          },
          {
            "lapIndex": 3,
            "distance": 1892.49,
            "time": 180,
            "elapsedTime": 180,
            "pace": "37.8 km/h",
            "averageHeartrate": 152.4,
            "averageCadence": 91.9,
            "averageWatts": 261.5,
            "isRest": false
          },
          {
            "lapIndex": 4,
            "distance": 1189.11,
            "time": 180,
            "elapsedTime": 180,
            "pace": "23.8 km/h",
            "averageHeartrate": 136.7,
            "averageCadence": 78.3,
            "averageWatts": 123,
            "isRest": false
          },
          {
            "lapIndex": 5,
            "distance": 1881.28,
            "time": 180,
            "elapsedTime": 180,
            "pace": "37.6 km/h",
            "averageHeartrate": 154.2,
            "averageCadence": 90.3,
            "averageWatts": 262.1,
            "isRest": false
          },
          {
            "lapIndex": 6,
            "distance": 1515.27,
            "time": 180,
            "elapsedTime": 180,
            "pace": "30.3 km/h",
            "averageHeartrate": 139.2,
            "averageCadence": 85.5,
            "averageWatts": 140.1,
            "isRest": false
          },
          {
            "lapIndex": 7,
            "distance": 1847.97,
            "time": 180,
            "elapsedTime": 180,
            "pace": "37.0 km/h",
            "averageHeartrate": 157,
            "averageCadence": 93.9,
            "averageWatts": 263.6,
            "isRest": false
          },
          {
            "lapIndex": 8,
            "distance": 1249.11,
            "time": 180,
            "elapsedTime": 180,
            "pace": "25.0 km/h",
            "averageHeartrate": 141,
            "averageCadence": 86,
            "averageWatts": 142.7,
            "isRest": false
          },
          {
            "lapIndex": 9,
            "distance": 1938.81,
            "time": 180,
            "elapsedTime": 180,
            "pace": "38.8 km/h",
            "averageHeartrate": 158,
            "averageCadence": 98.5,
            "averageWatts": 264.6,
            "isRest": false
          },
          {
            "lapIndex": 10,
            "distance": 1540.91,
            "time": 180,
            "elapsedTime": 180,
            "pace": "30.8 km/h",
            "averageHeartrate": 143.7,
            "averageCadence": 85.3,
            "averageWatts": 139.5,
            "isRest": false
          },
          {
            "lapIndex": 11,
            "distance": 2557.94,
            "time": 300,
            "elapsedTime": 300,
            "pace": "30.7 km/h",
            "averageHeartrate": 138.5,
            "averageCadence": 91.7,
            "averageWatts": 159.1,
            "isRest": false
          }
        ]
      }
    },
    {
      "plannedDate": "2026-01-29",
      "plannedType": "Soccer",
      "plannedTitle": "Soccer Practice",
      "workoutDescription": "Regular training session.",
      "status": "completed",
      "executionScore": 76,
      "activity": {
        "date": "2026-01-29",
        "type": "Soccer",
        "name": "Evening Football (Soccer)",
        "description": null,
        "distance": 6377.1,
        "movingTime": 4403,
        "elapsedTime": 5372,
        "averageHeartrate": 116.6,
        "maxHeartrate": 161,
        "averageCadence": null,
        "averageWatts": null,
        "maxWatts": null,
        "weightedAverageWatts": null,
        "averageSpeed": 1.448353395412219,
        "maxSpeed": 4.44,
        "averagePace": "N/A",
        "calories": 633,
        "sufferScore": null,
        "laps": [
          {
            "lapIndex": 0,
            "distance": 6377,
            "time": 4403,
            "elapsedTime": 5369,
            "pace": "",
            "averageHeartrate": 116.6,
            "averageCadence": null,
            "averageWatts": null,
            "isRest": false
          }
        ]
      }
    },
    {
      "plannedDate": "2026-01-30",
      "plannedType": "Swim",
      "plannedTitle": "Swim Strength",
      "workoutDescription": "6x50m (25m Sighting / 25m Free). 15x50m met pull-buoy.",
      "status": "completed",
      "executionScore": 100,
      "activity": {
        "date": "2026-01-30",
        "type": "Swim",
        "name": "Afternoon Swim",
        "description": null,
        "distance": 1300,
        "movingTime": 2087,
        "elapsedTime": 2087,
        "averageHeartrate": 140.4,
        "maxHeartrate": 151,
        "averageCadence": 21,
        "averageWatts": null,
        "maxWatts": null,
        "weightedAverageWatts": null,
        "averageSpeed": 0.6229036895064686,
        "maxSpeed": 5,
        "averagePace": "2:41/100m",
        "calories": 347,
        "sufferScore": null,
        "laps": [
          {
            "lapIndex": 0,
            "distance": 150,
            "time": 199,
            "elapsedTime": 33,
            "pace": "2:13",
            "averageHeartrate": 142.8,
            "averageCadence": 25.1,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 1,
            "distance": 50,
            "time": 69,
            "pace": "2:18",
            "averageHeartrate": 140.4,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 2,
            "time": 10,
            "pace": "",
            "averageHeartrate": 140.4,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 3,
            "distance": 50,
            "time": 75,
            "pace": "2:30",
            "averageHeartrate": 140.4,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 4,
            "time": 10,
            "pace": "",
            "averageHeartrate": 140.4,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 5,
            "distance": 50,
            "time": 91,
            "pace": "3:02",
            "averageHeartrate": 140.4,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 6,
            "time": 10,
            "pace": "",
            "averageHeartrate": 140.4,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 7,
            "distance": 50,
            "time": 92,
            "pace": "3:04",
            "averageHeartrate": 140.4,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 8,
            "time": 10,
            "pace": "",
            "averageHeartrate": 140.4,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 9,
            "distance": 50,
            "time": 81,
            "pace": "2:42",
            "averageHeartrate": 140.4,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 10,
            "time": 10,
            "pace": "",
            "averageHeartrate": 140.4,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 11,
            "distance": 50,
            "time": 72,
            "pace": "2:24",
            "averageHeartrate": 140.4,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 12,
            "time": 10,
            "pace": "",
            "averageHeartrate": 140.4,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 13,
            "distance": 50,
            "time": 68,
            "pace": "2:16",
            "averageHeartrate": 140.4,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 14,
            "time": 10,
            "pace": "",
            "averageHeartrate": 140.4,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 15,
            "distance": 50,
            "time": 64,
            "pace": "2:08",
            "averageHeartrate": 140.4,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 16,
            "time": 10,
            "pace": "",
            "averageHeartrate": 140.4,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 17,
            "distance": 50,
            "time": 68,
            "pace": "2:16",
            "averageHeartrate": 140.4,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 18,
            "time": 10,
            "pace": "",
            "averageHeartrate": 140.4,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 19,
            "distance": 50,
            "time": 67,
            "pace": "2:14",
            "averageHeartrate": 140.4,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 20,
            "time": 10,
            "pace": "",
            "averageHeartrate": 140.4,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 21,
            "distance": 50,
            "time": 66,
            "pace": "2:12",
            "averageHeartrate": 140.4,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 22,
            "time": 10,
            "pace": "",
            "averageHeartrate": 140.4,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 23,
            "distance": 50,
            "time": 66,
            "pace": "2:12",
            "averageHeartrate": 140.4,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 24,
            "time": 10,
            "pace": "",
            "averageHeartrate": 140.4,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 25,
            "distance": 50,
            "time": 68,
            "pace": "2:16",
            "averageHeartrate": 140.4,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 26,
            "time": 10,
            "pace": "",
            "averageHeartrate": 140.4,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 27,
            "distance": 50,
            "time": 70,
            "pace": "2:20",
            "averageHeartrate": 140.4,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 28,
            "time": 10,
            "pace": "",
            "averageHeartrate": 140.4,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 29,
            "distance": 50,
            "time": 68,
            "pace": "2:16",
            "averageHeartrate": 140.4,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 30,
            "time": 10,
            "pace": "",
            "averageHeartrate": 140.4,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 31,
            "distance": 50,
            "time": 70,
            "pace": "2:20",
            "averageHeartrate": 140.4,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 32,
            "time": 10,
            "pace": "",
            "averageHeartrate": 140.4,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 33,
            "distance": 50,
            "time": 70,
            "pace": "2:20",
            "averageHeartrate": 140.4,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 34,
            "time": 10,
            "pace": "",
            "averageHeartrate": 140.4,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 35,
            "distance": 50,
            "time": 66,
            "pace": "2:12",
            "averageHeartrate": 140.4,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 36,
            "time": 10,
            "pace": "",
            "averageHeartrate": 140.4,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 37,
            "distance": 50,
            "time": 70,
            "pace": "2:20",
            "averageHeartrate": 140.4,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 38,
            "time": 10,
            "pace": "",
            "averageHeartrate": 140.4,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 39,
            "distance": 50,
            "time": 76,
            "pace": "2:32",
            "averageHeartrate": 140.4,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 40,
            "time": 10,
            "pace": "",
            "averageHeartrate": 140.4,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 41,
            "distance": 50,
            "time": 68,
            "pace": "2:16",
            "averageHeartrate": 140.4,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 42,
            "time": 10,
            "pace": "",
            "averageHeartrate": 140.4,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 43,
            "distance": 100,
            "time": 138,
            "pace": "2:18",
            "averageHeartrate": 140.4,
            "averageWatts": null,
            "isRest": false
          }
        ]
      }
    },
    {
      "plannedDate": "2026-01-31",
      "plannedType": "Soccer",
      "plannedTitle": "Soccer Match",
      "workoutDescription": "Weekly competition.",
      "status": "completed",
      "executionScore": 94,
      "activity": {
        "date": "2026-01-31",
        "type": "Soccer",
        "name": "Merkem - Hollebeke",
        "description": "",
        "distance": 0,
        "movingTime": 5400,
        "elapsedTime": 5400,
        "averageHeartrate": null,
        "maxHeartrate": null,
        "averageCadence": null,
        "averageWatts": null,
        "maxWatts": null,
        "weightedAverageWatts": null,
        "averageSpeed": 0,
        "maxSpeed": 0,
        "averagePace": "N/A",
        "calories": 0,
        "sufferScore": null,
        "laps": []
      }
    },
    {
      "plannedDate": "2026-02-01",
      "plannedType": "Run",
      "plannedTitle": "Key Session: Long Run",
      "workoutDescription": "16 km @ 5:15/km.",
      "status": "completed",
      "executionScore": 98,
      "activity": {
        "date": "2026-02-01",
        "type": "Run",
        "name": "Morning Run",
        "description": null,
        "distance": 16245.8,
        "movingTime": 5008,
        "elapsedTime": 5228,
        "averageHeartrate": 157.2,
        "maxHeartrate": 167,
        "averageCadence": 82.6,
        "averageWatts": 309.7,
        "maxWatts": 381,
        "weightedAverageWatts": 303,
        "averageSpeed": 3.2439696485623,
        "maxSpeed": 4.1,
        "averagePace": "5:08/km",
        "calories": 989,
        "sufferScore": null,
        "laps": [
          {
            "lapIndex": 0,
            "distance": 16245,
            "time": 5008,
            "elapsedTime": 5020,
            "pace": "5:08",
            "averageHeartrate": 157.2,
            "averageCadence": 82.6,
            "averageWatts": 309.7,
            "isRest": false
          }
        ]
      }
    },
    {
      "plannedDate": "2026-02-02",
      "plannedType": "Bike",
      "plannedTitle": "Key Session: Threshold Simulation",
      "workoutDescription": "2x15 min @ 100% FTP (HR Z4, rec: 5' Z1).",
      "status": "completed",
      "executionScore": 100,
      "activity": {
        "date": "2026-02-02",
        "type": "VirtualRide",
        "name": "MyWhoosh - Brussels Town Square",
        "description": null,
        "distance": 32718.3,
        "movingTime": 3607,
        "elapsedTime": 3607,
        "averageHeartrate": 137.2,
        "maxHeartrate": 161,
        "averageCadence": 85.7,
        "averageWatts": 187.2,
        "maxWatts": 372,
        "weightedAverageWatts": 203,
        "averageSpeed": 9.07077904075409,
        "maxSpeed": 10.46,
        "averagePace": "32.7 km/h",
        "calories": 675,
        "sufferScore": null,
        "laps": [
          {
            "lapIndex": 0,
            "distance": 4820.12,
            "time": 600,
            "elapsedTime": 600,
            "pace": "28.9 km/h",
            "averageHeartrate": 114,
            "averageCadence": 81.6,
            "averageWatts": 141.7,
            "isRest": false
          },
          {
            "lapIndex": 1,
            "distance": 9009.49,
            "time": 900,
            "elapsedTime": 900,
            "pace": "36.0 km/h",
            "averageHeartrate": 149.7,
            "averageCadence": 87.7,
            "averageWatts": 235.1,
            "isRest": false
          },
          {
            "lapIndex": 2,
            "distance": 2358.75,
            "time": 300,
            "elapsedTime": 300,
            "pace": "28.3 km/h",
            "averageHeartrate": 125.6,
            "averageCadence": 79.2,
            "averageWatts": 121.2,
            "isRest": false
          },
          {
            "lapIndex": 3,
            "distance": 9008.09,
            "time": 900,
            "elapsedTime": 900,
            "pace": "36.0 km/h",
            "averageHeartrate": 154.1,
            "averageCadence": 87.9,
            "averageWatts": 236.7,
            "isRest": false
          },
          {
            "lapIndex": 4,
            "distance": 2372.95,
            "time": 300,
            "elapsedTime": 300,
            "pace": "28.5 km/h",
            "averageHeartrate": 127.6,
            "averageCadence": 78.5,
            "averageWatts": 122.1,
            "isRest": false
          },
          {
            "lapIndex": 5,
            "distance": 5080.52,
            "time": 600,
            "elapsedTime": 600,
            "pace": "30.5 km/h",
            "averageHeartrate": 126.9,
            "averageCadence": 90.1,
            "averageWatts": 152.7,
            "isRest": false
          }
        ]
      }
    },
    {
      "plannedDate": "2026-02-02",
      "plannedType": "Swim",
      "plannedTitle": "Swim Tech",
      "workoutDescription": "4x50m Single Arm. 6x100m @ RPE 8.",
      "status": "completed",
      "executionScore": 22,
      "activity": {
        "date": "2026-02-02",
        "type": "Swim",
        "name": "Evening Swim",
        "description": "1000m*:\n100m WU\n4x50m single arm\n6x 100m\n100m CD",
        "distance": 875,
        "movingTime": 1701,
        "elapsedTime": 1701,
        "averageHeartrate": 149.2,
        "maxHeartrate": 161,
        "averageCadence": 19.9,
        "averageWatts": null,
        "maxWatts": null,
        "weightedAverageWatts": null,
        "averageSpeed": 0.51440329218107,
        "maxSpeed": 5,
        "averagePace": "3:14/100m",
        "calories": 294,
        "sufferScore": null,
        "laps": [
          {
            "lapIndex": 0,
            "distance": 25,
            "time": 48,
            "elapsedTime": 48,
            "pace": "3:12",
            "averageHeartrate": 127.7,
            "averageCadence": 21,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 1,
            "distance": 25,
            "time": 34,
            "elapsedTime": 34,
            "pace": "2:16",
            "averageHeartrate": 141.4,
            "averageCadence": 21,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 2,
            "distance": 25,
            "time": 42,
            "elapsedTime": 42,
            "pace": "2:48",
            "averageHeartrate": 146.3,
            "averageCadence": 21,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 3,
            "distance": 25,
            "time": 31,
            "elapsedTime": 31,
            "pace": "2:04",
            "averageHeartrate": 152,
            "averageCadence": 21.2,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 4,
            "distance": 25,
            "time": 98,
            "elapsedTime": 98,
            "pace": "6:32",
            "averageHeartrate": 151.4,
            "averageCadence": 26.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 5,
            "distance": 25,
            "time": 104,
            "elapsedTime": 104,
            "pace": "6:56",
            "averageHeartrate": 146.5,
            "averageCadence": 12,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 6,
            "distance": 25,
            "time": 234,
            "elapsedTime": 234,
            "pace": "15:36",
            "averageHeartrate": 144.6,
            "averageCadence": 12,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 7,
            "distance": 25,
            "time": 55,
            "elapsedTime": 55,
            "pace": "3:40",
            "averageHeartrate": 144.9,
            "averageCadence": 7.1,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 8,
            "distance": 25,
            "time": 27,
            "elapsedTime": 27,
            "pace": "1:48",
            "averageHeartrate": 152.1,
            "averageCadence": 12.6,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 9,
            "distance": 25,
            "time": 32,
            "elapsedTime": 32,
            "pace": "2:08",
            "averageHeartrate": 153.5,
            "averageCadence": 26.9,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 10,
            "distance": 25,
            "time": 31,
            "elapsedTime": 31,
            "pace": "2:04",
            "averageHeartrate": 156.2,
            "averageCadence": 24.1,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 11,
            "distance": 25,
            "time": 58,
            "elapsedTime": 58,
            "pace": "3:52",
            "averageHeartrate": 150.5,
            "averageCadence": 26.7,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 12,
            "distance": 25,
            "time": 30,
            "elapsedTime": 30,
            "pace": "2:00",
            "averageHeartrate": 150.2,
            "averageCadence": 12.5,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 13,
            "distance": 25,
            "time": 32,
            "elapsedTime": 32,
            "pace": "2:08",
            "averageHeartrate": 152.1,
            "averageCadence": 26.9,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 14,
            "distance": 25,
            "time": 30,
            "elapsedTime": 30,
            "pace": "2:00",
            "averageHeartrate": 154,
            "averageCadence": 25.1,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 15,
            "distance": 25,
            "time": 60,
            "elapsedTime": 60,
            "pace": "4:00",
            "averageHeartrate": 147.6,
            "averageCadence": 26.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 16,
            "distance": 25,
            "time": 34,
            "elapsedTime": 34,
            "pace": "2:16",
            "averageHeartrate": 151.2,
            "averageCadence": 12.4,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 17,
            "distance": 25,
            "time": 35,
            "elapsedTime": 35,
            "pace": "2:20",
            "averageHeartrate": 154,
            "averageCadence": 25,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 18,
            "distance": 25,
            "time": 33,
            "elapsedTime": 33,
            "pace": "2:12",
            "averageHeartrate": 155.2,
            "averageCadence": 24.1,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 19,
            "distance": 25,
            "time": 58,
            "elapsedTime": 58,
            "pace": "3:52",
            "averageHeartrate": 149.6,
            "averageCadence": 26.7,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 20,
            "distance": 25,
            "time": 33,
            "elapsedTime": 33,
            "pace": "2:12",
            "averageHeartrate": 153.1,
            "averageCadence": 12.4,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 21,
            "distance": 25,
            "time": 32,
            "elapsedTime": 32,
            "pace": "2:08",
            "averageHeartrate": 150.9,
            "averageCadence": 24,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 22,
            "distance": 25,
            "time": 35,
            "elapsedTime": 35,
            "pace": "2:20",
            "averageHeartrate": 151.4,
            "averageCadence": 25,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 23,
            "distance": 25,
            "time": 60,
            "elapsedTime": 60,
            "pace": "4:00",
            "averageHeartrate": 146.3,
            "averageCadence": 24.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 24,
            "distance": 25,
            "time": 30,
            "elapsedTime": 30,
            "pace": "2:00",
            "averageHeartrate": 153.2,
            "averageCadence": 12.5,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 25,
            "distance": 25,
            "time": 38,
            "elapsedTime": 38,
            "pace": "2:32",
            "averageHeartrate": 154.5,
            "averageCadence": 26.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 26,
            "distance": 25,
            "time": 33,
            "elapsedTime": 33,
            "pace": "2:12",
            "averageHeartrate": 156.8,
            "averageCadence": 21.2,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 27,
            "distance": 25,
            "time": 54,
            "elapsedTime": 54,
            "pace": "3:36",
            "averageHeartrate": 142.8,
            "averageCadence": 26.7,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 28,
            "distance": 25,
            "time": 40,
            "elapsedTime": 40,
            "pace": "2:40",
            "averageHeartrate": 150.5,
            "averageCadence": 13.2,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 29,
            "distance": 25,
            "time": 37,
            "elapsedTime": 37,
            "pace": "2:28",
            "averageHeartrate": 156.1,
            "averageCadence": 21,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 30,
            "distance": 25,
            "time": 33,
            "elapsedTime": 33,
            "pace": "2:12",
            "averageHeartrate": 158.1,
            "averageCadence": 21.2,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 31,
            "distance": 25,
            "time": 68,
            "elapsedTime": 68,
            "pace": "4:32",
            "averageHeartrate": 148.9,
            "averageCadence": 26.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 32,
            "distance": 25,
            "time": 34,
            "elapsedTime": 34,
            "pace": "2:16",
            "averageHeartrate": 154.1,
            "averageCadence": 10.4,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 33,
            "distance": 25,
            "time": 36,
            "elapsedTime": 36,
            "pace": "2:24",
            "averageHeartrate": 156.6,
            "averageCadence": 23.9,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 34,
            "distance": 25,
            "time": 32,
            "elapsedTime": 32,
            "pace": "2:08",
            "averageHeartrate": 157.4,
            "averageCadence": 21.1,
            "averageWatts": null,
            "isRest": false
          }
        ]
      }
    },
    {
      "plannedDate": "2026-02-03",
      "plannedType": "Soccer",
      "plannedTitle": "Soccer Practice",
      "workoutDescription": "Regular training session.",
      "status": "completed",
      "executionScore": 71,
      "activity": {
        "date": "2026-02-03",
        "type": "Soccer",
        "name": "Evening Football (Soccer)",
        "description": null,
        "distance": 5432.3,
        "movingTime": 4099,
        "elapsedTime": 5193,
        "averageHeartrate": 107.5,
        "maxHeartrate": 143,
        "averageCadence": null,
        "averageWatts": null,
        "maxWatts": null,
        "weightedAverageWatts": null,
        "averageSpeed": 1.3252744571846793,
        "maxSpeed": 5.6,
        "averagePace": "N/A",
        "calories": 512,
        "sufferScore": null,
        "laps": [
          {
            "lapIndex": 0,
            "distance": 5432,
            "time": 4099,
            "elapsedTime": 5191,
            "pace": "",
            "averageHeartrate": 107.5,
            "averageCadence": null,
            "averageWatts": null,
            "isRest": false
          }
        ]
      }
    },
    {
      "plannedDate": "2026-02-04",
      "plannedType": "Run",
      "plannedTitle": "Key Session: Run Quality",
      "workoutDescription": "6km @ 4:25/km + 2x1km @ 4:05/km.",
      "status": "completed",
      "executionScore": 73,
      "activity": {
        "date": "2026-02-04",
        "type": "Run",
        "name": "Afternoon Run",
        "description": "Voordeel van om 6u30 te starten met werken ☀️\n\nWU: 1km @ 5:05/km\n6km @ 4:20-4:25/km\n2x 1km @ 4:05/km\nCD: 1km @ 5:15/km",
        "distance": 10184.2,
        "movingTime": 2800,
        "elapsedTime": 2832,
        "averageHeartrate": 167.5,
        "maxHeartrate": 182,
        "averageCadence": 83.9,
        "averageWatts": 336.4,
        "maxWatts": 453,
        "weightedAverageWatts": 338,
        "averageSpeed": 3.637214285714286,
        "maxSpeed": 5.3,
        "averagePace": "4:35/km",
        "calories": 614,
        "sufferScore": null,
        "laps": [
          {
            "lapIndex": 0,
            "distance": 1000,
            "time": 304,
            "elapsedTime": 319,
            "pace": "5:04",
            "averageHeartrate": 134.3,
            "averageCadence": 83,
            "averageWatts": 307.3,
            "isRest": false
          },
          {
            "lapIndex": 1,
            "distance": 6000,
            "time": 1574,
            "elapsedTime": 1581,
            "pace": "4:22",
            "averageHeartrate": 172.9,
            "averageCadence": 84.8,
            "averageWatts": 348.8,
            "isRest": false
          },
          {
            "lapIndex": 2,
            "distance": 1000,
            "time": 247,
            "elapsedTime": 257,
            "pace": "4:07",
            "averageHeartrate": 179.1,
            "averageCadence": 87.5,
            "averageWatts": 379.6,
            "isRest": false
          },
          {
            "lapIndex": 3,
            "distance": 70,
            "time": 61,
            "elapsedTime": 61,
            "pace": "14:31",
            "averageHeartrate": 166.6,
            "averageCadence": 56.6,
            "averageWatts": 151.8,
            "isRest": false
          },
          {
            "lapIndex": 4,
            "distance": 1000,
            "time": 244,
            "elapsedTime": 244,
            "pace": "4:04",
            "averageHeartrate": 172.6,
            "averageCadence": 88,
            "averageWatts": 369.7,
            "isRest": false
          },
          {
            "lapIndex": 5,
            "distance": 110,
            "time": 60,
            "elapsedTime": 60,
            "pace": "9:05",
            "averageHeartrate": 166.6,
            "averageCadence": 62.4,
            "averageWatts": 141.8,
            "isRest": false
          },
          {
            "lapIndex": 6,
            "distance": 1000,
            "time": 310,
            "elapsedTime": 310,
            "pace": "5:10",
            "averageHeartrate": 159.5,
            "averageCadence": 83.8,
            "averageWatts": 314.9,
            "isRest": false
          }
        ]
      }
    },
    {
      "plannedDate": "2026-02-05",
      "plannedType": "Soccer",
      "plannedTitle": "Soccer Practice",
      "workoutDescription": "Regular training session.",
      "status": "completed",
      "executionScore": 82,
      "activity": {
        "date": "2026-02-05",
        "type": "Soccer",
        "name": "Evening Football (Soccer)",
        "description": null,
        "distance": 7098,
        "movingTime": 4705,
        "elapsedTime": 5444,
        "averageHeartrate": 112.4,
        "maxHeartrate": 158,
        "averageCadence": null,
        "averageWatts": null,
        "maxWatts": null,
        "weightedAverageWatts": null,
        "averageSpeed": 1.5086078639744953,
        "maxSpeed": 5.5,
        "averagePace": "N/A",
        "calories": 600,
        "sufferScore": null,
        "laps": [
          {
            "lapIndex": 0,
            "distance": 7097,
            "time": 4705,
            "elapsedTime": 5442,
            "pace": "",
            "averageHeartrate": 112.4,
            "averageCadence": null,
            "averageWatts": null,
            "isRest": false
          }
        ]
      }
    },
    {
      "plannedDate": "2026-02-06",
      "plannedType": "Swim",
      "plannedTitle": "Swim Performance",
      "workoutDescription": "8x25m Fist Drill. 20x50m @ Race Pace RPE 8.",
      "status": "completed",
      "executionScore": 27,
      "activity": {
        "date": "2026-02-06",
        "type": "Swim",
        "name": "Afternoon Swim",
        "description": null,
        "distance": 1400,
        "movingTime": 2281,
        "elapsedTime": 2281,
        "averageHeartrate": 138.7,
        "maxHeartrate": 153,
        "averageCadence": 21.4,
        "averageWatts": null,
        "maxWatts": null,
        "weightedAverageWatts": null,
        "averageSpeed": 0.6137658921525647,
        "maxSpeed": 5,
        "averagePace": "2:43/100m",
        "calories": 371,
        "sufferScore": null,
        "laps": [
          {
            "lapIndex": 0,
            "distance": 25,
            "time": 42,
            "elapsedTime": 42,
            "pace": "2:48",
            "averageHeartrate": 122.2,
            "averageCadence": 18,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 1,
            "distance": 25,
            "time": 25,
            "elapsedTime": 25,
            "pace": "1:40",
            "averageHeartrate": 134,
            "averageCadence": 18.5,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 2,
            "distance": 25,
            "time": 30,
            "elapsedTime": 30,
            "pace": "2:00",
            "averageHeartrate": 140.7,
            "averageCadence": 29.9,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 3,
            "distance": 25,
            "time": 34,
            "elapsedTime": 34,
            "pace": "2:16",
            "averageHeartrate": 142,
            "averageCadence": 27,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 4,
            "distance": 25,
            "time": 42,
            "elapsedTime": 42,
            "pace": "2:48",
            "averageHeartrate": 142.1,
            "averageCadence": 26.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 5,
            "distance": 25,
            "time": 33,
            "elapsedTime": 33,
            "pace": "2:12",
            "averageHeartrate": 144.8,
            "averageCadence": 19.2,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 6,
            "distance": 25,
            "time": 47,
            "elapsedTime": 47,
            "pace": "3:08",
            "averageHeartrate": 139.4,
            "averageCadence": 26.7,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 7,
            "distance": 25,
            "time": 34,
            "elapsedTime": 34,
            "pace": "2:16",
            "averageHeartrate": 138.7,
            "averageCadence": 15.3,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 8,
            "distance": 25,
            "time": 47,
            "elapsedTime": 47,
            "pace": "3:08",
            "averageHeartrate": 135.4,
            "averageCadence": 24.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 9,
            "distance": 25,
            "time": 33,
            "elapsedTime": 33,
            "pace": "2:12",
            "averageHeartrate": 137.1,
            "averageCadence": 16.4,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 10,
            "distance": 25,
            "time": 47,
            "elapsedTime": 47,
            "pace": "3:08",
            "averageHeartrate": 134.7,
            "averageCadence": 27.7,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 11,
            "distance": 25,
            "time": 38,
            "elapsedTime": 38,
            "pace": "2:32",
            "averageHeartrate": 132.6,
            "averageCadence": 16.2,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 12,
            "distance": 25,
            "time": 42,
            "elapsedTime": 42,
            "pace": "2:48",
            "averageHeartrate": 128.9,
            "averageCadence": 21.9,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 13,
            "distance": 25,
            "time": 29,
            "elapsedTime": 29,
            "pace": "1:56",
            "averageHeartrate": 129.2,
            "averageCadence": 16.4,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 14,
            "distance": 25,
            "time": 48,
            "elapsedTime": 48,
            "pace": "3:12",
            "averageHeartrate": 126.1,
            "averageCadence": 26.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 15,
            "distance": 25,
            "time": 34,
            "elapsedTime": 34,
            "pace": "2:16",
            "averageHeartrate": 129.4,
            "averageCadence": 18.2,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 16,
            "distance": 25,
            "time": 54,
            "elapsedTime": 54,
            "pace": "3:36",
            "averageHeartrate": 127.1,
            "averageCadence": 23.9,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 17,
            "distance": 25,
            "time": 28,
            "elapsedTime": 28,
            "pace": "1:52",
            "averageHeartrate": 131.3,
            "averageCadence": 16.2,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 18,
            "distance": 25,
            "time": 54,
            "elapsedTime": 54,
            "pace": "3:36",
            "averageHeartrate": 129.4,
            "averageCadence": 20.9,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 19,
            "distance": 25,
            "time": 28,
            "elapsedTime": 28,
            "pace": "1:52",
            "averageHeartrate": 132.8,
            "averageCadence": 16.2,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 20,
            "distance": 25,
            "time": 49,
            "elapsedTime": 49,
            "pace": "3:16",
            "averageHeartrate": 129,
            "averageCadence": 20.9,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 21,
            "distance": 25,
            "time": 34,
            "elapsedTime": 34,
            "pace": "2:16",
            "averageHeartrate": 134.5,
            "averageCadence": 18.1,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 22,
            "distance": 25,
            "time": 49,
            "elapsedTime": 49,
            "pace": "3:16",
            "averageHeartrate": 131,
            "averageCadence": 20.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 23,
            "distance": 25,
            "time": 32,
            "elapsedTime": 32,
            "pace": "2:08",
            "averageHeartrate": 137.3,
            "averageCadence": 13.4,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 24,
            "distance": 25,
            "time": 51,
            "elapsedTime": 51,
            "pace": "3:24",
            "averageHeartrate": 137.8,
            "averageCadence": 26.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 25,
            "distance": 25,
            "time": 33,
            "elapsedTime": 33,
            "pace": "2:12",
            "averageHeartrate": 141,
            "averageCadence": 15.4,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 26,
            "distance": 25,
            "time": 49,
            "elapsedTime": 49,
            "pace": "3:16",
            "averageHeartrate": 140.6,
            "averageCadence": 26.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 27,
            "distance": 25,
            "time": 35,
            "elapsedTime": 35,
            "pace": "2:20",
            "averageHeartrate": 145.8,
            "averageCadence": 15.3,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 28,
            "distance": 25,
            "time": 51,
            "elapsedTime": 51,
            "pace": "3:24",
            "averageHeartrate": 143,
            "averageCadence": 23.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 29,
            "distance": 25,
            "time": 31,
            "elapsedTime": 31,
            "pace": "2:04",
            "averageHeartrate": 148.8,
            "averageCadence": 15.4,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 30,
            "distance": 25,
            "time": 50,
            "elapsedTime": 50,
            "pace": "3:20",
            "averageHeartrate": 142,
            "averageCadence": 26.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 31,
            "distance": 25,
            "time": 35,
            "elapsedTime": 35,
            "pace": "2:20",
            "averageHeartrate": 147.6,
            "averageCadence": 15.3,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 32,
            "distance": 25,
            "time": 51,
            "elapsedTime": 51,
            "pace": "3:24",
            "averageHeartrate": 149,
            "averageCadence": 26.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 33,
            "distance": 25,
            "time": 33,
            "elapsedTime": 33,
            "pace": "2:12",
            "averageHeartrate": 150,
            "averageCadence": 15.4,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 34,
            "distance": 25,
            "time": 49,
            "elapsedTime": 49,
            "pace": "3:16",
            "averageHeartrate": 143.3,
            "averageCadence": 26.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 35,
            "distance": 25,
            "time": 33,
            "elapsedTime": 33,
            "pace": "2:12",
            "averageHeartrate": 149.2,
            "averageCadence": 15.4,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 36,
            "distance": 25,
            "time": 51,
            "elapsedTime": 51,
            "pace": "3:24",
            "averageHeartrate": 142.9,
            "averageCadence": 26.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 37,
            "distance": 25,
            "time": 36,
            "elapsedTime": 36,
            "pace": "2:24",
            "averageHeartrate": 149.5,
            "averageCadence": 18.1,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 38,
            "distance": 25,
            "time": 47,
            "elapsedTime": 47,
            "pace": "3:08",
            "averageHeartrate": 139.1,
            "averageCadence": 21.9,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 39,
            "distance": 25,
            "time": 35,
            "elapsedTime": 35,
            "pace": "2:20",
            "averageHeartrate": 145.2,
            "averageCadence": 18.2,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 40,
            "distance": 25,
            "time": 48,
            "elapsedTime": 48,
            "pace": "3:12",
            "averageHeartrate": 140.2,
            "averageCadence": 23.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 41,
            "distance": 25,
            "time": 36,
            "elapsedTime": 36,
            "pace": "2:24",
            "averageHeartrate": 143.7,
            "averageCadence": 16.2,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 42,
            "distance": 25,
            "time": 51,
            "elapsedTime": 51,
            "pace": "3:24",
            "averageHeartrate": 139,
            "averageCadence": 23.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 43,
            "distance": 25,
            "time": 34,
            "elapsedTime": 34,
            "pace": "2:16",
            "averageHeartrate": 143.9,
            "averageCadence": 15.3,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 44,
            "distance": 25,
            "time": 49,
            "elapsedTime": 49,
            "pace": "3:16",
            "averageHeartrate": 137.5,
            "averageCadence": 23.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 45,
            "distance": 25,
            "time": 36,
            "elapsedTime": 36,
            "pace": "2:24",
            "averageHeartrate": 141.8,
            "averageCadence": 16.2,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 46,
            "distance": 25,
            "time": 50,
            "elapsedTime": 50,
            "pace": "3:20",
            "averageHeartrate": 140.2,
            "averageCadence": 21.9,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 47,
            "distance": 25,
            "time": 36,
            "elapsedTime": 36,
            "pace": "2:24",
            "averageHeartrate": 145.7,
            "averageCadence": 15.3,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 48,
            "distance": 25,
            "time": 54,
            "elapsedTime": 54,
            "pace": "3:36",
            "averageHeartrate": 135.3,
            "averageCadence": 23.9,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 49,
            "distance": 25,
            "time": 32,
            "elapsedTime": 32,
            "pace": "2:08",
            "averageHeartrate": 139.6,
            "averageCadence": 19.2,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 50,
            "distance": 25,
            "time": 51,
            "elapsedTime": 51,
            "pace": "3:24",
            "averageHeartrate": 137.7,
            "averageCadence": 24.9,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 51,
            "distance": 25,
            "time": 35,
            "elapsedTime": 35,
            "pace": "2:20",
            "averageHeartrate": 139.5,
            "averageCadence": 18.1,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 52,
            "distance": 25,
            "time": 62,
            "elapsedTime": 62,
            "pace": "4:08",
            "averageHeartrate": 133.9,
            "averageCadence": 20.9,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 53,
            "distance": 25,
            "time": 30,
            "elapsedTime": 30,
            "pace": "2:00",
            "averageHeartrate": 145.3,
            "averageCadence": 13.5,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 54,
            "distance": 25,
            "time": 35,
            "elapsedTime": 35,
            "pace": "2:20",
            "averageHeartrate": 147.8,
            "averageCadence": 26.9,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 55,
            "distance": 25,
            "time": 39,
            "elapsedTime": 39,
            "pace": "2:36",
            "averageHeartrate": 149.7,
            "averageCadence": 24,
            "averageWatts": null,
            "isRest": false
          }
        ]
      }
    },
    {
      "plannedDate": "2026-02-07",
      "plannedType": "Bike",
      "plannedTitle": "Big Brick (Bike Simulation)",
      "workoutDescription": "90 min @ 85% FTP.",
      "status": "completed",
      "executionScore": 98,
      "activity": {
        "date": "2026-02-07",
        "type": "VirtualRide",
        "name": "MyWhoosh - Coffee Trail",
        "description": "Brick workout (1/2)",
        "distance": 48410.7,
        "movingTime": 5413,
        "elapsedTime": 5413,
        "averageHeartrate": 143,
        "maxHeartrate": 162,
        "averageCadence": 89.8,
        "averageWatts": 185.5,
        "maxWatts": 451,
        "weightedAverageWatts": 189,
        "averageSpeed": 8.943414003325328,
        "maxSpeed": 14.04,
        "averagePace": "32.2 km/h",
        "calories": 1003,
        "sufferScore": null,
        "laps": [
          {
            "lapIndex": 0,
            "distance": 7723.3,
            "time": 900,
            "elapsedTime": 900,
            "pace": "30.9 km/h",
            "averageHeartrate": 125.1,
            "averageCadence": 85.4,
            "averageWatts": 151.3,
            "isRest": false
          },
          {
            "lapIndex": 1,
            "distance": 40596.1,
            "time": 4500,
            "elapsedTime": 4500,
            "pace": "32.5 km/h",
            "averageHeartrate": 146.6,
            "averageCadence": 90.6,
            "averageWatts": 192.3,
            "isRest": false
          }
        ]
      }
    },
    {
      "plannedDate": "2026-02-07",
      "plannedType": "Run",
      "plannedTitle": "Big Brick (Run Simulation)",
      "workoutDescription": "30 min @ 4:25/km.",
      "status": "completed",
      "executionScore": 98,
      "activity": {
        "date": "2026-02-07",
        "type": "Run",
        "name": "Morning Run",
        "description": "Brick workout (2/2)",
        "distance": 7006.8,
        "movingTime": 1825,
        "elapsedTime": 1984,
        "averageHeartrate": 168.5,
        "maxHeartrate": 180,
        "averageCadence": 87.5,
        "averageWatts": 352.1,
        "maxWatts": 459,
        "weightedAverageWatts": 342,
        "averageSpeed": 3.839342465753425,
        "maxSpeed": 5.2,
        "averagePace": "4:20/km",
        "calories": 398,
        "sufferScore": null,
        "laps": [
          {
            "lapIndex": 0,
            "distance": 7006,
            "time": 1825,
            "elapsedTime": 1837,
            "pace": "4:20",
            "averageHeartrate": 168.5,
            "averageCadence": 87.5,
            "averageWatts": 352.1,
            "isRest": false
          }
        ]
      }
    },
    {
      "plannedDate": "2026-02-08",
      "plannedType": "Soccer",
      "plannedTitle": "Soccer Match",
      "workoutDescription": "Weekly competition.",
      "status": "completed",
      "executionScore": 94,
      "activity": {
        "date": "2026-02-08",
        "type": "Soccer",
        "name": "Cominnes - Merkem",
        "description": "",
        "distance": 0,
        "movingTime": 5400,
        "elapsedTime": 5400,
        "averageHeartrate": null,
        "maxHeartrate": null,
        "averageCadence": null,
        "averageWatts": null,
        "maxWatts": null,
        "weightedAverageWatts": null,
        "averageSpeed": 0,
        "maxSpeed": 0,
        "averagePace": "N/A",
        "calories": 0,
        "sufferScore": null,
        "laps": []
      }
    },
    {
      "plannedDate": "2026-02-09",
      "plannedType": "Run",
      "plannedTitle": "Key Session: Peak Intervals",
      "workoutDescription": "4x2km @ 4:10/km.",
      "status": "completed",
      "executionScore": 87,
      "activity": {
        "date": "2026-02-09",
        "type": "Run",
        "name": "Treadmill",
        "description": "WU: 1km @ 5:30\n3x 2km @ 4:10/km\n",
        "distance": 7998.9,
        "movingTime": 2376,
        "elapsedTime": 2376,
        "averageHeartrate": 143.5,
        "maxHeartrate": 170,
        "averageCadence": 82,
        "averageWatts": null,
        "maxWatts": null,
        "weightedAverageWatts": null,
        "averageSpeed": 3.366540404040404,
        "maxSpeed": 2.34,
        "averagePace": "4:57/km",
        "calories": 369,
        "sufferScore": null,
        "laps": [
          {
            "lapIndex": 0,
            "distance": 1000,
            "time": 316,
            "elapsedTime": 316,
            "pace": "5:16",
            "averageHeartrate": 78.7,
            "averageCadence": 79.5,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 1,
            "distance": 2000,
            "time": 499,
            "elapsedTime": 499,
            "pace": "4:10",
            "averageHeartrate": 152.6,
            "averageCadence": 83.6,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 2,
            "distance": 450000,
            "time": 154,
            "elapsedTime": 154,
            "pace": "0:00",
            "averageHeartrate": 145,
            "averageCadence": 77.2,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 3,
            "distance": 2000,
            "time": 500,
            "elapsedTime": 506,
            "pace": "4:10",
            "averageHeartrate": 163.2,
            "averageCadence": 83.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 4,
            "distance": 450000,
            "time": 164,
            "elapsedTime": 164,
            "pace": "0:00",
            "averageHeartrate": 146.6,
            "averageCadence": 77.3,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 5,
            "distance": 2000,
            "time": 500,
            "elapsedTime": 737,
            "pace": "4:10",
            "averageHeartrate": 150.6,
            "averageCadence": 82.7,
            "averageWatts": null,
            "isRest": false
          }
        ]
      }
    },
    {
      "plannedDate": "2026-02-09",
      "plannedType": "Swim",
      "plannedTitle": "Swim Tech",
      "workoutDescription": "6x50m Catch-up. 10x50m FAST @ RPE 9.",
      "status": "completed",
      "executionScore": 100,
      "activity": {
        "date": "2026-02-09",
        "type": "Swim",
        "name": "Evening Swim",
        "description": "1000m*:\nWU: 100m\n6x 50m catch up drill\n10x 50m @ ~1:45/100m\nCD: 100m",
        "distance": 1000,
        "movingTime": 1686,
        "elapsedTime": 1686,
        "averageHeartrate": 143.8,
        "maxHeartrate": 162,
        "averageCadence": 21.5,
        "averageWatts": null,
        "maxWatts": null,
        "weightedAverageWatts": null,
        "averageSpeed": 0.5931198102016607,
        "maxSpeed": 5,
        "averagePace": "2:49/100m",
        "calories": 291,
        "sufferScore": null,
        "laps": [
          {
            "lapIndex": 0,
            "distance": 100,
            "time": 146,
            "elapsedTime": 34,
            "pace": "2:26",
            "averageHeartrate": 159.8,
            "averageCadence": 21.2,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 1,
            "distance": 50,
            "time": 80,
            "pace": "2:40",
            "averageHeartrate": 143.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 2,
            "time": 10,
            "pace": "",
            "averageHeartrate": 143.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 3,
            "distance": 50,
            "time": 76,
            "pace": "2:32",
            "averageHeartrate": 143.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 4,
            "time": 10,
            "pace": "",
            "averageHeartrate": 143.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 5,
            "distance": 50,
            "time": 75,
            "pace": "2:30",
            "averageHeartrate": 143.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 6,
            "time": 10,
            "pace": "",
            "averageHeartrate": 143.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 7,
            "distance": 50,
            "time": 75,
            "pace": "2:30",
            "averageHeartrate": 143.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 8,
            "time": 10,
            "pace": "",
            "averageHeartrate": 143.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 9,
            "distance": 50,
            "time": 72,
            "pace": "2:24",
            "averageHeartrate": 143.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 10,
            "time": 10,
            "pace": "",
            "averageHeartrate": 143.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 11,
            "distance": 50,
            "time": 86,
            "pace": "2:52",
            "averageHeartrate": 143.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 12,
            "time": 30,
            "pace": "",
            "averageHeartrate": 143.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 13,
            "distance": 50,
            "time": 53,
            "pace": "1:46",
            "averageHeartrate": 143.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 14,
            "time": 30,
            "pace": "",
            "averageHeartrate": 143.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 15,
            "distance": 50,
            "time": 52,
            "pace": "1:44",
            "averageHeartrate": 143.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 16,
            "time": 30,
            "pace": "",
            "averageHeartrate": 143.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 17,
            "distance": 50,
            "time": 51,
            "pace": "1:42",
            "averageHeartrate": 143.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 18,
            "time": 30,
            "pace": "",
            "averageHeartrate": 143.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 19,
            "distance": 50,
            "time": 52,
            "pace": "1:44",
            "averageHeartrate": 143.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 20,
            "time": 30,
            "pace": "",
            "averageHeartrate": 143.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 21,
            "distance": 50,
            "time": 50,
            "pace": "1:40",
            "averageHeartrate": 143.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 22,
            "time": 30,
            "pace": "",
            "averageHeartrate": 143.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 23,
            "distance": 50,
            "time": 52,
            "pace": "1:44",
            "averageHeartrate": 143.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 24,
            "time": 30,
            "pace": "",
            "averageHeartrate": 143.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 25,
            "distance": 50,
            "time": 54,
            "pace": "1:48",
            "averageHeartrate": 143.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 26,
            "time": 30,
            "pace": "",
            "averageHeartrate": 143.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 27,
            "distance": 50,
            "time": 53,
            "pace": "1:46",
            "averageHeartrate": 143.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 28,
            "time": 30,
            "pace": "",
            "averageHeartrate": 143.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 29,
            "distance": 50,
            "time": 52,
            "pace": "1:44",
            "averageHeartrate": 143.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 30,
            "time": 30,
            "pace": "",
            "averageHeartrate": 143.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 31,
            "distance": 50,
            "time": 51,
            "pace": "1:42",
            "averageHeartrate": 143.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 32,
            "time": 30,
            "pace": "",
            "averageHeartrate": 143.8,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 33,
            "distance": 100,
            "time": 132,
            "pace": "2:12",
            "averageHeartrate": 143.8,
            "averageWatts": null,
            "isRest": false
          }
        ]
      }
    },
    {
      "plannedDate": "2026-02-10",
      "plannedType": "Soccer",
      "plannedTitle": "Soccer Practice",
      "workoutDescription": "Regular training session.",
      "status": "completed",
      "executionScore": 70,
      "activity": {
        "date": "2026-02-10",
        "type": "Soccer",
        "name": "Evening Football (Soccer)",
        "description": null,
        "distance": 8728.8,
        "movingTime": 4029,
        "elapsedTime": 5005,
        "averageHeartrate": 111.1,
        "maxHeartrate": 172,
        "averageCadence": null,
        "averageWatts": null,
        "maxWatts": null,
        "weightedAverageWatts": null,
        "averageSpeed": 2.1664929262844375,
        "maxSpeed": 5.94,
        "averagePace": "N/A",
        "calories": 511,
        "sufferScore": null,
        "laps": [
          {
            "lapIndex": 0,
            "distance": 8731,
            "time": 4029,
            "elapsedTime": 5001,
            "pace": "",
            "averageHeartrate": 111.1,
            "averageCadence": null,
            "averageWatts": null,
            "isRest": false
          }
        ]
      }
    },
    {
      "plannedDate": "2026-02-11",
      "plannedType": "Bike",
      "plannedTitle": "Key Session: Peak Over-Unders",
      "workoutDescription": "4 sets van (2 min @ 95% / 2 min @ 110% FTP).",
      "status": "completed",
      "executionScore": 59,
      "activity": {
        "date": "2026-02-11",
        "type": "VirtualRide",
        "name": "MyWhoosh - Downtown LA",
        "description": null,
        "distance": 28747.6,
        "movingTime": 3017,
        "elapsedTime": 3017,
        "averageHeartrate": 147,
        "maxHeartrate": 171,
        "averageCadence": 99.4,
        "averageWatts": 211.8,
        "maxWatts": 516,
        "weightedAverageWatts": 223,
        "averageSpeed": 9.528538283062645,
        "maxSpeed": 11.86,
        "averagePace": "34.3 km/h",
        "calories": 639,
        "sufferScore": null,
        "laps": [
          {
            "lapIndex": 0,
            "distance": 5026.56,
            "time": 600,
            "elapsedTime": 600,
            "pace": "30.2 km/h",
            "averageHeartrate": 120.1,
            "averageCadence": 87.9,
            "averageWatts": 157.3,
            "isRest": false
          },
          {
            "lapIndex": 1,
            "distance": 1210.37,
            "time": 120,
            "elapsedTime": 120,
            "pace": "36.3 km/h",
            "averageHeartrate": 143,
            "averageCadence": 97.2,
            "averageWatts": 261.8,
            "isRest": false
          },
          {
            "lapIndex": 2,
            "distance": 1117.63,
            "time": 120,
            "elapsedTime": 120,
            "pace": "33.5 km/h",
            "averageHeartrate": 146.2,
            "averageCadence": 101.9,
            "averageWatts": 222.2,
            "isRest": false
          },
          {
            "lapIndex": 3,
            "distance": 1307.64,
            "time": 120,
            "elapsedTime": 120,
            "pace": "39.2 km/h",
            "averageHeartrate": 152.7,
            "averageCadence": 105.1,
            "averageWatts": 259.2,
            "isRest": false
          },
          {
            "lapIndex": 4,
            "distance": 1194.09,
            "time": 120,
            "elapsedTime": 120,
            "pace": "35.8 km/h",
            "averageHeartrate": 152.4,
            "averageCadence": 106.7,
            "averageWatts": 223.9,
            "isRest": false
          },
          {
            "lapIndex": 5,
            "distance": 1239.87,
            "time": 120,
            "elapsedTime": 120,
            "pace": "37.2 km/h",
            "averageHeartrate": 155.5,
            "averageCadence": 106.2,
            "averageWatts": 261.4,
            "isRest": false
          },
          {
            "lapIndex": 6,
            "distance": 1164.9,
            "time": 120,
            "elapsedTime": 120,
            "pace": "34.9 km/h",
            "averageHeartrate": 154.8,
            "averageCadence": 107.4,
            "averageWatts": 223.4,
            "isRest": false
          },
          {
            "lapIndex": 7,
            "distance": 1174.32,
            "time": 120,
            "elapsedTime": 120,
            "pace": "35.2 km/h",
            "averageHeartrate": 157.3,
            "averageCadence": 107.6,
            "averageWatts": 258.8,
            "isRest": false
          },
          {
            "lapIndex": 8,
            "distance": 1266.6,
            "time": 120,
            "elapsedTime": 120,
            "pace": "38.0 km/h",
            "averageHeartrate": 156.8,
            "averageCadence": 103.2,
            "averageWatts": 221.8,
            "isRest": false
          },
          {
            "lapIndex": 9,
            "distance": 1239.81,
            "time": 120,
            "elapsedTime": 120,
            "pace": "37.2 km/h",
            "averageHeartrate": 160,
            "averageCadence": 104.3,
            "averageWatts": 263.4,
            "isRest": false
          },
          {
            "lapIndex": 10,
            "distance": 1187.54,
            "time": 120,
            "elapsedTime": 120,
            "pace": "35.6 km/h",
            "averageHeartrate": 157.9,
            "averageCadence": 101.4,
            "averageWatts": 223.1,
            "isRest": false
          },
          {
            "lapIndex": 11,
            "distance": 1223.98,
            "time": 120,
            "elapsedTime": 120,
            "pace": "36.7 km/h",
            "averageHeartrate": 162.5,
            "averageCadence": 107.9,
            "averageWatts": 261.6,
            "isRest": false
          },
          {
            "lapIndex": 12,
            "distance": 1112.91,
            "time": 120,
            "elapsedTime": 120,
            "pace": "33.4 km/h",
            "averageHeartrate": 161.7,
            "averageCadence": 93.6,
            "averageWatts": 226.1,
            "isRest": false
          },
          {
            "lapIndex": 13,
            "distance": 1315.32,
            "time": 120,
            "elapsedTime": 120,
            "pace": "39.5 km/h",
            "averageHeartrate": 162.8,
            "averageCadence": 111.8,
            "averageWatts": 259.3,
            "isRest": false
          },
          {
            "lapIndex": 14,
            "distance": 1186.6,
            "time": 120,
            "elapsedTime": 120,
            "pace": "35.6 km/h",
            "averageHeartrate": 161.9,
            "averageCadence": 100.8,
            "averageWatts": 222.4,
            "isRest": false
          },
          {
            "lapIndex": 15,
            "distance": 1241.51,
            "time": 120,
            "elapsedTime": 120,
            "pace": "37.2 km/h",
            "averageHeartrate": 165.8,
            "averageCadence": 108.1,
            "averageWatts": 260.6,
            "isRest": false
          },
          {
            "lapIndex": 16,
            "distance": 1169.11,
            "time": 120,
            "elapsedTime": 120,
            "pace": "35.1 km/h",
            "averageHeartrate": 162.5,
            "averageCadence": 102.9,
            "averageWatts": 227.3,
            "isRest": false
          },
          {
            "lapIndex": 17,
            "distance": 4236.18,
            "time": 480,
            "elapsedTime": 480,
            "pace": "31.8 km/h",
            "averageHeartrate": 140,
            "averageCadence": 95.2,
            "averageWatts": 161.9,
            "isRest": false
          }
        ]
      }
    },
    {
      "plannedDate": "2026-02-12",
      "plannedType": "Soccer",
      "plannedTitle": "Soccer Match",
      "workoutDescription": "Weekly competition",
      "status": "missed"
    },
    {
      "plannedDate": "2026-02-13",
      "plannedType": "Swim",
      "plannedTitle": "Swim Strength",
      "workoutDescription": "4x50m Sculling. 400m non-stop Tijdrit.",
      "status": "completed",
      "executionScore": 40,
      "activity": {
        "date": "2026-02-13",
        "type": "Swim",
        "name": "Evening Swim",
        "description": "WU: 100m\n4x 50m sculling\n400m met pull buoy\n400m freestyle",
        "distance": 1100,
        "movingTime": 1546,
        "elapsedTime": 1546,
        "averageHeartrate": 144.6,
        "maxHeartrate": 174,
        "averageCadence": 23.3,
        "averageWatts": null,
        "maxWatts": null,
        "weightedAverageWatts": null,
        "averageSpeed": 0.7115135834411385,
        "maxSpeed": 5,
        "averagePace": "2:21/100m",
        "calories": 263,
        "sufferScore": null,
        "laps": [
          {
            "lapIndex": 0,
            "distance": 100,
            "time": 120,
            "elapsedTime": 37,
            "pace": "2:00",
            "averageHeartrate": 169.5,
            "averageCadence": 26.9,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 1,
            "distance": 50,
            "time": 76,
            "pace": "2:32",
            "averageHeartrate": 144.6,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 2,
            "time": 10,
            "pace": "",
            "averageHeartrate": 144.6,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 3,
            "distance": 50,
            "time": 86,
            "pace": "2:52",
            "averageHeartrate": 144.6,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 4,
            "time": 10,
            "pace": "",
            "averageHeartrate": 144.6,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 5,
            "distance": 50,
            "time": 80,
            "pace": "2:40",
            "averageHeartrate": 144.6,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 6,
            "time": 10,
            "pace": "",
            "averageHeartrate": 144.6,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 7,
            "distance": 50,
            "time": 83,
            "pace": "2:46",
            "averageHeartrate": 144.6,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 8,
            "time": 30,
            "pace": "",
            "averageHeartrate": 144.6,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 9,
            "distance": 400,
            "time": 504,
            "pace": "2:06",
            "averageHeartrate": 144.6,
            "averageWatts": null,
            "isRest": false
          },
          {
            "lapIndex": 10,
            "distance": 400,
            "time": 512,
            "pace": "2:08",
            "averageHeartrate": 144.6,
            "averageWatts": null,
            "isRest": false
          }
        ]
      }
    },
    {
      "plannedDate": "2026-02-14",
      "plannedType": "Run",
      "plannedTitle": "Key Session: Long Run (Peak Distance)",
      "workoutDescription": "18 km @ 5:20/km.",
      "status": "completed",
      "executionScore": 86,
      "activity": {
        "date": "2026-02-14",
        "type": "Run",
        "name": "Afternoon Run",
        "description": "Met een zak pr's de deload week in 😁\nHM: 1:41:37",
        "distance": 21258.8,
        "movingTime": 6078,
        "elapsedTime": 6148,
        "averageHeartrate": 167.4,
        "maxHeartrate": 180,
        "averageCadence": 84.6,
        "averageWatts": 328.6,
        "maxWatts": 403,
        "weightedAverageWatts": 327,
        "averageSpeed": 3.4976637051661728,
        "maxSpeed": 5,
        "averagePace": "4:46/km",
        "calories": 1293,
        "sufferScore": null,
        "laps": [
          {
            "lapIndex": 0,
            "distance": 680,
            "time": 206,
            "elapsedTime": 206,
            "pace": "5:03",
            "averageHeartrate": 125.7,
            "averageCadence": 82.2,
            "averageWatts": 312.7,
            "isRest": false
          },
          {
            "lapIndex": 1,
            "distance": 20570,
            "time": 5872,
            "elapsedTime": 5942,
            "pace": "4:45",
            "averageHeartrate": 168.8,
            "averageCadence": 84.7,
            "averageWatts": 329.1,
            "isRest": false
          }
        ]
      }
    },
    {
      "plannedDate": "2026-02-15",
      "plannedType": "Rest",
      "plannedTitle": "Rest",
      "workoutDescription": "Rest day",
      "status": "missed"
    }
  ]
}

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

**Note:** In the all of the objects with 'sets' field, the distance/time/rest/pace are for each set. 
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
    "main": { "distance": number, "time": number, "pace": "string", "description": "string", "rest": number },
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
    "main": { "time": number, "watts": "string", "restWatts": "string", "description": "string", "rest": number },
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
    "warmup": { "distance": number, "description": "string" },
    "drill": { "distance": number, "drill": "string", "sets": number, "rest": number },
    "main": { "distance": number, "RPE": number, "description": "string", "rest": number },
    "coolDown": { "distance": number, "description": "string" }
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
    "main": { "exercises": ["string"] },
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
