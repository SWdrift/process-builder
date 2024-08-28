import { MessageResponse } from "../../../interface/flowChat";
import { IFlowAgentApi } from "../interface/flowAgentApi";
import { post } from "../../../public/module/api";
import { logger } from "../../../public/module/logger";

interface IConfig {
    url: string;
}

interface Response {
    id: string;
    result: string;
    created: number;
}

export class FlowAgentApiWenxin implements IFlowAgentApi {
    constructor(public config: IConfig) {}
    async requestSingle(
        message: string,
        options?: { system?: string }
    ): Promise<MessageResponse | undefined> {
        try {
            const request = {
                messages: [
                    {
                        role: "user",
                        content: message
                    }
                ],
                system: options?.system || ""
            };
            const response = await post<Response>(this.config.url, request);
            return {
                id: response.data.id,
                data: response.data.result,
                timestamp: response.data.created,
                property: {
                    ...response.data
                }
            };
        } catch (error) {
            logger.record(`The request failed: ${error}`, logger.Level.Error);
        }
    }
}
