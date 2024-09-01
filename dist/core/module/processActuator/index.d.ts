import { IEntProcess } from '../../interface/manager';
import { INodeManager, IProcessActuator } from '../../middle/manager';
import { GraphDrive } from './service/graphDrive';
export declare class ProcessActuator implements IProcessActuator {
    private executor;
    private validator;
    constructor(nodeManager: INodeManager, graphDrive?: GraphDrive);
    execute(process: IEntProcess): Promise<any | undefined>;
}
