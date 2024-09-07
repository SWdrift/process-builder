//@ts-ignore
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

// 4. 根据文本生成并执行流程
(async () => {
    // 发送消息
    const processResult1 = await processContainer.chat.send("PI与自身二倍的差是多少?");
    console.log(processResult1);

    // 执行流程
    const processResult2 = processContainer.manager.performProcess();
    console.log(processResult2);
})();
