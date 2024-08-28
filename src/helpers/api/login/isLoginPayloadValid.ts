import prisma from "@/lib/prismaClient";
import { LoginPayload } from "@/types/api/dto/LoginPayload";
import { UserInfo } from "@/types/api/UserInfo";

export const isLoginPayloadValid = (payload: LoginPayload) => {
    const { email, password } = payload;

    const isEmailValid = email !== undefined && email.length > 0;
    const isPasswordValid = password !== undefined && password.length > 0;

    return isEmailValid && isPasswordValid;
};
