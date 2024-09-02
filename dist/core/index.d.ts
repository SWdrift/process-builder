import { FlowChat } from './middle/chat';
import { FlowManager } from './middle/manager';
import { AgentWenxin } from './module/agent';
import { IModuleConfig } from './interface/config';
export { AgentWenxin };
export declare class ProcessContainer {
    manager: FlowManager;
    chat: FlowChat;
    constructor(config: IModuleConfig);
    getManager(): FlowManager;
    getChat(): FlowChat;
}
