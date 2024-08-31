import { IEntMessage } from '../../../interface/flowChat';
export declare class EntMessage implements IEntMessage {
    id: string;
    data: string;
    timestamp: number;
    isError?: boolean | undefined;
    property?: {
        [key: string]: any;
    } | undefined;
    constructor(config: {
        id: string;
        data: string;
        error?: boolean;
        property?: {
            [key: string]: any;
        } | undefined;
    });
}
