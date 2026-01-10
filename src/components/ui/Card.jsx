import React from 'react';
import { cn } from '../../lib/utils';

const Card = ({ children, className, ...props }) => {
    return (
        <div
            className={cn(
                "bg-[#0f172a] border border-slate-800 rounded-3xl overflow-hidden shadow-xl",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
