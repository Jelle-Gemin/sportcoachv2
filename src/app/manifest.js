export default function manifest() {
    return {
        name: "TriSync - Sport Coach App",
        short_name: "TriSync",
        description: "Advanced performance tracking for triathletes",
        start_url: "/",
        display: "standalone",
        background_color: "#020617",
        theme_color: "#020617",
        icons: [
            {
                src: "/trisync_192x192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/trisync_512x512.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
    };
}
