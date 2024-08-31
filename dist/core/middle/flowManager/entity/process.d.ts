import { IEntProcess } from '../../../interface/flowManager';
export declare class EntProcess implements IEntProcess {
    id: string;
    timestamp: number;
    nodeGraph: [];
    constructor(id: string, timestamp: number, nodeGraph: []);
}
