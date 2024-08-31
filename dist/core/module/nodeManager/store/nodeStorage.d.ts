import { EnumNode } from '../../../interface/flowManager';
import { EntNode } from '../../../middle/flowManager';
export declare class NodeStorage {
    nodes: {
        [id: string]: EntNode<EnumNode>;
    };
    static instance: NodeStorage;
    constructor();
    saveNode(node: EntNode<EnumNode>): void;
    deleteNode(node: EntNode<EnumNode>): void;
    updateNode(node: EntNode<EnumNode>): void;
    getNodeById(id: string): EntNode<EnumNode> | undefined;
    getAllNodes(): EntNode<EnumNode>[];
}
