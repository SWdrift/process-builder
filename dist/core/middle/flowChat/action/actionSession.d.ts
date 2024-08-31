import { IEntSession } from '../../../interface/flowChat';
import { IFlowManager } from '../../../interface/flowManager';
import { IAgent } from '../interface/agent';
export declare class ActionSession {
    private agent;
    private flowManager;
    constructor(agent: IAgent, flowManager: IFlowManager);
    chatSingle(text: string): Promise<IEntSession>;
    private addSessionToFlow;
}
