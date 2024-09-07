import { IEntMessage } from "../../interface/chat";
import { IAgent } from "../../middle/chat";
import { INodeManager } from "../../middle/manager";
import { TokenBuilder } from "./service/tokenBuilder";
import { AgentSocket } from "./service/agentSocket";
import { IAgentApi } from "./interface/agentApi";
import { EnumLanguage } from "../../interface/config";

export class Agent implements IAgent {
    private tokenBuilder: TokenBuilder;
    private agentSocket: AgentSocket;

    constructor(nodeStorage: INodeManager, agentApi: IAgentApi, language: EnumLanguage) {
        this.tokenBuilder = new TokenBuilder(nodeStorage, language);
        this.agentSocket = new AgentSocket(agentApi);
    }

    async sendMessage(message: IEntMessage): Promise<IEntMessage> {
        const token = this.tokenBuilder.buildToken(message.data);
        return await this.agentSocket.chat(token);
    }
}

export * from "./modules/agentWenxin";
