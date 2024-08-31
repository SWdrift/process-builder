import { NodeDescribe } from '../../../interface/flowManager';
export type Connection = {
    fromNode: NodeDescribe;
    toNode: NodeDescribe;
};
export type ConnectionKey = {
    fromNode: string;
    toNode: string;
};
export declare class GraphDrive {
    topologicalSort(connectList: Connection[]): NodeDescribe[] | undefined;
    private nodeKey;
    private mapNCDToKey;
    private mapKeyToNCD;
    private topologicalSortStrings;
}
