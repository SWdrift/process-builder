import { IEntSession, IEntMessage } from '../../../interface/flowChat';
export declare class EntSession implements IEntSession {
    q: IEntMessage;
    a: IEntMessage;
    timestamp: number;
    constructor(q: IEntMessage, a: IEntMessage, timestamp?: number);
}
