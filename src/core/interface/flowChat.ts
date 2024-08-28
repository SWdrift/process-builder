/**
 * 流程对话接口
 */
export interface IFlowChat {
    /**
     * 发送消息
     * @param request 消息请求
     * @returns 消息响应
     */
    send(text: string): Promise<MessageResponse>;
}

export type MessageResponse = {
    id: string;
    data: string;
    timestamp: number;
};
