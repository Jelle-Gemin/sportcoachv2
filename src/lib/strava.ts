import { findAthleteByStravaId, updateAthleteTokens } from './models/athlete';

export interface StravaActivitySummary {
    id: number;
    name: string;
    type: string;
    start_date: string;
    distance: number;
    moving_time: number;
    [key: string]: any;
}

export interface StravaActivityDetail extends StravaActivitySummary {
    sport_type: string;
    start_date_local: string;
    timezone: string;
    elapsed_time: number;
    total_elevation_gain: number;
    average_speed: number;
    max_speed: number;
    average_heartrate?: number;
    max_heartrate?: number;
    average_watts?: number;
    max_watts?: number;
    weighted_average_watts?: number;
    average_cadence?: number;
    calories?: number;
    suffer_score?: number;
    has_heartrate: boolean;
    device_watts: boolean;
    description?: string;
    map?: {
        id: string;
        summary_polyline: string;
        resource_state: number;
    };
}

export interface StravaLap {
    id: number;
    activity: { id: number };
    athlete: { id: number };
    start_index: number;
    end_index: number;
    name: string;
    elapsed_time: number;
    moving_time: number;
    distance: number;
    start_date: string;
    start_date_local: string;
    total_elevation_gain: number;
    average_speed: number;
    max_speed: number;
    average_heartrate?: number;
    max_heartrate?: number;
    average_watts?: number;
    average_cadence?: number;
    [key: string]: any;
}

const STRAVA_API_BASE = 'https://www.strava.com/api/v3';
const STRAVA_OAUTH_BASE = 'https://www.strava.com/oauth';

/**
 * Build the Strava OAuth authorization URL
 * @param {string} [scope] - OAuth scopes (default: read,activity:read_all)
 * @returns {string}
 */
export function getAuthorizationUrl(scope = 'read,activity:read_all') {
    const params = new URLSearchParams({
        client_id: process.env.STRAVA_CLIENT_ID || '',
        redirect_uri: process.env.STRAVA_REDIRECT_URI || '',
        response_type: 'code',
        scope,
    });

    return `${STRAVA_OAUTH_BASE}/authorize?${params.toString()}`;
}

/**
 * Exchange authorization code for access and refresh tokens
 * @param {string} code - Authorization code from OAuth callback
 * @returns {Promise<{accessToken: string, refreshToken: string, expiresAt: number, athlete: unknown}>}
 */
export async function exchangeCodeForTokens(code: string): Promise<{ accessToken: string, refreshToken: string, expiresAt: number, athlete: unknown }> {
    const response = await fetch(`${STRAVA_OAUTH_BASE}/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            client_id: process.env.STRAVA_CLIENT_ID,
            client_secret: process.env.STRAVA_CLIENT_SECRET,
            code,
            grant_type: 'authorization_code',
        }),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to exchange code for tokens: ${error}`);
    }

    const data = await response.json();

    return {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        expiresAt: data.expires_at,
        athlete: data.athlete,
    };
}

/**
 * Refresh an expired access token using the refresh token
 * @param {string} refreshToken 
 * @returns {Promise<{accessToken: string, refreshToken: string, expiresAt: number}>}
 */
export async function refreshAccessToken(refreshToken: string): Promise<{ accessToken: string, refreshToken: string, expiresAt: number }> {
    const response = await fetch(`${STRAVA_OAUTH_BASE}/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            client_id: process.env.STRAVA_CLIENT_ID,
            client_secret: process.env.STRAVA_CLIENT_SECRET,
            refresh_token: refreshToken,
            grant_type: 'refresh_token',
        }),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to refresh access token: ${error}`);
    }

    const data = await response.json();

    return {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        expiresAt: data.expires_at,
    };
}

/**
 * Get the authenticated athlete's profile
 * @param {string} accessToken 
 * @returns {Promise<unknown>}
 */
