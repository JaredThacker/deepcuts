import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/modules/Navbar/Navbar";

const quicksand = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "deepcuts.",
    description: "a discogs random release generator",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html data-theme="dark" lang="en">
            <body className={`${quicksand.className} h-screen w-screen`}>
                {children}
            </body>
        </html>
    );
}
