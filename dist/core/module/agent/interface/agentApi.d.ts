import { IEntMessage } from '../../../interface/flowChat';
export interface IAgentApi {
    requestSingle(message: string, option?: RequestSingleConfig): Promise<IEntMessage | undefined>;
}
export interface RequestSingleConfig {
    system?: string;
}
