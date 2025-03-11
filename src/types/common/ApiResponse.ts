export type ApiResponse<Data = unknown> = {
    data?: Data;
    errorMessage?: string;
    successMessage?: string;
};
