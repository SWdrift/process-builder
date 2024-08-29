/**
 * 流程动作接口
 */
export interface IFlowProcess {
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
    getCurrentFlow(): IEntProcess;
}

/**
 * 流程对象
 */
export interface IEntProcess {
    id: string;
    nodeTree: IEntConnect[];
}

/**
 * 流程连接对象
 */
export interface IEntConnect {
    fromNode: string;
    toNode: string;
    toParam: string;
}
