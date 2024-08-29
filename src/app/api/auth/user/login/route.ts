import prisma from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";
import { UserInfo } from "@/types/api/UserInfo";
import { LoginPayload } from "@/types/api/dto/LoginPayload";
import { isLoginPayloadValid } from "@/helpers/api/login/isLoginPayloadValid";

const login = async (request: NextRequest): Promise<NextResponse<UserInfo>> => {
    const data = await request.json();
    const payload = data as LoginPayload;
    const isPayloadValid = isLoginPayloadValid(payload);

    if (isPayloadValid) {
        const foundUser = await prisma.userinfo.findFirst({
            where: { email: payload.email },
        });

        if (foundUser !== null) {
            const isPasswordValid = foundUser.password === payload.password;

            if (isPasswordValid) {
                return NextResponse.json(foundUser);
            }
        }
    }

    return NextResponse.json({} as UserInfo, { status: 400 });
};

export { login as POST };
