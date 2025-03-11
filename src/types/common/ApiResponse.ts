import type { ApiMessage } from "./ApiMessage";

type ApiResponse<Data = unknown> = {
    data?: Data;
    messages?: ApiMessage[];
};

export { type ApiResponse };
