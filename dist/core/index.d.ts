import { IAgentApi } from './module/agent/interface/agentApi';
export * from './interface/chat';
export * from './interface/manager';

export interface FlowContainerConfig {
    agent: IAgentApi;
}