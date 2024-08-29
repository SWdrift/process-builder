import { EnumFlowNode } from "../../../interface/flowNode";
import { EntFlowNode } from "../../../middle/flowNode";

export class NodeStorage {
    nodes: { [id: string]: EntFlowNode<EnumFlowNode> } = {};
    static instance: NodeStorage;

    constructor() {
        if (!NodeStorage.instance) {
            NodeStorage.instance = this;
        }
        return NodeStorage.instance;
    }

    saveNode(node: EntFlowNode<EnumFlowNode>) {
        this.nodes[node.id] = node;
    }
    deleteNode(node: EntFlowNode<EnumFlowNode>) {
        delete this.nodes[node.id];
    }
    updateNode(node: EntFlowNode<EnumFlowNode>) {
        this.nodes[node.id] = node;
    }
    getNodeById(id: string): EntFlowNode<EnumFlowNode> | undefined {
        if (id in this.nodes) {
            return this.nodes[id];
        }
        return undefined;
    }
    getAllNodes(): EntFlowNode<EnumFlowNode>[] {
        return Object.values(this.nodes);
    }
}