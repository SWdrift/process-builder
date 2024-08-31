import { IEntMessage } from '../../../interface/flowChat';
export interface IAgent {
    sendMessage(message: IEntMessage): Promise<IEntMessage>;
}
