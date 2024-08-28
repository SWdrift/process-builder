import { IFlowManager, ValueDescribe, FnDescribe, EnumFlowNode } from "../../interface/flowManager";
import { FlowNode } from "./entity/node";
import { ActionValidate } from "./action/actionValidate";
import { INodeManager } from "./interface/nodeManager";

export type { FlowNode };
export type { INodeManager };

export class FlowManager implements IFlowManager {
    constructor(
        public nodeManager: INodeManager,
        private actionValidate: ActionValidate = new ActionValidate(nodeManager)
    ) {}

    registerMethodNode<T extends Fn>(target: T, describe: FnDescribe<T>): void {
        if (!this.actionValidate.isRegisterMethodOk(target, describe)) return;
        this.nodeManager.register(new FlowNode(target, describe, EnumFlowNode.Method));
    }
    registerValueNode<T extends Object>(target: T, describe: ValueDescribe): void {
        if (!this.actionValidate.isRegisterValueOk(target, describe)) return;
        this.nodeManager.register(new FlowNode(target, describe, EnumFlowNode.Value));
    }
    getNodeById(id: string): FlowNode<EnumFlowNode> | undefined {
        return this.nodeManager.getNodeById(id);
    }
    getAllNodes(): FlowNode<EnumFlowNode>[] {
        return this.nodeManager.getAllNodes();
    }
}
