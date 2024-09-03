import { IEntMessage } from "../../../interface/chat";
import { HttpServer } from "../../../public/module/api";
import { logger } from "../../../public/module/logger";
import { IAgentApi } from "../interface/agentApi";

/**
 * Agent 配置
 *
 * 更多属性配置请参阅 [智谱AI开放平台文档](https://open.bigmodel.cn/dev/api#language)。
 */
interface IConfig {
    model: string;
    max_tokens: string;
    /**
     * 鉴权 access_token
     */
    accessToken: string;
    /**
     * ERNIE-4.0-8K Api
     * @default "https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions_pro"
     */
    url?: string;
    [key: string]: any;
}

interface Response {
    id: string;
    result: string;
    created: number;
}

/**
 * 基于 [ERNIE-4.0-8K](https://cloud.baidu.com/doc/WENXINWORKSHOP/s/clntwmv7t) 的对话类
 * 实现 [IAgentApi](../interface/agentApi.ts) 接口，提供与 ERNIE-4.0-8K API 进行交互的方法。
 */
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
                system: options?.system || ""
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