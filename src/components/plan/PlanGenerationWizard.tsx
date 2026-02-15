'use client';

import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IPlanGenerationMetadata } from '@/lib/models/trainingPlan';
import { StepProgressIndicator } from '@/components/plan/StepProgressIndicator';
import { GeneratedPlanResponse } from '@/lib/ai/service';

// Steps
import { TrainingFocusStep } from './wizard/TrainingFocusStep';
import { OtherSportsStep } from './wizard/OtherSportsStep';
import { WeeklyHoursStep } from './wizard/WeeklyHoursStep';
import { DoubleTrainingStep } from './wizard/DoubleTrainingStep';
import { RestDaysStep } from './wizard/RestDaysStep';
import { StartDateStep } from './wizard/StartDateStep';
import { SummaryStep } from './wizard/SummaryStep';
import { PlanPreview } from './PlanPreview';

const STEPS = [
    { id: 'focus', title: 'Focus' },
    { id: 'date', title: 'Start' },
    { id: 'sports', title: 'Sports' },
    { id: 'hours', title: 'Volume' },
    { id: 'double', title: 'Doubles' },
    { id: 'rest', title: 'Rest' },
    { id: 'summary', title: 'Review' },
];

export function PlanGenerationWizard() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [seasonGoals, setSeasonGoals] = useState<any[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Preview Logic
    const [generatedPlan, setGeneratedPlan] = useState<GeneratedPlanResponse | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const methods = useForm<IPlanGenerationMetadata>({
        defaultValues: {
            trainingFocus: 'general',
            targetRaceIds: [],
            hasOtherSports: false,
            otherSports: [],
            totalWeeklyHours: 10,
            doubleTrainingDays: [],
            mandatoryRestDays: [],
            startDate: new Date().toISOString().split('T')[0],
        }
    });

    const { handleSubmit } = methods;

    // Fetch athlete goals for context
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch('/api/athlete/profile');
                if (res.ok) {
                    const data = await res.json();
                    setSeasonGoals(data.seasonGoals || []);
                }
            } catch (err) {
                console.error("Failed to fetch profile goals", err);
            }
        };
        fetchProfile();
    }, []);

    const nextStep = () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep(prev => prev + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const onSubmit = async (data: IPlanGenerationMetadata) => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        setError(null);

        try {
            const res = await fetch('/api/plan/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || 'Failed to generate plan');
            }

            const result = await res.json();

            // Show Preview
            setGeneratedPlan(result.plan);

        } catch (err: any) {
            console.error(err);
            setError(err.message || "An unexpected error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSavePlan = async () => {
        if (!generatedPlan || isSaving) return;
        setIsSaving(true);
        try {
            const res = await fetch('/api/plan/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    workouts: generatedPlan.workouts,
                    paceZones: generatedPlan.paceZones,
                    planTitle: generatedPlan.planTitle,
                    clearFuture: true
                }),
            });

            if (!res.ok) throw new Error("Failed to save plan");

            // Success -> Redirect
            router.push('/plan');
        } catch (err: any) {
            console.error(err);
            setError("Failed to save the plan. Please try again.");
            setIsSaving(false);
        }
    };

    const renderStep = () => {
        if (generatedPlan) {
            return (
                <PlanPreview
                    plan={generatedPlan}
                    onConfirm={handleSavePlan}
                    onCancel={() => setGeneratedPlan(null)}
                    isSaving={isSaving}
                />
            );
        }

        switch (currentStep) {
            case 0: return <TrainingFocusStep seasonGoals={seasonGoals} />;
            case 1: return <StartDateStep />;
            case 2: return <OtherSportsStep />;
            case 3: return <WeeklyHoursStep />;
            case 4: return <DoubleTrainingStep />;
            case 5: return <RestDaysStep />;
            case 6: return <SummaryStep />;
            default: return null;
        }
    };

    const isLastStep = currentStep === STEPS.length - 1;

    return (
        <FormProvider {...methods}>
            <div className="w-full max-w-4xl mx-auto px-4 py-8 md:py-12 flex flex-col min-h-screen md:min-h-0">

                {/* Header Progress - Hide if previewing */}
                {!generatedPlan && (
                    <div className="mb-8 md:mb-12">
                        <StepProgressIndicator steps={STEPS} currentStep={currentStep} />
                    </div>
                )}

                {/* Main Content Area */}
                <div className="flex-1 bg-slate-950/50 md:bg-slate-900 border border-transparent md:border-slate-800 rounded-3xl md:p-8 md:shadow-2xl relative overflow-hidden">

                    {/* Background decoration */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-20" />
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

                    {isSubmitting ? (
                        <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-700">
                            <div className="relative">
                                <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-20 animate-pulse" />
                                <Loader2 className="w-16 h-16 text-indigo-500 animate-spin relative z-10" />
                            </div>
                            <h2 className="mt-8 text-2xl font-bold text-white">Generating Your Plan...</h2>
                            <p className="text-slate-400 mt-2 text-center max-w-md">Our AI is analyzing your goals, constraints, and past performance to build the perfect schedule.</p>
                        </div>
                    ) : (
                        <div className="relative z-10">
                            {renderStep()}
                        </div>
                    )}

                    {error && (
                        <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-200 animate-in slide-in-from-bottom-2">
                            <AlertCircle className="w-5 h-5 shrink-0" />
                            <p className="text-sm font-medium">{error}</p>
                        </div>
                    )}
                </div>

                {/* Navigation Footer - Hide in preview mode */}
                {!isSubmitting && !generatedPlan && (
                    <div className="mt-8 flex items-center justify-between px-2">
                        <button
                            onClick={prevStep}
                            disabled={currentStep === 0}
                            className={cn(
                                "flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all",
                                currentStep === 0
                                    ? "opacity-0 pointer-events-none"
                                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                            )}
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back
                        </button>

                        {isLastStep ? (
                            <button
                                onClick={handleSubmit(onSubmit)}
                                className="flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold shadow-lg shadow-indigo-500/25 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <Sparkles className="w-5 h-5" />
                                Generate Plan
                            </button>
                        ) : (
                            <button
                                onClick={nextStep}
                                className="flex items-center gap-2 px-8 py-3 bg-white text-slate-900 hover:bg-slate-100 rounded-xl font-bold shadow-lg transition-all transform hover:translate-x-1"
                            >
                                Next Step
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                )}
            </div>
        </FormProvider>
    );
}
