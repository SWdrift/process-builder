import { IEntProcess } from "../../../interface/flowManager";

export interface IProcessActuator {
    execute(process: IEntProcess): Promise<any>;
}
