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

const editUser = async (request: NextRequest): Promise<NextResponse> => {
    const session = await getSession();

    const foundUser = await prisma.userinfo.findFirst({
        where: { id: session.data.id },
    });

    if (foundUser === null) {
        return NextResponse.json({
            errorMessage: "Could not find user, please re-login.",
        });
    }

    const payload: Partial<ProfileEditFormValues> = await request.json();

    const { apiToken, email, oldPassword, newPassword, ...rest } = payload;

    if (oldPassword !== undefined) {
        const doPasswordsMatch = validatePassword(
            oldPassword,
            foundUser.password_salt,
            foundUser.password,
        );

        if (!doPasswordsMatch) {
            return NextResponse.json({
                errorMessage: "Old Password is invalid, try again.",
            });
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
            sgMail.send({
                to: email,
                from: process.env.SENDGRID_FROM_EMAIL,
                personalizations: [
                    {
                        dynamicTemplateData: {
                            content: "",
                            callbackButtonText: "",
                            callbackUrl: "",
                            username: rest.name,
                        },
                        to: [{ email }],
                    },
                ],
                templateId: "d-103c24054e1949daa092f3ab9e930742",
            });
        }
    }

    const updatedUser = await prisma.userinfo.update({
        where: { id: session.data.id },
        data: { ...updatePayload },
    });

    const didUpdateWork = updatedUser !== null;

    return didUpdateWork
        ? NextResponse.json({ successMessage: "Updated profile successfully!" })
        : NextResponse.json({ errorMessage: "Failed to update user" });
};

export { editUser as POST };
