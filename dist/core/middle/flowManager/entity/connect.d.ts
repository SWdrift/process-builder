import { IEntConnect, NodeDescribe } from '../../../interface/flowManager';
export declare class EntConnect implements IEntConnect {
    fromNode: NodeDescribe;
    toNode: NodeDescribe;
    toParam: string;
    constructor(fromNode: NodeDescribe, toNode: NodeDescribe, toParam: string);
}
