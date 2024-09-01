import { IEntMessage } from '../../../interface/chat';
import { IAgentApi } from '../interface/agentApi';
interface IConfig {
    baseUrl?: string;
    accessToken: string;
}
export declare class AgentWenxin implements IAgentApi {
    config: IConfig;
    url: string;
    constructor(config: IConfig);
    requestSingle(message: string, options?: {
        system?: string;
    }): Promise<IEntMessage | undefined>;
    private getRequestUrl;
}
export {};
