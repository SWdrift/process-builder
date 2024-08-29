import { IEntProcess } from "../../../interface/flowProcess";

export interface IFlowParsing {
    parseFlowString(flowString: string): IEntProcess | undefined;
}
