import { headers } from "@/common/constants/headers";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

const logout = async (_request: NextRequest): Promise<NextResponse> => {
    const sessionCookie = cookies().get(headers.SESSION);

    if (sessionCookie !== undefined) {
        cookies().delete(headers.SESSION);
        return new NextResponse("success");
    }

    return new NextResponse("failure");
};

export { logout as POST };
