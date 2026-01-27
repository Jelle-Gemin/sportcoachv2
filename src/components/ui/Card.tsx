import React from 'react';
import { cn } from '../../lib/utils';

interface cardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}

const Card = ({ children, className, ...props }: cardProps) => {
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
