import prisma from "@/lib/prismaClient";
import { ApiResponse } from "@/types/common/ApiResponse";
import { randomBytes } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
import { ClientEndpoints } from "@/common/constants/ClientEndpoints";

const forgotPassword = async (
    request: NextRequest,
): Promise<NextResponse<ApiResponse<boolean>>> => {
    const queryParams = request.nextUrl.searchParams;

    const email = queryParams.get("email");

    if (email === null) {
        return NextResponse.json({ data: false });
    }

    const foundUser = await prisma.userinfo.findFirst({
        select: { id: true, name: true },
        where: { email },
    });

    if (foundUser === null) {
        return NextResponse.json({ data: false });
    }

    const passwordToken = randomBytes(48).toString("base64");
    const updateResult = await prisma.userinfo.update({
        where: { id: foundUser.id },
        data: { password_token: passwordToken },
    });

    const sendgridApiKey = process.env.SENDGRID_API_KEY;

    if (!Boolean(sendgridApiKey)) {
        return NextResponse.json({ data: false });
    }

    sgMail.setApiKey(sendgridApiKey as string);

    await sgMail.send({
        to: email,
        from: process.env.SENDGRID_FROM_EMAIL ?? "",
        personalizations: [
            {
                dynamicTemplateData: {
                    content: "Click the link below to change your password.",
                    callbackButtonText: "Change Password",
                    callbackUrl: `${process.env.NEXT_PUBLIC_CLIENT_URL}/${
                        ClientEndpoints.USER.FORGOT.BASE
                    }${
                        ClientEndpoints.USER.FORGOT.PASSWORD
                    }?token=${encodeURIComponent(
                        passwordToken,
                    )}&email=${email}`,
                    username: foundUser.name ?? "Deepcuts User",
                },
                to: [{ email }],
            },
        ],
        templateId: "d-103c24054e1949daa092f3ab9e930742",
    });

    return NextResponse.json({ data: updateResult !== null });
};

export { forgotPassword as GET };
