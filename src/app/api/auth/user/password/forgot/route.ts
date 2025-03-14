import { updatedTimestamps } from "@/common/constants/timestamps";
import { encryptPassword } from "@/helpers/api/encryptPassword";
import prisma from "@/lib/prismaClient";
import {
    ForgotPasswordFormValues,
    ForgotPasswordProperties,
} from "@/modules/ForgotPassword/ForgotPassword";
import { ApiResponse } from "@/types/common/ApiResponse";
import { NextRequest, NextResponse } from "next/server";

const changePassword = async (
    request: NextRequest,
): Promise<NextResponse<ApiResponse<boolean>>> => {
    try {
        const body: ForgotPasswordFormValues & ForgotPasswordProperties =
            await request.json();

        const { email, password, token } = body;

        const foundUser = await prisma.userinfo.findFirst({ where: { email } });

        if (foundUser === null) {
            return NextResponse.json({ data: false });
        }

        const matchesPasswordToken = foundUser.password_token === token;

        if (!matchesPasswordToken) {
            return NextResponse.json({ data: false });
        }

        const { hash, salt } = encryptPassword(password);

        const updateResult = await prisma.userinfo.update({
            where: { id: foundUser.id },
            data: {
                password_token: null,
                password: hash,
                password_salt: salt,
                ...updatedTimestamps(),
            },
        });

        return NextResponse.json({ data: updateResult !== null });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ data: false });
    }
};

export { changePassword as POST };
