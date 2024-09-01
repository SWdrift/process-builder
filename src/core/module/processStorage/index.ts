import { IEntProcess } from "../../interface/manager";
import { IProcessManager } from "../../middle/manager";

export class ProcessManager implements IProcessManager {
    processQueue: IEntProcess[] = [];
    pushToQueue(process: IEntProcess): void {
        this.processQueue.push(process);
    }
    shiftFromQueue(): IEntProcess | undefined {
        return this.processQueue.shift();
    }
}