export async function getAthlete(accessToken: string): Promise<unknown> {
    const response = await fetch(`${STRAVA_API_BASE}/athlete`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to fetch athlete: ${error}`);
    }

    return response.json();
}

/**
 * Get a valid access token for an athlete, refreshing if necessary
 * @param {number} stravaId 
 * @returns {Promise<string>}
 */
export async function getValidAccessToken(stravaId: number): Promise<string> {
    const athlete = await findAthleteByStravaId(stravaId);

    if (!athlete) {
        throw new Error('Athlete not found');
    }

    // Check if token is expired (with 5 minute buffer)
    const now = Math.floor(Date.now() / 1000);
    const isExpired = athlete.expiresAt < now + 300;

    if (!isExpired) {
        return athlete.accessToken;
    }

    // Token is expired, refresh it
    const tokens = await refreshAccessToken(athlete.refreshToken);

    // Update tokens in database
    await updateAthleteTokens(
        stravaId,
        tokens.accessToken,
        tokens.refreshToken,
        tokens.expiresAt
    );

    return tokens.accessToken;
}

interface GetActivitiesOptions {
    before?: number;
    after?: number;
    page?: number;
    perPage?: number;
}

/**
 * Fetch athlete activities from Strava
 * @param {string} accessToken 
 * @param {GetActivitiesOptions} options 
 * @returns {Promise<StravaActivitySummary[]>}
 */
export async function getActivities(accessToken: string, options: GetActivitiesOptions = {}): Promise<StravaActivitySummary[]> {
    const params = new URLSearchParams();

    if (options.before) params.set('before', options.before.toString());
    if (options.after) params.set('after', options.after.toString());
    if (options.page) params.set('page', options.page.toString());
    if (options.perPage) params.set('per_page', options.perPage.toString());

    const url = `${STRAVA_API_BASE}/athlete/activities${params.toString() ? `?${params.toString()}` : ''}`;

    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to fetch activities: ${error}`);
    }

    return response.json();
}

/**
 * Fetch detailed activity data from Strava
 * @param {string} accessToken 
 * @param {number} activityId 
 * @returns {Promise<StravaActivityDetail>}
 */
export async function getActivityDetail(accessToken: string, activityId: number): Promise<StravaActivityDetail> {
    const response = await fetch(`${STRAVA_API_BASE}/activities/${activityId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to fetch activity detail: ${error}`);
    }

    return response.json();
}

/**
 * Fetch activity laps from Strava
 * @param {string} accessToken 
 * @param {number} activityId 
 * @returns {Promise<StravaLap[]>}
 */
export async function getActivityLaps(accessToken: string, activityId: number): Promise<StravaLap[]> {
    const response = await fetch(`${STRAVA_API_BASE}/activities/${activityId}/laps`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to fetch activity laps: ${error}`);
    }

    return response.json();
}

/**
 * Fetch activity streams from Strava (time-series data)
 * Excludes GPS data (latlng) to reduce storage size
 * @param {string} accessToken 
 * @param {number} activityId 
 * @returns {Promise<unknown>} Streams object with time, heartrate, watts, cadence, altitude, velocity_smooth, grade_smooth
 */
export async function getActivityStreams(accessToken: string, activityId: number): Promise<Record<string, unknown[]>> {
    // Request all streams except latlng (GPS)
    const streamTypes = [
        'time',
        'heartrate',
        'watts',
        'cadence',
        'altitude',
        'velocity_smooth',
        'grade_smooth',
    ].join(',');

    const response = await fetch(
        `${STRAVA_API_BASE}/activities/${activityId}/streams?keys=${streamTypes}&key_by_type=true`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

    if (!response.ok) {
        // Streams may not be available for all activities
        if (response.status === 404) {
            return {};
        }
        const error = await response.text();
        throw new Error(`Failed to fetch activity streams: ${error}`);
    }

    const data = await response.json();

    // Transform to a cleaner format with just the data arrays
    const streams: Record<string, unknown[]> = {};
    const streamData = data as Record<string, { data: unknown[] }>;
    for (const [key, value] of Object.entries(streamData)) {
        if (value && value.data) {
            streams[key] = value.data;
        }
    }

    return streams;
}

/**
 * Fetch complete activity with detail, laps, and streams
 * Makes 3 API calls
 * @param {string} accessToken 
 * @param {number} activityId 
 * @returns {Promise<{detail: StravaActivityDetail, laps: StravaLap[], streams: Record<string, unknown[]>}>}
 */
export async function getCompleteActivity(accessToken: string, activityId: number): Promise<{ detail: StravaActivityDetail, laps: StravaLap[], streams: Record<string, unknown[]> }> {
    const [detail, laps, streams] = await Promise.all([
        getActivityDetail(accessToken, activityId),
        getActivityLaps(accessToken, activityId),
        getActivityStreams(accessToken, activityId),
    ]);

    return { detail, laps, streams };
}

