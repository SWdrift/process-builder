var I = Object.defineProperty;
var T = (r, e, t) => e in r ? I(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var c = (r, e, t) => T(r, typeof e != "symbol" ? e + "" : e, t);
import E from "axios";
class y {
  constructor(e) {
    c(this, "id");
    c(this, "data");
    c(this, "timestamp", Date.now());
    c(this, "isError");
    c(this, "property");
    this.id = e.id, this.data = e.data, this.property = e.property, this.isError = e.error;
  }
}
class F {
  constructor(e, t, s = Date.now()) {
    this.q = e, this.a = t, this.timestamp = s;
  }
}
class D {
  constructor(e, t) {
    this.agent = e, this.flowManager = t;
  }
  async chatSingle(e) {
    const t = new y({ id: "user", data: e }), s = await this.agent.sendMessage(t), o = new F(t, s);
    return this.addSessionToFlow(o), o;
  }
  addSessionToFlow(e) {
    e.a.isProcess && this.flowManager.addProcess(e.a.data);
  }
}
class O {
  constructor(e, t) {
    c(this, "sessionHistory", []);
    c(this, "actionSession");
    this.actionSession = new D(e, t);
  }
  async send(e) {
    const t = await this.actionSession.chatSingle(e);
    return this.sessionHistory.push(t), t;
  }
}
var h = /* @__PURE__ */ ((r) => (r.Method = "Method", r.Value = "Value", r))(h || {}), S = /* @__PURE__ */ ((r) => (r.Debug = "debug", r.Info = "info", r.Warn = "warn", r.Error = "error", r))(S || {});
const b = {
  debug: console.debug,
  info: console.info,
  warn: console.warn,
  error: console.error
}, U = (r, e) => {
  b[e](r);
}, n = {
  Level: S,
  record: U
};
class V {
  constructor(e) {
    this.nodeManager = e;
  }
  isRegisterMethodOk(e, t) {
    if (this.nodeManager.getNodeById(t.id))
      return n.record(
        `method  ${t.id} registe error, method id already exists`,
        n.Level.Warn
      ), !1;
    if (t.describe.length < 1)
      return n.record(
        `method  ${t.id} registe error, method describe is empty`,
        n.Level.Warn
      ), !1;
    if (t.params.length > 0) {
      for (const s of t.params)
        if (s.describe.length < 1)
          return n.record(
            `method  ${t.id} registe error, param ${s.id} describe is empty`,
            n.Level.Warn
          ), !1;
    }
    return t.return && t.return.describe.length < 1 ? (n.record(
      `method  ${t.id} registe error, return describe is empty`,
      n.Level.Warn
    ), !1) : !0;
  }
  isRegisterValueOk(e, t) {
    return this.nodeManager.getNodeById(t.id) ? (n.record(
      `constant  ${t.id} registe error, constant id already exists`,
      n.Level.Warn
    ), !1) : t.describe.length < 1 ? (n.record(
      `method  ${t.id} registe error, method describe is empty`,
      n.Level.Warn
    ), !1) : !0;
  }
}
class N {
  constructor(e, t, s) {
    c(this, "id");
    this.target = e, this.describe = t, this.type = s, this.id = this.getId(t);
  }
  getId(e) {
    return e.id;
  }
}
class A {
  constructor(e, t, s, o, a = new V(e)) {
    this.nodeStorage = e, this.processActator = t, this.processManager = s, this.processParser = o, this.actionValidate = a;
  }
  async performProcess() {
    const e = this.processManager.shiftFromQueue();
    return e ? this.processActator.execute(e) : !1;
  }
  addProcess(e) {
    const t = this.processParser.parseString(e);
    t && this.processManager.pushToQueue(t);
  }
  registerMethodNode(e, t) {
    this.actionValidate.isRegisterMethodOk(e, t) && this.nodeStorage.register(new N(e, t, h.Method));
  }
  registerValueNode(e, t) {
    this.actionValidate.isRegisterValueOk(e, t) && this.nodeStorage.register(new N(e, t, h.Value));
  }
  getNodeById(e) {
    return this.nodeStorage.getNodeById(e);
  }
  getAllNodes() {
    return this.nodeStorage.getAllNodes();
  }
}
const p = class p {
  constructor() {
    c(this, "nodes", {});
    return p.instance || (p.instance = this), p.instance;
  }
  saveNode(e) {
    this.nodes[e.id] = e;
  }
  deleteNode(e) {
    delete this.nodes[e.id];
  }
  updateNode(e) {
    this.nodes[e.id] = e;
  }
  getNodeById(e) {
    if (e in this.nodes)
      return this.nodes[e];
  }
  getAllNodes() {
    return Object.values(this.nodes);
  }
};
c(p, "instance");
let m = p;
class $ {
  constructor(e = new m()) {
    this.nodeStorage = e;
  }
  register(e) {
    this.nodeStorage.saveNode(e);
  }
  getNodeById(e) {
    return this.nodeStorage.getNodeById(e);
  }
  getAllNodes() {
    return this.nodeStorage.getAllNodes();
  }
}
const _ = "你需要根据指定的元描述、用户目的、方法表和值表生成可被应用解析执行的结构化数据以满足用户目的，你的输出的结果应当为指定的数组格式。", k = "以下是元描述：此消息用于构建节点，你需要根据元描述、用户目的、方法表和值表生成可被应用解析执行的结构化数据以满足用户目的。Token包括以下部分：1. 元描述：用于描述消息的目的、格式描述、响应示例、注意事项等，你需要根据元描述来构建可执行的结构化数据；2. 用户目的：用于描述用户的目的，需要根据用户目的结合方法表和值表生成可执行的结构化数据；3. 方法表：包含方法的唯一标识符、描述、参数列表及其描述，以及返回值描述；4. 值表：包含常量的唯一标识符及其描述。", R = "格式描述：1. 方法表格式：[{id:唯一id,describe:方法描述,params:[{id:参数id,describe:参数描述}],return:{id:返回值id,describe:返回值描述}}]2. 值表格式：[{id:唯一id,describe:常量描述}]3. 响应格式，请确保返回结果为数组格式：[{fromNode:{id:来源节点id, instanceId:来源节点实例序号}, toNode:{id:目标节点id, instanceId:目标节点实例序号}, toParam:目标参数id}]", x = '响应示例：假设我们要构建一个简单的图像处理流程，满足用户“为图像添加滤镜”的需求。给定方法表：[{"id":"node1","describe":"加载图像","params":[{"id":"filePath","describe":"图像文件路径"}],"return":{"id":"imageData","describe":"加载的图像数据"}},{"id":"node2","describe":"应用滤镜","params":[{"id":"imageData","describe":"图像数据"},{"id":"filterType","describe":"滤镜类型"}],"return":{"id":"filteredImage","describe":"滤镜处理后的图像数据"}},{"id":"node3","describe":"保存图像","params":[{"id":"imageData","describe":"图像数据"},{"id":"savePath","describe":"保存路径"}],"return":{"id":"saveStatus","describe":"保存状态"}}]给定值表：[{"id":"value1","describe":"滤镜类型 - 灰度滤镜"}]响应应当为：[{"fromNode":{"id":"node1", "instanceId":1}, "toNode":{"id":"node2", "instanceId":1}, "toParam":"imageData"},{"fromNode":{"id":"value1", "instanceId":1}, "toNode":{"id":"node2", "instanceId":1}, "toParam":"filterType"},{"fromNode":{"id":"node2", "instanceId":1}, "toNode":{"id":"node3", "instanceId":1}, "toParam":"imageData"},{"fromNode":{"id":"node1", "instanceId":1}, "toNode":{"id":"node2", "instanceId":2}, "toParam":"imageData"},{"fromNode":{"id":"value1", "instanceId":1}, "toNode":{"id":"node2", "instanceId":2}, "toParam":"filterType"},{"fromNode":{"id":"node2", "instanceId":2}, "toNode":{"id":"node3", "instanceId":2}, "toParam":"imageData"}]', K = "注意事项：1. 如果**不能**或**不确定**能完成用户目的，请**返回空数组[]**2. **请确保响应结果为数组格式**。3. 请确保同一节点的不同实例具有**不同的`instanceId`**，以区分位于不同位置的同类型节点。", C = "元描述结束。", L = "以下是用户目的：", B = "用户目的结束。", X = "以下是方法表：", W = "方法表结束。", j = "以下是值表：", G = "值表结束。", H = "以上是Token的全部内容。", J = {
  SYSTEM: _,
  PREFIX: k + R + x + K + C,
  SUFFIX: H,
  MESSAGE_PREFIX: L,
  MESSAGE_SUFFIX: B,
  METHOD_PREFIX: X,
  METHOD_SUFFIX: W,
  VALUE_PREFIX: j,
  VALUE_SUFFIX: G
}, l = J;
class Q {
  constructor(e) {
    this.nodeManager = e;
  }
  buildToken(e) {
    const { methodString: t, valueString: s } = this.getNodeString(), o = `${l.MESSAGE_PREFIX}${e}${l.MESSAGE_SUFFIX}`, a = `${l.METHOD_PREFIX}${t}${l.METHOD_SUFFIX}`, i = `${l.VALUE_PREFIX}${s}${l.VALUE_SUFFIX}`;
    return l.PREFIX + o + a + i + l.SUFFIX;
  }
  getNodeString() {
    const e = this.nodeManager.getAllNodes(), t = e.filter((i) => i.type === h.Method), s = e.filter((i) => i.type === h.Value), o = JSON.stringify(t), a = JSON.stringify(s);
    return { methodString: o, valueString: a };
  }
}
class q {
  constructor(e) {
    this.api = e;
  }
  async chat(e) {
    const t = await this.api.requestSingle(e, {
      system: l.SYSTEM
    });
    return !t || !t.data ? new y({ id: "system", data: "Error", error: !0 }) : {
      ...t
    };
  }
}
const Y = "localhost:5173";
var v = /* @__PURE__ */ ((r) => (r[r.DATA_SUCCESS = 0] = "DATA_SUCCESS", r[r.SUCCESS = 200] = "SUCCESS", r[r.SERVER_ERROR = 500] = "SERVER_ERROR", r[r.SERVER_FORBIDDEN = 403] = "SERVER_FORBIDDEN", r[r.NOT_FOUND = 404] = "NOT_FOUND", r[r.TOKEN_OVERDUE = 886] = "TOKEN_OVERDUE", r[r.TIMEOUT = 6e4] = "TIMEOUT", r))(v || {}), w = /* @__PURE__ */ ((r) => (r.GET = "get", r.POST = "post", r.PATCH = "patch", r.PUT = "put", r.DELETE = "delete", r))(w || {}), M = /* @__PURE__ */ ((r) => (r.JSON = "application/json;charset=UTF-8", r.TEXT = "text/plain;charset=UTF-8", r.XML = "application/xml;charset=UTF-8", r.FORM_URLENCODED = "application/x-www-form-urlencoded;charset=UTF-8", r.FORM_DATA = "multipart/form-data;charset=UTF-8", r.BINARY = "application/octet-stream;charset=UTF-8", r))(M || {});
const Z = E.create({
  baseURL: Y,
  timeout: v.TIMEOUT
}), z = (r, e, t, s) => Z({
  url: r,
  method: w.POST,
  data: e,
  headers: {
    "Content-Type": M.JSON,
    ...s
  }
});
class ue {
  constructor(e) {
    c(this, "url");
    this.config = e;
    let t = "";
    e.baseUrl ? t = e.baseUrl : t = "https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions_pro", this.url = this.getRequestUrl(t, e.accessToken);
  }
  async requestSingle(e, t) {
    try {
      const s = {
        messages: [
          {
            role: "user",
            content: e
          }
        ],
        system: t?.system || ""
      }, o = await z(this.url, s);
      return {
        id: o.data.id,
        data: o.data.result,
        timestamp: o.data.created,
        isProcess: !0,
        property: {
          ...o.data
        }
      };
    } catch (s) {
      throw n.record(`The request failed: ${s}`, n.Level.Error), s;
    }
  }
  getRequestUrl(e, t) {
    return `${e}?access_token=${t}`;
  }
}
class ee {
  constructor(e, t) {
    c(this, "tokenBuilder");
    c(this, "agentSocket");
    this.tokenBuilder = new Q(e), this.agentSocket = new q(t);
  }
  async sendMessage(e) {
    const t = this.tokenBuilder.buildToken(e.data);
    return await this.agentSocket.chat(t);
  }
}
function f(r) {
  return `${r.id}-${r.instanceId}`;
}
class te {
  constructor(e) {
    this.nodeManager = e;
  }
  /**
   * 执行流程
   * @param processData 流程数据
   * @returns 节点值表 返回所有节点的计算结果
   */
  async run(e) {
    try {
      return await this.executeNodes(e.process, e.nodeDescribes);
    } catch (t) {
      throw n.record(`The process execution failed, ${t}`, n.Level.Warn), t;
    }
  }
  async executeNodes(e, t) {
    const s = {}, o = this.getNodeDepMap(e);
    for (const a of t) {
      const i = f(a);
      s[i] = await this.getNodeValue(a, s, o);
    }
    return s;
  }
  getNodeDepMap(e) {
    const t = {};
    for (const s of e.nodeGraph)
      t[this.getNodeDepKey(s)] = s.fromNode;
    return t;
  }
  getNodeDepKey(e) {
    return `${e.toNode.id}-${e.toParam}-${e.toNode.instanceId}`;
  }
  buildNodeDepKey(e, t, s) {
    return `${e}-${t}-${s}`;
  }
  async getNodeValue(e, t, s) {
    const o = this.nodeManager.getNodeById(e.id);
    if (!o) throw new Error(`Node not found: ${e.id}`);
    if (o.type === h.Value)
      return o.target;
    if (o.type === h.Method)
      return await this.executeFunction(
        e,
        o,
        t,
        s
      );
  }
  async executeFunction(e, t, s, o) {
    if (t.describe.params.length > 0) {
      const a = this.getParamValues(
        e,
        t,
        s,
        o
      );
      return await t.target(...a);
    } else
      return await t.target();
  }
  getParamValues(e, t, s, o) {
    return t.describe.params.map((d) => this.buildNodeDepKey(e.id, d.id, e.instanceId)).map((d) => {
      const u = o[d];
      if (!u) throw new Error(`Dependency node not found: ${d}`);
      const g = s[f(u)];
      if (!g) {
        if (t.describe.params.find((P) => P.optional))
          return;
        throw new Error(`Dependency value not found: ${d}`);
      }
      return g;
    });
  }
}
class re {
  constructor(e, t) {
    this.nodeManager = e, this.graphDrive = t;
  }
  check(e) {
    const t = e.nodeGraph, s = this.graphDrive.topologicalSort(t);
    return s ? this.validateParams(t, s) ? {
      success: !0,
      data: { process: e, nodeDescribes: s }
    } : {
      success: !1,
      data: { process: e }
    } : {
      success: !1,
      data: { process: e }
    };
  }
  validateParams(e, t) {
    const s = {};
    for (const o of t) {
      const a = this.nodeManager.getNodeById(o.id);
      if (!a) return !1;
      const i = {};
      if (a.type === h.Method) {
        const d = a;
        for (const u of d.describe.params)
          u.optional || (i[u.id] = !0);
      }
      if (a.type === h.Value) {
        const d = a;
        i[d.describe.id] = !0;
      }
      s[f(o)] = { id: a.id, params: i };
    }
    for (const o of e) {
      const a = o.toParam, i = o.toNode, d = f(i), u = s[d], g = u.params;
      if (!u)
        return !1;
      if (!(a in g && g[a]))
        return g[a] = !1, !1;
    }
    return !0;
  }
}
class se {
  topologicalSort(e) {
    const t = this.mapNCDToKey(e), s = this.topologicalSortStrings(t);
    if (s)
      return this.mapKeyToNCD(e, s);
  }
  nodeKey(e) {
    return `${e.id}-${e.instanceId}`;
  }
  mapNCDToKey(e) {
    return e.map((t) => ({
      fromNode: this.nodeKey(t.fromNode),
      toNode: this.nodeKey(t.toNode)
    }));
  }
  mapKeyToNCD(e, t) {
    const s = {};
    for (const o of e)
      s[this.nodeKey(o.fromNode)] = o.fromNode, s[this.nodeKey(o.toNode)] = o.toNode;
    return t.map((o) => s[o]);
  }
  topologicalSortStrings(e) {
    const t = {}, s = {}, o = [];
    for (const i of e) {
      const d = i.fromNode, u = i.toNode;
      d in s || (s[d] = []), u in s || (s[u] = []), s[d].push(u), u in t || (t[u] = 0), t[u]++, d in t || (t[d] = 0);
    }
    const a = [];
    for (const i in t)
      t[i] === 0 && a.push(i);
    for (; a.length > 0; ) {
      const i = a.shift();
      o.push(i);
      for (const d of s[i])
        t[d]--, t[d] === 0 && a.push(d);
    }
    if (o.length === Object.keys(t).length)
      return o;
  }
}
class oe {
  constructor(e, t = new se()) {
    c(this, "executor");
    c(this, "validator");
    this.executor = new te(e), this.validator = new re(e, t);
  }
  async execute(e) {
    const t = this.validator.check(e);
    if (t.success)
      return await this.executor.run(t.data);
  }
}
class ae {
  constructor() {
    c(this, "processQueue", []);
  }
  pushToQueue(e) {
    this.processQueue.push(e);
  }
  shiftFromQueue() {
    return this.processQueue.shift();
  }
}
class ne {
  constructor(e) {
    this.flowNode = e;
  }
  parse(e) {
    const t = this.convertToObject(e);
    if (t)
      return this.getVerifiedProcess(t);
  }
  convertToObject(e) {
    if (typeof e == "string")
      return this.extractJson(e);
    if (typeof e == "object")
      return e;
  }
  extractJson(e) {
    const s = /```json\s*([\s\S]*?)\s*```/g.exec(e);
    try {
      return s && s[1] ? JSON.parse(s[1].trim()) : JSON.parse(e);
    } catch (o) {
      n.record(`string parser error, invalid json ${o}`, n.Level.Warn);
      return;
    }
  }
  getVerifiedProcess(e) {
    const t = this.validateNodeGraph(e);
    if (t)
      return {
        id: "",
        timestamp: Date.now(),
        nodeGraph: t
      };
  }
  validateNodeGraph(e) {
    if (!Array.isArray(e)) {
      n.record("string parser error, invalid data", n.Level.Warn);
      return;
    }
    for (const t of e)
      if (!this.validateConnect(t) || !this.validateNode(t))
        return;
    return e;
  }
  validateConnect(e) {
    return !e || typeof e != "object" || !e.hasOwnProperty("fromNode") || !e.hasOwnProperty("toNode") || !e.hasOwnProperty("toParam") ? (n.record("string parser error, invalid data", n.Level.Warn), !1) : !0;
  }
  validateNode(e) {
    const t = this.flowNode.getNodeById(e.fromNode.id), s = this.flowNode.getNodeById(e.toNode.id);
    return !t || !s ? (n.record("string parser error, node not found", n.Level.Warn), !1) : !!this.validateParam(s, e.toParam);
  }
  validateParam(e, t) {
    if (e.type !== h.Method)
      return !0;
    const s = e;
    return Array.isArray(s.describe.params) ? s.describe.params.find((a) => a.id === t) ? !0 : (n.record("string parser error, param not found", n.Level.Warn), !1) : !1;
  }
}
class ie {
  constructor(e) {
    c(this, "stringParser");
    this.stringParser = new ne(e);
  }
  parseString(e) {
    return this.stringParser.parse(e);
  }
}
class he {
  constructor(e) {
    c(this, "manager");
    c(this, "chat");
    const t = new $(), s = new ee(t, e.agent), o = new oe(t), a = new ae(), i = new ie(t);
    this.manager = new A(t, o, a, i), this.chat = new O(s, this.manager);
  }
  getManager() {
    return this.manager;
  }
  getChat() {
    return this.chat;
  }
}
export {
  ue as AgentWenxin,
  he as ProcessContainer
};
