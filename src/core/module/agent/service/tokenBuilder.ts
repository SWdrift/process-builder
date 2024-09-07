import { EnumLanguage } from "../../../interface/config";
import { EnumNode } from "../../../interface/manager";
import { INodeManager } from "../../../middle/manager";
import { TOKEN_CONFIG } from "../setting/token";

export class TokenBuilder {
    constructor(
        private nodeManager: INodeManager,
        private language: EnumLanguage
    ) {}
    buildToken(message: string): string {
        const { methodString, valueString } = this.getNodeString();
        const token = TOKEN_CONFIG[this.language];

        const messageToken = `${token.MESSAGE_PREFIX}${message}${token.MESSAGE_SUFFIX}`;
        const methodToken = `${token.METHOD_PREFIX}${methodString}${token.METHOD_SUFFIX}`;
        const valueToken = `${token.VALUE_PREFIX}${valueString}${token.VALUE_SUFFIX}`;

        return token.PREFIX + messageToken + methodToken + valueToken + token.SUFFIX;
    }

    getNodeString(): { methodString: string; valueString: string } {
        const nodes = this.nodeManager.getAllNodes();
        const methods = nodes.filter((node) => node.define.type === EnumNode.Function);
        const values = nodes.filter((node) => node.define.type === EnumNode.Constant);

        const methodString = JSON.stringify(methods);
        const valueString = JSON.stringify(values);

        return { methodString, valueString };
    }
}
