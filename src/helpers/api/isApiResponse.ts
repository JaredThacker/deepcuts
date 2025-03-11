import { ApiResponse } from "@/types/common/ApiResponse";

export const isApiResponse = (response: unknown): boolean => {
    try {
        const { data, messages } = response as ApiResponse;
        return data !== undefined || messages !== undefined;
    } catch {
        return false;
    }
};
