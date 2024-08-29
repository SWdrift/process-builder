import { IEntProcess } from "../../interface/flowManager";
import { IProcessManager } from "../../middle/flowManager";

export class ProcessManager implements IProcessManager {
    processQueue: IEntProcess[] = [];
    pushToQueue(process: IEntProcess): void {
        this.processQueue.push(process);
    }
    shiftFromQueue(): IEntProcess | undefined {
        return this.processQueue.shift();
    }
}
