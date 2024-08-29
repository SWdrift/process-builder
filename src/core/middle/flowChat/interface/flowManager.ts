import { MessageResponse } from "../../../interface/flowChat";

export interface IAgent {
    sendMessage(message: string): Promise<MessageResponse | undefined>;
}
