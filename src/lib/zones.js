/**
 * Calculate Heart Rate Zones using Karvonen Method
 * @param {number} maxHR
 * @param {number} restingHR
 * @returns {Array<{name: string, min: number, max: number}>}
 */
export function calculateKarvonenZones(maxHR, restingHR) {
    if (!maxHR || !restingHR) return [];

    // Ensure inputs are numbers
    const max = Number(maxHR);
    const rest = Number(restingHR);

    if (isNaN(max) || isNaN(rest) || max <= rest) return [];

    const hrr = max - rest;

    // Z1: 50-60%
    // Z2: 60-70%
    // Z3: 70-80%
    // Z4: 80-90%
    // Z5: 90-100%

    return [
        { name: 'Z1 Recovery', min: Math.round(hrr * 0.50 + rest), max: Math.round(hrr * 0.60 + rest) },
        { name: 'Z2 Endurance', min: Math.round(hrr * 0.60 + rest) + 1, max: Math.round(hrr * 0.70 + rest) },
        { name: 'Z3 Tempo', min: Math.round(hrr * 0.70 + rest) + 1, max: Math.round(hrr * 0.80 + rest) },
        { name: 'Z4 Threshold', min: Math.round(hrr * 0.80 + rest) + 1, max: Math.round(hrr * 0.90 + rest) },
        { name: 'Z5 Anaerobic', min: Math.round(hrr * 0.90 + rest) + 1, max: max },
    ];
}

/**
 * Calculate Power Zones using Coggan Power Zones
 * @param {number} ftp
 * @returns {Array<{name: string, min: number, max: number | string}>}
 */
export function calculateCogganZones(ftp) {
    if (!ftp || isNaN(ftp)) return [];

    const val = Number(ftp);

    return [
        { name: 'Z1 Active Recovery', min: 0, max: Math.round(val * 0.55) },
        { name: 'Z2 Endurance', min: Math.round(val * 0.55) + 1, max: Math.round(val * 0.75) },
        { name: 'Z3 Tempo', min: Math.round(val * 0.75) + 1, max: Math.round(val * 0.90) },
        { name: 'Z4 Threshold', min: Math.round(val * 0.90) + 1, max: Math.round(val * 1.05) },
        { name: 'Z5 VO2 Max', min: Math.round(val * 1.05) + 1, max: Math.round(val * 1.20) },
        { name: 'Z6 Anaerobic Capacity', min: Math.round(val * 1.20) + 1, max: Math.round(val * 1.50) },
        { name: 'Z7 Neuromuscular Power', min: Math.round(val * 1.50) + 1, max: '∞' },
    ];
}

/**
 * Calculate Swim Zones based on CSS (Critical Swim Speed)
 * CSS is in seconds per 100m
 * @param {string} cssString - CSS in format "MM:SS" per 100m
 * @returns {Array<{name: string, min: string, max: string}>}
 */
export function calculateSwimZones(cssString) {
    if (!cssString) return [];

    // Parse MM:SS to seconds
    const parts = cssString.split(':');
    if (parts.length !== 2) return [];

    const [minStr, secStr] = parts;
    const min = parseInt(minStr, 10);
    const sec = parseInt(secStr, 10);

    if (isNaN(min) || isNaN(sec)) return [];

    const cssSeconds = min * 60 + sec;

    // Helpers to format seconds back to MM:SS
    const format = (s) => {
        const m = Math.floor(s / 60);
        const sc = Math.round(s % 60);
        return `${m}:${sc.toString().padStart(2, '0')}`;
    };

    // Z1 Recovery: > CSS+15s (Slower)
    // Z2 Endurance: CSS+5s to CSS+15s
    // Z3 Tempo: CSS to CSS+5s
    // Z4 Threshold: CSS-2s to CSS
    // Z5 VO2 Max: < CSS-2s (Faster)

    return [
        { name: 'Z1 Recovery', min: format(cssSeconds + 15), max: 'Slower' },
        { name: 'Z2 Endurance', min: format(cssSeconds + 5), max: format(cssSeconds + 15) },
        { name: 'Z3 Tempo', min: format(cssSeconds), max: format(cssSeconds + 5) },
        { name: 'Z4 Threshold', min: format(cssSeconds - 2), max: format(cssSeconds) },
        { name: 'Z5 VO2 Max', min: 'Faster', max: format(cssSeconds - 2) },
    ];
}
