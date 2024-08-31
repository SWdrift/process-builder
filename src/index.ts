import { FlowChat } from "./core/middle/flowChat";
import { FlowManager } from "./core/middle/flowManager";

import { NodeManager } from "./core/module/nodeManager";
import { Agent, AgentWenxin } from "./core/module/agent";
import { ProcessActuator } from "./core/module/processActuator";
import { ProcessManager } from "./core/module/processManager";
import { ProcessParser } from "./core/module/processParser";

const url = "https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions_pro";
const accessToken = "24.1e34beb9496661e0aaca24a671736c24.2592000.1727444856.282335-60067339";

const nodeManager = new NodeManager();
const flowAgentApi = new AgentWenxin({
    url: url + "?access_token=" + accessToken
});
const agent = new Agent(nodeManager, flowAgentApi);
const processActuator = new ProcessActuator(nodeManager);
const processManager = new ProcessManager();
const processParser = new ProcessParser(nodeManager);

const flowManager = new FlowManager(nodeManager, processActuator, processManager, processParser);
const flowChat = new FlowChat(agent, flowManager);

export { flowManager, flowChat };