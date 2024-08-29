import { IEntProcess } from "../../interface/flowManager";
import { IProcessParser, INodeManager } from "../../middle/flowManager";
import { FlowStringParser } from "./service/stringParser";

export class ProcessParser implements IProcessParser {
    constructor(
        private nodeManager: INodeManager,
        private stringParser: FlowStringParser = new FlowStringParser(nodeManager)
    ) {}
    parseString(flowString: string | object): IEntProcess | undefined {
        return this.stringParser.parse(flowString);
    }
}
