import { IEntMessage } from "../../../interface/chat";
import { EnumLanguage } from "../../../interface/config";
import { EntMessage } from "../../../middle/chat";
import { IAgentApi } from "../interface/agentApi";
import { TOKEN_CONFIG } from "../setting/token";

export class AgentSocket {
    constructor(
        private api: IAgentApi,
        private language: EnumLanguage
    ) {}
    async chat(message: string): Promise<IEntMessage> {
        const token = TOKEN_CONFIG[this.language];
        const response = await this.api.requestSingle(message, {
            system: token.ABSTRACT
        });
        if (!response || !response.data) {
            return new EntMessage({ id: "system", data: "Error", error: true });
        }
        return {
            ...response
        };
    }
}
