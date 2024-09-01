import { EnumNode } from "../../../interface/manager";
import { EntNode } from "../../../middle/manager";

export class NodeStorage {
    nodes: { [id: string]: EntNode<EnumNode> } = {};
    static instance: NodeStorage;

    constructor() {
        if (!NodeStorage.instance) {
            NodeStorage.instance = this;
        }
        return NodeStorage.instance;
    }

    saveNode(node: EntNode<EnumNode>) {
        this.nodes[node.id] = node;
    }
    deleteNode(node: EntNode<EnumNode>) {
        delete this.nodes[node.id];
    }
    updateNode(node: EntNode<EnumNode>) {
        this.nodes[node.id] = node;
    }
    getNodeById(id: string): EntNode<EnumNode> | undefined {
        if (id in this.nodes) {
            return this.nodes[id];
        }
        return undefined;
    }
    getAllNodes(): EntNode<EnumNode>[] {
        return Object.values(this.nodes);
    }
}