import { Navbar } from "@/modules/Navbar/Navbar";

export default function SupportLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="animate-fadeInDown animate-duration-[2000ms] z-[1]">
                <Navbar />
            </div>

            {children}
        </>
    );
}
