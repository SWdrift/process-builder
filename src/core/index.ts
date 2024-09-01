import { FlowChat } from "./middle/flowChat";
import { FlowManager } from "./middle/flowManager";
import { NodeManager } from "./module/nodeManager";
import { Agent, AgentWenxin } from "./module/agent";
import { ProcessActuator } from "./module/processActuator";
import { ProcessManager } from "./module/processManager";
import { ProcessParser } from "./module/processParser";
import { FlowContainerConfig } from "./index.d";

export { AgentWenxin };

export class FlowContainer {
    manager: FlowManager;
    chat: FlowChat;
    constructor(config: FlowContainerConfig) {
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
