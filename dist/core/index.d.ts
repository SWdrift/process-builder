import { FlowChat } from './middle/chat';
import { FlowManager } from './middle/manager';
import { AgentWenxin } from './module/agent';
import { IAgentApi } from './module/agent/interface/agentApi';
export { AgentWenxin };
export interface ProcessContainerConfig {
    agent: IAgentApi;
}
export declare class ProcessContainer {
    manager: FlowManager;
    chat: FlowChat;
    constructor(config: ProcessContainerConfig);
    getManager(): FlowManager;
    getChat(): FlowChat;
}
