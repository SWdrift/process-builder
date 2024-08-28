import { EnumFlowNode } from "../../../interface/flowManager";
import { FlowNode } from "../entity/node";

export interface INodeManager {
    register(node: FlowNode<EnumFlowNode>): void;
    getNodeById(id: string): FlowNode<EnumFlowNode> | undefined;
    getAllNodes(): FlowNode<EnumFlowNode>[];
}
