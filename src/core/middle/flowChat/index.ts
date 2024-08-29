import { IFlowChat, IEntSession } from "../../interface/flowChat";
import { ActionSession } from "./action/actionSession";
import { IAgent } from "./interface/agent";
import { IFlowParsing } from "./interface/flowParsing";
import { EntMessage } from "./entity/message";

export { EntMessage };
export type { IAgent };
export type { IFlowParsing };

export class FlowChat implements IFlowChat {
    sessionHistory: IEntSession[] = [];

    constructor(
        private agent: IAgent,
        private actionSession: ActionSession = new ActionSession(agent)
    ) {}
    async send(text: string): Promise<IEntSession> {
        const session = await this.actionSession.chatSingle(text);
        this.sessionHistory.push(session);
        return session;
    }
}
