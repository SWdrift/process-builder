import { IEntProcess } from '../../interface/flowManager';
import { IProcessParser, INodeManager } from '../../middle/flowManager';
export declare class ProcessParser implements IProcessParser {
    private stringParser;
    constructor(nodeManager: INodeManager);
    parseString(flowString: string | object): IEntProcess | undefined;
}
