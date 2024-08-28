import { UserInfo } from "@/types/api/UserInfo";
import { LoginPayload } from "@/types/api/dto/LoginPayload";
import { LoginFormValues } from "@/modules/Modal/LoginModal";

export const login = async (request: LoginFormValues): Promise<UserInfo> => {
    const { email, password } = request;
    const loginRequest = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/user/login`,
        {
            body: JSON.stringify({
                email,
                password,
            } as LoginPayload),
            method: "GET",
        },
    );

    const responseJson = await loginRequest.json();

    return responseJson as UserInfo;
};
