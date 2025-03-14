import { ClientEndpoints } from "@/common/constants/ClientEndpoints";
import { ForgotPasswordModalFormValues } from "@/modules/Modal/ForgotPasswordModal";
import { ApiResponse } from "@/types/common/ApiResponse";

export const forgotPassword = async (
    request: ForgotPasswordModalFormValues,
): Promise<boolean> => {
    const { email } = request;

    const forgotPasswordRequest = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/${ClientEndpoints.USER.BASE}${ClientEndpoints.USER.FORGOT.BASE}${ClientEndpoints.USER.FORGOT.PASSWORD}?email=${email}`,
    );

    const json: ApiResponse<boolean> = await forgotPasswordRequest.json();

    const { data } = json;

    return data ?? false;
};
