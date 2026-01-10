"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";

export default function LayoutClient({ children }) {
    const pathname = usePathname();
    const isLoginPage = pathname === "/login";

    return (
        <div className="min-h-screen">
            {!isLoginPage && <Sidebar />}
            <main className={!isLoginPage ? "pb-24 md:pb-8 md:pl-64 min-h-screen" : "min-h-screen"}>
                {children}
            </main>
        </div>
    );
}
