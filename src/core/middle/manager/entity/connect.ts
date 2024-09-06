import { IEntConnect, INodeIndex } from "../../../interface/manager";

export class EntConnect implements IEntConnect {
    constructor(
        public fromNode: INodeIndex,
        public toNode: INodeIndex,
        public toParam: string
    ) {}
}
