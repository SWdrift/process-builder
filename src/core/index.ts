import { FlowChat } from "./middle/flowChat";
import { FlowNode } from "./middle/flowNode";

import { NodeManager } from "./module/node";
import { Agent, AgentWenxin } from "./module/agent";

const url = "https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions_pro";
const accessToken = "24.1e34beb9496661e0aaca24a671736c24.2592000.1727444856.282335-60067339";

const nodeManager = new NodeManager();
const flowAgentApi = new AgentWenxin({
    url: url + "?access_token=" + accessToken
});
const flowFactory = new Agent(nodeManager, flowAgentApi);

const flowChat = new FlowChat(flowFactory);
const flowManager = new FlowNode(nodeManager);

export { flowChat, flowManager };