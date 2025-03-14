import { ClientEndpoints } from "@/common/constants/ClientEndpoints";
import {
    ForgotPasswordFormValues,
    ForgotPasswordProperties,
} from "@/modules/ForgotPassword/ForgotPassword";
import { ApiResponse } from "@/types/common/ApiResponse";

export const changePassword = async (
    values: ForgotPasswordFormValues & ForgotPasswordProperties,
): Promise<ApiResponse<boolean>> => {
    const { password, email, token } = values;

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/${ClientEndpoints.AUTH.BASE}${ClientEndpoints.AUTH.USER.BASE}${ClientEndpoints.AUTH.USER.PASSWORD.BASE}${ClientEndpoints.AUTH.USER.PASSWORD.FORGOT}`,
        {
            body: JSON.stringify({
                password,
                email,
                token,
            }),
            method: "POST",
        },
    );

    const apiResponse: ApiResponse<boolean> = await response.json();

    return apiResponse;
};
