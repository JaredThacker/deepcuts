import prisma from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";
import { UserInfo } from "@/types/api/UserInfo";
import { LoginPayload } from "@/types/api/dto/LoginPayload";
import { isLoginPayloadValid } from "@/helpers/api/login/isLoginPayloadValid";
import { validatePassword } from "@/helpers/api/validatePassword";
import { cookies } from "next/headers";
import { headers } from "@/common/constants/headers";
import { createJwt } from "@/helpers/api/session/createJwt";
import { creationTimestamps } from "@/common/constants/timestamps";

/**
 * Attempts to "log" the user in, just does credentials check
 *
 * @param request - Request from the client (website, DOM, front-end)
 * @returns Whether the payload matched a user
 */
const login = async (request: NextRequest): Promise<NextResponse<UserInfo>> => {
    /**
     * Parse request (which contains a BODY which has JSON data in it, but is a string, into a JSON object)
     */
    const data = await request.json();

    /**
     * Typecast json (`data`) to LoginPayload
     */
    const payload = data as LoginPayload;

    /**
     * We check if the login payload is valid (did you send me proper json data (username, password, etc))
     */
    const isPayloadValid = isLoginPayloadValid(payload);

    /**
     * If the data you sent is valid, proceed with user lookup
     */
    if (isPayloadValid) {
        /**
         * Find the first user in the database, where:
         *
         * `email` = `payload.email`
         */
        const foundUser = await prisma.userinfo.findFirst({
            where: { email: payload.email },
        });

        /**
         * If the user is found, check passwords (from the record we just obtained in the `findFirst` above)
         */
        if (foundUser !== null) {
            /**
             * Do passwords match
             */
            const isPasswordValid = validatePassword(
                payload.password,
                foundUser.password_salt,
                foundUser.password,
            );

            if (isPasswordValid) {
                const history = await prisma.history.create({
                    data: { userid: foundUser.id, ...creationTimestamps() },
                });

                const { token, expiration } = createJwt(
                    {
                        apiToken: foundUser.api_token ?? undefined,
                        id: foundUser.id,
                    },
                    history.id,
                );

                cookies().set(headers.SESSION, token, { maxAge: expiration });

                /**
                 * If passwords match, return user data
                 */
                return NextResponse.json(foundUser);
            }
        }
    }

    /**
     * Return 400 (bad request) and empty data
     */
    return NextResponse.json({} as UserInfo, { status: 400 });
};

export { login as POST };
