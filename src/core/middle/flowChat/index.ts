import { IFlowChat, MessageResponse } from "../../interface/flowChat";
import { IFlowManager } from "./interface/flowManager";

export type { IFlowManager };

export class FlowChat implements IFlowChat {
    constructor(private flowManager: IFlowManager) {}
    async send(text: string): Promise<MessageResponse | undefined> {
        return await this.flowManager.sendMessage(text);
    }
}
