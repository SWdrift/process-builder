import { ContentTypeEnum } from '../enum/http';
export declare const get: <T>(url: string, params?: object) => Promise<import('axios').AxiosResponse<T, any>>;
export declare const post: <T>(url: string, data?: object, headersType?: string, headers?: Record<string, string>) => Promise<import('axios').AxiosResponse<T, any>>;
export declare const patch: <T>(url: string, data?: object, headersType?: string, headers?: Record<string, string>) => Promise<import('axios').AxiosResponse<T, any>>;
export declare const put: <T>(url: string, data?: object, headersType?: ContentTypeEnum, headers?: Record<string, string>) => Promise<import('axios').AxiosResponse<T, any>>;
export declare const del: <T>(url: string, params?: object) => Promise<import('axios').AxiosResponse<T, any>>;
