/**
 * Token 设置
 */
interface ITokenConfig {
    /** 人设（如果有） */
    SYSTEM: string;
    /** token 前缀 */
    PREFIX: string;
    /** token 后缀 */
    SUFFIX: string;
    /** 消息前缀 */
    MESSAGE_PREFIX: string;
    /** 消息后缀 */
    MESSAGE_SUFFIX: string;
    /** 方法表前缀 */
    METHOD_PREFIX: string;
    /** 方法表后缀 */
    METHOD_SUFFIX: string;
    /** 值表前缀 */
    VALUE_PREFIX: string;
    /** 值表后缀 */
    VALUE_SUFFIX: string;
}

const descSystem =
    "你需要根据指定的元描述、用户目的、方法表和值表生成可被应用解析执行的结构化数据以满足用户目的，你的输出的结果应当为指定的数组格式。";

// 元描述
const descMate =
    "以下是元描述：" +
    "此消息用于构建节点，你需要根据元描述、用户目的、方法表和值表生成可被应用解析执行的结构化数据以满足用户目的。Token包括以下部分：" +
    "1. 元描述：" +
    "用于描述消息的目的、格式描述、响应示例、注意事项等，你需要根据元描述来构建可执行的结构化数据；" +
    "2. 用户目的：" +
    "用于描述用户的目的，需要根据用户目的结合方法表和值表生成可执行的结构化数据；" +
    "3. 方法表：" +
    "包含方法的唯一标识符、描述、参数列表及其描述，以及返回值描述；" +
    "4. 值表：" +
    "包含常量的唯一标识符及其描述。";

// 格式描述
const descFormat =
    "格式描述：" +
    "1. 方法表格式：" +
    "[{id:唯一id,describe:方法描述,params:[{id:参数id,describe:参数描述}],return:{id:返回值id,describe:返回值描述}}]" +
    "2. 值表格式：" +
    "[{id:唯一id,describe:常量描述}]" +
    "3. 响应格式，请确保返回结果为数组格式：" +
    "[{fromNode:{id:来源节点id, instanceId:来源节点实例序号}, toNode:{id:目标节点id, instanceId:目标节点实例序号}, toParam:目标参数id}]";

// 响应示例
const descExample =
    "响应示例：假设我们要构建一个简单的图像处理流程，满足用户“为图像添加滤镜”的需求。" +
    "给定方法表：" +
    '[{"id":"node1","describe":"加载图像","params":[{"id":"filePath","describe":"图像文件路径"}],"return":{"id":"imageData","describe":"加载的图像数据"}},{"id":"node2","describe":"应用滤镜","params":[{"id":"imageData","describe":"图像数据"},{"id":"filterType","describe":"滤镜类型"}],"return":{"id":"filteredImage","describe":"滤镜处理后的图像数据"}},{"id":"node3","describe":"保存图像","params":[{"id":"imageData","describe":"图像数据"},{"id":"savePath","describe":"保存路径"}],"return":{"id":"saveStatus","describe":"保存状态"}}]' +
    "给定值表：" +
    '[{"id":"value1","describe":"滤镜类型 - 灰度滤镜"}]' +
    "响应应当为：" +
    '[{"fromNode":{"id":"node1", "instanceId":1}, "toNode":{"id":"node2", "instanceId":1}, "toParam":"imageData"},' +
    '{"fromNode":{"id":"value1", "instanceId":1}, "toNode":{"id":"node2", "instanceId":1}, "toParam":"filterType"},' +
    '{"fromNode":{"id":"node2", "instanceId":1}, "toNode":{"id":"node3", "instanceId":1}, "toParam":"imageData"},' +
    '{"fromNode":{"id":"node1", "instanceId":1}, "toNode":{"id":"node2", "instanceId":2}, "toParam":"imageData"},' +
    '{"fromNode":{"id":"value1", "instanceId":1}, "toNode":{"id":"node2", "instanceId":2}, "toParam":"filterType"},' +
    '{"fromNode":{"id":"node2", "instanceId":2}, "toNode":{"id":"node3", "instanceId":2}, "toParam":"imageData"}]';

// 注意事项
const descNote =
    "注意事项：" +
    "1. 如果**不能**或**不确定**能完成用户目的，请**返回空数组[]**" +
    "2. **请确保响应结果为数组格式**。" +
    "3. 请确保同一节点的不同实例具有**不同的`instanceId`**，以区分位于不同位置的同类型节点。";

const descMateEnd = "元描述结束。";

// 用户目的前缀与解释
const descMessage = "以下是用户目的：";

const descMessageEnd = "用户目的结束。";

// 方法说明的前缀与解释
const descMethod = "以下是方法表：";

const descMethodEnd = "方法表结束。";

// 值说明的前缀与解释
const descValue = "以下是值表：";

const descValueEnd = "值表结束。";

const descEnd = "以上是Token的全部内容。";

const ZH_CN: ITokenConfig = {
    SYSTEM: descSystem,
    PREFIX: descMate + descFormat + descExample + descNote + descMateEnd,
    SUFFIX: descEnd,
    MESSAGE_PREFIX: descMessage,
    MESSAGE_SUFFIX: descMessageEnd,
    METHOD_PREFIX: descMethod,
    METHOD_SUFFIX: descMethodEnd,
    VALUE_PREFIX: descValue,
    VALUE_SUFFIX: descValueEnd
};

export const TOKEN_CONFIG: ITokenConfig = ZH_CN;
