import { IFlowManager, ValueDescribe, FnDescribe, EnumNode } from '../../interface/flowManager';
import { Fn } from '../../public/types/global';
import { ActionValidate } from './action/actionValidate';
import { EntNode } from './entity/node';
import { INodeManager } from './interface/nodeManager';
import { IProcessActuator } from './interface/processActuator';
import { IProcessManager } from './interface/processManager';
import { IProcessParser } from './interface/processParser';
export { EntNode };
export type { INodeManager };
export type { IProcessActuator };
export type { IProcessManager };
export type { IProcessParser };
export declare class FlowManager implements IFlowManager {
    private nodeStorage;
    private processActator;
    private processManager;
    private processParser;
    private actionValidate;
    constructor(nodeStorage: INodeManager, processActator: IProcessActuator, processManager: IProcessManager, processParser: IProcessParser, actionValidate?: ActionValidate);
    performProcess(): Promise<any>;
    addProcess(processOrString: string | object): void;
    registerMethodNode<T extends Fn>(target: T, describe: FnDescribe<T>): void;
    registerValueNode<T extends Object>(target: T, describe: ValueDescribe): void;
    getNodeById(id: string): EntNode<EnumNode> | undefined;
    getAllNodes(): EntNode<EnumNode>[];
}
