import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface ApiError {
    message: string;
    status: number;
    code?: string;
    data?: unknown;
}

export interface ApiResponse<T = unknown> {
    data: T;
    status: number;
    headers: Record<string, unknown>;
    statusText: string;
}

export interface RequestEndpoint {
    method: string;
    endpoint: string;
    baseUrl?: string;
    version?: string;
}

class ApiClient {
    private client: AxiosInstance;
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.client = axios.create({
            baseURL: baseUrl,
            withCredentials: true,
        });

        this.client.interceptors.response.use(
            (response) => response,
            (error: AxiosError) => {
                const apiError: ApiError = {
                    message: error.message,
                    status: error.response?.status ?? 500,
                    data: error.response?.data,
                };
                return Promise.reject(apiError);
            }
        );
    }

    public async request<T = unknown>(config: AxiosRequestConfig & { endpoint?: string }): Promise<ApiResponse<T>> {
        const { endpoint, ...axiosConfig } = config;
        
        if (endpoint) {
            axiosConfig.url = endpoint;
        }

        const response: AxiosResponse<T> = await this.client.request(axiosConfig);
        return {
            data: response.data,
            status: response.status,
            headers: response.headers,
            statusText: response.statusText,
        };
    }
}

export const createApiClient = (baseUrl: string) => new ApiClient(baseUrl);
