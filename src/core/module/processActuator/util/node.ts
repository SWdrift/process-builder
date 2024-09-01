import { NodeDescribe } from "../../../interface/manager";

export function getNodeKey(node: NodeDescribe): string {
    return `${node.id}-${node.instanceId}`;
}
