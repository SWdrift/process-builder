
/**
 * Token 设置
 */
interface ITokenConfig {
    /** token 前缀 */
    PREFIX: string;
    /** token 后缀 */
    SUFFIX: string;
    /** 消息前缀 */
    MESSAGE_PREFIX: string;
    /** 消息后缀 */
    MESSAGE_SUFFIX: string;
    /** 方法表前缀 */
    METHOD_PREFIX: string;
    /** 方法表后缀 */
    METHOD_SUFFIX: string;
    /** 值表前缀 */
    VALUE_PREFIX: string;
    /** 值表后缀 */
    VALUE_SUFFIX: string;
}

const ZH_CN: ITokenConfig = {
    PREFIX: "asd",
    SUFFIX: "qwe",
    MESSAGE_PREFIX: "message_",
    MESSAGE_SUFFIX: "_string",
    METHOD_PREFIX: "method_",
    METHOD_SUFFIX: "_string",
    VALUE_PREFIX: "value_",
    VALUE_SUFFIX: "_string"
};

export const TOKEN_CONFIG: ITokenConfig = ZH_CN;
