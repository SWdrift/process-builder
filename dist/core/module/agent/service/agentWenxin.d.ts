import { IEntMessage } from '../../../interface/flowChat';
import { IAgentApi } from '../interface/agentApi';
interface IConfig {
    url: string;
}
export declare class AgentWenxin implements IAgentApi {
    config: IConfig;
    constructor(config: IConfig);
    requestSingle(message: string, options?: {
        system?: string;
    }): Promise<IEntMessage | undefined>;
}
export {};
