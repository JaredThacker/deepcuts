import { SignUpFormValues } from "@/modules/Modal/SignUpModal";
import { SignUpPayload } from "@/types/api/dto/SignUpPayload";
import { UserInfo } from "@/types/api/UserInfo";

export const signUp = async (request: SignUpFormValues): Promise<UserInfo> => {
    const { username: name, password, email } = request;
    const signUpRequest = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/user/signup`,
        {
            body: JSON.stringify({
                name,
                password,
                email,
            } as SignUpPayload),
            method: "POST",
        },
    );

    const responseJson = await signUpRequest.json();

    return responseJson as UserInfo;
};
