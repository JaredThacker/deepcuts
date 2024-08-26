import { isSignUpPayloadValid } from "@/helpers/api/signup/isSignUpPayloadValid";
import prisma from "@/lib/prismaClient";
import { SignUpPayload } from "@/types/api/dto/SignUpPayload";
import { UserInfo } from "@/types/api/UserInfo";
import { NextRequest, NextResponse } from "next/server";

const signUp = async (
    request: NextRequest,
): Promise<NextResponse<UserInfo>> => {
    const data = await request.json();
    const payload = data as SignUpPayload;
    const isPayloadValid = isSignUpPayloadValid(payload);

    if (isPayloadValid) {
        const addedUser = await prisma.userinfo.create({ data: payload });
        return NextResponse.json(addedUser);
    }

    return NextResponse.json({} as UserInfo, { status: 400 });
};

export { signUp as POST };
