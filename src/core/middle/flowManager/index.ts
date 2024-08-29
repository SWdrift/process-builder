import {
    IFlowManager,
    ValueDescribe,
    FnDescribe,
    EnumNode,
    IEntProcess
} from "../../interface/flowManager";
import { ActionValidate } from "./action/actionValidate";

import { EntNode } from "./entity/node";
import { INodeManager } from "./interface/nodeManager";
import { IProcessManager } from "./interface/processManager";
import { IProcessParser } from "./interface/processParser";
export { EntNode };
export type { INodeManager };
export type { IProcessManager };
export type { IProcessParser };

export class FlowManager implements IFlowManager {
    constructor(
        private nodeStorage: INodeManager,
        private processManager: IProcessManager,
        private processParser: IProcessParser,
        private actionValidate: ActionValidate = new ActionValidate(nodeStorage)
    ) {}

    performProcess(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    addProcess(processOrString: IEntProcess | string) {
        if (typeof processOrString === "string") {
            const process = this.processParser.parseString(processOrString);
            if (process) {
                this.processManager.pushToQueue(process);
            }
        } else {
            this.processManager.pushToQueue(processOrString);
        }
    }

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
