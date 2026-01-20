/**
 * Time and Duration Utilities
 */

/**
 * Formats seconds into various string representations
 * @param {number} seconds - Total seconds
 * @param {'hms' | 'hm' | 'ms' | 'colon'} format - Output format
 * @returns {string}
 */
export const formatDuration = (seconds, format = 'hms') => {
    if (!seconds && seconds !== 0) return format === 'colon' ? '00:00:00' : '--';

    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    switch (format) {
        case 'colon':
            return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        case 'hms':
            if (hrs > 0) return `${hrs}h ${mins}m ${secs}s`;
            return `${mins}m ${secs}s`;
        case 'hm':
            if (hrs > 0) return `${hrs}h ${mins}m`;
            return `${mins}m`;
        case 'ms':
            return `${mins}:${secs.toString().padStart(2, '0')}`;
        default:
            return `${mins}m ${secs}s`;
    }
};

/**
 * Parses a time string (HH:MM:SS, MM:SS, or MM) into seconds
 * @param {string} timeStr 
 * @returns {number}
 */
export const parseDuration = (timeStr) => {
    if (!timeStr) return 0;
    const parts = timeStr.split(':').map(Number);
    if (parts.length === 3) {
        return (parts[0] * 3600) + (parts[1] * 60) + (parts[2] || 0);
    }
    if (parts.length === 2) {
        return (parts[0] * 60) + (parts[1] || 0);
    }
    return parts[0] || 0;
};

/**
 * Real-time input masking for time fields (HH:MM:SS)
 * @param {string} value 
 * @returns {string}
 */
export const formatTimeInput = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 6);
    const parts = [];
    for (let i = 0; i < digits.length; i += 2) {
        parts.push(digits.slice(i, i + 2));
    }
    return parts.join(':');
};
