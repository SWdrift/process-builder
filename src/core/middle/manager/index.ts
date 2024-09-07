import { IEntNode, IManager, UseNodeDefine, NodeDefine, EnumNode } from "../../interface/manager";
import { ActionValidate } from "./action/actionValidate";

import { EntNode } from "./entity/node";
import { IProcessNode } from "./interface/processNode";
import { IProcessActuator } from "./interface/processActuator";
import { IProcessManager } from "./interface/processStorage";
import { IProcessParser } from "./interface/processParser";
import { SubFunctionDefine, SubConstantDefine } from "../../public/types/app";
import { Fn } from "../../public/types/global";
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
    registerNode<T>(target: T, define: UseNodeDefine<T>): void {
        if (!this.actionValidate.isRegisterOk(target, define)) return;
        this.nodeStorage.register(new EntNode(target, define));
    }
    registerFunction<T extends Fn>(target: T, define: SubFunctionDefine<T>): void {
        const node = {
            type: "function",
            function: define
        } as const;
        if (!this.actionValidate.isRegisterOk(target, node)) return;
        this.nodeStorage.register(new EntNode(target, node));
    }
    registerConstant<T>(target: T, define: SubConstantDefine<T>): void {
        const node = {
            type: "constant",
            constant: define
        } as const;
        if (!this.actionValidate.isRegisterOk(target, node)) return;
        this.nodeStorage.register(new EntNode(target, node));
    }
    getNodeByName<T extends EnumNode = EnumNode>(name: string): IEntNode<T> | undefined {
        return this.nodeStorage.getNodeByName(name);
    }
    getAllNodes(): IEntNode[] {
        return this.nodeStorage.getAllNodes();
    }
}
