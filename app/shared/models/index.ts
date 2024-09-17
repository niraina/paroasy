export type DataModel<T, P> = {
    data?: any;
    response: T;
    request: P;
    isLoading: boolean;
    error: any | string;
};