import { IEntMessage } from '../../interface/chat';
import { IAgent } from '../../middle/chat';
import { INodeManager } from '../../middle/manager';
import { IAgentApi } from './interface/agentApi';
export declare class Agent implements IAgent {
    private tokenBuilder;
    private agentSocket;
    constructor(nodeStorage: INodeManager, agentApi: IAgentApi);
    sendMessage(message: IEntMessage): Promise<IEntMessage>;
}
export * from './modules/agentWenxin';
