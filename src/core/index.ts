import { FlowChat } from "./middle/flowChat";
import { FlowManager } from "./middle/flowManager";

import { NodeManager } from "./module/nodeManager";
import { Agent, AgentWenxin } from "./module/agent";
import { ProcessManager } from "./module/processManager";
import { ProcessParser } from "./module/processParser";

const url = "https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions_pro";
const accessToken = "24.1e34beb9496661e0aaca24a671736c24.2592000.1727444856.282335-60067339";

const nodeManager = new NodeManager();
const flowAgentApi = new AgentWenxin({
    url: url + "?access_token=" + accessToken
});
const agent = new Agent(nodeManager, flowAgentApi);
const processManager = new ProcessManager();
const processParser = new ProcessParser(nodeManager);

const flowManager = new FlowManager(nodeManager, processManager, processParser);
const flowChat = new FlowChat(agent, flowManager);

export { flowManager, flowChat };