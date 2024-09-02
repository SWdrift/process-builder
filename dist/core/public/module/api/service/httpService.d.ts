import { ContentTypeEnum } from '../enum/http';
import { ApiConfig, IHttpService } from '../interface/api';
export type { IHttpService };
export declare class HttpServer implements IHttpService {
    private axiosInstance;
    constructor(config: ApiConfig);
    get<T>(url: string, params?: object): Promise<import('axios').AxiosResponse<T, any>>;
    post<T>(url: string, data?: object, headersType?: string, headers?: Record<string, string>): Promise<import('axios').AxiosResponse<T, any>>;
    patch<T>(url: string, data?: object, headersType?: string, headers?: Record<string, string>): Promise<import('axios').AxiosResponse<T, any>>;
    put<T>(url: string, data?: object, headersType?: ContentTypeEnum, headers?: Record<string, string>): Promise<import('axios').AxiosResponse<T, any>>;
    del<T>(url: string, params?: object): Promise<import('axios').AxiosResponse<T, any>>;
}
