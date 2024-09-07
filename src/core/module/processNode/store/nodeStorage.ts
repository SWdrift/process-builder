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
        if (node.define.type === EnumNode.Function) {
            this.saveFunction(node as EntNode<EnumNode.Function>);
        }
        if (node.define.type === EnumNode.Constant) {
            this.saveConstant(node as EntNode<EnumNode.Constant>);
        }
    }
    deleteNode(node: EntNode<EnumNode>) {
        delete this.nodes[node.name];
    }
    updateNode(node: EntNode<EnumNode>) {
        this.nodes[node.name] = node;
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

    private saveFunction(node: EntNode<EnumNode.Function>) {
        if (node.define.function.parameters.hasOwnProperty("required")) {
            this.nodes[node.name] = node;
        } else {
            const requiredParams = Object.keys(node.define.function.parameters.properties);
            node.define.function.parameters["required"] = requiredParams;
            this.nodes[node.name] = node;
        }
    }
    private saveConstant(node: EntNode<EnumNode.Constant>) {
        this.nodes[node.name] = node;
    }
}
