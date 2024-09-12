import { Session } from "@/types/api/Session";
import { UserInfo } from "@/types/api/UserInfo";
import { sign } from "jsonwebtoken";
import ms from "ms";

type TokenReturn = {
    expiration: number;
    token: string;
};

export const createJwt = (
    userInfo: Pick<UserInfo, "id">,
    historyId: number,
): TokenReturn => {
    const jwtKey = process.env.JWT_KEY ?? "";
    const expiration = ms("6 hr") / 1000;

    const token = sign({ data: userInfo, historyId } as Session, jwtKey, {
        expiresIn: expiration,
    });

    return { token, expiration };
};
