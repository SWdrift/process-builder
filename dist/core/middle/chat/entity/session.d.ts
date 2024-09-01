import { IEntSession, IEntMessage } from '../../../interface/chat';
export declare class EntSession implements IEntSession {
    q: IEntMessage;
    a: IEntMessage;
    timestamp: number;
    constructor(q: IEntMessage, a: IEntMessage, timestamp?: number);
}
