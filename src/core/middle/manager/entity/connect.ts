import { IEntConnect, NodeDescribe } from "../../../interface/manager";

export class EntConnect implements IEntConnect {
    constructor(
        public fromNode: NodeDescribe,
        public toNode: NodeDescribe,
        public toParam: string
    ) {}
}
