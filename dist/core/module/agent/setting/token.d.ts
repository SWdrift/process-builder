/**
 * Token 设置
 */
interface ITokenConfig {
    /** 人设（如果有） */
    SYSTEM: string;
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
export declare const TOKEN_CONFIG: ITokenConfig;
export {};
