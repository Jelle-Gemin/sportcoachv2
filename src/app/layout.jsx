import { Inter } from "next/font/google";
import "./globals.css";
import LayoutClient from "./layout-client";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
    title: "TriSync - Sport Coach App",
    description: "Advanced performance tracking for triathletes",
};

export default function RootLayout({ children }) {
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
