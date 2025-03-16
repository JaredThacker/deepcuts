import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryProvider } from "@/providers/QueryProvider";
import "react-double-range-slider/dist/cjs/index.css";
import { Analytics } from "@vercel/analytics/next";

const quicksand = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "deepcuts.",
    description: "a random record generator powered by Discogs.",
    applicationName: "deepcuts.",
    keywords: [
        "deepcuts",
        "deepcuts.fyi",
        "discogs",
        "random",
        "music discovery",
        "find random",
        "random button discogs",
        "discogs randomizer",
        "release",
        "record",
        "deepcuts.",
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html data-theme="dark" lang="en">
            <head>
                <link rel="icon" href="/icon.ico" sizes="any" />
            </head>
            <body
                className={`${quicksand.className} h-screen w-screen flex flex-col`}
            >
                <QueryProvider>{children}</QueryProvider>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
                <Analytics />
            </body>
        </html>
    );
}
