import { IEntMessage } from "../../interface/flowChat";
import { IAgent } from "../../middle/flowChat";
import { INodeManager } from "../../middle/flowManager";
import { TokenBuilder } from "./service/tokenBuilder";
import { AgentSocket } from "./service/agentSocket";
import { IAgentApi } from "./interface/agentApi";

export class Agent implements IAgent {
    private tokenBuilder: TokenBuilder;
    private agentSocket: AgentSocket;

    constructor(nodeStorage: INodeManager, agentApi: IAgentApi) {
        this.tokenBuilder = new TokenBuilder(nodeStorage);
        this.agentSocket = new AgentSocket(agentApi);
    }

    async sendMessage(message: IEntMessage): Promise<IEntMessage> {
        const token = this.tokenBuilder.buildToken(message.data);
        return await this.agentSocket.chat(token);
    }
}

export { AgentWenxin } from "./service/agentWenxin";
