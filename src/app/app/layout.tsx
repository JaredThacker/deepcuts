import { getSession } from "@/helpers/api/session/getSession";
import { updateSessionUserData } from "@/helpers/api/session/updateSessionUserData";
import prisma from "@/lib/prismaClient";
import { Navbar } from "@/modules/Navbar/Navbar";
import { Session } from "@/types/api/Session";
import { redirect } from "next/navigation";

export default async function ApplicationLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    let session = getSession();

    if (session.data.oauthToken === undefined) {
        const foundUser = await prisma.userinfo.findFirst({
            select: { oauth_token: true },
            where: { id: session.data.id },
        });

        if (foundUser === null) {
            redirect("/");
        }
        const { oauth_token: oauthToken } = foundUser;

        session = {
            historyId: session.historyId,
            data: { ...session.data, oauthToken },
        } as Session;
    }

    return (
        <>
            <div className="animate-fadeInDown animate-duration-[2000ms] z-[1]">
                <Navbar session={session} />
            </div>

            {children}
        </>
    );
}
