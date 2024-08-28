import { MessageResponse } from "../../../interface/flowChat";

export interface IFlowManager {
    sendMessage(message: string): Promise<MessageResponse | undefined>;
}
