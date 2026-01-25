"use client";

import React from 'react';
import { Activity, Zap, TrendingUp, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#020617]">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-10000 hover:scale-110"
                style={{ backgroundImage: "url('/login-bg.png')" }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-[#020617]/90 via-[#020617]/70 to-[#020617]/90" />
            </div>

            {/* Glowing Orbs */}
            <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-orange-600/10 rounded-full blur-[120px] animate-pulse delay-700" />

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-lg px-6">
                <div className="text-center mb-10 space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 mb-4 backdrop-blur-sm">
                        <Activity className="w-8 h-8 text-blue-500" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                        TriSync <span className="text-blue-500">Pro</span>
                    </h1>
                    <p className="text-slate-400 text-lg max-w-sm mx-auto">
                        Elevate your performance with AI-driven insights and elite-level tracking.
                    </p>
                </div>

                {/* Login Card */}
                <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 md:p-10 shadow-2xl relative group overflow-hidden">
                    {/* Animated Border */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/30 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />

                    <div className="space-y-8 relative">
                        <div className="grid grid-cols-1 gap-4">
                            <FeatureItem
                                icon={<Zap className="w-5 h-5 text-orange-400" />}
                                title="Instant Sync"
                                description="Your activities synced directly from Strava."
                            />
                            <FeatureItem
                                icon={<TrendingUp className="w-5 h-5 text-blue-400" />}
                                title="AI Analytics"
                                description="Deep insights into your training metrics."
                            />
                            <FeatureItem
                                icon={<ShieldCheck className="w-5 h-5 text-green-400" />}
                                title="Secure Data"
                                description="Your performance data is safe with us."
                            />
                        </div>

                        <div className="pt-4">
                            <a
                                href="/api/auth/strava"
                                className="group relative w-full flex items-center justify-center gap-3 px-8 py-4 bg-[#fc4c02] hover:bg-[#e34402] text-white font-bold rounded-2xl transition-all duration-300 shadow-lg shadow-orange-900/20 active:scale-[0.98]"
                            >
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Strava_Logo.svg"
                                    alt="Strava"
                                    className="w-6 h-6 invert brightness-0"
                                />
                                <span>Connect with Strava</span>
                                <div className="absolute inset-0 rounded-2xl ring-2 ring-orange-500/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                        </div>
                    </div>
                </div>

                <p className="text-center mt-8 text-slate-500 text-sm">
                    By connecting, you agree to our Terms of Service.
                </p>
            </div>
        </div>
    );
}

interface FeatureItemProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

function FeatureItem({ icon, title, description }: FeatureItemProps) {
    return (
        <div className="flex gap-4 p-3 rounded-2xl hover:bg-white/5 transition-colors">
            <div className="flex-shrink-0 mt-1">
                {icon}
            </div>
            <div>
                <h3 className="text-slate-100 font-semibold">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
            </div>
        </div>
    );
}
