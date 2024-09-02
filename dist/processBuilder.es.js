var F = Object.defineProperty;
var O = (r, e, t) => e in r ? F(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var d = (r, e, t) => O(r, typeof e != "symbol" ? e + "" : e, t);
import I from "axios";
class M {
  constructor(e) {
    d(this, "id");
    d(this, "data");
    d(this, "timestamp", Date.now());
    d(this, "isError");
    d(this, "property");
    this.id = e.id, this.data = e.data, this.property = e.property, this.isError = e.error;
  }
}
class V {
  constructor(e, t, s = Date.now()) {
    this.q = e, this.a = t, this.timestamp = s;
  }
}
class b {
  constructor(e, t) {
    this.agent = e, this.flowManager = t;
  }
  async chatSingle(e) {
    const t = new M({ id: "user", data: e }), s = await this.agent.sendMessage(t), o = new V(t, s);
    return this.addSessionToFlow(o), o;
  }
  addSessionToFlow(e) {
    e.a.isProcess && this.flowManager.addProcess(e.a.data);
  }
}
class A {
  constructor(e, t) {
    d(this, "sessionHistory", []);
    d(this, "actionSession");
    this.actionSession = new b(e, t);
  }
  async send(e) {
    const t = await this.actionSession.chatSingle(e);
    return this.sessionHistory.push(t), t;
  }
}
var h = /* @__PURE__ */ ((r) => (r.Method = "Method", r.Value = "Value", r))(h || {}), E = /* @__PURE__ */ ((r) => (r.Debug = "debug", r.Info = "info", r.Warn = "warn", r.Error = "error", r))(E || {});
const U = {
  debug: console.debug,
  info: console.info,
  warn: console.warn,
  error: console.error
}, $ = (r, e) => {
  U[e](r);
}, a = {
  Level: E,
  record: $
};
class x {
  constructor(e) {
    this.nodeManager = e;
  }
  isRegisterMethodOk(e, t) {
    if (this.nodeManager.getNodeById(t.id))
      return a.record(
        `method  ${t.id} registe error, method id already exists`,
        a.Level.Warn
      ), !1;
    if (t.describe.length < 1)
      return a.record(
        `method  ${t.id} registe error, method describe is empty`,
        a.Level.Warn
      ), !1;
    if (t.params.length > 0) {
      for (const s of t.params)
        if (s.describe.length < 1)
          return a.record(
            `method  ${t.id} registe error, param ${s.id} describe is empty`,
            a.Level.Warn
          ), !1;
    }
    return t.return && t.return.describe.length < 1 ? (a.record(
      `method  ${t.id} registe error, return describe is empty`,
      a.Level.Warn
    ), !1) : !0;
  }
  isRegisterValueOk(e, t) {
    return this.nodeManager.getNodeById(t.id) ? (a.record(
      `constant  ${t.id} registe error, constant id already exists`,
      a.Level.Warn
    ), !1) : t.describe.length < 1 ? (a.record(
      `method  ${t.id} registe error, method describe is empty`,
      a.Level.Warn
    ), !1) : !0;
  }
}
class T {
  constructor(e, t, s) {
    d(this, "id");
    this.target = e, this.describe = t, this.type = s, this.id = this.getId(t);
  }
  getId(e) {
    return e.id;
  }
}
class k {
  constructor(e, t, s, o, n = new x(e)) {
    this.nodeStorage = e, this.processActator = t, this.processManager = s, this.processParser = o, this.actionValidate = n;
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
    this.actionValidate.isRegisterMethodOk(e, t) && this.nodeStorage.register(new T(e, t, h.Method));
  }
  registerValueNode(e, t) {
    this.actionValidate.isRegisterValueOk(e, t) && this.nodeStorage.register(new T(e, t, h.Value));
  }
  getNodeById(e) {
    return this.nodeStorage.getNodeById(e);
  }
  getAllNodes() {
    return this.nodeStorage.getAllNodes();
  }
}
const m = class m {
  constructor() {
    d(this, "nodes", {});
    return m.instance || (m.instance = this), m.instance;
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
d(m, "instance");
let v = m;
class C {
  constructor(e = new v()) {
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
const K = "你需要根据指定的元描述、用户目的、方法表和值表生成可被应用解析执行的结构化数据以满足用户目的，你的输出的结果应当为指定的数组格式。", R = "以下是元描述：此消息用于构建节点，你需要根据元描述、用户目的、方法表和值表生成可被应用解析执行的结构化数据以满足用户目的。Token包括以下部分：1. 元描述：用于描述消息的目的、格式描述、响应示例、注意事项等，你需要根据元描述来构建可执行的结构化数据；2. 用户目的：用于描述用户的目的，需要根据用户目的结合方法表和值表生成可执行的结构化数据；3. 方法表：包含方法的唯一标识符、描述、参数列表及其描述，以及返回值描述；4. 值表：包含常量的唯一标识符及其描述。", _ = "格式描述：1. 方法表格式：[{id:唯一id,describe:方法描述,params:[{id:参数id,describe:参数描述}],return:{id:返回值id,describe:返回值描述}}]2. 值表格式：[{id:唯一id,describe:常量描述}]3. 响应格式，请确保返回结果为数组格式：[{fromNode:{id:来源节点id, instanceId:来源节点实例序号}, toNode:{id:目标节点id, instanceId:目标节点实例序号}, toParam:目标参数id}]", B = '响应示例：假设我们要构建一个简单的图像处理流程，满足用户“为图像添加滤镜”的需求。给定方法表：[{"id":"node1","describe":"加载图像","params":[{"id":"filePath","describe":"图像文件路径"}],"return":{"id":"imageData","describe":"加载的图像数据"}},{"id":"node2","describe":"应用滤镜","params":[{"id":"imageData","describe":"图像数据"},{"id":"filterType","describe":"滤镜类型"}],"return":{"id":"filteredImage","describe":"滤镜处理后的图像数据"}},{"id":"node3","describe":"保存图像","params":[{"id":"imageData","describe":"图像数据"},{"id":"savePath","describe":"保存路径"}],"return":{"id":"saveStatus","describe":"保存状态"}}]给定值表：[{"id":"value1","describe":"滤镜类型 - 灰度滤镜"}]响应应当为：[{"fromNode":{"id":"node1", "instanceId":1}, "toNode":{"id":"node2", "instanceId":1}, "toParam":"imageData"},{"fromNode":{"id":"value1", "instanceId":1}, "toNode":{"id":"node2", "instanceId":1}, "toParam":"filterType"},{"fromNode":{"id":"node2", "instanceId":1}, "toNode":{"id":"node3", "instanceId":1}, "toParam":"imageData"},{"fromNode":{"id":"node1", "instanceId":1}, "toNode":{"id":"node2", "instanceId":2}, "toParam":"imageData"},{"fromNode":{"id":"value1", "instanceId":1}, "toNode":{"id":"node2", "instanceId":2}, "toParam":"filterType"},{"fromNode":{"id":"node2", "instanceId":2}, "toNode":{"id":"node3", "instanceId":2}, "toParam":"imageData"}]', L = "注意事项：1. 如果**不能**或**不确定**能完成用户目的，请**返回空数组[]**2. **请确保响应结果为数组格式**。3. 请确保同一节点的不同实例具有**不同的`instanceId`**，以区分位于不同位置的同类型节点。", X = "元描述结束。", W = "以下是用户目的：", G = "用户目的结束。", j = "以下是方法表：", J = "方法表结束。", H = "以下是值表：", Q = "值表结束。", q = "以上是Token的全部内容。", Y = {
  SYSTEM: K,
  PREFIX: R + _ + B + L + X,
  SUFFIX: q,
  MESSAGE_PREFIX: W,
  MESSAGE_SUFFIX: G,
  METHOD_PREFIX: j,
  METHOD_SUFFIX: J,
  VALUE_PREFIX: H,
  VALUE_SUFFIX: Q
}, l = Y;
class Z {
  constructor(e) {
    this.nodeManager = e;
  }
  buildToken(e) {
    const { methodString: t, valueString: s } = this.getNodeString(), o = `${l.MESSAGE_PREFIX}${e}${l.MESSAGE_SUFFIX}`, n = `${l.METHOD_PREFIX}${t}${l.METHOD_SUFFIX}`, i = `${l.VALUE_PREFIX}${s}${l.VALUE_SUFFIX}`;
    return l.PREFIX + o + n + i + l.SUFFIX;
  }
  getNodeString() {
    const e = this.nodeManager.getAllNodes(), t = e.filter((i) => i.type === h.Method), s = e.filter((i) => i.type === h.Value), o = JSON.stringify(t), n = JSON.stringify(s);
    return { methodString: o, valueString: n };
  }
}
class z {
  constructor(e) {
    this.api = e;
  }
  async chat(e) {
    const t = await this.api.requestSingle(e, {
      system: l.SYSTEM
    });
    return !t || !t.data ? new M({ id: "system", data: "Error", error: !0 }) : {
      ...t
    };
  }
}
var P = /* @__PURE__ */ ((r) => (r[r.DATA_SUCCESS = 0] = "DATA_SUCCESS", r[r.SUCCESS = 200] = "SUCCESS", r[r.SERVER_ERROR = 500] = "SERVER_ERROR", r[r.SERVER_FORBIDDEN = 403] = "SERVER_FORBIDDEN", r[r.NOT_FOUND = 404] = "NOT_FOUND", r[r.TOKEN_OVERDUE = 886] = "TOKEN_OVERDUE", r[r.TIMEOUT = 6e4] = "TIMEOUT", r))(P || {}), f = /* @__PURE__ */ ((r) => (r.GET = "get", r.POST = "post", r.PATCH = "patch", r.PUT = "put", r.DELETE = "delete", r))(f || {}), S = /* @__PURE__ */ ((r) => (r.JSON = "application/json;charset=UTF-8", r.TEXT = "text/plain;charset=UTF-8", r.XML = "application/xml;charset=UTF-8", r.FORM_URLENCODED = "application/x-www-form-urlencoded;charset=UTF-8", r.FORM_DATA = "multipart/form-data;charset=UTF-8", r.BINARY = "application/octet-stream;charset=UTF-8", r))(S || {});
function N(r) {
  return {
    baseUrl: r?.baseUrl ?? "",
    timeout: r?.timeout ?? P.TIMEOUT
  };
}
const g = class g {
  constructor(e) {
    d(this, "axiosInstance");
    this.axiosInstance = I.create(N(e));
  }
  static getInstance(e) {
    return g.instance ? g.instance.updateConfig(N(e)) : g.instance = new g(N(e)), g.instance;
  }
  updateConfig(e) {
    this.axiosInstance = I.create(N(e));
  }
  get(e, t) {
    return this.axiosInstance({
      url: e,
      method: f.GET,
      params: t
    });
  }
  post(e, t, s, o) {
    return this.axiosInstance({
      url: e,
      method: f.POST,
      data: t,
      headers: {
        "Content-Type": s || S.JSON,
        ...o
      }
    });
  }
  patch(e, t, s, o) {
    return this.axiosInstance({
      url: e,
      method: f.PATCH,
      data: t,
      headers: {
        "Content-Type": s || S.JSON,
        ...o
      }
    });
  }
  put(e, t, s, o) {
    return this.axiosInstance({
      url: e,
      method: f.PUT,
      data: t,
      headers: {
        "Content-Type": s || S.JSON,
        ...o
      }
    });
  }
  del(e, t) {
    return this.axiosInstance({
      url: e,
      method: f.DELETE,
      params: t
    });
  }
};
d(g, "instance");
let w = g;
class ue {
  constructor(e) {
    d(this, "url");
    d(this, "httpServer");
    this.config = e, this.url = this.getRequestUrl(e), this.httpServer = w.getInstance();
  }
  async requestSingle(e, t) {
    try {
      const s = {
        ...this.config,
        messages: [
          {
            role: "user",
            content: e
          }
        ],
        system: t?.system || ""
      }, o = await this.httpServer.post(this.url, s);
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
      throw a.record(`The request failed: ${s}`, a.Level.Error), s;
    }
  }
  getRequestUrl(e) {
    return `${e.url ?? "https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions_pro"}?access_token=${e.accessToken}`;
  }
}
class ee {
  constructor(e, t) {
    d(this, "tokenBuilder");
    d(this, "agentSocket");
    this.tokenBuilder = new Z(e), this.agentSocket = new z(t);
  }
  async sendMessage(e) {
    const t = this.tokenBuilder.buildToken(e.data);
    return await this.agentSocket.chat(t);
  }
}
function y(r) {
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
      throw a.record(`The process execution failed, ${t}`, a.Level.Warn), t;
    }
  }
  async executeNodes(e, t) {
    const s = {}, o = this.getNodeDepMap(e);
    for (const n of t) {
      const i = y(n);
      s[i] = await this.getNodeValue(n, s, o);
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
      const n = this.getParamValues(
        e,
        t,
        s,
        o
      );
      return await t.target(...n);
    } else
      return await t.target();
  }
  getParamValues(e, t, s, o) {
    return t.describe.params.map((c) => this.buildNodeDepKey(e.id, c.id, e.instanceId)).map((c) => {
      const u = o[c];
      if (!u) throw new Error(`Dependency node not found: ${c}`);
      const p = s[y(u)];
      if (!p) {
        if (t.describe.params.find((D) => D.optional))
          return;
        throw new Error(`Dependency value not found: ${c}`);
      }
      return p;
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
      const n = this.nodeManager.getNodeById(o.id);
      if (!n) return !1;
      const i = {};
      if (n.type === h.Method) {
        const c = n;
        for (const u of c.describe.params)
          u.optional || (i[u.id] = !0);
      }
      if (n.type === h.Value) {
        const c = n;
        i[c.describe.id] = !0;
      }
      s[y(o)] = { id: n.id, params: i };
    }
    for (const o of e) {
      const n = o.toParam, i = o.toNode, c = y(i), u = s[c], p = u.params;
      if (!u)
        return !1;
      if (!(n in p && p[n]))
        return p[n] = !1, !1;
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
      const c = i.fromNode, u = i.toNode;
      c in s || (s[c] = []), u in s || (s[u] = []), s[c].push(u), u in t || (t[u] = 0), t[u]++, c in t || (t[c] = 0);
    }
    const n = [];
    for (const i in t)
      t[i] === 0 && n.push(i);
    for (; n.length > 0; ) {
      const i = n.shift();
      o.push(i);
      for (const c of s[i])
        t[c]--, t[c] === 0 && n.push(c);
    }
    if (o.length === Object.keys(t).length)
      return o;
  }
}
class oe {
  constructor(e, t = new se()) {
    d(this, "executor");
    d(this, "validator");
    this.executor = new te(e), this.validator = new re(e, t);
  }
  async execute(e) {
    const t = this.validator.check(e);
    if (t.success)
      return await this.executor.run(t.data);
  }
}
class ne {
  constructor() {
    d(this, "processQueue", []);
  }
  pushToQueue(e) {
    this.processQueue.push(e);
  }
  shiftFromQueue() {
    return this.processQueue.shift();
  }
}
class ae {
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
      a.record(`string parser error, invalid json ${o}`, a.Level.Warn);
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
      a.record("string parser error, invalid data", a.Level.Warn);
      return;
    }
    for (const t of e)
      if (!this.validateConnect(t) || !this.validateNode(t))
        return;
    return e;
  }
  validateConnect(e) {
    return !e || typeof e != "object" || !e.hasOwnProperty("fromNode") || !e.hasOwnProperty("toNode") || !e.hasOwnProperty("toParam") ? (a.record("string parser error, invalid data", a.Level.Warn), !1) : !0;
  }
  validateNode(e) {
    const t = this.flowNode.getNodeById(e.fromNode.id), s = this.flowNode.getNodeById(e.toNode.id);
    return !t || !s ? (a.record("string parser error, node not found", a.Level.Warn), !1) : !!this.validateParam(s, e.toParam);
  }
  validateParam(e, t) {
    if (e.type !== h.Method)
      return !0;
    const s = e;
    return Array.isArray(s.describe.params) ? s.describe.params.find((n) => n.id === t) ? !0 : (a.record("string parser error, param not found", a.Level.Warn), !1) : !1;
  }
}
class ie {
  constructor(e) {
    d(this, "stringParser");
    this.stringParser = new ae(e);
  }
  parseString(e) {
    return this.stringParser.parse(e);
  }
}
class he {
  constructor(e) {
    d(this, "manager");
    d(this, "chat");
    const t = new C(), s = new ee(t, e.agent), o = new oe(t), n = new ne(), i = new ie(t);
    this.manager = new k(t, o, n, i), this.chat = new A(s, this.manager);
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
