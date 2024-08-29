/**
 * 流程动作接口
 */
export interface IFlowProcess {
    /**
     * 当前流程队列
     */
    processQueue: IEntProcess[];
    /**
     * 执行当前流程
     * @returns 是否成功
     */
    performProcess(): Promise<boolean>;
    /**
     * 添加流程
     */
    addProcess(process: IEntProcess): void;
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
