import { IEntMessage } from '../../../interface/flowChat';
import { IAgentApi } from '../interface/agentApi';
export declare class AgentSocket {
    private api;
    constructor(api: IAgentApi);
    chat(message: string): Promise<IEntMessage>;
}
