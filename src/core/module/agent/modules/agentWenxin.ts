import { IEntMessage } from "../../../interface/chat";
import { HttpServer } from "../../../public/module/api";
import { logger } from "../../../public/module/logger";
import { IAgentApi } from "../interface/agentApi";

interface IConfig {
    /** access token */
    accessToken: string;
    /**
     * Wenxin Url
     *
     * @url 默认 ERNIE-4.0-8K https://cloud.baidu.com/doc/WENXINWORKSHOP/s/clntwmv7t
     */
    url?: string;
    [key: string]: any;
}

interface Response {
    id: string;
    result: string;
    created: number;
}

export class AgentWenxin implements IAgentApi {
    public url: string;
    public httpServer: HttpServer;
    constructor(public config: IConfig) {
        this.url = this.getRequestUrl(config);
        this.httpServer = HttpServer.getInstance();
    }

    async requestSingle(
        message: string,
        options?: { system?: string }
    ): Promise<IEntMessage | undefined> {
        try {
            const request = {
                ...this.config,
                messages: [
                    {
                        role: "user",
                        content: message
                    }
                ],
                system: options?.system || "",
            };
            const response = await this.httpServer.post<Response>(this.url, request);
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

    private getRequestUrl(config: IConfig) {
        const url =
            config.url ??
            "https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions_pro";
        return `${url}?access_token=${config.accessToken}`;
    }
}
