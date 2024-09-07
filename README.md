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
npm install process-builder
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

// 使用默认的 IAgentApi 实现
const agent = new AgentWenxin({
    accessToken: "你的 access token",
    // 其他配置项
});
// 实例化 ProcessContainer 对象
const processContainer = new ProcessContainer({ agent });


// 2. 定义一些函数与常量

function add(a: number, b: number): number {
    return a + b;
}

function subtract(a: number, b: number): number {
    return a - b;
}

const pi = 3.14159;


// 3. 将函数与常量注册到 ProcessContainer 中

processContainer.manager.registerFunction(add, {
    name: "add",
    description: "将两数相加 a+b",
    parameters: {
        type: "object",
        properties: {
            a: {
                type: "number",
                description: "数字1"
            },
            b: {
                type: "number",
                description: "数字2"
            }
        }
    },
    responses: {
        type: "object",
        properties: {
            result: {
                type: "number",
                description: "两数相加的结果"
            }
        }
    }
});

processContainer.manager.registerFunction(subtract, {
    name: "subtract",
    description: "将两数相减 a-b",
    parameters: {
        type: "object",
        properties: {
            a: {
                type: "number",
                description: "数字1"
            },
            b: {
                type: "number",
                description: "数字2"
            }
        }
    },
    responses: {
        type: "object",
        properties: {
            result: {
                type: "number",
                description: "两数相减的结果"
            }
        }
    }
});

processContainer.manager.registerConstant(pi, {
    name: "pi",
    description: "圆周率PI",
    define: {
        type: "number"
    }
});


// 4. 根据自然语言生成并执行流程

(async () => {
    // 发送消息，使用自然语言
    const processResult1 = await processContainer.chat.send(
        "PI与自身二倍的差是多少?"
    );
    console.log(processResult1);

    // 执行流程
    const processResult2 = processContainer.manager.performProcess();
    console.log(processResult2);
})();

```

注意：

1. 请替换 `你的 access token` 为你自己的 access token。
2. 如果使用默认 IAgentApi 实现，请确保 CORS 已正确配置。

#### API

##### **ProcessContainer**

| 方法/属性 | 传入参数 | 返回值 | 描述 |
| --- | --- | --- | --- |
| constructor(config: IModuleConfig) | IModuleConfig 对象 | ProcessContainer 实例 | 构造函数，初始化 ProcessContainer 实例 |
| manager | 无 | void | FlowManager 实例 |
| chat | 无 | void | FlowChat 实例 |
| getManager() | 无 | FlowManager 实例 | 获取 FlowManager 实例 |
| getChat() | 无 | FlowChat 实例 | 获取 FlowChat 实例 |

##### **IModuleConfig**

| 方法/属性 | 传入参数       | 返回值 | 描述                                             |
| --------- | -------------- | ------ | ------------------------------------------------ |
| agent     | IAgentApi 对象 | 无     | 配置项，指定使用的 Agent API，可以引入默认实现。 |
| language  | EnumLanguage   | 无     | 指定语言环境，默认 `EnumLanguage.ZN_CH`          |

##### **FlowManager**

| 方法/属性 | 传入参数 | 返回值 | 描述 |
| --- | --- | --- | --- |
| performProcess() | 无 | boolean（是否成功） | 从流程队列中取出流程并执行当前流程，返回是否成功 |
| addProcess(processString: string \| object) | 流程字符串或流程对象 | void | 添加流程字符串或流程对象 |
| registerNode<T>(target: T, define: UseNodeDefine<T>) | 目标对象，节点定义 | void | 注册节点，包括方法和常量 |
| registerFunction<T extends Fn>(target: T, describe: SubFunctionDefine<T>) | 方法对象，方法描述对象 | void | 注册方法节点 |
| registerConstant<T extends Object>(target: T, describe: SubConstantDefine<T>) | 常量对象，常量描述对象 | void | 注册常量节点 |
| getNodeByName(name: string) | 节点 ID（字符串） | IEntNode（节点对象）或 undefine（如果未找到） | 根据 节点 获取节点 |
| getAllNodes() | 无 | IEntNode[]（节点对象数组） | 获取所有节点 |

##### **FlowChat**

| 方法/属性 | 传入参数 | 返回值 | 描述 |
| --- | --- | --- | --- |
| sessionHistory | 无 | IEntSession[]（会话数组） | 会话历史记录，包含提问和回答 |
| send(text: string) | 发送的消息（字符串） | Promise<IEntSession>（响应会话）或 null | 发送消息，返回消息响应 |

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

-   [x] 多语言支持
-   [x] 规范化函数描述格式
-   [ ] 更多 IAgentApi 实现
-   [ ] 完善错误处理机制，实现闭环控制
-   [ ] 可配置规则引擎

#### 关于

-   [Github](https://github.com/SWdrift/process-builder)
-   [Gitee](https://gitee.com/CZXyee/process-builder)
-   [npm](https://www.npmjs.com/package/process-builder)

#### 协议

[MIT](./LICENSE)
