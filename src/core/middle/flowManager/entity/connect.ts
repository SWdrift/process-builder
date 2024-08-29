import { IEntConnect } from "../../../interface/flowProcess";

export class EntConnect implements IEntConnect {
    constructor(
        public fromNode: string,
        public toNode: string,
        public toParam: string
    ) {}
}
