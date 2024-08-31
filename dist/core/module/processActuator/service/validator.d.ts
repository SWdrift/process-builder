import { IEntProcess, IEntConnect, NodeDescribe } from '../../../interface/flowManager';
import { INodeManager } from '../../../middle/flowManager';
import { GraphDrive } from './graphDrive';
interface SuccessResult {
    success: true;
    data: {
        process: IEntProcess;
        nodeDescribes: NodeDescribe[];
    };
}
interface FailureResult {
    success: false;
    data?: {
        process: IEntProcess;
    };
}
export type CheckResult = SuccessResult | FailureResult;
export declare class Validator {
    private nodeManager;
    private graphDrive;
    constructor(nodeManager: INodeManager, graphDrive: GraphDrive);
    check(process: IEntProcess): CheckResult;
    validateParams(connectList: IEntConnect[], nodes: NodeDescribe[]): boolean;
}
export {};
