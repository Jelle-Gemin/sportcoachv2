"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";

export default function LayoutClient({ children }) {
    // Register service worker for PWA
    useEffect(() => {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker
                .register("/sw.js")
                .then((registration) => {
                    console.log("SW registered:", registration.scope);
                })
                .catch((error) => {
                    console.log("SW registration failed:", error);
                });
        }
    }, []);

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
