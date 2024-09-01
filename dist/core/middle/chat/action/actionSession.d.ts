import { IEntSession } from '../../../interface/chat';
import { IManager } from '../../../interface/manager';
import { IAgent } from '../interface/agent';
export declare class ActionSession {
    private agent;
    private flowManager;
    constructor(agent: IAgent, flowManager: IManager);
    chatSingle(text: string): Promise<IEntSession>;
    private addSessionToFlow;
}
