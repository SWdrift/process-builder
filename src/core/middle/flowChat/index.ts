import { IFlowChat, IEntSession } from "../../interface/flowChat";
import { IFlowManager } from "../../interface/flowManager";
import { ActionSession } from "./action/actionSession";

import { EntMessage } from "./entity/message";
import { IAgent } from "./interface/agent";
export { EntMessage };
export type { IAgent };

export class FlowChat implements IFlowChat {
    sessionHistory: IEntSession[] = [];

    constructor(
        private agent: IAgent,
        private flowManager: IFlowManager,
        private actionSession: ActionSession = new ActionSession(agent, flowManager)
    ) {}
    async send(text: string): Promise<IEntSession> {
        const session = await this.actionSession.chatSingle(text);
        this.sessionHistory.push(session);
        return session;
    }
}
