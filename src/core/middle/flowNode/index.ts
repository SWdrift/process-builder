import { IFlowNode, ValueDescribe, FnDescribe, EnumNode } from "../../interface/flowNode";
import { EntNode } from "./entity/node";
import { ActionValidate } from "./action/actionValidate";
import { INodeStorage } from "./interface/nodeManager";

export type { EntNode };
export type { INodeStorage };

export class FlowNode implements IFlowNode {
    constructor(
        public nodeStorage: INodeStorage,
        private actionValidate: ActionValidate = new ActionValidate(nodeStorage)
    ) {}

    registerMethodNode<T extends Fn>(target: T, describe: FnDescribe<T>): void {
        if (!this.actionValidate.isRegisterMethodOk(target, describe)) return;
        this.nodeStorage.register(new EntNode(target, describe, EnumNode.Method));
    }
    registerValueNode<T extends Object>(target: T, describe: ValueDescribe): void {
        if (!this.actionValidate.isRegisterValueOk(target, describe)) return;
        this.nodeStorage.register(new EntNode(target, describe, EnumNode.Value));
    }
    getNodeById(id: string): EntNode<EnumNode> | undefined {
        return this.nodeStorage.getNodeById(id);
    }
    getAllNodes(): EntNode<EnumNode>[] {
        return this.nodeStorage.getAllNodes();
    }
}