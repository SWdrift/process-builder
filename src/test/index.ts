import { AgentWenxin, ProcessContainer } from "../core/index";
import { ENV } from "../setting/env";

const accessToken = ENV.VITE_AGENT_WENXIN_TOKEN
    ? ENV.VITE_AGENT_WENXIN_TOKEN
    : ENV.VITE_AGENT_TOKEN;
if (!accessToken) {
    throw new Error("请在环境变量中设置 AGENT_WENXIN_TOKEN 或者 AGENT_TOKEN");
}
const flowAgentApi = new AgentWenxin({
    accessToken
});
const flowContainer = new ProcessContainer({ agent: flowAgentApi });

const testBaseRegister = () => {
    const test1 = (message: string) => {
        console.log("test", new Date().getDate(), message);
    };
    const test2 = (message: string, callback: (result: boolean) => void) => {
        console.log("test2", new Date().getDate(), message);
        callback(false);
        return false;
    };
    const getTestMessage = () => {
        return "test message";
    };

    flowContainer.manager.registerMethodNode(test1, {
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
    flowContainer.manager.registerMethodNode(test2, {
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
    flowContainer.manager.registerMethodNode(getTestMessage, {
        id: "getTestMessage",
        describe: "获取测试消息",
        return: {
            id: "string",
            describe: "字符串"
        },
        params: []
    });
    console.log(flowContainer.manager.getAllNodes());
};

const testBaseFlowChat = async () => {
    const result = await flowContainer.chat.send("打印一个消息在控制台");
    if (result) {
        console.log(result);
    }
};

const testBuilderToken = async () => {
    const loadImage = (filePath: string): string => {
        console.log("加载图像", filePath);
        return "imageData"; // 返回假定的图像数据
    };

    const applyFilter = (imageData: string, filterType: string): string => {
        console.log("应用滤镜", imageData, filterType);
        return "filteredImage"; // 返回假定的滤镜处理后的图像数据
    };

    const saveImage = (imageData: string, savePath: string): boolean => {
        console.log("保存图像", imageData, savePath);
        return true; // 假设保存成功，返回布尔值
    };

    const adjustBrightness = (imageData: string, brightness: number): string => {
        console.log("调整亮度", imageData, brightness);
        return "brightenedImage"; // 返回假定的调整后的图像数据
    };

    const mergeImages = (imageData1: string, imageData2: string): string => {
        console.log("合并图像", imageData1, imageData2);
        return "mergedImage"; // 返回假定的合并后的图像数据
    };

    const cropImage = (imageData: string, cropArea: object): string => {
        console.log("裁剪图像", imageData, cropArea);
        return "croppedImage"; // 返回假定的裁剪后的图像数据
    };

    const generateThumbnail = (imageData: string, size: string): string => {
        console.log("生成缩略图", imageData, size);
        return "thumbnail"; // 返回假定的缩略图数据
    };

    const rotateImage = (imageData: string, angle: number): string => {
        console.log("旋转图像", imageData, angle);
        return "rotatedImage"; // 返回假定的旋转后的图像数据
    };

    const registerImageProcessingNodes = () => {
        flowContainer.manager.registerMethodNode(loadImage, {
            id: "node1",
            describe: "加载图像",
            return: { id: "imageData", describe: "加载的图像数据" },
            params: [{ id: "filePath", describe: "图像文件路径" }]
        });

        flowContainer.manager.registerMethodNode(applyFilter, {
            id: "node2",
            describe: "应用滤镜",
            return: { id: "filteredImage", describe: "滤镜处理后的图像数据" },
            params: [
                { id: "imageData", describe: "图像数据" },
                { id: "filterType", describe: "滤镜类型" }
            ]
        });

        flowContainer.manager.registerMethodNode(saveImage, {
            id: "node3",
            describe: "保存图像",
            return: { id: "saveStatus", describe: "保存状态" },
            params: [
                { id: "imageData", describe: "图像数据" },
                { id: "savePath", describe: "保存路径" }
            ]
        });

        flowContainer.manager.registerMethodNode(adjustBrightness, {
            id: "node4",
            describe: "调整图像亮度",
            return: { id: "brightenedImage", describe: "调整后的图像数据" },
            params: [
                { id: "imageData", describe: "图像数据" },
                { id: "brightness", describe: "亮度值" }
            ]
        });

        flowContainer.manager.registerMethodNode(mergeImages, {
            id: "node5",
            describe: "合并图像",
            return: { id: "mergedImage", describe: "合并后的图像数据" },
            params: [
                { id: "imageData1", describe: "第一张图像数据" },
                { id: "imageData2", describe: "第二张图像数据" }
            ]
        });

        flowContainer.manager.registerMethodNode(cropImage, {
            id: "node6",
            describe: "裁剪图像",
            return: { id: "croppedImage", describe: "裁剪后的图像数据" },
            params: [
                { id: "imageData", describe: "图像数据" },
                { id: "cropArea", describe: "裁剪区域" }
            ]
        });

        flowContainer.manager.registerMethodNode(generateThumbnail, {
            id: "node7",
            describe: "生成缩略图",
            return: { id: "thumbnail", describe: "生成的缩略图" },
            params: [
                { id: "imageData", describe: "图像数据" },
                { id: "size", describe: "缩略图尺寸" }
            ]
        });

        flowContainer.manager.registerMethodNode(rotateImage, {
            id: "node8",
            describe: "图像旋转",
            return: { id: "rotatedImage", describe: "旋转后的图像数据" },
            params: [
                { id: "imageData", describe: "图像数据" },
                { id: "angle", describe: "旋转角度" }
            ]
        });
    };

    const grayFilter = "gray";
    const highBrightness = 150;
    const cropAreaExample = { x: 10, y: 10, width: 100, height: 100 };
    const thumbnailSize = "100x100";
    const rotationAngle = 90;
    const imagePath = "/path/to/image.jpg";
    const savePath = "/path/to/save.jpg";

    const registerImageProcessingValues = () => {
        flowContainer.manager.registerValueNode(grayFilter, {
            id: "value1",
            describe: "滤镜类型 - 灰度滤镜"
        });

        flowContainer.manager.registerValueNode(highBrightness, {
            id: "value2",
            describe: "亮度值 - 高亮度"
        });

        flowContainer.manager.registerValueNode(cropAreaExample, {
            id: "value3",
            describe: "裁剪区域 - 示例区域"
        });

        flowContainer.manager.registerValueNode(thumbnailSize, {
            id: "value4",
            describe: "缩略图尺寸 - 100x100"
        });

        flowContainer.manager.registerValueNode(rotationAngle, {
            id: "value5",
            describe: "旋转角度 - 90度"
        });

        flowContainer.manager.registerValueNode(imagePath, {
            id: "value6",
            describe: "图像文件路径"
        });

        flowContainer.manager.registerValueNode(savePath, {
            id: "value7",
            describe: "图像保存路径"
        });
    };

    registerImageProcessingNodes();
    registerImageProcessingValues();
    console.log(flowContainer.manager.getAllNodes());

    console.log(await flowContainer.chat.send("应用灰度滤镜并保存图像"));
    // console.log(await flowContainer.chat.send("旋转图像并生成缩略图"));
    console.log(await flowContainer.chat.send("调整亮度、应用反转滤镜并保存"));
    // console.log(await flowContainer.chat.send("合并两张图像并旋转结果"));
    // console.log(await flowContainer.chat.send("裁剪图像并应用滤镜"));
};

const testPerformProcess = async () => {
    const loadImage = (filePath: string): string => {
        console.log("加载图像", filePath);
        return "imageData"; // 返回假定的图像数据
    };

    const applyFilter = (imageData: string, filterType: string): string => {
        console.log("应用滤镜", imageData, filterType);
        return "filteredImage"; // 返回假定的滤镜处理后的图像数据
    };

    const saveImage = (imageData: string, savePath: string): boolean => {
        console.log("保存图像", imageData, savePath);
        return true; // 假设保存成功，返回布尔值
    };

    const adjustBrightness = (imageData: string, brightness: number): string => {
        console.log("调整亮度", imageData, brightness);
        return "brightenedImage"; // 返回假定的调整后的图像数据
    };

    const mergeImages = (imageData1: string, imageData2: string): string => {
        console.log("合并图像", imageData1, imageData2);
        return "mergedImage"; // 返回假定的合并后的图像数据
    };

    const cropImage = (imageData: string, cropArea: object): string => {
        console.log("裁剪图像", imageData, cropArea);
        return "croppedImage"; // 返回假定的裁剪后的图像数据
    };

    const generateThumbnail = (imageData: string, size: string): string => {
        console.log("生成缩略图", imageData, size);
        return "thumbnail"; // 返回假定的缩略图数据
    };

    const rotateImage = (imageData: string, angle: number): string => {
        console.log("旋转图像", imageData, angle);
        return "rotatedImage"; // 返回假定的旋转后的图像数据
    };

    const registerImageProcessingNodes = () => {
        flowContainer.manager.registerMethodNode(loadImage, {
            id: "node1",
            describe: "加载图像",
            return: { id: "imageData", describe: "加载的图像数据" },
            params: [{ id: "filePath", describe: "图像文件路径" }]
        });

        flowContainer.manager.registerMethodNode(applyFilter, {
            id: "node2",
            describe: "应用滤镜",
            return: { id: "filteredImage", describe: "滤镜处理后的图像数据" },
            params: [
                { id: "imageData", describe: "图像数据" },
                { id: "filterType", describe: "滤镜类型" }
            ]
        });

        flowContainer.manager.registerMethodNode(saveImage, {
            id: "node3",
            describe: "保存图像",
            return: { id: "saveStatus", describe: "保存状态" },
            params: [
                { id: "imageData", describe: "图像数据" },
                { id: "savePath", describe: "保存路径" }
            ]
        });

        flowContainer.manager.registerMethodNode(adjustBrightness, {
            id: "node4",
            describe: "调整图像亮度",
            return: { id: "brightenedImage", describe: "调整后的图像数据" },
            params: [
                { id: "imageData", describe: "图像数据" },
                { id: "brightness", describe: "亮度值" }
            ]
        });

        flowContainer.manager.registerMethodNode(mergeImages, {
            id: "node5",
            describe: "合并图像",
            return: { id: "mergedImage", describe: "合并后的图像数据" },
            params: [
                { id: "imageData1", describe: "第一张图像数据" },
                { id: "imageData2", describe: "第二张图像数据" }
            ]
        });

        flowContainer.manager.registerMethodNode(cropImage, {
            id: "node6",
            describe: "裁剪图像",
            return: { id: "croppedImage", describe: "裁剪后的图像数据" },
            params: [
                { id: "imageData", describe: "图像数据" },
                { id: "cropArea", describe: "裁剪区域" }
            ]
        });

        flowContainer.manager.registerMethodNode(generateThumbnail, {
            id: "node7",
            describe: "生成缩略图",
            return: { id: "thumbnail", describe: "生成的缩略图" },
            params: [
                { id: "imageData", describe: "图像数据" },
                { id: "size", describe: "缩略图尺寸" }
            ]
        });

        flowContainer.manager.registerMethodNode(rotateImage, {
            id: "node8",
            describe: "图像旋转",
            return: { id: "rotatedImage", describe: "旋转后的图像数据" },
            params: [
                { id: "imageData", describe: "图像数据" },
                { id: "angle", describe: "旋转角度" }
            ]
        });
    };

    const grayFilter = "gray";
    const highBrightness = 150;
    const cropAreaExample = { x: 10, y: 10, width: 100, height: 100 };
    const thumbnailSize = "100x100";
    const rotationAngle = 90;
    const imagePath = "/path/to/image.jpg";
    const savePath = "/path/to/save.jpg";

    const registerImageProcessingValues = () => {
        flowContainer.manager.registerValueNode(grayFilter, {
            id: "value1",
            describe: "滤镜类型 - 灰度滤镜"
        });

        flowContainer.manager.registerValueNode(highBrightness, {
            id: "value2",
            describe: "亮度值 - 高亮度"
        });

        flowContainer.manager.registerValueNode(cropAreaExample, {
            id: "value3",
            describe: "裁剪区域 - 示例区域"
        });

        flowContainer.manager.registerValueNode(thumbnailSize, {
            id: "value4",
            describe: "缩略图尺寸 - 100x100"
        });

        flowContainer.manager.registerValueNode(rotationAngle, {
            id: "value5",
            describe: "旋转角度 - 90度"
        });

        flowContainer.manager.registerValueNode(imagePath, {
            id: "value6",
            describe: "图像文件路径"
        });

        flowContainer.manager.registerValueNode(savePath, {
            id: "value7",
            describe: "图像保存路径"
        });
    };

    registerImageProcessingNodes();
    registerImageProcessingValues();
    console.log(flowContainer.manager.getAllNodes());

    // console.log(await flowContainer.chat.send("应用灰度滤镜并保存图像"));
    // console.log(await flowContainer.chat.send("旋转图像并生成缩略图"));
    console.log(await flowContainer.chat.send("调整亮度、应用反转滤镜并保存"));
    // console.log(await flowContainer.chat.send("合并两张图像并旋转结果"));
    // console.log(await flowContainer.chat.send("裁剪图像并应用滤镜"));

    flowContainer.manager.performProcess();
};

export async function mainTest() {
    testBaseRegister();
    testBaseFlowChat();
    await testBuilderToken();
    await testPerformProcess();
}
