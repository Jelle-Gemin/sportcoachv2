/** @type {import('next').NextConfig} */
import withPWA from "next-pwa";

const nextConfig = {
    reactStrictMode: true,

    /*
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: "http://localhost:5000/api/:path*",
            },
        ];
    },
    */
};

export default withPWA({
    dest: "public",
    disable: process.env.NODE_ENV === "development",
})(nextConfig);
