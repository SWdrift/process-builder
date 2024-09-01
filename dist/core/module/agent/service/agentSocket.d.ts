import { IEntMessage } from '../../../interface/chat';
import { IAgentApi } from '../interface/agentApi';
export declare class AgentSocket {
    private api;
    constructor(api: IAgentApi);
    chat(message: string): Promise<IEntMessage>;
}
