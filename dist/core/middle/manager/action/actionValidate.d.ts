import { ValueDescribe, FnDescribe } from '../../../interface/manager';
import { Fn } from '../../../public/types/global';
import { IProcessNode } from '../interface/processNode';
export declare class ActionValidate {
    nodeManager: IProcessNode;
    constructor(nodeManager: IProcessNode);
    isRegisterMethodOk<T extends Fn>(_target: T, describe: FnDescribe<T>): boolean;
    isRegisterValueOk<T extends Object>(_target: T, describe: ValueDescribe): boolean;
}
