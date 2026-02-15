'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { User as UserIcon, Shield, Bell, Heart, Gauge, Trophy, Briefcase, Camera, Save, X, Trash2, RotateCcw, AlertCircle, Calculator } from 'lucide-react';
import Card from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { calculateKarvonenZones, calculateCogganZones, calculateSwimZones } from '@/lib/zones';

// ------------------------------------------------------------------
// TYPES & INTERFACES
// ------------------------------------------------------------------

interface Biometrics {
    weight?: number | null | undefined;
    height?: number | null | undefined;
    restingHR?: number | null | undefined;
    maxHR?: number | null | undefined;
    ftp?: number | null | undefined;
    css?: string | null | undefined;
}

interface Goal {
    title: string;
    date: string;
    priority?: 'A' | 'B' | 'C';
    distance?: string | null | undefined;
    location?: string | null | undefined;
    goalTime?: string | null | undefined;
    estimatedTimeMin?: string | null | undefined;
    estimatedTimeMax?: string | null | undefined;
}

interface Zone {
    name: string;
    min: string | number;
    max: string | number;
}

interface TrainingZones {
    hr: Zone[];
    cycling: Zone[];
    swimming: Zone[];
    running: Zone[];
}

interface ProfileFormData {
    biometrics: Biometrics;
    trainingZones: TrainingZones;
    seasonGoals: Goal[];
}

interface ErrorMessageProps {
    error?: {
        message?: string;
    };
}

interface BiometricInputProps {
    label: string;
    field: {
        value: string | number | null | undefined;
        onChange: (_e: any) => void;
    };
    editing: boolean;
    placeholder?: string;
    error?: any;
}

interface ZoneTableProps {
    title: string;
    zones: Zone[];
    type: keyof TrainingZones;
    editing: boolean;
    onChange: (_type: keyof TrainingZones, _index: number, _field: string, _value: string) => void;
    isOverridden: boolean;
    onReset: () => void;
}

interface GoalCardProps {
    goal: any;
    editing: boolean;
    control: any;
    index: number;
    onDelete: () => void;
    onCalculate: (_index: number, _distance: string) => Promise<void>;
    errors: any;
    isCalculating?: boolean;
}

/**
 * Automatically formats a string to HH:MM:SS as the user types
 * @param {string} value 
 * @returns {string}
 */
const formatTimeInput = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 6);
    const parts = [];
    for (let i = 0; i < digits.length; i += 2) {
        parts.push(digits.slice(i, i + 2));
    }
    return parts.join(':');
};

const validationSchema = yup.object().shape({
    biometrics: yup.object().shape({
        weight: yup.number().typeError('Must be a number').positive('Must be positive').nullable().transform((v, o) => o === '' ? null : v),
        height: yup.number().typeError('Must be a number').positive('Must be positive').nullable().transform((v, o) => o === '' ? null : v),
        restingHR: yup.number().typeError('Must be a number').integer().min(30, 'Too low').max(120, 'Too high').nullable().transform((v, o) => o === '' ? null : v),
        maxHR: yup.number().typeError('Must be a number').integer().min(100, 'Too low').max(220, 'Too high').nullable().transform((v, o) => o === '' ? null : v),
        ftp: yup.number().typeError('Must be a number').integer().positive().nullable().transform((v, o) => o === '' ? null : v),
        css: yup.string().matches(/^(\d{2}:)?\d{2}:\d{2}$/, { message: 'Format: MM:SS or HH:MM:SS', excludeEmptyString: true }).nullable().transform((v, o) => o === '' ? null : v),
    }).nullable(),
    seasonGoals: yup.array().of(
        yup.object().shape({
            title: yup.string().required('Required'),
            date: yup.string().required('Required'),
            priority: yup.string().oneOf(['A', 'B', 'C']),
            distance: yup.string().nullable(),
            location: yup.string().nullable(),
            goalTime: yup.string().matches(/^(\d{2}:){0,2}\d{2}$/, 'Format: HH:MM:SS').nullable(),
            estimatedTimeMin: yup.string().matches(/^(\d{2}:){0,2}\d{2}$/, 'Format: HH:MM:SS').nullable(),
            estimatedTimeMax: yup.string().matches(/^(\d{2}:){0,2}\d{2}$/, 'Format: HH:MM:SS').nullable(),
        })
    ),
    trainingZones: yup.object().shape({
        hr: yup.array().nullable(),
        cycling: yup.array().nullable(),
        swimming: yup.array().nullable(),
        running: yup.array().nullable(),
    }).required()
});

