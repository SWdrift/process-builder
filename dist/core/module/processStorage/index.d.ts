import { IEntProcess } from '../../interface/manager';
import { IProcessManager } from '../../middle/manager';
export declare class ProcessManager implements IProcessManager {
    processQueue: IEntProcess[];
    pushToQueue(process: IEntProcess): void;
    shiftFromQueue(): IEntProcess | undefined;
}
