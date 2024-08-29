import { IEntMessage } from "../../interface/flowChat";
import { IAgent } from "../../middle/flowChat";
import { INodeStorage } from "../../middle/flowNode";
import { TokenBuilder } from "./service/tokenBuilder";
import { AgentSocket } from "./service/agentSocket";
import { IAgentApi } from "./interface/agentApi";

export class Agent implements IAgent {
    constructor(
        private nodeStorage: INodeStorage,
        private agentApi: IAgentApi,
        private tokenBuilder: TokenBuilder = new TokenBuilder(nodeStorage),
        private agentSocket: AgentSocket = new AgentSocket(agentApi)
    ) {}
    async sendMessage(message: IEntMessage): Promise<IEntMessage> {
        const token = this.tokenBuilder.buildToken(message.data);
        return await this.agentSocket.chat(token);
    }
}

export { AgentWenxin } from "./service/agentWenxin";