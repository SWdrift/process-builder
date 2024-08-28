import { MessageResponse } from "../../../interface/flowChat";
import { IFlowAgentApi } from "../interface/flowAgentApi";

export class FlowAgent {
    constructor(private api: IFlowAgentApi) {}
    async chat(message: string): Promise<MessageResponse | undefined> {
        const response = await this.api.requestSingle(message);
        if (!response) {
            return;
        }
        return {
            ...response
        };
    }
}
