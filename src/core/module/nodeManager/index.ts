import { EnumNode } from "../../interface/flowManager";
import { EntNode, INodeManager } from "../../middle/flowManager";
import { NodeStorage } from "./store/nodeStorage";

export class NodeManager implements INodeManager {
    constructor(private nodeStorage: NodeStorage = new NodeStorage()) {}
    register(node: EntNode<EnumNode>): void {
        this.nodeStorage.saveNode(node);
    }
    getNodeById(id: string): EntNode<EnumNode> | undefined {
        return this.nodeStorage.getNodeById(id);
    }
    getAllNodes(): EntNode<EnumNode>[] {
        return this.nodeStorage.getAllNodes();
    }
}