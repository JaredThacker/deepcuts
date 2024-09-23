import { Navbar } from "@/modules/Navbar/Navbar";

export default function RandomLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="z-[1]">
                <Navbar />
            </div>
            {children}
        </>
    );
}
