import { Session, SessionUserInfo } from "@/types/api/Session";
import { getSession } from "./getSession";
import { cookies } from "next/headers";
import { headers } from "@/common/constants/headers";
import { createJwt } from "./createJwt";

/**
 * Updates the session user data
 *
 * @param payload - The partial session user information to update
 */
export const updateSessionUserData = (
    payload: Partial<SessionUserInfo>,
): void => {
    const session = getSession();

    const updatedSession = {
        historyId: session.historyId,
        data: { ...session.data, ...payload },
    } as Session;
    const { token, expiration } = createJwt(
        updatedSession.data,
        session.historyId,
    );

    cookies().set(headers.SESSION, token, { maxAge: expiration });
};
