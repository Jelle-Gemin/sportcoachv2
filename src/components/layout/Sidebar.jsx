"use client";

import React from 'react';
import { Home, Calendar, BarChart2, User, Activity, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '../../lib/utils';
import { user } from '../../data/mockData';

const NavItem = ({ icon, label, to }) => {
    const pathname = usePathname();
    const isActive = pathname === to || (to !== '/' && pathname.startsWith(to));

    return (
        <Link
            href={to}
            className={cn(
                "flex md:w-full flex-col md:flex-row items-center md:gap-3 p-2 md:px-4 md:py-3 rounded-2xl transition-all duration-200",
                isActive
                    ? 'text-[#3b82f6] md:bg-[#3b82f6]/10'
                    : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/30'
            )}
        >
            {React.cloneElement(icon, {
                className: cn("w-6 h-6 md:w-5 md:h-5", isActive ? 'stroke-[2.5px]' : 'stroke-[1.5px]')
            })}
            <span className={cn("text-[10px] md:text-sm font-bold mt-1 md:mt-0", isActive ? 'opacity-100' : 'opacity-70')}>
                {label}
            </span>
        </Link>
    );
};

const Sidebar = () => {
    return (
        <aside className="fixed bottom-0 w-full md:w-64 md:h-full md:left-0 bg-[#0f172a] border-t md:border-t-0 md:border-r border-slate-800 z-50 flex md:flex-col justify-between items-center md:items-start p-2 md:p-6">
            <div className="hidden md:flex items-center gap-3 mb-10 px-2">
                <div className="w-8 h-8 bg-[#3b82f6] rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <Activity className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl tracking-tight text-white">TriSync</span>
            </div>

            <nav className="flex md:flex-col justify-around w-full md:space-y-2">
                <NavItem icon={<Home />} label="Home" to="/" />
                <NavItem icon={<Calendar />} label="Plan" to="/plan" />
                <NavItem icon={<BarChart2 />} label="Analytics" to="/analytics" />
                <NavItem icon={<User />} label="Profile" to="/profile" />
            </nav>

            <div className="hidden md:block mt-auto w-full">
                <div className="p-4 bg-slate-950/50 rounded-2xl border border-slate-800 mb-6">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">A-Race Countdown</p>
                    <p className="text-lg font-bold text-white">{user.daysLeft} <span className="text-xs font-normal text-slate-400 tracking-normal">Days to Mallorca</span></p>
                </div>
                <div className="flex items-center gap-3 px-2">
                    <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-bold text-white">AL</div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-xs font-bold truncate text-white">Alex L.</p>
                        <p className="text-[10px] text-blue-400">Pro Plan</p>
                    </div>
                    <Settings className="w-4 h-4 text-slate-500 cursor-pointer hover:text-white transition-colors" />
                    <a href="/api/auth/logout" title="Logout">
                        <LogOut className="w-4 h-4 text-slate-500 cursor-pointer hover:text-red-400 transition-colors ml-1" />
                    </a>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
