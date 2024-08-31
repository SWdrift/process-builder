import { IEntProcess, NodeDescribe } from '../../../interface/flowManager';
import { INodeManager } from '../../../middle/flowManager';
type NodeValueMap = {
    [key: string]: any;
};
/**
 * 执行器
 *
 * 根据流程图执行节点计算，使用拓扑排序遍历节点图，先计算节点依赖，再根据依赖计算节点值。
 */
export declare class Executor {
    private nodeManager;
    constructor(nodeManager: INodeManager);
    /**
     * 执行流程
     * @param processData 流程数据
     * @returns 节点值表 返回所有节点的计算结果
     */
    run(processData: {
        process: IEntProcess;
        nodeDescribes: NodeDescribe[];
    }): Promise<NodeValueMap | undefined>;
    executeNodes(process: IEntProcess, nodeDescribes: NodeDescribe[]): Promise<NodeValueMap | undefined>;
    private getNodeDepMap;
    private getNodeDepKey;
    private buildNodeDepKey;
    private getNodeValue;
    private executeFunction;
    private getParamValues;
}
export {};
