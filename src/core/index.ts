import { FlowChat } from "./middle/flowChat";
import { FlowManager } from "./middle/flowManager";

import { NodeManager } from "./module/nodeManager";
import { FlowFactory, FlowAgentApiWenxin } from "./module/flowFactory";

const url = "https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions_pro";
const accessToken = "24.1e34beb9496661e0aaca24a671736c24.2592000.1727444856.282335-60067339";

const nodeManager = new NodeManager();
const flowAgentApi = new FlowAgentApiWenxin({
    url: url + "?access_token=" + accessToken
});
const flowFactory = new FlowFactory(nodeManager, flowAgentApi);

const flowChat = new FlowChat(flowFactory);
const flowManager = new FlowManager(nodeManager);

export { flowChat, flowManager };
