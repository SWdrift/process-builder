import { MessageResponse } from "../../../interface/flowChat";
import { IAgentApi } from "../interface/agentApi";
import { TOKEN_CONFIG } from "../setting/token";

export class AgentSocket {
    constructor(private api: IAgentApi) {}
    async chat(message: string): Promise<MessageResponse | undefined> {
        const response = await this.api.requestSingle(message, {
            system: TOKEN_CONFIG.SYSTEM
        });
        if (!response) {
            return;
        }
        return {
            ...response
        };
    }
}
