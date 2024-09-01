import { IAgentApi } from "./module/agent/interface/agentApi";

export * from "./interface/flowChat";
export * from "./interface/flowManager";

export interface FlowContainerConfig {
    agent: IAgentApi;
}