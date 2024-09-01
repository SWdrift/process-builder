/**
 * 流程对话接口
 */
export interface IChat {
    sessionHistory: IEntSession[];
    /**
     * 发送消息
     * @param request 消息请求
     * @returns 消息响应
     */
    send(text: string): Promise<IEntSession>;
}
export interface IEntMessage {
    /** 消息 id */
    id: string;
    /** 消息载荷 */
    data: string;
    /** 时间戳 */
    timestamp: number;
    /** 是流程请求 */
    isProcess?: boolean | undefined;
    /** 是发生错误 */
    isError?: boolean | undefined;
    /** 其他属性 */
    property?: {
        [key: string]: any;
    };
}
export interface IEntSession {
    /** 时间戳 */
    timestamp: number;
    /** 提问 */
    q: IEntMessage;
    /** 回答 */
    a: IEntMessage;
}
