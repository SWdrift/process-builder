import { EnumLanguage } from "../../../interface/config";

/**
 * Token 设置
 */
export interface ITokenConfig {
    /** 语言 */
    LANGUAGE: EnumLanguage;
    /** 摘要 */
    ABSTRACT: string;
    /** token 前缀：表示处理流程的开始 */
    PREFIX: string;
    /** token 后缀：表示处理流程的结束 */
    SUFFIX: string;
    /** 消息前缀：表示每个任务的消息起始 */
    MESSAGE_PREFIX: string;
    /** 消息后缀：表示每个任务的消息结束 */
    MESSAGE_SUFFIX: string;
    /** 方法表前缀：表示方法的注册起始 */
    METHOD_PREFIX: string;
    /** 方法表后缀：表示方法的注册结束 */
    METHOD_SUFFIX: string;
    /** 值表前缀：表示常量的注册起始 */
    VALUE_PREFIX: string;
    /** 值表后缀：表示常量的注册结束 */
    VALUE_SUFFIX: string;
}
