import { IChat, IEntSession } from '../../interface/chat';
import { IManager } from '../../interface/manager';
import { EntMessage } from './entity/message';
import { IAgent } from './interface/agent';
export { EntMessage };
export type { IAgent };
export declare class FlowChat implements IChat {
    sessionHistory: IEntSession[];
    private actionSession;
    constructor(agent: IAgent, flowManager: IManager);
    send(text: string): Promise<IEntSession>;
}
