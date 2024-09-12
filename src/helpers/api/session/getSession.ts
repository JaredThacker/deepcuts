import { headers } from "@/common/constants/headers";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decryptJwt } from "./decryptJwt";
import { Session } from "@/types/api/Session";

export const getSession = (): Session => {
    const encryptedSession = cookies().get(headers.SESSION);

    if (encryptedSession === undefined) {
        redirect("/");
    } else {
        return decryptJwt(encryptedSession.value);
    }
};
