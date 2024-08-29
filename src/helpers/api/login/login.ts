import { UserInfo } from "@/types/api/UserInfo";
import { LoginPayload } from "@/types/api/dto/LoginPayload";
import { LoginFormValues } from "@/modules/Modal/LoginModal";

/**
 * Attempts to log the user in given the form field data
 *
 * @param request - The request from the FORM, which was created in the modal, accessing those FORM values and sending them in a request to the server
 * @returns Whether the user logged in successfully or not
 */
export const login = async (request: LoginFormValues): Promise<boolean> => {
    /**
     * De-structures the JSON
     */
    const { email, password } = request;

    /**
     * Sends the request to the client with the de-structured json data
     */
    const loginRequest = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/user/login`,
        {
            body: JSON.stringify({
                email,
                password,
            } as LoginPayload),
            method: "POST",
        },
    );

    /**
     * Parse the request response (which contains a BODY (stringified json)) into JSON
     */
    const json = await loginRequest.json();

    /**
     * Typecast json to typescript type
     */
    const mappedJson = json as UserInfo;

    /**
     * Grab the id field from the response, if it does not exist (which it doesn't if it's a 400 response)
     */
    const { id } = mappedJson;

    /**
     * If the id field exists, then we returned user info, which means it wasn't a 400, otherwise, we did not log in successfully
     */
    return id !== undefined;
};
