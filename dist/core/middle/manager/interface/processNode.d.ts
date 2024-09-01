import { EnumNode } from '../../../interface/manager';
import { EntNode } from '../entity/node';
export interface IProcessNode {
    register(node: EntNode<EnumNode>): void;
    getNodeById<T extends EnumNode = EnumNode>(id: string): EntNode<T> | undefined;
    getAllNodes(): EntNode<EnumNode>[];
}
