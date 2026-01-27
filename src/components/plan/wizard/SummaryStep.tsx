import React from 'react';
import { useFormContext } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { IPlanGenerationMetadata } from '@/lib/models/trainingPlan';
import Card from '@/components/ui/Card';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function SummaryStep() {
    const { watch } = useFormContext<IPlanGenerationMetadata>();
    const data = watch();

    const doubleDays = data.doubleTrainingDays?.map(d => DAYS[d]).join(', ') || 'None';
    const restDays = data.mandatoryRestDays?.map(d => DAYS[d]).join(', ') || 'AI Scheduled';
    const otherSports = data.hasOtherSports && data.otherSports?.length > 0
        ? data.otherSports.map(s => {
            const duration = s.durationMode === 'fixed'
                ? s.hoursPerSession
                : 'Various';
            return `${s.sportType} (${duration})`;
        }).join(', ')
        : 'None';

    return (
        <div className="space-y-6 animate-in slide-in-from-right duration-500">
            <div className="text-center space-y-2 mb-8">
                <h2 className="text-2xl font-bold text-white">Ready to Generate?</h2>
                <p className="text-slate-400">Review your preferences before we create your plan.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SummaryCard title="Focus" value={data.trainingFocus === 'race' ? 'Race Prep' : 'General Fitness'} />
                <SummaryCard title="Weekly Volume" value={`${data.totalWeeklyHours} Hours`} />
                <SummaryCard title="Double Days" value={doubleDays} />
                <SummaryCard title="Blocked Days" value={restDays} />
                <SummaryCard title="Other Sports" value={otherSports} className="md:col-span-2" />
            </div>

            <div className="pt-8 flex justify-center">
                {/* This button is purely visual here, controlling logic is in the parent Wizard */}
                <div className="flex flex-col items-center gap-4">
                    <p className="text-xs text-slate-500 max-w-sm text-center">
                        By clicking Generate, the AI will use your profile data + these preferences to build a personalized schedule.
                    </p>
                </div>
            </div>
        </div>
    );
}

function SummaryCard({ title, value, className }: { title: string, value: string, className?: string }) {
    return (
        <Card className={cn("p-4 border-slate-800 bg-slate-900/50", className)}>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">{title}</label>
            <p className="text-white font-medium text-sm">{value}</p>
        </Card>
    );
}
