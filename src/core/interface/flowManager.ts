/**
 * 流程动作接口
 */
export interface FlowManager {
    /**
     * 流程队列
     */
    flowQueue: any[];
    /**
     * 执行流程
     * @returns 是否成功
     */
    performFlow(): Promise<boolean>;
    /**
     * 获取当前流程
     * @returns 当前流程
     */
    getCurrentFlow(): void;
}
