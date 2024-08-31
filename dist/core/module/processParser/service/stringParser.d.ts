import { IEntProcess } from '../../../interface/flowManager';
import { INodeManager } from '../../../middle/flowManager';
export declare class FlowStringParser {
    private flowNode;
    constructor(flowNode: INodeManager);
    parse(text: string | object): IEntProcess | undefined;
    private convertToObject;
    private extractJson;
    private getVerifiedProcess;
    private validateNodeGraph;
    private validateConnect;
    private validateNode;
    private validateParam;
}
