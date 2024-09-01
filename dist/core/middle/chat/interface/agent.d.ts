import { IEntMessage } from '../../../interface/chat';
export interface IAgent {
    sendMessage(message: IEntMessage): Promise<IEntMessage>;
}
