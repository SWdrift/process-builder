import { IFlowChat, MessageResponse } from "../../interface/flowChat";

export class FlowChat implements IFlowChat {
    send(text: string): Promise<MessageResponse> {
        throw new Error("Method not implemented.");
    }
}
