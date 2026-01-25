import { Inter } from "next/font/google";
import "./globals.css";
import LayoutClient from "./layout-client";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
    manifest: "/manifest.json",
    themeColor: "#020617",
};

export const viewport = {
    themeColor: "#020617",
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${inter.variable} font-sans bg-[#020617] text-slate-100 antialiased selection:bg-blue-500/30`}>
                <LayoutClient>
                    {children}
                </LayoutClient>
            </body>
        </html>
    );
}
