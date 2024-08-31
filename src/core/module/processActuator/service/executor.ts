import { EnumNode, IEntConnect, IEntProcess, NodeDescribe } from "../../../interface/flowManager";
import { EntNode, INodeManager } from "../../../middle/flowManager";
import { getNodeKey } from "../util/node";
import { logger } from "../../../public/module/logger";

// 节点值
type NodeValueMap = { [key: string]: any };
// 节点依赖值
type NodeDepMap = { [key: string]: NodeDescribe };

/**
 * 执行器
 *
 * 根据流程图执行节点计算，使用拓扑排序遍历节点图，先计算节点依赖，再根据依赖计算节点值。
 */
export class Executor {
    constructor(private nodeManager: INodeManager) {}

    /**
     * 执行流程
     * @param processData 流程数据
     * @returns 节点值表 返回所有节点的计算结果
     */
    async run(processData: {
        process: IEntProcess;
        nodeDescribes: NodeDescribe[];
    }): Promise<NodeValueMap | undefined> {
        try {
            return await this.executeNodes(processData.process, processData.nodeDescribes);
        } catch (error) {
            logger.record(`The process execution failed, ${error}`, logger.Level.Warn);
            throw error;
        }
    }

    async executeNodes(
        process: IEntProcess,
        nodeDescribes: NodeDescribe[]
    ): Promise<NodeValueMap | undefined> {
        const nodeValueMap: NodeValueMap = {}; // 节点值表
        const nodeDepMap: NodeDepMap = this.getNodeDepMap(process); // 节点依赖表
        for (const nodeDescribe of nodeDescribes) {
            const nodeKey = getNodeKey(nodeDescribe);
            nodeValueMap[nodeKey] = await this.getNodeValue(nodeDescribe, nodeValueMap, nodeDepMap);
        }
        return nodeValueMap;
    }

    private getNodeDepMap(process: IEntProcess): NodeDepMap {
        const nodeDepMap: NodeDepMap = {};
        for (const entConnect of process.nodeGraph) {
            nodeDepMap[this.getNodeDepKey(entConnect)] = entConnect.fromNode;
        }
        return nodeDepMap;
    }

    private getNodeDepKey(connect: IEntConnect): string {
        return `${connect.toNode.id}-${connect.toParam}-${connect.toNode.instanceId}`;
    }

    private buildNodeDepKey(nodeId: string, paramId: string, instanceId: number): string {
        return `${nodeId}-${paramId}-${instanceId}`;
    }

    private async getNodeValue(
        nodeDescribe: NodeDescribe,
        nodeValueMap: NodeValueMap,
        nodeDepMap: NodeDepMap
    ): Promise<any> {
        const nodeInstance = this.nodeManager.getNodeById(nodeDescribe.id);
        if (!nodeInstance) throw new Error(`Node not found: ${nodeDescribe.id}`);
        if (nodeInstance.type === EnumNode.Value) {
            return nodeInstance.target;
        }
        if (nodeInstance.type === EnumNode.Method) {
            return await this.executeFunction(
                nodeDescribe,
                nodeInstance as EntNode<EnumNode.Method>,
                nodeValueMap,
                nodeDepMap
            );
        }
    }

    private async executeFunction(
        nodeDescribe: NodeDescribe,
        nodeInstance: EntNode<EnumNode.Method>,
        nodeValueMap: NodeValueMap,
        nodeDepMap: NodeDepMap
    ) {
        if (nodeInstance.describe.params.length > 0) {
            const paramValues = this.getParamValues(
                nodeDescribe,
                nodeInstance,
                nodeValueMap,
                nodeDepMap
            );
            return await nodeInstance.target(...paramValues);
        } else {
            return await nodeInstance.target();
        }
    }

    private getParamValues(
        nodeDescribe: NodeDescribe,
        nodeInstance: EntNode<EnumNode.Method>,
        nodeValueMap: NodeValueMap,
        nodeDepMap: NodeDepMap
    ) {
        const paramKays = nodeInstance.describe.params.map((param) => {
            return this.buildNodeDepKey(nodeDescribe.id, param.id, nodeDescribe.instanceId);
        });
        const paramValues = paramKays.map((key) => {
            const depNode = nodeDepMap[key];
            if (!depNode) throw new Error(`Dependency node not found: ${key}`);
            const depNodeValue = nodeValueMap[getNodeKey(depNode)];
            if (!depNodeValue) {
                // 如果不存在依赖节点的值，则判断是否可选参数，如果可选参数，则返回 undefined，否则抛出异常
                if (nodeInstance.describe.params.find((param) => param.optional)) {
                    return undefined;
                } else {
                    throw new Error(`Dependency value not found: ${key}`);
                }
            }
            return depNodeValue;
        });
        return paramValues;
    }
}
