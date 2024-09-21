import { Navbar } from "@/modules/Navbar/Navbar";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="animate-fadeInDown animate-duration-[2000ms]">
                <Navbar />
            </div>

            {children}
        </>
    );
}
