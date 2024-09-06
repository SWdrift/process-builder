import { EnumNode, IEntConnect, IEntProcess, INodeIndex } from "../../../interface/manager";
import { EntNode, INodeManager } from "../../../middle/manager";
import { getNodeKey } from "../util/node";
import { logger } from "../../../public/module/logger";

// 节点值
type NodeValueMap = { [key: string]: any };
// 节点依赖值
type NodeDepMap = { [key: string]: INodeIndex };

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
        nodeIndexs: INodeIndex[];
    }): Promise<NodeValueMap | undefined> {
        try {
            return await this.executeNodes(processData.process, processData.nodeIndexs);
        } catch (error) {
            logger.record(`The process execution failed, ${error}`, logger.Level.Warn);
            throw error;
        }
    }

    async executeNodes(
        process: IEntProcess,
        nodeIndexs: INodeIndex[]
    ): Promise<NodeValueMap | undefined> {
        const nodeValueMap: NodeValueMap = {}; // 节点值表
        // 使用 connect 构建节点依赖表
        // 通过 toNode 和 toParam、instanceId 构建节点依赖键 值为 fromNode
        const nodeDepMap: NodeDepMap = this.getNodeDepMap(process); // 节点依赖表
        for (const nodeDescribe of nodeIndexs) {
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
        return `${connect.toNode.name}-${connect.toParam}-${connect.toNode.instanceId}`;
    }

    private buildNodeDepKey(nodeId: string, paramId: string, instanceId: number): string {
        return `${nodeId}-${paramId}-${instanceId}`;
    }

    private async getNodeValue(
        nodeIndex: INodeIndex,
        nodeValueMap: NodeValueMap,
        nodeDepMap: NodeDepMap
    ): Promise<any> {
        const nodeInstance = this.nodeManager.getNodeByName(nodeIndex.name);
        if (!nodeInstance) throw new Error(`Node not found: ${nodeIndex.name}`);
        if (nodeInstance.define.type === EnumNode.Constant) {
            return nodeInstance.target;
        }
        if (nodeInstance.define.type === EnumNode.Function) {
            return await this.executeFunction(
                nodeIndex,
                nodeInstance as EntNode<EnumNode.Function>,
                nodeValueMap,
                nodeDepMap
            );
        }
    }

    private async executeFunction(
        nodeIndex: INodeIndex,
        nodeInstance: EntNode<EnumNode.Function>,
        nodeValueMap: NodeValueMap,
        nodeDepMap: NodeDepMap
    ) {
        if (Object.keys(nodeInstance.define.function.parameters).length > 0) {
            const paramValues = this.getParamValues(
                nodeIndex,
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
        nodeIndex: INodeIndex,
        nodeInstance: EntNode<EnumNode.Function>,
        nodeValueMap: NodeValueMap,
        nodeDepMap: NodeDepMap
    ) {
        const def = nodeInstance.define.function;
        // 构建节点依赖 Keys，并从节点值表中获取依赖节点的值
        // nodeDepKey 为节点依赖 key，paramName 为参数名 用于判断参数是否可选
        const paramKays = Object.keys(def.parameters).map((paramName) => {
            return {
                nodeDepKey: this.buildNodeDepKey(nodeIndex.name, paramName, nodeIndex.instanceId),
                paramName
            };
        });
        const paramValues = paramKays.map((key) => {
            // 获取依赖的节点
            const depNode = nodeDepMap[key.nodeDepKey];
            if (!depNode) throw new Error(`Dependency node not found: ${key}`);
            // 从节点值表获取依赖节点的值
            const depNodeValue = nodeValueMap[getNodeKey(depNode)];
            if (!depNodeValue) {
                // 如果不存在依赖节点的值，则判断是否可选参数，如果可选参数，则返回 undefined，否则抛出异常
                if (this.isOptionalParam(nodeInstance, key.paramName)) {
                    return undefined;
                } else {
                    throw new Error(`Dependency value not found: ${key}`);
                }
            }
            return depNodeValue;
        });
        return paramValues;
    }

    private isOptionalParam(nodeInstance: EntNode<EnumNode.Function>, paramName: string): boolean {
        const def = nodeInstance.define.function;
        if (def.parameters.required.find((name) => name === paramName)) {
            return true;
        } else {
            return false;
        }
    }
}
