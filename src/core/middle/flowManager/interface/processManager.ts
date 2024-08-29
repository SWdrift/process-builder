import { IEntProcess } from "../../../interface/flowManager";

export interface IProcessManager {
    processQueue: IEntProcess[];
    pushToQueue(process: IEntProcess): void;
    shiftFromQueue(): IEntProcess | undefined;
}
