import { IFlowNode, ValueDescribe, FnDescribe, EnumFlowNode } from "../../interface/flowNode";
import { EntFlowNode } from "./entity/entNode";
import { ActionValidate } from "./action/actionValidate";
import { INodeStorage } from "./interface/nodeManager";

export type { EntFlowNode };
export type { INodeStorage };

export class FlowNode implements IFlowNode {
    constructor(
        public nodeStorage: INodeStorage,
        private actionValidate: ActionValidate = new ActionValidate(nodeStorage)
    ) {}

    registerMethodNode<T extends Fn>(target: T, describe: FnDescribe<T>): void {
        if (!this.actionValidate.isRegisterMethodOk(target, describe)) return;
        this.nodeStorage.register(new EntFlowNode(target, describe, EnumFlowNode.Method));
    }
    registerValueNode<T extends Object>(target: T, describe: ValueDescribe): void {
        if (!this.actionValidate.isRegisterValueOk(target, describe)) return;
        this.nodeStorage.register(new EntFlowNode(target, describe, EnumFlowNode.Value));
    }
    getNodeById(id: string): EntFlowNode<EnumFlowNode> | undefined {
        return this.nodeStorage.getNodeById(id);
    }
    getAllNodes(): EntFlowNode<EnumFlowNode>[] {
        return this.nodeStorage.getAllNodes();
    }
}