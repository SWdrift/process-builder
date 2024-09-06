import { IEntConnect, IEntProcess } from "../../../interface/manager";

export class EntProcess implements IEntProcess {
    constructor(
        public id: string,
        public timestamp: number = Date.now(),
        public nodeGraph: IEntConnect[]
    ) {}
}
