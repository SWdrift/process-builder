import { IEntMessage } from "../../../interface/flowChat";
import { EntMessage } from "../../../middle/flowChat";
import { IAgentApi } from "../interface/agentApi";
import { TOKEN_CONFIG } from "../setting/token";

export class AgentSocket {
    constructor(private api: IAgentApi) {}
    async chat(message: string): Promise<IEntMessage> {
        const response = await this.api.requestSingle(message, {
            system: TOKEN_CONFIG.SYSTEM
        });
        if (!response || !response.data) {
            return new EntMessage({ id: "system", data: "Error", error: true });
        }
        return {
            ...response
        };
    }
}
