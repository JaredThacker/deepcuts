/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "i.discogs.com",
            },
            {
                protocol: "https",
                hostname: "wingandaprayer.live",
            },
        ],
    },
};

export default nextConfig;
