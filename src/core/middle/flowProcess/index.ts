import { IEntProcess, IFlowProcess } from "../../interface/flowProcess";

export class FlowProcess implements IFlowProcess {
    flowQueue: any[] = [];
    getCurrentFlow(): IEntProcess {
        throw new Error("Method not implemented.");
    }
    performFlow(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}
