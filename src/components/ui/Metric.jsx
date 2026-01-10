import React from 'react';

const Metric = ({ label, value, sub }) => (
    <div className="bg-slate-950/50 p-3 rounded-2xl border border-slate-800/50">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter mb-1">{label}</p>
        <p className="text-lg font-bold text-white leading-none">{value}</p>
        <p className="text-[10px] font-medium text-slate-600 mt-1 uppercase">{sub}</p>
    </div>
);

export default Metric;
