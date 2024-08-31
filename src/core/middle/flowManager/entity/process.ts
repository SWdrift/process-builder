import { IEntProcess } from "../../../interface/flowManager";

export class EntProcess implements IEntProcess {
    constructor(
        public id: string,
        public timestamp: number = Date.now(),
        public nodeGraph: []
    ) {}
}
