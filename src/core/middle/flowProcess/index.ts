import { IEntProcess, IFlowProcess } from "../../interface/flowProcess";


export class FlowProcess implements IFlowProcess {
    processQueue: IEntProcess[] = [];

    constructor() {}

    performProcess(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    addProcess(process: IEntProcess): void {
        this.processQueue.push(process);
    }
}
