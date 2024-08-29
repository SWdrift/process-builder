import { MessageResponse } from "../../../interface/flowChat";

export interface IAgentApi {
    requestSingle(
        message: string,
        option?: RequestSingleConfig
    ): Promise<MessageResponse | undefined>;
}

export interface RequestSingleConfig {
    system?: string;
}
