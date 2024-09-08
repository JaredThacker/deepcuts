import { Session } from "@/types/api/Session";
import { sign } from "jsonwebtoken";
import ms from "ms";

type TokenReturn = {
    expiration: number;
    token: string;
};

export const createJwt = (encryptedSession: string): TokenReturn => {
    const jwtKey = process.env.JWT_KEY ?? "";
    const expiration = ms("6 hr") / 1000;

    const token = sign({ data: encryptedSession } as Session, jwtKey, {
        expiresIn: expiration,
    });

    return { token, expiration };
};
