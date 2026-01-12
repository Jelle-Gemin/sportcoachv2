import React from 'react';

export const RunIcon = ({ className = "w-4 h-4" }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M13 4a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
        <path d="M4 17l5 1l.75 -1.5" />
        <path d="M15 21l0 -4l-4 -3l1 -6" />
        <path d="M7 12l0 -3l5 -1l3 3l3 1" />
    </svg>
);

export const SwimIcon = ({ className = "w-4 h-4" }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
        <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
        <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
    </svg>
);

export const BikeIcon = ({ className = "w-4 h-4" }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <circle cx="18.5" cy="17.5" r="3.5" />
        <circle cx="5.5" cy="17.5" r="3.5" />
        <circle cx="15" cy="5" r="1" />
        <path d="M12 17.5V14l-3-3 4-3 2 3h2" />
    </svg>
);

export const GymIcon = ({ className = "w-4 h-4" }) => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
    >
        <path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-1V3h-2v2h-4V3h-2v2H7c-1.1 0-2 .9-2 2v4H3.5c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5H5v4c0 1.1.9 2 2 2h1v2h2v-2h4v2h2v-2h1c1.1 0 2-.9 2-2v-4h1.5c.8 0 1.5-.7 1.5-1.5s-.7-1.5-1.5-1.5z" />
    </svg>
);
