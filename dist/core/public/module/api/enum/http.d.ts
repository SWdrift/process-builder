export declare enum ResultEnum {
    DATA_SUCCESS = 0,
    SUCCESS = 200,
    SERVER_ERROR = 500,
    SERVER_FORBIDDEN = 403,
    NOT_FOUND = 404,
    TOKEN_OVERDUE = 886,
    TIMEOUT = 60000
}
export declare enum RequestMethodEnum {
    GET = "get",
    POST = "post",
    PATCH = "patch",
    PUT = "put",
    DELETE = "delete"
}
export declare enum ContentTypeEnum {
    JSON = "application/json;charset=UTF-8",
    TEXT = "text/plain;charset=UTF-8",
    XML = "application/xml;charset=UTF-8",
    FORM_URLENCODED = "application/x-www-form-urlencoded;charset=UTF-8",
    FORM_DATA = "multipart/form-data;charset=UTF-8",
    BINARY = "application/octet-stream;charset=UTF-8"
}
export declare enum RequestErrorEnum {
    NETWORK = "ERR_NETWORK",
    TIMEOUT = "ERR_TIMEOUT",
    UNKNOWN = "ERR_UNKNOWN"
}
