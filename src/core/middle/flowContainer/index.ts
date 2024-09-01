import { IFlowChat } from "../../interface/flowChat";
import { IFlowContainer } from "../../interface/flowContainer";
import { IFlowManager } from "../../interface/flowManager";
import { IAgentApi } from "../../module/agent/interface/agentApi";

export class FlowContainer implements IFlowContainer {
    manager: IFlowManager;
    chat: IFlowChat;
    constructor(public )
    getManager(): IFlowManager {
        throw new Error("Method not implemented.");
    }
    getChat(): IFlowChat {
        throw new Error("Method not implemented.");
    }
}
