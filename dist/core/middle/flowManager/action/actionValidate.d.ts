import { ValueDescribe, FnDescribe } from '../../../interface/flowManager';
import { Fn } from '../../../public/types/global';
import { INodeManager } from '../interface/nodeManager';
export declare class ActionValidate {
    nodeManager: INodeManager;
    constructor(nodeManager: INodeManager);
    isRegisterMethodOk<T extends Fn>(_target: T, describe: FnDescribe<T>): boolean;
    isRegisterValueOk<T extends Object>(_target: T, describe: ValueDescribe): boolean;
}
