(function(l,h){typeof exports=="object"&&typeof module<"u"?h(exports,require("axios")):typeof define=="function"&&define.amd?define(["exports","axios"],h):(l=typeof globalThis<"u"?globalThis:l||self,h(l.flowllm={},l.axios))})(this,function(l,h){"use strict";var J=Object.defineProperty;var Q=(l,h,f)=>h in l?J(l,h,{enumerable:!0,configurable:!0,writable:!0,value:f}):l[h]=f;var c=(l,h,f)=>Q(l,typeof h!="symbol"?h+"":h,f);class f{constructor(e){c(this,"id");c(this,"data");c(this,"timestamp",Date.now());c(this,"isError");c(this,"property");this.id=e.id,this.data=e.data,this.property=e.property,this.isError=e.error}}class T{constructor(e,t,r=Date.now()){this.q=e,this.a=t,this.timestamp=r}}class I{constructor(e,t){this.agent=e,this.flowManager=t}async chatSingle(e){const t=new f({id:"user",data:e}),r=await this.agent.sendMessage(t),o=new T(t,r);return this.addSessionToFlow(o),o}addSessionToFlow(e){e.a.isProcess&&this.flowManager.addProcess(e.a.data)}}class F{constructor(e,t){c(this,"sessionHistory",[]);c(this,"actionSession");this.actionSession=new I(e,t)}async send(e){const t=await this.actionSession.chatSingle(e);return this.sessionHistory.push(t),t}}var p=(s=>(s.Method="Method",s.Value="Value",s))(p||{}),v=(s=>(s.Debug="debug",s.Info="info",s.Warn="warn",s.Error="error",s))(v||{});const D={debug:console.debug,info:console.info,warn:console.warn,error:console.error},a={Level:v,record:(s,e)=>{D[e](s)}};class O{constructor(e){this.nodeManager=e}isRegisterMethodOk(e,t){if(this.nodeManager.getNodeById(t.id))return a.record(`method  ${t.id} registe error, method id already exists`,a.Level.Warn),!1;if(t.describe.length<1)return a.record(`method  ${t.id} registe error, method describe is empty`,a.Level.Warn),!1;if(t.params.length>0){for(const r of t.params)if(r.describe.length<1)return a.record(`method  ${t.id} registe error, param ${r.id} describe is empty`,a.Level.Warn),!1}return t.return&&t.return.describe.length<1?(a.record(`method  ${t.id} registe error, return describe is empty`,a.Level.Warn),!1):!0}isRegisterValueOk(e,t){return this.nodeManager.getNodeById(t.id)?(a.record(`constant  ${t.id} registe error, constant id already exists`,a.Level.Warn),!1):t.describe.length<1?(a.record(`method  ${t.id} registe error, method describe is empty`,a.Level.Warn),!1):!0}}class w{constructor(e,t,r){c(this,"id");this.target=e,this.describe=t,this.type=r,this.id=this.getId(t)}getId(e){return e.id}}class b{constructor(e,t,r,o,n=new O(e)){this.nodeStorage=e,this.processActator=t,this.processManager=r,this.processParser=o,this.actionValidate=n}async performProcess(){const e=this.processManager.shiftFromQueue();return e?this.processActator.execute(e):!1}addProcess(e){const t=this.processParser.parseString(e);t&&this.processManager.pushToQueue(t)}registerMethodNode(e,t){this.actionValidate.isRegisterMethodOk(e,t)&&this.nodeStorage.register(new w(e,t,p.Method))}registerValueNode(e,t){this.actionValidate.isRegisterValueOk(e,t)&&this.nodeStorage.register(new w(e,t,p.Value))}getNodeById(e){return this.nodeStorage.getNodeById(e)}getAllNodes(){return this.nodeStorage.getAllNodes()}}const m=class m{constructor(){c(this,"nodes",{});return m.instance||(m.instance=this),m.instance}saveNode(e){this.nodes[e.id]=e}deleteNode(e){delete this.nodes[e.id]}updateNode(e){this.nodes[e.id]=e}getNodeById(e){if(e in this.nodes)return this.nodes[e]}getAllNodes(){return Object.values(this.nodes)}};c(m,"instance");let S=m;class V{constructor(e=new S){this.nodeStorage=e}register(e){this.nodeStorage.saveNode(e)}getNodeById(e){return this.nodeStorage.getNodeById(e)}getAllNodes(){return this.nodeStorage.getAllNodes()}}const g={SYSTEM:"你需要根据指定的元描述、用户目的、方法表和值表生成可被应用解析执行的结构化数据以满足用户目的，你的输出的结果应当为指定的数组格式。",PREFIX:"以下是元描述：此消息用于构建节点，你需要根据元描述、用户目的、方法表和值表生成可被应用解析执行的结构化数据以满足用户目的。Token包括以下部分：1. 元描述：用于描述消息的目的、格式描述、响应示例、注意事项等，你需要根据元描述来构建可执行的结构化数据；2. 用户目的：用于描述用户的目的，需要根据用户目的结合方法表和值表生成可执行的结构化数据；3. 方法表：包含方法的唯一标识符、描述、参数列表及其描述，以及返回值描述；4. 值表：包含常量的唯一标识符及其描述。"+"格式描述：1. 方法表格式：[{id:唯一id,describe:方法描述,params:[{id:参数id,describe:参数描述}],return:{id:返回值id,describe:返回值描述}}]2. 值表格式：[{id:唯一id,describe:常量描述}]3. 响应格式，请确保返回结果为数组格式：[{fromNode:{id:来源节点id, instanceId:来源节点实例序号}, toNode:{id:目标节点id, instanceId:目标节点实例序号}, toParam:目标参数id}]"+'响应示例：假设我们要构建一个简单的图像处理流程，满足用户“为图像添加滤镜”的需求。给定方法表：[{"id":"node1","describe":"加载图像","params":[{"id":"filePath","describe":"图像文件路径"}],"return":{"id":"imageData","describe":"加载的图像数据"}},{"id":"node2","describe":"应用滤镜","params":[{"id":"imageData","describe":"图像数据"},{"id":"filterType","describe":"滤镜类型"}],"return":{"id":"filteredImage","describe":"滤镜处理后的图像数据"}},{"id":"node3","describe":"保存图像","params":[{"id":"imageData","describe":"图像数据"},{"id":"savePath","describe":"保存路径"}],"return":{"id":"saveStatus","describe":"保存状态"}}]给定值表：[{"id":"value1","describe":"滤镜类型 - 灰度滤镜"}]响应应当为：[{"fromNode":{"id":"node1", "instanceId":1}, "toNode":{"id":"node2", "instanceId":1}, "toParam":"imageData"},{"fromNode":{"id":"value1", "instanceId":1}, "toNode":{"id":"node2", "instanceId":1}, "toParam":"filterType"},{"fromNode":{"id":"node2", "instanceId":1}, "toNode":{"id":"node3", "instanceId":1}, "toParam":"imageData"},{"fromNode":{"id":"node1", "instanceId":1}, "toNode":{"id":"node2", "instanceId":2}, "toParam":"imageData"},{"fromNode":{"id":"value1", "instanceId":1}, "toNode":{"id":"node2", "instanceId":2}, "toParam":"filterType"},{"fromNode":{"id":"node2", "instanceId":2}, "toNode":{"id":"node3", "instanceId":2}, "toParam":"imageData"}]'+"注意事项：1. 如果**不能**或**不确定**能完成用户目的，请**返回空数组[]**2. **请确保响应结果为数组格式**。3. 请确保同一节点的不同实例具有**不同的`instanceId`**，以区分位于不同位置的同类型节点。"+"元描述结束。",SUFFIX:"以上是Token的全部内容。",MESSAGE_PREFIX:"以下是用户目的：",MESSAGE_SUFFIX:"用户目的结束。",METHOD_PREFIX:"以下是方法表：",METHOD_SUFFIX:"方法表结束。",VALUE_PREFIX:"以下是值表：",VALUE_SUFFIX:"值表结束。"};class U{constructor(e){this.nodeManager=e}buildToken(e){const{methodString:t,valueString:r}=this.getNodeString(),o=`${g.MESSAGE_PREFIX}${e}${g.MESSAGE_SUFFIX}`,n=`${g.METHOD_PREFIX}${t}${g.METHOD_SUFFIX}`,i=`${g.VALUE_PREFIX}${r}${g.VALUE_SUFFIX}`;return g.PREFIX+o+n+i+g.SUFFIX}getNodeString(){const e=this.nodeManager.getAllNodes(),t=e.filter(i=>i.type===p.Method),r=e.filter(i=>i.type===p.Value),o=JSON.stringify(t),n=JSON.stringify(r);return{methodString:o,valueString:n}}}class A{constructor(e){this.api=e}async chat(e){const t=await this.api.requestSingle(e,{system:g.SYSTEM});return!t||!t.data?new f({id:"system",data:"Error",error:!0}):{...t}}}const $="localhost:5173";var M=(s=>(s[s.DATA_SUCCESS=0]="DATA_SUCCESS",s[s.SUCCESS=200]="SUCCESS",s[s.SERVER_ERROR=500]="SERVER_ERROR",s[s.SERVER_FORBIDDEN=403]="SERVER_FORBIDDEN",s[s.NOT_FOUND=404]="NOT_FOUND",s[s.TOKEN_OVERDUE=886]="TOKEN_OVERDUE",s[s.TIMEOUT=6e4]="TIMEOUT",s))(M||{}),E=(s=>(s.GET="get",s.POST="post",s.PATCH="patch",s.PUT="put",s.DELETE="delete",s))(E||{}),P=(s=>(s.JSON="application/json;charset=UTF-8",s.TEXT="text/plain;charset=UTF-8",s.XML="application/xml;charset=UTF-8",s.FORM_URLENCODED="application/x-www-form-urlencoded;charset=UTF-8",s.FORM_DATA="multipart/form-data;charset=UTF-8",s.BINARY="application/octet-stream;charset=UTF-8",s))(P||{});const _=h.create({baseURL:$,timeout:M.TIMEOUT}),x=(s,e,t,r)=>_({url:s,method:E.POST,data:e,headers:{"Content-Type":P.JSON,...r}});class k{constructor(e){c(this,"url");this.config=e;let t="";e.baseUrl?t=e.baseUrl:t="https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions_pro",this.url=this.getRequestUrl(t,e.accessToken)}async requestSingle(e,t){try{const r={messages:[{role:"user",content:e}],system:t?.system||""},o=await x(this.url,r);return{id:o.data.id,data:o.data.result,timestamp:o.data.created,isProcess:!0,property:{...o.data}}}catch(r){throw a.record(`The request failed: ${r}`,a.Level.Error),r}}getRequestUrl(e,t){return`${e}?access_token=${t}`}}class R{constructor(e,t){c(this,"tokenBuilder");c(this,"agentSocket");this.tokenBuilder=new U(e),this.agentSocket=new A(t)}async sendMessage(e){const t=this.tokenBuilder.buildToken(e.data);return await this.agentSocket.chat(t)}}function y(s){return`${s.id}-${s.instanceId}`}class C{constructor(e){this.nodeManager=e}async run(e){try{return await this.executeNodes(e.process,e.nodeDescribes)}catch(t){throw a.record(`The process execution failed, ${t}`,a.Level.Warn),t}}async executeNodes(e,t){const r={},o=this.getNodeDepMap(e);for(const n of t){const i=y(n);r[i]=await this.getNodeValue(n,r,o)}return r}getNodeDepMap(e){const t={};for(const r of e.nodeGraph)t[this.getNodeDepKey(r)]=r.fromNode;return t}getNodeDepKey(e){return`${e.toNode.id}-${e.toParam}-${e.toNode.instanceId}`}buildNodeDepKey(e,t,r){return`${e}-${t}-${r}`}async getNodeValue(e,t,r){const o=this.nodeManager.getNodeById(e.id);if(!o)throw new Error(`Node not found: ${e.id}`);if(o.type===p.Value)return o.target;if(o.type===p.Method)return await this.executeFunction(e,o,t,r)}async executeFunction(e,t,r,o){if(t.describe.params.length>0){const n=this.getParamValues(e,t,r,o);return await t.target(...n)}else return await t.target()}getParamValues(e,t,r,o){return t.describe.params.map(d=>this.buildNodeDepKey(e.id,d.id,e.instanceId)).map(d=>{const u=o[d];if(!u)throw new Error(`Dependency node not found: ${d}`);const N=r[y(u)];if(!N){if(t.describe.params.find(H=>H.optional))return;throw new Error(`Dependency value not found: ${d}`)}return N})}}class K{constructor(e,t){this.nodeManager=e,this.graphDrive=t}check(e){const t=e.nodeGraph,r=this.graphDrive.topologicalSort(t);return r?this.validateParams(t,r)?{success:!0,data:{process:e,nodeDescribes:r}}:{success:!1,data:{process:e}}:{success:!1,data:{process:e}}}validateParams(e,t){const r={};for(const o of t){const n=this.nodeManager.getNodeById(o.id);if(!n)return!1;const i={};if(n.type===p.Method){const d=n;for(const u of d.describe.params)u.optional||(i[u.id]=!0)}if(n.type===p.Value){const d=n;i[d.describe.id]=!0}r[y(o)]={id:n.id,params:i}}for(const o of e){const n=o.toParam,i=o.toNode,d=y(i),u=r[d],N=u.params;if(!u)return!1;if(!(n in N&&N[n]))return N[n]=!1,!1}return!0}}class L{topologicalSort(e){const t=this.mapNCDToKey(e),r=this.topologicalSortStrings(t);if(r)return this.mapKeyToNCD(e,r)}nodeKey(e){return`${e.id}-${e.instanceId}`}mapNCDToKey(e){return e.map(t=>({fromNode:this.nodeKey(t.fromNode),toNode:this.nodeKey(t.toNode)}))}mapKeyToNCD(e,t){const r={};for(const o of e)r[this.nodeKey(o.fromNode)]=o.fromNode,r[this.nodeKey(o.toNode)]=o.toNode;return t.map(o=>r[o])}topologicalSortStrings(e){const t={},r={},o=[];for(const i of e){const d=i.fromNode,u=i.toNode;d in r||(r[d]=[]),u in r||(r[u]=[]),r[d].push(u),u in t||(t[u]=0),t[u]++,d in t||(t[d]=0)}const n=[];for(const i in t)t[i]===0&&n.push(i);for(;n.length>0;){const i=n.shift();o.push(i);for(const d of r[i])t[d]--,t[d]===0&&n.push(d)}if(o.length===Object.keys(t).length)return o}}class B{constructor(e,t=new L){c(this,"executor");c(this,"validator");this.executor=new C(e),this.validator=new K(e,t)}async execute(e){const t=this.validator.check(e);if(t.success)return await this.executor.run(t.data)}}class X{constructor(){c(this,"processQueue",[])}pushToQueue(e){this.processQueue.push(e)}shiftFromQueue(){return this.processQueue.shift()}}class W{constructor(e){this.flowNode=e}parse(e){const t=this.convertToObject(e);if(t)return this.getVerifiedProcess(t)}convertToObject(e){if(typeof e=="string")return this.extractJson(e);if(typeof e=="object")return e}extractJson(e){const r=/```json\s*([\s\S]*?)\s*```/g.exec(e);try{return r&&r[1]?JSON.parse(r[1].trim()):JSON.parse(e)}catch(o){a.record(`string parser error, invalid json ${o}`,a.Level.Warn);return}}getVerifiedProcess(e){const t=this.validateNodeGraph(e);if(t)return{id:"",timestamp:Date.now(),nodeGraph:t}}validateNodeGraph(e){if(!Array.isArray(e)){a.record("string parser error, invalid data",a.Level.Warn);return}for(const t of e)if(!this.validateConnect(t)||!this.validateNode(t))return;return e}validateConnect(e){return!e||typeof e!="object"||!e.hasOwnProperty("fromNode")||!e.hasOwnProperty("toNode")||!e.hasOwnProperty("toParam")?(a.record("string parser error, invalid data",a.Level.Warn),!1):!0}validateNode(e){const t=this.flowNode.getNodeById(e.fromNode.id),r=this.flowNode.getNodeById(e.toNode.id);return!t||!r?(a.record("string parser error, node not found",a.Level.Warn),!1):!!this.validateParam(r,e.toParam)}validateParam(e,t){if(e.type!==p.Method)return!0;const r=e;return Array.isArray(r.describe.params)?r.describe.params.find(n=>n.id===t)?!0:(a.record("string parser error, param not found",a.Level.Warn),!1):!1}}class j{constructor(e){c(this,"stringParser");this.stringParser=new W(e)}parseString(e){return this.stringParser.parse(e)}}class G{constructor(e){c(this,"manager");c(this,"chat");const t=new V,r=new R(t,e.agent),o=new B(t),n=new X,i=new j(t);this.manager=new b(t,o,n,i),this.chat=new F(r,this.manager)}getManager(){return this.manager}getChat(){return this.chat}}l.AgentWenxin=k,l.ProcessContainer=G,Object.defineProperty(l,Symbol.toStringTag,{value:"Module"})});
