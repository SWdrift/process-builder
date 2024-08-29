import { IEntProcess } from "../../../interface/flowProcess";

export class EntProcess implements IEntProcess {
    constructor(
        public id: string,
        public nodeTree: []
    ) {}
}
