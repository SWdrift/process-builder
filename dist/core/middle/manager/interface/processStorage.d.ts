import { IEntProcess } from '../../../interface/manager';
export interface IProcessManager {
    processQueue: IEntProcess[];
    pushToQueue(process: IEntProcess): void;
    shiftFromQueue(): IEntProcess | undefined;
}
