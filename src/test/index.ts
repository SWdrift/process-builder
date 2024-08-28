import { flowChat, flowManager } from "../core/index";

const testBaseRegister = () => {
    const test1 = (message: string) => {
        console.log("test", new Date().getDate(), message);
    };
    const test2 = (message: string, callback: (result: boolean) => void) => {
        console.log("test2", new Date().getDate(), message);
        callback(false);
        return false;
    };

    flowManager.registerMethodNode(test1, {
        id: "test1",
        describe: "打印测试信息在控制台",
        return: undefined,
        params: [
            {
                id: "message",
                describe: "传入的消息"
            }
        ]
    });
    flowManager.registerMethodNode(test2, {
        id: "test2",
        describe: "打印测试信息在控制台",
        return: {
            id: "boolean",
            describe: "布尔值"
        },
        params: [
            {
                id: "message",
                describe: "传入的消息"
            },
            {
                id: "callback",
                describe: "回调函数"
            }
        ]
    });
    console.log(flowManager.getAllNodes());
};

const testBaseFlowChat = async () => {
    const result = await flowChat.send("hello world");
    if (result) {
        console.log(result);
    }
};

export function mainTest() {
    // testBaseRegister();
    // testBaseFlowChat();
}
