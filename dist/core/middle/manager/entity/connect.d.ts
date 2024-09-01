import { IEntConnect, NodeDescribe } from '../../../interface/manager';
export declare class EntConnect implements IEntConnect {
    fromNode: NodeDescribe;
    toNode: NodeDescribe;
    toParam: string;
    constructor(fromNode: NodeDescribe, toNode: NodeDescribe, toParam: string);
}
