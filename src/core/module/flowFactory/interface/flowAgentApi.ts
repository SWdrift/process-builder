import { MessageResponse } from "../../../interface/flowChat";

export interface IFlowAgentApi {
    requestSingle(message: string): Promise<MessageResponse | undefined>;
}
