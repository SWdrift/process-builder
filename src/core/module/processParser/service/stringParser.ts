import { IEntProcess, IEntConnect, EnumNode, IEntNode } from "../../../interface/flowManager";
import { INodeManager } from "../../../middle/flowManager";
import { logger } from "../../../public/module/logger";

export class FlowStringParser {
    constructor(private flowNode: INodeManager) {}

    parse(text: string | object): IEntProcess | undefined {
        const data = this.convertToObject(text);
        if (!data) {
            return undefined;
        }
        return this.getVerifiedProcess(data);
    }

    private convertToObject(text: string | object): object | undefined {
        if (typeof text === "string") {
            return this.extractJson(text);
        }
        if (typeof text === "object") {
            return text;
        }
        return undefined;
    }

    private extractJson(string: string): object | undefined {
        const jsonCodeBlockRegex = /```json\s*([\s\S]*?)\s*```/g;
        const match = jsonCodeBlockRegex.exec(string);
        try {
            if (match && match[1]) {
                return JSON.parse(match[1].trim());
            } else {
                return JSON.parse(string);
            }
        } catch (error) {
            logger.record(`string parser error, invalid json ${error}`, logger.Level.Warn);
            return undefined;
        }
    }

    private getVerifiedProcess(data: IEntProcess | object): IEntProcess | undefined {
        const nodeGraph = this.validateNodeGraph(data);
        if (!nodeGraph) return undefined;
        return {
            id: "",
            timestamp: Date.now(),
            nodeGraph: nodeGraph
        };
    }

    private validateNodeGraph(
        data: IEntProcess["nodeGraph"] | unknown
    ): IEntProcess["nodeGraph"] | undefined {
        if (!Array.isArray(data)) {
            logger.record(`string parser error, invalid data`, logger.Level.Warn);
            return undefined;
        }
        for (const value of data as IEntConnect[]) {
            if (!this.validateConnect(value)) {
                return undefined;
            }
            if (!this.validateNode(value)) {
                return undefined;
            }
        }
        return data as IEntProcess["nodeGraph"];
    }

    private validateConnect(data: IEntConnect | unknown): boolean {
        if (!data || typeof data !== "object") {
            logger.record(`string parser error, invalid data`, logger.Level.Warn);
            return false;
        }
        if (
            !data.hasOwnProperty("fromNode") ||
            !data.hasOwnProperty("toNode") ||
            !data.hasOwnProperty("toParam")
        ) {
            logger.record(`string parser error, invalid data`, logger.Level.Warn);
            return false;
        }
        return true;
    }

    private validateNode(data: IEntConnect): boolean {
        const fromNode = this.flowNode.getNodeById(data.fromNode.id);
        const toNode = this.flowNode.getNodeById(data.toNode.id);
        if (!fromNode || !toNode) {
            logger.record(`string parser error, node not found`, logger.Level.Warn);
            return false;
        }
        if (!this.validateParam(toNode, data.toParam)) {
            return false;
        }
        return true;
    }

    private validateParam(data: IEntNode<EnumNode>, paramId: string): boolean {
        if (data.type !== EnumNode.Method) {
            return true;
        }
        const node = data as IEntNode<EnumNode.Method>;

        if (!Array.isArray(node.describe.params)) {
            return false;
        }
        const param = node.describe.params.find((item) => item.id === paramId);
        if (!param) {
            logger.record(`string parser error, param not found`, logger.Level.Warn);
            return false;
        }
        return true;
    }
}
