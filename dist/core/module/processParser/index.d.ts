import { IEntProcess } from '../../interface/manager';
import { IProcessParser, INodeManager } from '../../middle/manager';
export declare class ProcessParser implements IProcessParser {
    private stringParser;
    constructor(nodeManager: INodeManager);
    parseString(flowString: string | object): IEntProcess | undefined;
}
