import { IManager, ValueDescribe, FnDescribe, EnumNode } from '../../interface/manager';
import { Fn } from '../../public/types/global';
import { ActionValidate } from './action/actionValidate';
import { EntNode } from './entity/node';
import { IProcessNode } from './interface/processNode';
import { IProcessActuator } from './interface/processActuator';
import { IProcessManager } from './interface/processStorage';
import { IProcessParser } from './interface/processParser';
export { EntNode };
export type { IProcessNode as INodeManager };
export type { IProcessActuator };
export type { IProcessManager };
export type { IProcessParser };
export declare class FlowManager implements IManager {
    private nodeStorage;
    private processActator;
    private processManager;
    private processParser;
    private actionValidate;
    constructor(nodeStorage: IProcessNode, processActator: IProcessActuator, processManager: IProcessManager, processParser: IProcessParser, actionValidate?: ActionValidate);
    performProcess(): Promise<any>;
    addProcess(processOrString: string | object): void;
    registerMethodNode<T extends Fn>(target: T, describe: FnDescribe<T>): void;
    registerValueNode<T extends Object>(target: T, describe: ValueDescribe): void;
    getNodeById(id: string): EntNode<EnumNode> | undefined;
    getAllNodes(): EntNode<EnumNode>[];
}
