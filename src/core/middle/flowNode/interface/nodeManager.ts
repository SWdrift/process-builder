import { EnumFlowNode } from "../../../interface/flowNode";
import { EntFlowNode } from "../entity/entNode";

export interface INodeStorage {
    register(node: EntFlowNode<EnumFlowNode>): void;
    getNodeById(id: string): EntFlowNode<EnumFlowNode> | undefined;
    getAllNodes(): EntFlowNode<EnumFlowNode>[];
}
