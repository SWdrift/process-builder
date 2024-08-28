import { FlowChat } from "./middle/flowChat";
import { FlowManager } from "./middle/flowManager";

import { NodeManager } from "./module/nodeManager";

const flowChat = new FlowChat();
const flowManager = new FlowManager(new NodeManager());

export { flowChat, flowManager };
