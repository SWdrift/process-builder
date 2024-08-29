import { EnumNode } from "../../../interface/flowManager";
import { EntNode } from "../entity/node";

export interface INodeManager {
    register(node: EntNode<EnumNode>): void;
    getNodeById(id: string): EntNode<EnumNode> | undefined;
    getAllNodes(): EntNode<EnumNode>[];
}