const ErrorMessage = ({ error }: ErrorMessageProps) => {
    if (!error) return null;
    return (
        <span className="text-[10px] font-bold text-red-500 mt-0.5 flex items-center gap-1">
            <AlertCircle className="w-2.5 h-2.5" /> {error.message}
        </span>
    );
};

const BiometricInput = ({ label, field: { value, onChange }, editing, placeholder, error }: BiometricInputProps) => (
    <div className="space-y-1">
        <label className="text-xs font-bold text-slate-500 uppercase">{label}</label>
        {editing ? (
            <>
                <input
                    type="text"
                    value={value || ''}
                    onChange={onChange}
                    className={cn(
                        "w-full bg-slate-900 border rounded-lg px-3 py-2 text-white focus:outline-none transition-colors",
                        error ? "border-red-500/50 focus:border-red-500" : "border-slate-800 focus:border-indigo-500"
                    )}
                    placeholder={placeholder}
                />
                <ErrorMessage error={error} />
            </>
        ) : (
            <div className="text-xl font-bold text-white">{value || '-'}</div>
        )}
    </div>
);

const ZoneTable = ({ title, zones, type, editing, onChange, isOverridden, onReset }: ZoneTableProps) => {
    if (!zones || zones.length === 0) return null;
    return (
        <Card className="p-6 overflow-hidden">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-white">{title}</h3>
                {editing && isOverridden && (
                    <button onClick={onReset} className="text-xs text-orange-400 flex items-center gap-1 hover:text-orange-300 transition-colors">
                        <RotateCcw className="w-3 h-3" /> Reset to Calculated
                    </button>
                )}
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead>
                        <tr className="text-slate-500 border-b border-slate-800">
                            <th className="pb-2 pl-2">Zone</th>
                            <th className="pb-2">Min</th>
                            <th className="pb-2">Max</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                        {zones.map((zone, idx) => (
                            <tr key={idx} className="group hover:bg-slate-800/20 transition-colors">
                                <td className="py-2 pl-2 text-slate-300 font-medium">{zone.name}</td>
                                <td className="py-2">
                                    {editing ? (
                                        <input
                                            value={zone.min}
                                            onChange={e => onChange(type, idx, 'min', e.target.value)}
                                            className="w-24 bg-slate-900/50 border border-slate-800 rounded px-2 py-1 text-white text-xs focus:border-indigo-500 focus:outline-none"
                                        />
                                    ) : <span className="text-slate-400">{zone.min}</span>}
                                </td>
                                <td className="py-2">
                                    {editing ? (
                                        <input
                                            value={zone.max}
                                            onChange={e => onChange(type, idx, 'max', e.target.value)}
                                            className="w-24 bg-slate-900/50 border border-slate-800 rounded px-2 py-1 text-white text-xs focus:border-indigo-500 focus:outline-none"
                                        />
                                    ) : <span className="text-slate-400">{zone.max}</span>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

const DISTANCE_OPTIONS = [
    "Sprint Triathlon",
    "Olympic Triathlon",
    "Ironman 70.3",
    "Ironman",
    "5k Run",
    "10k Run",
    "Half Marathon",
    "Marathon",
    "Other"
];

const GoalCard = ({ goal, editing, control, index, onDelete, onCalculate, errors, isCalculating }: GoalCardProps) => {
    const goalErrors = errors?.seasonGoals?.[index];

    return (
        <Card className="p-6 relative group border border-slate-800 hover:border-slate-700 transition-colors">
            {editing && (
                <button onClick={onDelete} className="absolute top-4 right-4 text-slate-600 hover:text-red-400 transition-colors shadow-sm">
                    <Trash2 className="w-4 h-4" />
                </button>
            )}
            <div className="flex flex-col gap-6">
                <div className="flex justify-between items-start">
                    <div className="space-y-1 flex-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">Event Name</label>
                        {editing ? (
                            <Controller
                                name={`seasonGoals.${index}.title`}
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <input {...field} className={cn("w-full bg-slate-900 border rounded-lg px-3 py-2 text-white text-sm focus:outline-none", goalErrors?.title ? "border-red-500/50 focus:border-red-500" : "border-slate-800 focus:border-indigo-500")} placeholder="e.g. Ironman 70.3 Mallorca" />
                                        <ErrorMessage error={goalErrors?.title} />
                                    </>
                                )}
                            />
                        ) : <h3 className="font-bold text-lg text-white">{goal.title || 'Untitled Event'}</h3>}
                    </div>
                    <div className="space-y-1 ml-4 text-right">
                        <label className="text-xs font-bold text-slate-500 uppercase">Priority</label>
                        {editing ? (
                            <Controller
                                name={`seasonGoals.${index}.priority`}
                                control={control}
                                render={({ field }) => (
                                    <select {...field} className="block w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white text-sm focus:border-indigo-500 focus:outline-none">
                                        <option value="A">A Race</option>
                                        <option value="B">B Race</option>
                                        <option value="C">C Race</option>
                                    </select>
                                )}
                            />
                        ) : <span className={cn("inline-block text-xs font-bold px-2 py-1 rounded border", goal.priority === 'A' ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-400" : "bg-slate-800 border-slate-700 text-slate-400")}>{goal.priority}-RACE</span>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">Race Distance</label>
                        {editing ? (
                            <Controller
                                name={`seasonGoals.${index}.distance`}
                                control={control}
                                render={({ field }) => (
                                    <select {...field} className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white text-sm focus:border-indigo-500 focus:outline-none">
                                        <option value="" disabled>Select Distance</option>
                                        {DISTANCE_OPTIONS.map(opt => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                )}
                            />
                        ) : (
                            <div className="flex items-center gap-2">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800 text-slate-400">
                                    <Trophy className="w-4 h-4" />
                                </span>
                                <span className="text-sm font-medium text-slate-200">{goal.distance || 'Unknown Distance'}</span>
                            </div>
                        )}
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">Date</label>
                        {editing ? (
                            <Controller
                                name={`seasonGoals.${index}.date`}
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <input type="date" {...field} className={cn("w-full bg-slate-900 border rounded-lg px-3 py-2 text-white text-sm focus:outline-none", goalErrors?.date ? "border-red-500/50 focus:border-red-500" : "border-slate-800 focus:border-indigo-500")} />
                                        <ErrorMessage error={goalErrors?.date} />
                                    </>
                                )}
                            />
                        ) : <p className="text-sm text-slate-300 flex items-center gap-2 h-8"><span className="text-slate-500">Scheduled:</span> {goal.date || 'TBD'}</p>}
                    </div>

                    <div className="space-y-1 md:col-span-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">Location</label>
                        {editing ? (
                            <Controller
                                name={`seasonGoals.${index}.location`}
                                control={control}
                                render={({ field }) => (
                                    <input {...field} className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white text-sm focus:border-indigo-500 focus:outline-none" placeholder="e.g. Mallorca, Spain" />
                                )}
                            />
                        ) : <p className="text-sm text-slate-400">{goal.location}</p>}
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">Goal Time</label>
                        {editing ? (
                            <Controller
                                name={`seasonGoals.${index}.goalTime`}
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <>
                                        <input
                                            value={value || ''}
                                            onChange={(e) => onChange(formatTimeInput(e.target.value))}
                                            className={cn("w-full bg-slate-900 border rounded-lg px-3 py-2 text-white text-sm focus:outline-none", goalErrors?.goalTime ? "border-red-500/50 focus:border-red-500" : "border-slate-800 focus:border-indigo-500")}
                                            placeholder="HH:MM:SS"
                                        />
                                        <ErrorMessage error={goalErrors?.goalTime} />
                                    </>
                                )}
                            />
                        ) : <p className="text-sm text-slate-200 font-medium">{goal.goalTime || '-'}</p>}
                    </div>

                    <div className="space-y-1 md:col-span-2">
                        <div className="flex items-center justify-between">
                            <label className="text-xs font-bold text-slate-500 uppercase">Estimated Time Range</label>
                            {editing && goal.distance && (
                                <button
                                    type="button"
                                    onClick={() => onCalculate(index, goal.distance)}
                                    disabled={isCalculating}
                                    className="text-xs flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition-colors disabled:opacity-50"
                                >
                                    <Calculator className="w-3 h-3" />
                                    {isCalculating ? 'Calculating...' : 'Calculate'}
                                </button>
                            )}
                        </div>
                        {editing ? (
                            <div className="flex items-center gap-2">
                                <div className="flex-1">
                                    <Controller
                                        name={`seasonGoals.${index}.estimatedTimeMin`}
                                        control={control}
                                        render={({ field: { value, onChange } }) => (
                                            <>
                                                <input
                                                    value={value || ''}
                                                    onChange={(e) => onChange(formatTimeInput(e.target.value))}
                                                    className={cn("w-full bg-slate-900 border rounded-lg px-3 py-2 text-white text-sm focus:outline-none", goalErrors?.estimatedTimeMin ? "border-red-500/50 focus:border-red-500" : "border-slate-800 focus:border-indigo-500")}
                                                    placeholder="Min (HH:MM:SS)"
                                                />
                                                <ErrorMessage error={goalErrors?.estimatedTimeMin} />
                                            </>
                                        )}
                                    />
                                </div>
                                <span className="text-slate-500">-</span>
                                <div className="flex-1">
                                    <Controller
                                        name={`seasonGoals.${index}.estimatedTimeMax`}
                                        control={control}
                                        render={({ field: { value, onChange } }) => (
                                            <>
                                                <input
                                                    value={value || ''}
                                                    onChange={(e) => onChange(formatTimeInput(e.target.value))}
                                                    className={cn("w-full bg-slate-900 border rounded-lg px-3 py-2 text-white text-sm focus:outline-none", goalErrors?.estimatedTimeMax ? "border-red-500/50 focus:border-red-500" : "border-slate-800 focus:border-indigo-500")}
                                                    placeholder="Max (HH:MM:SS)"
                                                />
                                                <ErrorMessage error={goalErrors?.estimatedTimeMax} />
                                            </>
                                        )}
                                    />
                                </div>
                            </div>
                        ) : (
                            <p className="text-sm text-slate-400 font-medium">
                                {goal.estimatedTimeMin && goal.estimatedTimeMax
                                    ? `${goal.estimatedTimeMin} - ${goal.estimatedTimeMax}`
                                    : goal.estimatedTimeMin || goal.estimatedTimeMax || '-'}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default function Profile() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [originalData, setOriginalData] = useState<any>(null);
    const [athleteName, setAthleteName] = useState('Athlete');
    const [athleteImage, setAthleteImage] = useState<string | null>(null);
    const [calculatingIndex, setCalculatingIndex] = useState<number | null>(null);

    // Flags to track if zones are manually overridden
    const [overrides, setOverrides] = useState({
        hr: false,
        cycling: false,
        swimming: false,
        running: false
    });

    const {
        control,
        handleSubmit: _handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors, isValid }
    } = useForm<ProfileFormData>({
        resolver: yupResolver(validationSchema as any),
        defaultValues: {
            biometrics: { weight: null, height: null, restingHR: null, maxHR: null, ftp: null, css: null } as Biometrics,
            trainingZones: { hr: [], cycling: [], swimming: [], running: [] } as TrainingZones,
            seasonGoals: [] as Goal[]
        },
        mode: 'onChange'
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "seasonGoals"
    });

    const formValues = watch();
    const biometrics = formValues.biometrics;
    const trainingZones = formValues.trainingZones;

    // Derive focus from A-Race
    const aRace = formValues.seasonGoals?.find(g => g.priority === 'A');
    const focusLabel = aRace ? `${aRace.distance || aRace.title || 'Race'} Focus` : 'Season Prep';

    // Fetch data
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch('/api/athlete/profile');
                if (res.ok) {
                    const data = await res.json();
                    setOriginalData(data);

                    const bio = data.biometrics || {};
                    const zones = data.trainingZones || {};

                    if ((!zones.hr || zones.hr.length === 0) && bio.maxHR && bio.restingHR) {
                        zones.hr = calculateKarvonenZones(bio.maxHR, bio.restingHR);
                    }
                    if ((!zones.cycling || zones.cycling.length === 0) && bio.ftp) {
                        zones.cycling = calculateCogganZones(bio.ftp);
                    }
                    if ((!zones.swimming || zones.swimming.length === 0) && bio.css) {
                        zones.swimming = calculateSwimZones(bio.css);
                    }

                    reset({
                        biometrics: bio,
                        trainingZones: zones,
                        seasonGoals: data.seasonGoals || []
                    });
                    setAthleteName(data.athlete ? `${data.athlete.firstname} ${data.athlete.lastname}` : 'Athlete');
                    setAthleteImage(data.athlete?.profile || null);

                    const calculatedHR = calculateKarvonenZones(bio.maxHR, bio.restingHR);
                    const calculatedCycling = calculateCogganZones(bio.ftp);
                    const calculatedSwim = calculateSwimZones(bio.css);

                    setOverrides({
                        hr: zones.hr && zones.hr.length > 0 && JSON.stringify(zones.hr) !== JSON.stringify(calculatedHR),
                        cycling: zones.cycling && zones.cycling.length > 0 && JSON.stringify(zones.cycling) !== JSON.stringify(calculatedCycling),
                        swimming: zones.swimming && zones.swimming.length > 0 && JSON.stringify(zones.swimming) !== JSON.stringify(calculatedSwim),
                        running: false // No default calculation for running yet
                    });
                }
            } catch (err) {
                console.error('Failed to fetch profile', err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [reset]);

    const handleBiometricChange = useCallback((field: keyof Biometrics, value: string) => {
        setValue(`biometrics.${field}` as any, value, { shouldValidate: true });

        // Auto-calculate zones if not overridden
        const currentBio = { ...biometrics, [field]: value };

        if ((field === 'maxHR' || field === 'restingHR') && !overrides.hr) {
            const newZones = calculateKarvonenZones(Number(currentBio.maxHR), Number(currentBio.restingHR));
            if (newZones.length > 0) setValue('trainingZones.hr', newZones);
        }
        if (field === 'ftp' && !overrides.cycling) {
            const newZones = calculateCogganZones(Number(currentBio.ftp));
            if (newZones.length > 0) setValue('trainingZones.cycling', newZones);
        }
        if (field === 'css' && !overrides.swimming) {
            const newZones = calculateSwimZones(currentBio.css as string);
            if (newZones.length > 0) setValue('trainingZones.swimming', newZones);
        }
    }, [biometrics, overrides, setValue]);

    const handleZoneChange = (type: keyof TrainingZones, index: number, field: string, value: string) => {
        const newZones = [...(trainingZones?.[type] || [])];
        newZones[index] = { ...newZones[index], [field]: value };
        setValue(`trainingZones.${type}` as any, newZones);
        if (!overrides[type]) setOverrides(prev => ({ ...prev, [type]: true }));
    };

    const resetZones = (type: keyof TrainingZones) => {
        const bio = biometrics;
        let calculated: Zone[] = [];
        if (type === 'hr') calculated = calculateKarvonenZones(Number(bio.maxHR), Number(bio.restingHR));
        if (type === 'cycling') calculated = calculateCogganZones(Number(bio.ftp));
        if (type === 'swimming') calculated = calculateSwimZones(bio.css as string);

        setValue(`trainingZones.${type}` as any, calculated);
        setOverrides(prev => ({ ...prev, [type]: false }));
    };

    const handleSave = async (data: ProfileFormData) => {
        setSaving(true);
        try {
            const res = await fetch('/api/athlete/profile', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (res.ok) {
                const updated = await res.json();
                setOriginalData(updated);
                reset({
                    biometrics: updated.biometrics,
                    trainingZones: updated.trainingZones,
                    seasonGoals: updated.seasonGoals
                });
                setIsEditing(false);
            }
        } catch (err) {
            console.error('Failed to save profile', err);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-[50vh]">
            <div className="flex flex-col items-center gap-4 text-slate-400">
                <div className="w-8 h-8 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
                <p>Loading profile...</p>
            </div>
        </div>
    );

    const seasonGoals = formValues.seasonGoals; // Consolidate all form-derived values here

    return (
        <div className="px-6 py-8 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
            {/* Header with Edit Toggle */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="relative group">
                        <div className="w-32 h-32 rounded-full bg-slate-800 border-4 border-slate-900 flex items-center justify-center text-4xl font-bold overflow-hidden shadow-2xl">
                            {athleteImage ? (
                                <img src={athleteImage} alt={athleteName} className="w-full h-full object-cover" />
                            ) : (
                                <UserIcon className="w-16 h-16 text-slate-600" />
                            )}
                        </div>
                        <button className="absolute bottom-0 right-0 p-2 bg-blue-500 rounded-full border-4 border-slate-950 text-white hover:bg-blue-600 transition-colors shadow-lg">
                            <Camera className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl font-bold text-white mb-1">{athleteName}</h1>
                        <p className="text-slate-400 font-medium mb-4">Athlete Profile • Pro Member</p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-2">
                            <span className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-bold text-slate-300">Triathlon</span>
                            <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-xs font-bold text-indigo-400">{focusLabel}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    {isEditing && (
                        <button
                            onClick={() => {
                                setIsEditing(false);
                                reset({
                                    biometrics: originalData.biometrics || {},
                                    trainingZones: originalData.trainingZones || {},
                                    seasonGoals: originalData.seasonGoals || []
                                });
                            }}
                            className="p-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
                            disabled={saving}
                        >
                            <X className="w-5 h-5" />
                        </button>
                    )}
                    <button
                        onClick={isEditing ? _handleSubmit(handleSave) : () => setIsEditing(true)}
                        disabled={saving || (isEditing && !isValid)}
                        className={cn(
                            "px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg",
                            isEditing
                                ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                                : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                        )}
                    >
                        {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : (isEditing ? <Save className="w-4 h-4" /> : <Briefcase className="w-4 h-4" />)}
                        {isEditing ? 'Save Changes' : 'Edit Profile'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Biometrics */}
                <section className="space-y-4 md:col-span-2">
                    <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <Heart className="w-4 h-4" /> Biometrics
                    </h2>
                    <Card className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        <Controller name="biometrics.weight" control={control} render={({ field }) => <BiometricInput label="Weight (kg)" field={field} editing={isEditing} error={errors.biometrics?.weight} placeholder="70" />} />
                        <Controller name="biometrics.height" control={control} render={({ field }) => <BiometricInput label="Height (cm)" field={field} editing={isEditing} error={errors.biometrics?.height} placeholder="180" />} />
                        <Controller
                            name="biometrics.restingHR"
                            control={control}
                            render={({ field }) => (
                                <BiometricInput
                                    label="Resting HR"
                                    field={{
                                        ...field,
                                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleBiometricChange('restingHR', e.target.value)
                                    }}
                                    editing={isEditing}
                                    error={errors.biometrics?.restingHR}
                                    placeholder="50"
                                />
                            )}
                        />
                        <Controller
                            name="biometrics.maxHR"
                            control={control}
                            render={({ field }) => (
                                <BiometricInput
                                    label="Max HR"
                                    field={{
                                        ...field,
                                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleBiometricChange('maxHR', e.target.value)
                                    }}
                                    editing={isEditing}
                                    error={errors.biometrics?.maxHR}
                                    placeholder="190"
                                />
                            )}
                        />
                        <Controller
                            name="biometrics.ftp"
                            control={control}
                            render={({ field }) => (
                                <BiometricInput
                                    label="FTP (W)"
                                    field={{
                                        ...field,
                                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleBiometricChange('ftp', e.target.value)
                                    }}
                                    editing={isEditing}
                                    error={errors.biometrics?.ftp}
                                    placeholder="250"
                                />
                            )}
                        />
                        <Controller
                            name="biometrics.css"
                            control={control}
                            render={({ field }) => (
                                <BiometricInput
                                    label="CSS (MM:SS)"
                                    field={{
                                        ...field,
                                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleBiometricChange('css', e.target.value)
                                    }}
                                    editing={isEditing}
                                    error={errors.biometrics?.css}
                                    placeholder="01:30"
                                />
                            )}
                        />
                    </Card>
                </section>

                {/* Training Zones */}
                <section className="space-y-6 md:col-span-2">
                    <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <Gauge className="w-4 h-4" /> Training Zones
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* HR Zones */}
                        <ZoneTable
                            title="Heart Rate"
                            zones={trainingZones?.hr || []}
                            type="hr"
                            editing={isEditing}
                            onChange={handleZoneChange}
                            isOverridden={overrides.hr}
                            onReset={() => resetZones('hr')}
                        />

                        {/* Power Zones */}
                        <ZoneTable
                            title="Power (Cycling)"
                            zones={trainingZones?.cycling || []}
                            type="cycling"
                            editing={isEditing}
                            onChange={handleZoneChange}
                            isOverridden={overrides.cycling}
                            onReset={() => resetZones('cycling')}
                        />

                        {/* Swim Zones */}
                        <ZoneTable
                            title="Pace (Swimming)"
                            zones={trainingZones?.swimming || []}
                            type="swimming"
                            editing={isEditing}
                            onChange={handleZoneChange}
                            isOverridden={overrides.swimming}
                            onReset={() => resetZones('swimming')}
                        />

                        {/* Running Zones */}
                        <ZoneTable
                            title="Pace (Running)"
                            zones={trainingZones?.running || []}
                            type="running"
                            editing={isEditing}
                            onChange={handleZoneChange}
                            isOverridden={overrides.running} // Assuming overrides logic might be needed here too
                            onReset={() => resetZones('running')}
                        />
                    </div>
                </section>

                {/* Season Goals */}
                <section className="space-y-4 md:col-span-2">
                    <div className="flex justify-between items-center">
                        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                            <Trophy className="w-4 h-4" /> Season Goals
                        </h2>
                        {isEditing && (
                            <button onClick={() => append({ title: '', date: '', priority: 'B', location: '', distance: '', goalTime: '', estimatedTimeMin: '', estimatedTimeMax: '' })} className="text-xs bg-slate-800 px-3 py-1.5 rounded-lg text-white hover:bg-slate-700 font-bold transition-colors">
                                + Add Event
                            </button>
                        )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {fields.map((field, idx) => (
                            <GoalCard
                                key={field.id}
                                goal={field}
                                index={idx}
                                editing={isEditing}
                                control={control}
                                errors={errors}
                                onDelete={() => remove(idx)}
                                onCalculate={async (idx, distance) => {
                                    setCalculatingIndex(idx);
                                    try {
                                        const res = await fetch('/api/race/predict', {
                                            method: 'POST',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({ raceDistance: distance }),
                                        });
                                        if (res.ok) {
                                            const prediction = await res.json();
                                            setValue(`seasonGoals.${idx}.estimatedTimeMin`, prediction.estimatedTimeMin);
                                            setValue(`seasonGoals.${idx}.estimatedTimeMax`, prediction.estimatedTimeMax);
                                        }
                                    } catch (err) {
                                        console.error('Failed to calculate prediction:', err);
                                    } finally {
                                        setCalculatingIndex(null);
                                    }
                                }}
                                isCalculating={calculatingIndex === idx}
                            />
                        ))}
                    </div>
                    {(seasonGoals?.length === 0) && <Card className="p-8 text-center text-slate-500 italic">No season goals set yet.</Card>}
                </section>

                {/* Account & Security (kept from original) */}
                <section className="space-y-4">
                    <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <Shield className="w-4 h-4" /> Account
                    </h2>
                    <Card className="p-6 space-y-1">
                        <button className="w-full p-3 flex justify-between items-center rounded-xl hover:bg-slate-900 transition-colors text-slate-300">
                            <span className="text-sm font-medium">Privacy Settings</span>
                            <Shield className="w-4 h-4 text-slate-600" />
                        </button>
                        <button className="w-full p-3 flex justify-between items-center rounded-xl hover:bg-slate-900 transition-colors text-slate-300">
                            <span className="text-sm font-medium">Notification Preferences</span>
                            <Bell className="w-4 h-4 text-slate-600" />
                        </button>
                        <button className="w-full p-3 flex justify-between items-center rounded-xl hover:bg-slate-900 transition-colors text-slate-300">
                            <span className="text-sm font-medium">Connected Devices (Garmin/Wahoo)</span>
                            <Briefcase className="w-4 h-4 text-slate-600" />
                        </button>
                    </Card>
                </section>

                {/* Logout Button */}
                <div className="pt-4 md:col-span-2">
                    <button onClick={() => window.location.href = '/api/auth/logout'} className="w-full py-4 bg-slate-900/50 border border-slate-800 rounded-2xl font-bold text-slate-400 hover:text-red-400 hover:bg-slate-900 hover:border-red-500/20 transition-all">
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
}
