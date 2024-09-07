import { AgentWenxin, ProcessContainer } from "../core/index";
import { ENV } from "../setting/env";

const accessToken = ENV.VITE_AGENT_WENXIN_TOKEN
    ? ENV.VITE_AGENT_WENXIN_TOKEN
    : ENV.VITE_AGENT_TOKEN;
if (!accessToken) {
    throw new Error("请在环境变量中设置 AGENT_WENXIN_TOKEN 或者 AGENT_TOKEN");
}
const agent = new AgentWenxin({
    accessToken
});
const processContainer = new ProcessContainer({ agent });

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

    processContainer.manager.registerFunction(test1, {
        name: "test1",
        description: "打印测试信息在控制台",
        parameters: {
            type: "object",
            properties: {
                message: {
                    type: "string",
                    description: "传入的消息"
                }
            }
        },
        responses: {
            type: "object",
            properties: {}
        }
    });
    processContainer.manager.registerFunction(test2, {
        name: "test2",
        description: "打印测试信息在控制台",
        parameters: {
            type: "object",
            properties: {
                message: {
                    type: "string",
                    description: "传入的消息"
                },
                callback: {
                    type: "function",
                    description: "回调函数",
                    properties: {
                        result: {
                            type: "boolean",
                            description: "回调函数状态"
                        }
                    }
                }
            }
        },
        responses: {
            type: "object",
            properties: {
                result: {
                    type: "boolean",
                    description: "回调函数返回值"
                }
            }
        }
    });
    processContainer.manager.registerFunction(getTestMessage, {
        name: "getTestMessage",
        description: "获取测试消息",
        parameters: {
            type: "object",
            properties: {}
        },
        responses: {
            type: "object",
            properties: {
                result: {
                    type: "string",
                    description: "测试消息"
                }
            }
        }
    });
    console.log(processContainer.manager.getAllNodes());
};

