import React from 'react';
import { Bike, Play, ArrowUpRight, CheckCircle } from 'lucide-react';
import Metric from '../ui/Metric';

const WorkoutCard = () => {
    return (
        <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-end">
                <h2 className="text-lg font-bold flex items-center gap-2">
                    <Bike className="w-5 h-5 text-[#a855f7]" /> Today's Primary Set
                </h2>
            </div>

            <div className="bg-[#0f172a] rounded-[2.5rem] border border-slate-800 overflow-hidden shadow-2xl group transition-all hover:border-slate-700">
                {/* Intensity Profile Visual */}
                <div className="h-40 bg-slate-950 relative border-b border-slate-800/50">
                    <div className="absolute inset-0 p-8 flex justify-between items-start z-10">
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold text-[#a855f7] uppercase tracking-widest">Sweet Spot Intervals</p>
                            <h3 className="text-2xl font-bold">3 x 12m FTP Focus</h3>
                        </div>
                        <div className="text-right">
                            <p className="text-xl font-bold">75 <span className="text-xs font-normal text-slate-500">min</span></p>
                            <p className="text-[10px] font-bold text-slate-500 uppercase">Est. TSS: 68</p>
                        </div>
                    </div>

                    {/* Workout Graph Representation */}
                    <div className="absolute bottom-0 left-0 right-0 h-24 flex items-end justify-between px-8 pb-4 opacity-40">
                        {[15, 20, 25, 30, 85, 85, 40, 85, 85, 40, 85, 85, 30, 20].map((h, i) => (
                            <div key={i} className={`w-full mx-0.5 rounded-t-sm transition-all duration-500 ${h > 80 ? 'bg-[#a855f7]' : 'bg-slate-700'}`} style={{ height: `${h}%` }}></div>
                        ))}
                    </div>
                </div>

                <div className="p-8">
                    <div className="grid grid-cols-3 gap-4 mb-8">
                        <Metric label="Target Power" value="245W" sub="Z3/Z4" />
                        <Metric label="Cadence" value="90" sub="RPM" />
                        <Metric label="Effort" value="7/10" sub="RPE" />
                    </div>

                    <div className="space-y-4 mb-8">
                        <div className="flex items-center gap-4 group/item">
                            <div className="w-10 h-10 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center font-bold text-xs text-slate-500 group-hover/item:border-[#a855f7] transition-colors">1</div>
                            <div className="flex-1">
                                <p className="text-sm font-bold">Warm Up</p>
                                <p className="text-xs text-slate-500">15m ramping from 140W to 190W</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 group/item">
                            <div className="w-10 h-10 rounded-full bg-[#a855f7]/10 border border-[#a855f7]/30 flex items-center justify-center font-bold text-xs text-[#a855f7]">2</div>
                            <div className="flex-1">
                                <p className="text-sm font-bold text-white">Main Set: 3 x 12m Sweet Spot</p>
                                <p className="text-xs text-slate-500">245W @ 90RPM. 4m recovery between sets.</p>
                            </div>
                            <CheckCircle className="text-[#a855f7] w-5 h-5" />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button className="flex-1 bg-white text-slate-950 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors">
                            <Play className="w-4 h-4 fill-current" /> Push to Garmin
                        </button>
                        <button className="p-4 rounded-2xl bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-colors">
                            <ArrowUpRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkoutCard;
