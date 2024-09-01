import { EnumNode } from "../../interface/manager";
import { EntNode, INodeManager } from "../../middle/manager";
import { NodeStorage } from "./store/nodeStorage";

export class NodeManager implements INodeManager {
    constructor(private nodeStorage: NodeStorage = new NodeStorage()) {}
    register(node: EntNode<EnumNode>): void {
        this.nodeStorage.saveNode(node);
    }
    getNodeById<T extends EnumNode = EnumNode>(id: string): EntNode<T> | undefined {
        return this.nodeStorage.getNodeById(id) as EntNode<T>;
    }
    getAllNodes(): EntNode<EnumNode>[] {
        return this.nodeStorage.getAllNodes();
    }
}
