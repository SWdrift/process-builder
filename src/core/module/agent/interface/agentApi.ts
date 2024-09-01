import { IEntMessage } from "../../../interface/chat";

export interface IAgentApi {
    requestSingle(
        message: string,
        option?: RequestSingleConfig
    ): Promise<IEntMessage | undefined>;
}

export interface RequestSingleConfig {
    system?: string;
}
