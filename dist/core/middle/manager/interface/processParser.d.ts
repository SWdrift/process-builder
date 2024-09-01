import { IEntProcess } from '../../../interface/manager';
export interface IProcessParser {
    parseString(flowString: string | object): IEntProcess | undefined;
}
