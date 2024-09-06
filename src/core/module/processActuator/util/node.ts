import { INodeIndex } from "../../../interface/manager";

export function getNodeKey(node: INodeIndex): string {
    return `${node.name}-${node.instanceId}`;
}
