import { getSession } from "@/helpers/api/session/getSession";
import { Navbar } from "@/modules/Navbar/Navbar";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = getSession();

    return (
        <>
            <div className="animate-fadeInDown animate-duration-[2000ms] z-[1]">
                <Navbar />
            </div>

            {children}
        </>
    );
}
