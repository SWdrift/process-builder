import { IFlowChat, MessageResponse } from "../../interface/flowChat";
import { IAgent } from "./interface/flowManager";

export type { IAgent };

export class FlowChat implements IFlowChat {
    constructor(private flowManager: IAgent) {}
    async send(text: string): Promise<MessageResponse | undefined> {
        return await this.flowManager.sendMessage(text);
    }
}
