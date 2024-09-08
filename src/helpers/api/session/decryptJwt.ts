import { Session } from "@/types/api/Session";
import { verify } from "jsonwebtoken";

export const decryptJwt = (jwt: string): Session => {
    const jwtKey = process.env.JWT_KEY ?? "";

    const decoded = verify(jwt, jwtKey);

    return decoded as Session;
};
