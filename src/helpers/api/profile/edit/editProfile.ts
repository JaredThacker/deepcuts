import { ProfileEditFormValues } from "@/modules/Profile/Profile";
import { ApiResponse } from "@/types/common/ApiResponse";

/**
 * CLIENT-SIDE
 * Attempts to edit the user's profile
 *
 * @param request - The edit profile form payload
 * @returns
 */
export const editProfile = async (
    request: Partial<ProfileEditFormValues>,
): Promise<ApiResponse> => {
    const editProfileRequest = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/user/edit`,
        {
            body: JSON.stringify({ ...request }),
            method: "POST",
        },
    );

    const parsedResponse: ApiResponse = await editProfileRequest.json();
    return parsedResponse;
};
