import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "standalone",
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com",
            },
            {
                protocol: "https",
                hostname: "github.com",
            },
        ],
    },
    async rewrites() {
        return [
            {
                source: '/about',
                destination: '/',
            },
            {
                source: '/experience',
                destination: '/',
            },
            {
                source: '/projects',
                destination: '/',
            },
            {
                source: '/now',
                destination: '/',
            },
            {
                source: '/contact',
                destination: '/',
            },
            {
                source: '/why-me',
                destination: '/',
            },
        ];
    },
};

export default nextConfig;
