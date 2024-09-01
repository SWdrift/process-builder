# ProcessBuilder

#### 介绍

ProcessBuilder 是一个由 AI 驱动的流程构建器，旨在为应用程序提供自然语言接口，实现功能的自动构建与调用。为开发人员提供了无缝的流程构建接口，只需定义基本的节点，剩下的交给 ProcessBuilder 来处理。

-   🤖 为应用与用户提供自然语言接口
-   🛠️ 提供无缝的节点定义模式，便于开发
-   🧾 可定制的流程生成策略，适配不同开发领域（暂未实现）

#### 安装

##### 包管理器

使用npm安装：

```bash
$ npm install process-builder
```

安装后可以使用 `import` 或 `require` 引入模块。

ES 模块：

```javascript
import { AgentWenxin, ProcessContainer } from "process-builder";
```

CommonJS 模块：

```javascript
const { AgentWenxin, ProcessContainer } = require("process-builder");
```

#### 例子

```javascript
import { AgentWenxin, ProcessContainer } from "process-builder";
// const { AgentWenxin, ProcessContainer } = require("process-builder");  // 也可以使用ES模块

// 1. 创建 ProcessContainer 实例
const agent = new AgentWenxin({
    accessToken: "你的 access token"
});
const processContainer = new ProcessContainer({ agent });

// 2. 定义一些函数与常量
function add(a: number, b: number): number {
    return a + b;
}

function subtract(a: number, b: number): number {
    return a - b;
}

const pi = 3.14159;

// 3. 注册函数与常量
processContainer.manager.registerMethod(add, {
    id: "add",
    describe: "将两数相加 a+b",
    params: [
        { id: "a", describe: "数字1" },
        { id: "b", describe: "数字2" }
    ],
    return: { id: "c", describe: "两数相加的结果" }
});

processContainer.manager.registerMethod(subtract, {
    id: "subtract",
    describe: "将两数相减 a-b",
    params: [
        { id: "a", describe: "数字1" },
        { id: "b", describe: "数字2" }
    ],
    return: { id: "c", describe: "两数相减的结果" }
});

processContainer.manager.registerConstant(pi, {
    id: "pi",
    describe: "圆周率PI"
});

// 4. 根据文本生成并执行流程
(async () => {
    const processResult = await processContainer.chat.send("PI与自身二倍的差是多少?");
    console.log(processResult); // 输出结果
})();

```

#### API

##### **ProcessContainer**

| 方法/属性 | 传入参数 | 返回值 | 描述 |
| --- | --- | --- | --- |
| constructor(config: ProcessContainerConfig) | ProcessContainerConfig 对象 | ProcessContainer 实例 | 构造函数，初始化 ProcessContainer 实例 |
| manager | 无 | void | FlowManager 实例 |
| chat | 无 | void | FlowChat 实例 |
| getManager() | 无 | FlowManager 实例 | 获取 FlowManager 实例 |
| getChat() | 无 | FlowChat 实例 | 获取 FlowChat 实例 |

##### **ProcessContainerConfig**

| 方法/属性 | 传入参数       | 返回值 | 描述                                             |
| --------- | -------------- | ------ | ------------------------------------------------ |
| agent     | IAgentApi 对象 | 无     | 配置项，指定使用的 Agent API，可以引入默认实现。 |

##### **FlowManager**

| 方法/属性 | 传入参数 | 返回值 | 描述 |
| --- | --- | --- | --- |
| performProcess() | 无 | boolean（是否成功） | 执行当前流程，返回是否成功 |
| addProcess(processString: string \| object) | 流程字符串或流程对象 | void | 添加流程字符串或流程对象 |
| registerMethodNode<T extends Fn>(target: T, describe: FnDescribe<T>) | 方法对象，方法描述对象 | void | 注册方法节点 |
| registerValueNode<T extends Object>(target: T, describe: ValueDescribe) | 常量对象，常量描述对象 | void | 注册常量节点 |
| getNodeById(id: string) | 节点 ID（字符串） | Node（节点对象）或 null（如果未找到） | 根据 ID 获取节点 |
| getAllNodes() | 无 | Node[]（节点对象数组） | 获取所有节点 |

##### **FlowChat**

| 方法/属性 | 传入参数 | 返回值 | 描述 |
| --- | --- | --- | --- |
| sessionHistory | 无 | Message[]（消息对象数组） | 会话历史记录，包含提问和回答 |
| send(text: string) | 发送的消息（字符串） | Message（响应的消息对象）或 null | 发送消息，返回消息响应 |

#### 开发

拉取代码：

```bash
git clone https://github.com/SWdrift/process-builder.git
cd process-builder
```

安装依赖：

```bash
pnpm install
```

运行测试：

```bash
pnpm test
```

#### TODO List

-   [ ] 实现流程生成策略
-   [ ] 多语言支持
-   [ ] 类型支持
-   [ ] 边界错误处理
-   [ ] 添加更多默认 IAgentApi 实现
