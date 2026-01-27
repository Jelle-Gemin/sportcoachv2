import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface StepProgressProps {
    steps: { title: string; id: string }[];
    currentStep: number;
}

export function StepProgressIndicator({ steps, currentStep }: StepProgressProps) {
    return (
        <div className="w-full">
            <div className="flex items-center justify-between">
                {steps.map((step, idx) => {
                    const isCompleted = idx < currentStep;
                    const isCurrent = idx === currentStep;
                    const isPending = idx > currentStep;

                    return (
                        <div key={step.id} className="flex flex-col items-center relative flex-1">
                            {/* Connector Line */}
                            {idx !== 0 && (
                                <div className={cn(
                                    "absolute top-4 -left-1/2 w-full h-0.5",
                                    idx <= currentStep ? "bg-indigo-600" : "bg-slate-800"
                                )} />
                            )}

                            {/* Circle Indicator */}
                            <div className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 z-10 transition-all duration-300",
                                isCompleted ? "bg-indigo-600 border-indigo-600 text-white" : "",
                                isCurrent ? "bg-slate-900 border-indigo-500 text-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.5)]" : "",
                                isPending ? "bg-slate-900 border-slate-700 text-slate-600" : ""
                            )}>
                                {isCompleted ? <Check className="w-4 h-4" /> : idx + 1}
                            </div>

                            {/* Label */}
                            <span className={cn(
                                "text-[10px] uppercase tracking-wider font-bold mt-2 transition-colors duration-300 hidden md:block",
                                isCurrent ? "text-indigo-400" : "text-slate-600"
                            )}>
                                {step.title}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Mobile Label */}
            <div className="md:hidden text-center mt-4">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Step {currentStep + 1}: <span className="text-white">{steps[currentStep].title}</span>
                </span>
            </div>
        </div>
    );
}
