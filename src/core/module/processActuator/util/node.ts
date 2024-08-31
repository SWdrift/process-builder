import { NodeDescribe } from "../../../interface/flowManager";

export function getNodeKey(node: NodeDescribe): string {
    return `${node.id}-${node.instanceId}`;
}
