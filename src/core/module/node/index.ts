import { EnumFlowNode } from "../../interface/flowNode";
import { EntFlowNode, INodeStorage } from "../../middle/flowNode";
import { NodeStorage } from "./store/nodeStorage";

export class NodeManager implements INodeStorage {
    constructor(private nodeStorage: NodeStorage = new NodeStorage()) {}
    register(node: EntFlowNode<EnumFlowNode>): void {
        this.nodeStorage.saveNode(node);
    }
    getNodeById(id: string): EntFlowNode<EnumFlowNode> | undefined {
        return this.nodeStorage.getNodeById(id);
    }
    getAllNodes(): EntFlowNode<EnumFlowNode>[] {
        return this.nodeStorage.getAllNodes();
    }
}