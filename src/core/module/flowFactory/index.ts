import { MessageResponse } from "../../interface/flowChat";
import { IFlowManager } from "../../middle/flowChat";
import { INodeManager } from "../../middle/flowManager";
import { TokenBuilder } from "./service/tokenBuilder";
import { FlowAgent } from "./service/flowAgent";
import { IFlowAgentApi } from "./interface/flowAgentApi";

export class FlowFactory implements IFlowManager {
    constructor(
        private nodeManager: INodeManager,
        private flowAgentApi: IFlowAgentApi,
        private flowAgent: FlowAgent = new FlowAgent(flowAgentApi),
        private tokenBuilder: TokenBuilder = new TokenBuilder(nodeManager)
    ) {}
    async sendMessage(message: string): Promise<MessageResponse | undefined> {
        const token = this.tokenBuilder.buildToken(message);
        return await this.flowAgent.chat(token);
    }
}

export { FlowAgentApiWenxin } from "./service/flowAgentApiWenxin";