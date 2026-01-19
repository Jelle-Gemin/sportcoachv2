import React from 'react';

const ScoreBar = ({ label, percent, color }) => (
    <div className="space-y-1.5">
        <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
            <span className="text-slate-400">{label}</span>
            <span className="text-white">{percent}%</span>
        </div>
        <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800/50">
            <div className={`h-full rounded-full ${color}`} style={{ width: `${percent}%` }}></div>
        </div>
    </div>
);

const ExecutionScore = () => {
    return (
        <div className="space-y-4">
            <h2 className="text-lg font-bold">Latest Analysis</h2>

            <div className="bg-[#0f172a] p-5 md:p-6 rounded-[2.5rem] border border-slate-800">
                <div className="flex flex-wrap justify-between items-start mb-6 gap-2">
                    <div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Yesterday • Run</p>
                        <h3 className="font-bold">Threshold 400s</h3>
                    </div>
                    <div className="text-right">
                        <span className="text-3xl font-mono font-bold text-[#22c55e]">92</span>
                        <p className="text-[10px] font-bold text-slate-500">SCORE</p>
                    </div>
                </div>

                <div className="space-y-5">
                    <ScoreBar label="Pace Adherence" percent={96} color="bg-[#22c55e]" />
                    <ScoreBar label="Intensity (HR)" percent={84} color="bg-[#eab308]" />
                    <ScoreBar label="Consistency" percent={91} color="bg-[#22c55e]" />
                </div>

                <div className="mt-8 p-4 bg-slate-950 rounded-2xl border border-slate-800 text-[11px] leading-relaxed text-slate-400">
                    <p><span className="text-white font-bold">Execution Insight:</span> You held pace perfectly during intervals 4-8. Early HR spikes suggest a longer warm-up may be needed for tomorrow's set.</p>
                </div>
            </div>
            {/* Progress Summary */}
            <div className="bg-[#0f172a] p-5 md:p-6 rounded-[2.5rem] border border-slate-800">
                <h4 className="text-xs font-bold text-slate-500 uppercase mb-4">Training Load</h4>
                <div className="flex items-end gap-2 h-20 mb-2">
                    {[30, 45, 60, 40, 75, 90, 65].map((h, i) => (
                        <div key={i} className={`flex-1 rounded-t-md ${i === 5 ? 'bg-[#3b82f6]' : 'bg-slate-800'}`} style={{ height: `${h}%` }}></div>
                    ))}
                </div>
                <div className="flex justify-between text-[10px] font-bold text-slate-500">
                    <span>MON</span>
                    <span className="text-blue-400">TODAY</span>
                    <span>SUN</span>
                </div>
            </div>
        </div>
    );
};

export default ExecutionScore;
