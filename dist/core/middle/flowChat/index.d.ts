import { IFlowChat, IEntSession } from '../../interface/flowChat';
import { IFlowManager } from '../../interface/flowManager';
import { EntMessage } from './entity/message';
import { IAgent } from './interface/agent';
export { EntMessage };
export type { IAgent };
export declare class FlowChat implements IFlowChat {
    sessionHistory: IEntSession[];
    private actionSession;
    constructor(agent: IAgent, flowManager: IFlowManager);
    send(text: string): Promise<IEntSession>;
}
