import { IEntMessage } from '../../interface/flowChat';
import { IAgent } from '../../middle/flowChat';
import { INodeManager } from '../../middle/flowManager';
import { IAgentApi } from './interface/agentApi';
export declare class Agent implements IAgent {
    private tokenBuilder;
    private agentSocket;
    constructor(nodeStorage: INodeManager, agentApi: IAgentApi);
    sendMessage(message: IEntMessage): Promise<IEntMessage>;
}
export { AgentWenxin } from './service/agentWenxin';
