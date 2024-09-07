import { IEntNode, EnumNode } from "../../../interface/manager";
import { NodeDefine } from "../../../interface/manager";

export class EntNode<T extends EnumNode> implements IEntNode {
    public name: string;

    constructor(
        public target: any,
        public define: NodeDefine<T>
    ) {
        this.name = this.getId(define);
    }

    private getId(nodeDefine: NodeDefine<T>): string {
        if (nodeDefine.type === "function") {
            return nodeDefine.function.name;
        }
        if (nodeDefine.type === "constant") {
            return nodeDefine.constant.name;
        }
        throw new Error("Invalid node type");
    }
}
