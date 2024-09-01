import { IEntProcess } from '../../../interface/manager';
import { INodeManager } from '../../../middle/manager';
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
