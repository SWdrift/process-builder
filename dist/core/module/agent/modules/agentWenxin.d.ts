import { IEntMessage } from '../../../interface/chat';
import { HttpServer } from '../../../public/module/api';
import { IAgentApi } from '../interface/agentApi';
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
export declare class AgentWenxin implements IAgentApi {
    config: IConfig;
    url: string;
    httpServer: HttpServer;
    constructor(config: IConfig);
    requestSingle(message: string, options?: {
        system?: string;
    }): Promise<IEntMessage | undefined>;
    private getRequestUrl;
}
export {};
