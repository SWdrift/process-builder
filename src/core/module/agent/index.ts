import { MessageResponse } from "../../interface/flowChat";
import { IAgent } from "../../middle/flowChat";
import { INodeManager } from "../../middle/flowManager";
import { TokenBuilder } from "./service/tokenBuilder";
import { AgentSocket } from "./service/agentSocket";
import { IAgentApi } from "./interface/agentApi";

export class Agent implements IAgent {
    constructor(
        private nodeManager: INodeManager,
        private agentApi: IAgentApi,
        private tokenBuilder: TokenBuilder = new TokenBuilder(nodeManager),
        private agentSocket: AgentSocket = new AgentSocket(agentApi)
    ) {}
    async sendMessage(message: string): Promise<MessageResponse | undefined> {
        const token = this.tokenBuilder.buildToken(message);
        return await this.agentSocket.chat(token);
    }
}

export { AgentWenxin } from "./service/agentWenxin";
