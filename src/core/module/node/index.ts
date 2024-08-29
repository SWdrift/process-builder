import { EnumFlowNode } from "../../interface/flowManager";
import { FlowNode, INodeManager } from "../../middle/flowManager";
import { NodeStorage } from "./store/nodeStorage";

export class NodeManager implements INodeManager {
    constructor(private nodeStorage: NodeStorage = new NodeStorage()) {}
    register(node: FlowNode<EnumFlowNode>): void {
        this.nodeStorage.saveNode(node);
    }
    getNodeById(id: string): FlowNode<EnumFlowNode> | undefined {
        return this.nodeStorage.getNodeById(id);
    }
    getAllNodes(): FlowNode<EnumFlowNode>[] {
        return this.nodeStorage.getAllNodes();
    }
}
