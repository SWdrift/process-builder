import { IEntMessage } from '../../../interface/chat';
import { IHttpService } from '../../../public/module/api';
export interface IAgentApi {
    httpServer: IHttpService;
    requestSingle(message: string, option?: RequestSingleConfig): Promise<IEntMessage | undefined>;
}
export interface RequestSingleConfig {
    system?: string;
}
