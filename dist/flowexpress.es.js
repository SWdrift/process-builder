var T = Object.defineProperty;
var E = (r, e, t) => e in r ? T(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var c = (r, e, t) => E(r, typeof e != "symbol" ? e + "" : e, t);
import F from "axios";
class S {
  constructor(e) {
    c(this, "id");
    c(this, "data");
    c(this, "timestamp", Date.now());
    c(this, "isError");
    c(this, "property");
    this.id = e.id, this.data = e.data, this.property = e.property, this.isError = e.error;
  }
}
class D {
  constructor(e, t, o = Date.now()) {
    this.q = e, this.a = t, this.timestamp = o;
  }
}
class O {
  constructor(e, t) {
    this.agent = e, this.flowManager = t;
  }
  async chatSingle(e) {
    const t = new S({ id: "user", data: e }), o = await this.agent.sendMessage(t), s = new D(t, o);
    return this.addSessionToFlow(s), s;
  }
  addSessionToFlow(e) {
    e.a.isProcess && this.flowManager.addProcess(e.a.data);
  }
}
class b {
  constructor(e, t) {
    c(this, "sessionHistory", []);
    c(this, "actionSession");
    this.actionSession = new O(e, t);
  }
  async send(e) {
    const t = await this.actionSession.chatSingle(e);
    return this.sessionHistory.push(t), t;
  }
}
var l = /* @__PURE__ */ ((r) => (r.Method = "Method", r.Value = "Value", r))(l || {}), w = /* @__PURE__ */ ((r) => (r.Debug = "debug", r.Info = "info", r.Warn = "warn", r.Error = "error", r))(w || {});
const A = {
  debug: console.debug,
  info: console.info,
  warn: console.warn,
  error: console.error
}, V = (r, e) => {
  A[e](r);
}, a = {
  Level: w,
  record: V
};
class U {
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
      for (const o of t.params)
        if (o.describe.length < 1)
          return a.record(
            `method  ${t.id} registe error, param ${o.id} describe is empty`,
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
class y {
  constructor(e, t, o) {
    c(this, "id");
    this.target = e, this.describe = t, this.type = o, this.id = this.getId(t);
  }
  getId(e) {
    return e.id;
  }
}
class $ {
  constructor(e, t, o, s, n = new U(e)) {
    this.nodeStorage = e, this.processActator = t, this.processManager = o, this.processParser = s, this.actionValidate = n;
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
    this.actionValidate.isRegisterMethodOk(e, t) && this.nodeStorage.register(new y(e, t, l.Method));
  }
  registerValueNode(e, t) {
    this.actionValidate.isRegisterValueOk(e, t) && this.nodeStorage.register(new y(e, t, l.Value));
  }
  getNodeById(e) {
    return this.nodeStorage.getNodeById(e);
  }
  getAllNodes() {
    return this.nodeStorage.getAllNodes();
  }
}
const g = class g {
  constructor() {
    c(this, "nodes", {});
    return g.instance || (g.instance = this), g.instance;
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
c(g, "instance");
let N = g;
class _ {
  constructor(e = new N()) {
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
const k = "你需要根据指定的元描述、用户目的、方法表和值表生成可被应用解析执行的结构化数据以满足用户目的，你的输出的结果应当为指定的数组格式。", x = "以下是元描述：此消息用于构建节点，你需要根据元描述、用户目的、方法表和值表生成可被应用解析执行的结构化数据以满足用户目的。Token包括以下部分：1. 元描述：用于描述消息的目的、格式描述、响应示例、注意事项等，你需要根据元描述来构建可执行的结构化数据；2. 用户目的：用于描述用户的目的，需要根据用户目的结合方法表和值表生成可执行的结构化数据；3. 方法表：包含方法的唯一标识符、描述、参数列表及其描述，以及返回值描述；4. 值表：包含常量的唯一标识符及其描述。", K = "格式描述：1. 方法表格式：[{id:唯一id,describe:方法描述,params:[{id:参数id,describe:参数描述}],return:{id:返回值id,describe:返回值描述}}]2. 值表格式：[{id:唯一id,describe:常量描述}]3. 响应格式，请确保返回结果为数组格式：[{fromNode:{id:来源节点id, instanceId:来源节点实例序号}, toNode:{id:目标节点id, instanceId:目标节点实例序号}, toParam:目标参数id}]", R = '响应示例：假设我们要构建一个简单的图像处理流程，满足用户“为图像添加滤镜”的需求。给定方法表：[{"id":"node1","describe":"加载图像","params":[{"id":"filePath","describe":"图像文件路径"}],"return":{"id":"imageData","describe":"加载的图像数据"}},{"id":"node2","describe":"应用滤镜","params":[{"id":"imageData","describe":"图像数据"},{"id":"filterType","describe":"滤镜类型"}],"return":{"id":"filteredImage","describe":"滤镜处理后的图像数据"}},{"id":"node3","describe":"保存图像","params":[{"id":"imageData","describe":"图像数据"},{"id":"savePath","describe":"保存路径"}],"return":{"id":"saveStatus","describe":"保存状态"}}]给定值表：[{"id":"value1","describe":"滤镜类型 - 灰度滤镜"}]响应应当为：[{"fromNode":{"id":"node1", "instanceId":1}, "toNode":{"id":"node2", "instanceId":1}, "toParam":"imageData"},{"fromNode":{"id":"value1", "instanceId":1}, "toNode":{"id":"node2", "instanceId":1}, "toParam":"filterType"},{"fromNode":{"id":"node2", "instanceId":1}, "toNode":{"id":"node3", "instanceId":1}, "toParam":"imageData"},{"fromNode":{"id":"node1", "instanceId":1}, "toNode":{"id":"node2", "instanceId":2}, "toParam":"imageData"},{"fromNode":{"id":"value1", "instanceId":1}, "toNode":{"id":"node2", "instanceId":2}, "toParam":"filterType"},{"fromNode":{"id":"node2", "instanceId":2}, "toNode":{"id":"node3", "instanceId":2}, "toParam":"imageData"}]', L = "注意事项：1. 如果**不能**或**不确定**能完成用户目的，请**返回空数组[]**2. **请确保响应结果为数组格式**。3. 请确保同一节点的不同实例具有**不同的`instanceId`**，以区分位于不同位置的同类型节点。", B = "元描述结束。", C = "以下是用户目的：", X = "用户目的结束。", W = "以下是方法表：", j = "方法表结束。", G = "以下是值表：", H = "值表结束。", J = "以上是Token的全部内容。", Q = {
  SYSTEM: k,
  PREFIX: x + K + R + L + B,
  SUFFIX: J,
  MESSAGE_PREFIX: C,
  MESSAGE_SUFFIX: X,
  METHOD_PREFIX: W,
  METHOD_SUFFIX: j,
  VALUE_PREFIX: G,
  VALUE_SUFFIX: H
}, h = Q;
class q {
  constructor(e) {
    this.nodeManager = e;
  }
  buildToken(e) {
    const { methodString: t, valueString: o } = this.getNodeString(), s = `${h.MESSAGE_PREFIX}${e}${h.MESSAGE_SUFFIX}`, n = `${h.METHOD_PREFIX}${t}${h.METHOD_SUFFIX}`, i = `${h.VALUE_PREFIX}${o}${h.VALUE_SUFFIX}`;
    return h.PREFIX + s + n + i + h.SUFFIX;
  }
  getNodeString() {
    const e = this.nodeManager.getAllNodes(), t = e.filter((i) => i.type === l.Method), o = e.filter((i) => i.type === l.Value), s = JSON.stringify(t), n = JSON.stringify(o);
    return { methodString: s, valueString: n };
  }
}
class Y {
  constructor(e) {
    this.api = e;
  }
  async chat(e) {
    const t = await this.api.requestSingle(e, {
      system: h.SYSTEM
    });
    return !t || !t.data ? new S({ id: "system", data: "Error", error: !0 }) : {
      ...t
    };
  }
}
const Z = "localhost:5173";
var v = /* @__PURE__ */ ((r) => (r[r.DATA_SUCCESS = 0] = "DATA_SUCCESS", r[r.SUCCESS = 200] = "SUCCESS", r[r.SERVER_ERROR = 500] = "SERVER_ERROR", r[r.SERVER_FORBIDDEN = 403] = "SERVER_FORBIDDEN", r[r.NOT_FOUND = 404] = "NOT_FOUND", r[r.TOKEN_OVERDUE = 886] = "TOKEN_OVERDUE", r[r.TIMEOUT = 6e4] = "TIMEOUT", r))(v || {}), M = /* @__PURE__ */ ((r) => (r.GET = "get", r.POST = "post", r.PATCH = "patch", r.PUT = "put", r.DELETE = "delete", r))(M || {}), I = /* @__PURE__ */ ((r) => (r.JSON = "application/json;charset=UTF-8", r.TEXT = "text/plain;charset=UTF-8", r.XML = "application/xml;charset=UTF-8", r.FORM_URLENCODED = "application/x-www-form-urlencoded;charset=UTF-8", r.FORM_DATA = "multipart/form-data;charset=UTF-8", r.BINARY = "application/octet-stream;charset=UTF-8", r))(I || {});
const z = F.create({
  baseURL: Z,
  timeout: v.TIMEOUT
}), ee = (r, e, t, o) => z({
  url: r,
  method: M.POST,
  data: e,
  headers: {
    "Content-Type": I.JSON,
    ...o
  }
});
class te {
  constructor(e) {
    this.config = e;
  }
  async requestSingle(e, t) {
    try {
      const o = {
        messages: [
          {
            role: "user",
            content: e
          }
        ],
        system: t?.system || ""
      }, s = await ee(this.config.url, o);
      return {
        id: s.data.id,
        data: s.data.result,
        timestamp: s.data.created,
        isProcess: !0,
        property: {
          ...s.data
        }
      };
    } catch (o) {
      a.record(`The request failed: ${o}`, a.Level.Error);
    }
  }
}
class re {
  constructor(e, t) {
    c(this, "tokenBuilder");
    c(this, "agentSocket");
    this.tokenBuilder = new q(e), this.agentSocket = new Y(t);
  }
  async sendMessage(e) {
    const t = this.tokenBuilder.buildToken(e.data);
    return await this.agentSocket.chat(t);
  }
}
function f(r) {
  return `${r.id}-${r.instanceId}`;
}
class oe {
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
    const o = {}, s = this.getNodeDepMap(e);
    for (const n of t) {
      const i = f(n);
      o[i] = await this.getNodeValue(n, o, s);
    }
    return o;
  }
  getNodeDepMap(e) {
    const t = {};
    for (const o of e.nodeGraph)
      t[this.getNodeDepKey(o)] = o.fromNode;
    return t;
  }
  getNodeDepKey(e) {
    return `${e.toNode.id}-${e.toParam}-${e.toNode.instanceId}`;
  }
  buildNodeDepKey(e, t, o) {
    return `${e}-${t}-${o}`;
  }
  async getNodeValue(e, t, o) {
    const s = this.nodeManager.getNodeById(e.id);
    if (!s) throw new Error(`Node not found: ${e.id}`);
    if (s.type === l.Value)
      return s.target;
    if (s.type === l.Method)
      return await this.executeFunction(
        e,
        s,
        t,
        o
      );
  }
  async executeFunction(e, t, o, s) {
    if (t.describe.params.length > 0) {
      const n = this.getParamValues(
        e,
        t,
        o,
        s
      );
      return await t.target(...n);
    } else
      return await t.target();
  }
  getParamValues(e, t, o, s) {
    return t.describe.params.map((d) => this.buildNodeDepKey(e.id, d.id, e.instanceId)).map((d) => {
      const u = s[d];
      if (!u) throw new Error(`Dependency node not found: ${d}`);
      const p = o[f(u)];
      if (!p) {
        if (t.describe.params.find((P) => P.optional))
          return;
        throw new Error(`Dependency value not found: ${d}`);
      }
      return p;
    });
  }
}
class se {
  constructor(e, t) {
    this.nodeManager = e, this.graphDrive = t;
  }
  check(e) {
    const t = e.nodeGraph, o = this.graphDrive.topologicalSort(t);
    return o ? this.validateParams(t, o) ? {
      success: !0,
      data: { process: e, nodeDescribes: o }
    } : {
      success: !1,
      data: { process: e }
    } : {
      success: !1,
      data: { process: e }
    };
  }
  validateParams(e, t) {
    const o = {};
    for (const s of t) {
      const n = this.nodeManager.getNodeById(s.id);
      if (!n) return !1;
      const i = {};
      if (n.type === l.Method) {
        const d = n;
        for (const u of d.describe.params)
          u.optional || (i[u.id] = !0);
      }
      if (n.type === l.Value) {
        const d = n;
        i[d.describe.id] = !0;
      }
      o[f(s)] = { id: n.id, params: i };
    }
    for (const s of e) {
      const n = s.toParam, i = s.toNode, d = f(i), u = o[d], p = u.params;
      if (!u)
        return !1;
      if (!(n in p && p[n]))
        return p[n] = !1, !1;
    }
    return !0;
  }
}
class ne {
  topologicalSort(e) {
    const t = this.mapNCDToKey(e), o = this.topologicalSortStrings(t);
    if (o)
      return this.mapKeyToNCD(e, o);
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
    const o = {};
    for (const s of e)
      o[this.nodeKey(s.fromNode)] = s.fromNode, o[this.nodeKey(s.toNode)] = s.toNode;
    return t.map((s) => o[s]);
  }
  topologicalSortStrings(e) {
    const t = {}, o = {}, s = [];
    for (const i of e) {
      const d = i.fromNode, u = i.toNode;
      d in o || (o[d] = []), u in o || (o[u] = []), o[d].push(u), u in t || (t[u] = 0), t[u]++, d in t || (t[d] = 0);
    }
    const n = [];
    for (const i in t)
      t[i] === 0 && n.push(i);
    for (; n.length > 0; ) {
      const i = n.shift();
      s.push(i);
      for (const d of o[i])
        t[d]--, t[d] === 0 && n.push(d);
    }
    if (s.length === Object.keys(t).length)
      return s;
  }
}
class ae {
  constructor(e, t = new ne()) {
    c(this, "executor");
    c(this, "validator");
    this.executor = new oe(e), this.validator = new se(e, t);
  }
  async execute(e) {
    const t = this.validator.check(e);
    if (t.success)
      return await this.executor.run(t.data);
  }
}
class ie {
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
class de {
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
    const o = /```json\s*([\s\S]*?)\s*```/g.exec(e);
    try {
      return o && o[1] ? JSON.parse(o[1].trim()) : JSON.parse(e);
    } catch (s) {
      a.record(`string parser error, invalid json ${s}`, a.Level.Warn);
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
    const t = this.flowNode.getNodeById(e.fromNode.id), o = this.flowNode.getNodeById(e.toNode.id);
    return !t || !o ? (a.record("string parser error, node not found", a.Level.Warn), !1) : !!this.validateParam(o, e.toParam);
  }
  validateParam(e, t) {
    if (e.type !== l.Method)
      return !0;
    const o = e;
    return Array.isArray(o.describe.params) ? o.describe.params.find((n) => n.id === t) ? !0 : (a.record("string parser error, param not found", a.Level.Warn), !1) : !1;
  }
}
class ce {
  constructor(e) {
    c(this, "stringParser");
    this.stringParser = new de(e);
  }
  parseString(e) {
    return this.stringParser.parse(e);
  }
}
const ue = "https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions_pro", le = "24.1e34beb9496661e0aaca24a671736c24.2592000.1727444856.282335-60067339", m = new _(), he = new te({
  url: ue + "?access_token=" + le
}), pe = new re(m, he), ge = new ae(m), fe = new ie(), me = new ce(m), Ne = new $(m, ge, fe, me), we = new b(pe, Ne);
export {
  we as flowChat,
  Ne as flowManager
};
