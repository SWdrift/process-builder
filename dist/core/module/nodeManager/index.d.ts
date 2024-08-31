import { EnumNode } from '../../interface/flowManager';
import { EntNode, INodeManager } from '../../middle/flowManager';
import { NodeStorage } from './store/nodeStorage';
export declare class NodeManager implements INodeManager {
    private nodeStorage;
    constructor(nodeStorage?: NodeStorage);
    register(node: EntNode<EnumNode>): void;
    getNodeById<T extends EnumNode = EnumNode>(id: string): EntNode<T> | undefined;
    getAllNodes(): EntNode<EnumNode>[];
}
