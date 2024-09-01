import { EnumNode } from '../../interface/manager';
import { EntNode, INodeManager } from '../../middle/manager';
import { NodeStorage } from './store/nodeStorage';
export declare class NodeManager implements INodeManager {
    private nodeStorage;
    constructor(nodeStorage?: NodeStorage);
    register(node: EntNode<EnumNode>): void;
    getNodeById<T extends EnumNode = EnumNode>(id: string): EntNode<T> | undefined;
    getAllNodes(): EntNode<EnumNode>[];
}
