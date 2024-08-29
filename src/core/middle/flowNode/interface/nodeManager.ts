import { EnumNode } from "../../../interface/flowNode";
import { EntNode } from "../entity/node";

export interface INodeStorage {
    register(node: EntNode<EnumNode>): void;
    getNodeById(id: string): EntNode<EnumNode> | undefined;
    getAllNodes(): EntNode<EnumNode>[];
}
