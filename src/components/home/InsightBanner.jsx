import React from 'react';
import { Sparkles } from 'lucide-react';

const InsightBanner = () => {
    return (
        <div className="bg-gradient-to-r from-[#1e293b] to-[#0f172a] border border-slate-700/50 rounded-2xl p-5 flex items-start gap-5 relative overflow-hidden group shadow-lg">
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/5 blur-3xl rounded-full"></div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0 animate-pulse">
                <Sparkles className="w-6 h-6 text-indigo-400" />
            </div>
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-bold text-white">AI Optimization</h3>
                    <span className="px-1.5 py-0.5 rounded bg-indigo-500/20 text-[10px] font-bold text-indigo-400 border border-indigo-500/20">LIVE</span>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">
                    Your HRV is <span className="text-green-400 font-bold">12% above baseline</span> today. I've adapted your Sweet Spot intervals to be 5% more intensive to capitalize on your recovery state.
                </p>
            </div>
        </div>
    );
};

export default InsightBanner;
