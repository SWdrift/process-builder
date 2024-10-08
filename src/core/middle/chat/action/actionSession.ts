import { IEntSession } from "../../../interface/chat";
import { IManager } from "../../../interface/manager";
import { EntMessage } from "../entity/message";
import { EntSession } from "../entity/session";
import { IAgent } from "../interface/agent";

export class ActionSession {
    constructor(
        private agent: IAgent,
        private flowManager: IManager
    ) {}

    async chatSingle(text: string): Promise<IEntSession> {
        const userMessage = new EntMessage({ id: "user", data: text });
        const systemMessage = await this.agent.sendMessage(userMessage);
        const session = new EntSession(userMessage, systemMessage);
        this.addSessionToFlow(session);
        return session;
    }

    private addSessionToFlow(session: IEntSession): void {
        if (session.a.isProcess) {
            this.flowManager.addProcess(session.a.data);
        }
    }
}
