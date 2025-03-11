type ApiMessage = {
    message: string;
    success: boolean;
};

export type ApiResponse<Data = unknown> = {
    data?: Data;
    successMessage?: string;
    errorMessage?: string;
};
