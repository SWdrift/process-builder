import { FlowChat } from "./middle/chat";
import { FlowManager } from "./middle/manager";
import { NodeManager } from "./module/processNode";
import { Agent, AgentWenxin } from "./module/agent";
import { ProcessActuator } from "./module/processActuator";
import { ProcessManager } from "./module/processStorage";
import { ProcessParser } from "./module/processParser";
import { IModuleConfig } from "./interface/config";

export { AgentWenxin };

export class ProcessContainer {
    manager: FlowManager;
    chat: FlowChat;
    constructor(config: IModuleConfig) {
        const nodeManager = new NodeManager();
        const agent = new Agent(nodeManager, config.agent);
        const processActuator = new ProcessActuator(nodeManager);
        const processManager = new ProcessManager();
        const processParser = new ProcessParser(nodeManager);
        this.manager = new FlowManager(nodeManager, processActuator, processManager, processParser);
        this.chat = new FlowChat(agent, this.manager);
    }
    getManager() {
        return this.manager;
    }
    getChat() {
        return this.chat;
    }
}
