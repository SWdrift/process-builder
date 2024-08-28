import axiosInstance from "./axios";
import { RequestMethodEnum , ContentTypeEnum } from "../enum/http";

export const get = <T>(url: string, params?: object) => {
    return axiosInstance<T>({
        url: url,
        method: RequestMethodEnum.GET,
        params: params
    });
};

export const post = <T>(
    url: string,
    data?: object,
    headersType?: string,
    headers?: Record<string, string>
) => {
    return axiosInstance<T>({
        url: url,
        method: RequestMethodEnum.POST,
        data: data,
        headers: {
            "Content-Type": headersType || ContentTypeEnum.JSON,
            ...headers
        }
    });
};

export const patch = <T>(
    url: string,
    data?: object,
    headersType?: string,
    headers?: Record<string, string>
) => {
    return axiosInstance<T>({
        url: url,
        method: RequestMethodEnum.PATCH,
        data: data,
        headers: {
            "Content-Type": headersType || ContentTypeEnum.JSON,
            ...headers
        }
    });
};

export const put = <T>(
    url: string,
    data?: object,
    headersType?: ContentTypeEnum,
    headers?: Record<string, string>
) => {
    return axiosInstance<T>({
        url: url,
        method: RequestMethodEnum.PUT,
        data: data,
        headers: {
            "Content-Type": headersType || ContentTypeEnum.JSON,
            ...headers
        }
    });
};

export const del = <T>(url: string, params?: object) => {
    return axiosInstance<T>({
        url: url,
        method: RequestMethodEnum.DELETE,
        params
    });
};

