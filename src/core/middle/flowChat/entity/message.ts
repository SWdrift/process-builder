import { IEntMessage } from "../../../interface/flowChat";

export class EntMessage implements IEntMessage {
    id: string;
    data: string;
    timestamp: number = Date.now();
    isError?: boolean | undefined;
    property?: { [key: string]: any } | undefined;

    constructor(config: {
        id: string;
        data: string;
        error?: boolean;
        property?: { [key: string]: any } | undefined;
    }) {
        this.id = config.id;
        this.data = config.data;
        this.property = config.property;
        this.isError = config.error;
    }
}
