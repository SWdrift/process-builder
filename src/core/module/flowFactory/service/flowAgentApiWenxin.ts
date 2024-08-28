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
    async requestSingle(message: string): Promise<MessageResponse | undefined> {
        try {
            const request = await post<Response>(this.config.url, {
                messages: [
                    {
                        role: "user",
                        content: message
                    }
                ]
            });
            return {
                id: request.data.id,
                data: request.data.result,
                timestamp: request.data.created,
                property: {
                    ...request.data
                }
            };
        } catch (error) {
            logger.record(`The request failed: ${error}`, logger.Level.Error);
        }
    }
}
