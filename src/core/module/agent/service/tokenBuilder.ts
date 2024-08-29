import { EnumFlowNode } from "../../../interface/flowNode";
import { INodeStorage } from "../../../middle/flowNode";
import { TOKEN_CONFIG } from "../setting/token";

export class TokenBuilder {
    constructor(private nodeManager: INodeStorage) {}
    buildToken(message: string): string {
        const { methodString, valueString } = this.getNodeString();

        const messageToken = `${TOKEN_CONFIG.MESSAGE_PREFIX}${message}${TOKEN_CONFIG.MESSAGE_SUFFIX}`;
        const methodToken = `${TOKEN_CONFIG.METHOD_PREFIX}${methodString}${TOKEN_CONFIG.METHOD_SUFFIX}`;
        const valueToken = `${TOKEN_CONFIG.VALUE_PREFIX}${valueString}${TOKEN_CONFIG.VALUE_SUFFIX}`;

        return TOKEN_CONFIG.PREFIX + messageToken + methodToken + valueToken + TOKEN_CONFIG.SUFFIX;
    }

    getNodeString(): { methodString: string; valueString: string } {
        const nodes = this.nodeManager.getAllNodes();
        const methods = nodes.filter((node) => node.type === EnumFlowNode.Method);
        const values = nodes.filter((node) => node.type === EnumFlowNode.Value);

        const methodString = JSON.stringify(methods);
        const valueString = JSON.stringify(values);

        return { methodString, valueString };
    }
}