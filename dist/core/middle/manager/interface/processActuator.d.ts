import { IEntProcess } from '../../../interface/manager';
export interface IProcessActuator {
    execute(process: IEntProcess): Promise<any>;
}
