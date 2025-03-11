import { toast } from "react-toastify";
import { isApiResponse } from "./isApiResponse";
import { ApiResponse } from "@/types/common/ApiResponse";
import ms from "ms";

/**
 * Parses the API response
 *
 * @param response - The response from the API
 * @returns Nothing, uses the `toast` functionality to render the toasts
 */
export const parseApiResponseMessages = (response: unknown) => {
    try {
        const isValidResponse = isApiResponse(response);
        if (isValidResponse) {
            const { messages } = response as ApiResponse;
            if (messages !== undefined) {
                for (let i = 0; i < messages.length; i++) {
                    const eachMessage = messages[i];
                    const delay = i * ms(".5s");
                    toast(eachMessage.message, {
                        delay,
                        type: eachMessage.type ?? "default",
                        pauseOnHover: false,
                    });
                }
            }
        }
    } catch {
        return;
    }
};
