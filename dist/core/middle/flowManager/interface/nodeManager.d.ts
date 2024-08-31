import { EnumNode } from '../../../interface/flowManager';
import { EntNode } from '../entity/node';
export interface INodeManager {
    register(node: EntNode<EnumNode>): void;
    getNodeById<T extends EnumNode = EnumNode>(id: string): EntNode<T> | undefined;
    getAllNodes(): EntNode<EnumNode>[];
}
