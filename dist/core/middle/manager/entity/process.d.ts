import { IEntProcess } from '../../../interface/manager';
export declare class EntProcess implements IEntProcess {
    id: string;
    timestamp: number;
    nodeGraph: [];
    constructor(id: string, timestamp: number, nodeGraph: []);
}
