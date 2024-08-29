import { encryptPassword } from "@/helpers/api/encryptPassword";
import { isSignUpPayloadValid } from "@/helpers/api/signup/isSignUpPayloadValid";
import prisma from "@/lib/prismaClient";
import { SignUpPayload } from "@/types/api/dto/SignUpPayload";
import { UserInfo } from "@/types/api/UserInfo";
import { NextRequest, NextResponse } from "next/server";

/**
 * Attempts to create a user
 *
 * @param request - Request from the client (front-end, DOM, client, etc)
 * @returns The created user
 */
const signUp = async (
    request: NextRequest,
): Promise<NextResponse<UserInfo>> => {
    /**
     * Parses the request body into JSON
     */
    const data = await request.json();

    /**
     * Typecast the parsed body into a typescript type (which the type is a JSON object with fields and types)
     */
    const payload = data as SignUpPayload;

    /**
     * Check the payload for validity
     */
    const isPayloadValid = isSignUpPayloadValid(payload);

    /**
     * TODO: Make sure user is unique when created, don't want duplicate users, can possibly implement check in front-end, do it in the backend too
     */

    /**
     * If payload is valid, make user
     */
    if (isPayloadValid) {
        /**
         * Get the user from the database where:
         *
         * email = payload.email
         */
        const userAlreadyExists = await prisma.userinfo.findFirst({
            where: { email: payload.email },
        });

        /**
         * If they try signing up with a email that already exists, do not let them
         */
        if (userAlreadyExists) {
            return NextResponse.json({} as UserInfo, { status: 400 });
        }

        const encryptedPasswordInfo = encryptPassword(payload.password);
        const { hash, salt } = encryptedPasswordInfo;

        console.log(hash, salt);

        /**
         * Creates the user, `data` represents the data we are giving the row, like `INSERT INTO blah VALUES (....data)`
         */
        const addedUser = await prisma.userinfo.create({
            data: {
                ...payload,
                password: hash,
                password_salt: salt,
            },
        });

        /**
         * Returns the created user
         */
        return NextResponse.json(addedUser);
    }

    /**
     * Returns an empty object if payload is invalid (giving me wrong stuff)
     */
    return NextResponse.json({} as UserInfo, { status: 400 });
};

export { signUp as POST };
