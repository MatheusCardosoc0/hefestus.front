export type ApiError = {
    response?: {
        data?: any;
        status?: number;
        headers?: any;
    };
    request?: any;
    message: string;
}