import { headers } from "@/common/constants/headers";
import { encryptPassword } from "@/helpers/api/encryptPassword";
import { createJwt } from "@/helpers/api/session/createJwt";
import { getSession } from "@/helpers/api/session/getSession";
import { validatePassword } from "@/helpers/api/validatePassword";
import prisma from "@/lib/prismaClient";
import { ProfileEditFormValues } from "@/modules/Profile/Profile";
import { UserInfo } from "@/types/api/UserInfo";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
import { ApiResponse } from "@/types/common/ApiResponse";
import { ApiMessage } from "@/types/common/ApiMessage";
import { ClientEndpoints } from "@/common/constants/ClientEndpoints";
import { randomBytes } from "node:crypto";

const editUser = async (
    request: NextRequest,
): Promise<NextResponse<ApiResponse>> => {
    const session = getSession();

    const foundUser = await prisma.userinfo.findFirst({
        where: { id: session.data.id },
    });

    if (foundUser === null) {
        return NextResponse.json(
            {
                messages: [
                    {
                        message: "Could not find user, please re-login.",
                        type: "error",
                    },
                ],
            },
            { status: 400 },
        );
    }

    const payload: Partial<ProfileEditFormValues> = await request.json();

    const { apiToken, email, oldPassword, newPassword, ...rest } = payload;
    const messages: ApiMessage[] = [];

    if (oldPassword !== undefined) {
        const doPasswordsMatch = validatePassword(
            oldPassword,
            foundUser.password_salt,
            foundUser.password,
        );

        if (!doPasswordsMatch) {
            return NextResponse.json(
                {
                    messages: [
                        {
                            message:
                                "Old Password is invalid, please try again.",
                            type: "error",
                        },
                    ],
                },
                { status: 400 },
            );
        }
    }

    if (apiToken !== undefined) {
        const { token, expiration } = createJwt(
            {
                apiToken: apiToken ?? foundUser.api_token ?? undefined,
                id: foundUser.id,
                oauthToken: foundUser.oauth_token ?? undefined,
            },
            session.historyId,
        );

        cookies().set(headers.SESSION, token, { maxAge: expiration });
    }

    const updatePayload = {
        ...rest,
    } as Partial<UserInfo>;

    if (newPassword !== undefined) {
        const encryptedPassword = encryptPassword(newPassword as string);
        const { hash, salt } = encryptedPassword;
        updatePayload.password = hash;
        updatePayload.password_salt = salt;
    }

    if (email !== undefined && process.env.SENDGRID_API_KEY !== undefined) {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        if (process.env.SENDGRID_FROM_EMAIL !== undefined) {
            const emailConfirmationToken = randomBytes(48).toString("base64");
            await sgMail.send({
                to: email,
                from: process.env.SENDGRID_FROM_EMAIL,
                personalizations: [
                    {
                        dynamicTemplateData: {
                            content: "",
                            callbackButtonText: "Confirm Email",
                            callbackUrl: `${process.env.NEXT_PUBLIC_API_URL}/${ClientEndpoints.AUTH.BASE}${ClientEndpoints.AUTH.USER.BASE}${ClientEndpoints.AUTH.USER.EMAIL.BASE}${ClientEndpoints.AUTH.USER.EMAIL.CONFIRM}?token=${emailConfirmationToken}&email=${email}`,
                            username: rest.name ?? foundUser.name,
                        },
                        to: [{ email }],
                    },
                ],
                templateId: "d-103c24054e1949daa092f3ab9e930742",
            });

            messages.push({
                message: "Sent verification email.",
                type: "info",
            });
            updatePayload.emailToken = emailConfirmationToken;
        }
    }

    const { emailToken, ...updatePayloadRest } = updatePayload;

    await prisma.userinfo.update({
        where: { id: session.data.id },
        data: { ...updatePayloadRest, email_token: emailToken },
    });

    messages.push({
        message: "Profile Information updated successfully!",
        type: "success",
    });

    return NextResponse.json({ messages });
};

export { editUser as POST };
