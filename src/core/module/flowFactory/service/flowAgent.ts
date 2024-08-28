import { MessageResponse } from "../../../interface/flowChat";
import { IFlowAgentApi } from "../interface/flowAgentApi";
import { TOKEN_CONFIG } from "../setting/token";

export class FlowAgent {
    constructor(private api: IFlowAgentApi) {}
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
