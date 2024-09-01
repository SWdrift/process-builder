import { IEntSession, IEntMessage } from "../../../interface/chat";

export class EntSession implements IEntSession {
    constructor(
        public q: IEntMessage,
        public a: IEntMessage,
        public timestamp: number = Date.now()
    ) {}
}
