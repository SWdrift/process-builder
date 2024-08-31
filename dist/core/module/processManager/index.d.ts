import { IEntProcess } from '../../interface/flowManager';
import { IProcessManager } from '../../middle/flowManager';
export declare class ProcessManager implements IProcessManager {
    processQueue: IEntProcess[];
    pushToQueue(process: IEntProcess): void;
    shiftFromQueue(): IEntProcess | undefined;
}
