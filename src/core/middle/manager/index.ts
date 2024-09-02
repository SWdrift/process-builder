import { IManager, ValueDescribe, FnDescribe, EnumNode } from "../../interface/manager";
import { Fn } from "../../public/types/global";
import { ActionValidate } from "./action/actionValidate";

import { EntNode } from "./entity/node";
import { IProcessNode } from "./interface/processNode";
import { IProcessActuator } from "./interface/processActuator";
import { IProcessManager } from "./interface/processStorage";
import { IProcessParser } from "./interface/processParser";
export { EntNode };
export type { IProcessNode as INodeManager };
export type { IProcessActuator };
export type { IProcessManager };
export type { IProcessParser };

export class FlowManager implements IManager {
    constructor(
        private nodeStorage: IProcessNode,
        private processActator: IProcessActuator,
        private processManager: IProcessManager,
        private processParser: IProcessParser,
        private actionValidate: ActionValidate = new ActionValidate(nodeStorage)
    ) {}

    async performProcess(): Promise<any> {
        const process = this.processManager.shiftFromQueue();
        if (!process) return false;
        return this.processActator.execute(process);
    }
    addProcess(processOrString: string | object) {
        const process = this.processParser.parseString(processOrString);
        if (process) {
            this.processManager.pushToQueue(process);
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
