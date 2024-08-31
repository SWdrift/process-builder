import { IEntProcess } from '../../../interface/flowManager';
export interface IProcessParser {
    parseString(flowString: string | object): IEntProcess | undefined;
}
