import { INodeManager } from '../../../middle/manager';
export declare class TokenBuilder {
    private nodeManager;
    constructor(nodeManager: INodeManager);
    buildToken(message: string): string;
    getNodeString(): {
        methodString: string;
        valueString: string;
    };
}
