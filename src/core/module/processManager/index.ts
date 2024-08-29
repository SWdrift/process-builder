import { IEntProcess } from "../../interface/flowManager";
import { IProcessManager } from "../../middle/flowManager";

export class ProcessManager implements IProcessManager {
    processQueue: IEntProcess[] = [];
    pushToQueue(process: IEntProcess): void {
        throw new Error("Method not implemented.");
    }
    shiftFromQueue(): IEntProcess {
        throw new Error("Method not implemented.");
    }
}