const testBaseFlowChat = async () => {
    const result = await processContainer.chat.send("打印一个消息在控制台");
    if (result) {
        console.log(result);
    }
    try {
        await processContainer.manager.performProcess();
    } catch (error) {
        console.error(error);
    }
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
        processContainer.manager.registerFunction(loadImage, {
            name: "loadImage",
            description: "加载图像",
            parameters: {
                type: "object",
                properties: {
                    filePath: {
                        type: "string",
                        description: "图像文件路径"
                    }
                }
            },
            responses: {
                type: "object",
                properties: {
                    result: {
                        type: "string",
                        description: "加载的图像数据"
                    }
                }
            }
        });

        processContainer.manager.registerFunction(applyFilter, {
            name: "applyFilter",
            description: "应用滤镜",
            parameters: {
                type: "object",
                properties: {
                    imageData: {
                        type: "string",
                        description: "图像数据"
                    },
                    filterType: {
                        type: "string",
                        description: "滤镜类型"
                    }
                }
            },
            responses: {
                type: "object",
                properties: {
                    result: {
                        type: "string",
                        description: "滤镜处理后的图像数据"
                    }
                }
            }
        });

        processContainer.manager.registerFunction(saveImage, {
            name: "saveImage",
            description: "保存图像",
            parameters: {
                type: "object",
                properties: {
                    imageData: {
                        type: "string",
                        description: "图像数据"
                    },
                    savePath: {
                        type: "string",
                        description: "保存路径"
                    }
                }
            },
            responses: {
                type: "object",
                properties: {
                    result: {
                        type: "boolean",
                        description: "保存状态"
                    }
                }
            }
        });

        processContainer.manager.registerFunction(adjustBrightness, {
            name: "adjustBrightness",
            description: "调整图像亮度",
            parameters: {
                type: "object",
                properties: {
                    imageData: {
                        type: "string",
                        description: "图像数据"
                    },
                    brightness: {
                        type: "number",
                        description: "亮度值"
                    }
                }
            },
            responses: {
                type: "object",
                properties: {
                    result: {
                        type: "string",
                        description: "调整后的图像数据"
                    }
                }
            }
        });

        processContainer.manager.registerFunction(mergeImages, {
            name: "mergeImages",
            description: "合并图像",
            parameters: {
                type: "object",
                properties: {
                    imageData1: {
                        type: "string",
                        description: "第一张图像数据"
                    },
                    imageData2: {
                        type: "string",
                        description: "第二张图像数据"
                    }
                }
            },
            responses: {
                type: "object",
                properties: {
                    result: {
                        type: "string",
                        description: "合并后的图像数据"
                    }
                }
            }
        });

        processContainer.manager.registerFunction(cropImage, {
            name: "cropImage",
            description: "裁剪图像",
            parameters: {
                type: "object",
                properties: {
                    imageData: {
                        type: "string",
                        description: "图像数据"
                    },
                    cropArea: {
                        type: "object",
                        description: "裁剪区域",
                        properties: {
                            x: { type: "number", description: "裁剪区域X坐标" },
                            y: { type: "number", description: "裁剪区域Y坐标" },
                            width: { type: "number", description: "裁剪区域宽度" },
                            height: { type: "number", description: "裁剪区域高度" }
                        }
                    }
                }
            },
            responses: {
                type: "object",
                properties: {
                    result: {
                        type: "string",
                        description: "裁剪后的图像数据"
                    }
                }
            }
        });

        processContainer.manager.registerFunction(generateThumbnail, {
            name: "generateThumbnail",
            description: "生成缩略图",
            parameters: {
                type: "object",
                properties: {
                    imageData: {
                        type: "string",
                        description: "图像数据"
                    },
                    size: {
                        type: "string",
                        description: "缩略图尺寸"
                    }
                }
            },
            responses: {
                type: "object",
                properties: {
                    result: {
                        type: "string",
                        description: "生成的缩略图"
                    }
                }
            }
        });

        processContainer.manager.registerFunction(rotateImage, {
            name: "rotateImage",
            description: "图像旋转",
            parameters: {
                type: "object",
                properties: {
                    imageData: {
                        type: "string",
                        description: "图像数据"
                    },
                    angle: {
                        type: "number",
                        description: "旋转角度"
                    }
                }
            },
            responses: {
                type: "object",
                properties: {
                    result: {
                        type: "string",
                        description: "旋转后的图像数据"
                    }
                }
            }
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
        processContainer.manager.registerConstant(grayFilter, {
            name: "grayFilter",
            description: "滤镜类型 - 灰度滤镜",
            define: {
                type: "string"
            }
        });

        processContainer.manager.registerConstant(highBrightness, {
            name: "highBrightness",
            description: "亮度值 - 高亮度",
            define: {
                type: "number"
            }
        });

        processContainer.manager.registerConstant(cropAreaExample, {
            name: "cropAreaExample",
            description: "裁剪区域 - 示例区域",
            define: {
                type: "object",
                properties: {
                    x: { type: "number" },
                    y: { type: "number" },
                    width: { type: "number" },
                    height: { type: "number" }
                }
            }
        });

        processContainer.manager.registerConstant(thumbnailSize, {
            name: "thumbnailSize",
            description: "缩略图尺寸 - 100x100",
            define: {
                type: "string"
            }
        });

        processContainer.manager.registerConstant(rotationAngle, {
            name: "rotationAngle",
            description: "旋转角度 - 90度",
            define: {
                type: "number"
            }
        });

        processContainer.manager.registerConstant(imagePath, {
            name: "imagePath",
            description: "图像文件路径",
            define: {
                type: "string"
            }
        });

        processContainer.manager.registerConstant(savePath, {
            name: "savePath",
            description: "图像保存路径",
            define: {
                type: "string"
            }
        });
    };

    registerImageProcessingNodes();
    registerImageProcessingValues();
    console.log(processContainer.manager.getAllNodes());

    // console.log(await processContainer.chat.send("应用灰度滤镜并保存图像"));
    // console.log(await processContainer.chat.send("旋转图像并生成缩略图"));
    console.log(await processContainer.chat.send("调整亮度、应用反转滤镜并保存"));
    // console.log(await processContainer.chat.send("合并两张图像并旋转结果"));
    // console.log(await processContainer.chat.send("裁剪图像并应用滤镜"));

    try {
        await processContainer.manager.performProcess();
    } catch (error) {
        console.error(error);
    }
};

export async function mainTest() {
    testBaseRegister();
    testBaseFlowChat();
    await testPerformProcess();
}
