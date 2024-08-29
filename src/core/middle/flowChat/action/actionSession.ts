import { IEntSession } from "../../../interface/flowChat";
import { EntMessage } from "../entity/message";
import { EntSession } from "../entity/session";
import { IAgent } from "../interface/agent";

export class ActionSession {
    constructor(private agent: IAgent) {}

    async chatSingle(text: string): Promise<IEntSession> {
        const userMessage = new EntMessage({ id: "user", data: text });
        const systemMessage = await this.agent.sendMessage(userMessage);
        return new EntSession(userMessage, systemMessage);
    }
}
