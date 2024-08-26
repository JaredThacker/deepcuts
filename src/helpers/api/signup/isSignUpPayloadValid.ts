import { SignUpPayload } from "@/types/api/dto/SignUpPayload";
import { UserInfo } from "@/types/api/UserInfo";

export const isSignUpPayloadValid = (payload: SignUpPayload) => {
    const isEmailValid =
        payload.email !== undefined && payload.email.length > 0;
    const isPasswordValid =
        payload.password !== undefined && payload.password.length > 0;
    const isUsernameValid =
        payload.name !== undefined && payload.name.length > 0;

    return isEmailValid && isPasswordValid && isUsernameValid;
};
