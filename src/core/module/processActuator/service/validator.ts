import {
    IEntProcess,
    IEntConnect,
    EnumNode,
    IEntNode,
    INodeIndex
} from "../../../interface/manager";
import { INodeManager } from "../../../middle/manager";
import { GraphDrive } from "./graphDrive";
import { getNodeKey } from "../util/node";
import { logger } from "../../../public/module/logger";

interface SuccessResult {
    success: true;
    data: { process: IEntProcess; nodeIndexs: INodeIndex[] };
}

interface FailureResult {
    success: false;
    data?: { process: IEntProcess };
}

export type CheckResult = SuccessResult | FailureResult;

export class Validator {
    constructor(
        private nodeManager: INodeManager,
        private graphDrive: GraphDrive
    ) {}

    check(process: IEntProcess): CheckResult {
        const connectList = process.nodeGraph;
        const nodes = this.graphDrive.topologicalSort(connectList);
        if (!nodes) {
            logger.record("the node graph is not a DAG", logger.Level.Warn);
            return {
                success: false,
                data: { process }
            };
        }
        if (!this.validateParams(connectList, nodes)) {
            logger.record("the process has invalid parameters", logger.Level.Warn);
            return {
                success: false,
                data: { process }
            };
        }
        return {
            success: true,
            data: { process, nodeIndexs: nodes }
        };
    }

    validateParams(connectList: IEntConnect[], nodes: INodeIndex[]): boolean {
        type ParamsPredicate = { [key: string]: boolean };
        type NodeContainer = { [key: string]: { id: string; params: ParamsPredicate } };

        // 获取节点连接参数
        const nodeContainer: NodeContainer = {};
        for (const node of nodes) {
            const entNode = this.nodeManager.getNodeByName(node.name);
            if (!entNode) return false;
            const paramsPredicate: ParamsPredicate = {};
            const def = entNode.define;
            if (def.type === EnumNode.Function) {
                const en = entNode as IEntNode<EnumNode.Function>;
                const params = en.define.function.parameters;
                const paramKeys = Object.keys(params.properties);
                for (const paramKey of paramKeys) {
                    if (!params.required) {
                        throw new Error(`Required parameter not found`);
                    }
                    if (!params.required.find((pk) => pk === paramKey)) {
                        continue;
                    } else {
                        paramsPredicate[paramKey] = true;
                    }
                }
            }
            if (def.type === EnumNode.Constant) {
                const en = entNode as IEntNode<EnumNode.Constant>;
                paramsPredicate[en.define.constant.name] = true;
            }
            nodeContainer[getNodeKey(node)] = { id: entNode.name, params: paramsPredicate };
        }

        // 校验节点连接参数
        for (const connect of connectList) {
            const toParam = connect.toParam;
            const toNode = connect.toNode;
            const nodeKey = getNodeKey(toNode);
            const node = nodeContainer[nodeKey];
            const paramsPredicate = node.params;
            if (!node) {
                return false;
            }
            if (toParam in paramsPredicate && paramsPredicate[toParam]) {
                continue;
            } else {
                paramsPredicate[toParam] = false;
                return false;
            }
        }

        return true;
    }
}
