import { IEntProcess } from "../../interface/manager";
import { IProcessParser, INodeManager } from "../../middle/manager";
import { FlowStringParser } from "./service/stringParser";

export class ProcessParser implements IProcessParser {
    private stringParser: FlowStringParser;
    constructor(nodeManager: INodeManager) {
        this.stringParser = new FlowStringParser(nodeManager);
    }
    parseString(flowString: string | object): IEntProcess | undefined {
        return this.stringParser.parse(flowString);
    }
}
