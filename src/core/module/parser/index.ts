import { IEntProcess } from "../../interface/flowProcess";
import { IFlowParsing } from "../../middle/flowChat";
import { FlowStringParser } from "./service/textParser";

export class FlowParser implements IFlowParsing {
    constructor(private flowStringParser: FlowStringParser = new FlowStringParser()) {}

    parseFlowString(flowString: string): IEntProcess | undefined {
        return this.flowStringParser.explain(flowString);
    }
}
