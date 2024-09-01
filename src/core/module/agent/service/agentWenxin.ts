import { IEntMessage } from "../../../interface/flowChat";
import { IAgentApi } from "../interface/agentApi";
import { post } from "../../../public/module/api";
import { logger } from "../../../public/module/logger";

interface IConfig {
    baseUrl?: string;
    accessToken: string;
}

interface Response {
    id: string;
    result: string;
    created: number;
}

export class AgentWenxin implements IAgentApi {
    public url: string;
    constructor(public config: IConfig) {
        let url = "";
        if (config.baseUrl) {
            url = config.baseUrl;
        } else {
            url =
                "https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions_pro";
        }
        this.url = this.getRequestUrl(url, config.accessToken);
    }
    async requestSingle(
        message: string,
        options?: { system?: string }
    ): Promise<IEntMessage | undefined> {
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
            const response = await post<Response>(this.url, request);
            return {
                id: response.data.id,
                data: response.data.result,
                timestamp: response.data.created,
                isProcess: true,
                property: {
                    ...response.data
                }
            };
        } catch (error) {
            logger.record(`The request failed: ${error}`, logger.Level.Error);
            throw error;
        }
    }

    private getRequestUrl(url: string, accessToken: string) {
        return `${url}?access_token=${accessToken}`;
    }
}
