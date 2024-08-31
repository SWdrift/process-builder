import {
    IEntProcess,
    IEntConnect,
    EnumNode,
    IEntNode,
    NodeDescribe
} from "../../../interface/flowManager";
import { INodeManager } from "../../../middle/flowManager";
import { GraphDrive } from "./graphDrive";
import { getNodeKey } from "../util/node";

interface SuccessResult {
    success: true;
    data: { process: IEntProcess; nodeDescribes: NodeDescribe[] };
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
            return {
                success: false,
                data: { process }
            };
        }
        if (!this.validateParams(connectList, nodes)) {
            return {
                success: false,
                data: { process }
            };
        }
        return {
            success: true,
            data: { process, nodeDescribes: nodes }
        };
    }

    validateParams(connectList: IEntConnect[], nodes: NodeDescribe[]): boolean {
        type ParamsPredicate = { [key: string]: boolean };
        type NodeContainer = { [key: string]: { id: string; params: ParamsPredicate } };

        // 获取节点连接参数
        const nodeContainer: NodeContainer = {};
        for (const node of nodes) {
            const entNode = this.nodeManager.getNodeById(node.id);
            if (!entNode) return false;
            const paramsPredicate: ParamsPredicate = {};
            if (entNode.type === EnumNode.Method) {
                const en = entNode as IEntNode<EnumNode.Method>;
                for (const param of en.describe.params) {
                    if (param.optional) {
                        continue;
                    } else {
                        paramsPredicate[param.id] = true;
                    }
                }
            }
            if (entNode.type === EnumNode.Value) {
                const en = entNode as IEntNode<EnumNode.Value>;
                paramsPredicate[en.describe.id] = true;
            }
            nodeContainer[getNodeKey(node)] = { id: entNode.id, params: paramsPredicate };
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
