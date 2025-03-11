import { getSession } from "@/helpers/api/session/getSession";
import prisma from "@/lib/prismaClient";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

const confirmChangeEmail = async (
    request: NextRequest,
): Promise<NextResponse> => {
    const session = getSession();

    if (session !== undefined) {
        const queryParams = request.nextUrl.searchParams;

        const token = queryParams.get("token");
        const newEmail = queryParams.get("email");

        const foundUser = await prisma.userinfo.findFirst({
            where: { id: session.data.id },
        });

        if (foundUser !== null && newEmail !== null && token !== null) {
            const { email_token } = foundUser;

            if (email_token !== token) {
                redirect("/");
            }

            await prisma.userinfo.update({
                where: { id: session.data.id },
                data: { email: newEmail, email_token: null },
            });

            // TODO: Add page for authenticating
            redirect("/app/dashboard");
        }

        redirect("/");
    }

    redirect("/");
};

export { confirmChangeEmail as GET };
