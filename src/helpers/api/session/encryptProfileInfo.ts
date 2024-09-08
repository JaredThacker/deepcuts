import { Session } from "@/types/api/Session";
import { UserInfo } from "@/types/api/UserInfo";

export const encryptProfileInfo = (email: string): string => {
    const session: Pick<UserInfo, "email"> = { email };
    const xorKey = process.env.XOR_KEY ?? "";

    const xorredSession = JSON.stringify(session)
        .split("")
        .map(
            (eachCharacter, index) =>
                eachCharacter.charCodeAt(0) ^ xorKey.charCodeAt(index),
        )
        .map((encryptedChar) => String.fromCharCode(encryptedChar))
        .join("");

    return xorredSession;
};
