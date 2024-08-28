import { EnumFlowNode } from "../../../interface/flowManager";
import { FlowNode } from "../../../middle/flowManager";

export class NodeStorage {
    nodes: { [id: string]: FlowNode<EnumFlowNode> } = {};
    static instance: NodeStorage;

    constructor() {
        if (!NodeStorage.instance) {
            NodeStorage.instance = this;
        }
        return NodeStorage.instance;
    }

    saveNode(node: FlowNode<EnumFlowNode>) {
        this.nodes[node.id] = node;
    }
    deleteNode(node: FlowNode<EnumFlowNode>) {
        delete this.nodes[node.id];
    }
    updateNode(node: FlowNode<EnumFlowNode>) {
        this.nodes[node.id] = node;
    }
    getNodeById(id: string): FlowNode<EnumFlowNode> | undefined {
        if (id in this.nodes) {
            return this.nodes[id];
        }
        return undefined;
    }
    getAllNodes(): FlowNode<EnumFlowNode>[] {
        return Object.values(this.nodes);
    }
}
