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
