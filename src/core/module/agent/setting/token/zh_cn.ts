import { ITokenConfig } from "../../interface/tokenConfig";
import { EnumLanguage } from "../../../../interface/config";

// 摘要
const descAbstract =
    "你需要基于用户的图像处理目的，结合方法表和值表，生成结构化的图像处理流程数据。你的输出的结果应当为指定的数组格式。";

// 元描述
const descMate =
    "以下是元描述:" +
    "此消息用于构建节点,你需要根据元描述、用户目的、方法表和值表生成可被应用解析执行的结构化数据以满足用户目的。Token包括以下部分:" +
    "1. 元描述:" +
    "用于描述消息的目的、格式描述、响应示例、注意事项等，你需要根据元描述来构建可执行的结构化数据；" +
    "2. 用户目的:" +
    "用于描述用户的目的，需要根据用户目的结合方法表和值表生成可执行的结构化数据；" +
    "3. 方法表:" +
    "包含方法的唯一标识符、描述、参数列表及其描述，以及返回值描述；" +
    "4. 值表:" +
    "包含常量的唯一标识符及其描述。";

// 格式描述
const descFormat =
    "格式描述:" +
    "1. 方法表格式:" +
    "[{name:方法名称,description:方法描述,parameters:{properties:{[参数名]:参数描述}},responses:{description:{result:返回值描述,error:错误描述}},required:string[](必须传入的参数，数组中元素为参数名)}]" +
    "2. 值表格式:" +
    "[{name:值名称,description:值描述,define:值定义}]" +
    "3. 响应格式，请确保返回结果为数组格式:" +
    "[{fromNode:{name:来源节点name, instanceId:来源节点实例序号}, toNode:{name:目标节点name, instanceId:目标节点实例序号}, toParam:目标参数名}]";

// 响应示例
const descExample =
    "响应示例:假设我们要构建一个订单处理流程，满足用户“根据订单信息，进行库存检查、价格计算，并最终生成订单”的需求。" +
    "给定方法表:" +
    '[{"name":"checkInventory","description":"检查商品库存","parameters":{"properties":{"productId":{"type":"string","description":"商品ID"},"quantity":{"type":"integer","description":"商品数量"}}},"responses":{"description":"库存检查结果","properties":{"result":{"type":"boolean","description":"库存是否足够"}}},"required":["productId","quantity"]},' +
    '{"name":"calculatePrice","description":"计算商品总价","parameters":{"properties":{"productId":{"type":"string","description":"商品ID"},"quantity":{"type":"integer","description":"商品数量"},"discountCode":{"type":"string","description":"折扣码(可选)"}}},"responses":{"description":"计算出的价格","properties":{"result":{"type":"number","description":"总价"}}},"required":["productId","quantity"]},' +
    '{"name":"createOrder","description":"生成订单","parameters":{"properties":{"productId":{"type":"string","description":"商品ID"},"quantity":{"type":"integer","description":"商品数量"},"totalPrice":{"type":"number","description":"总价"}}},"responses":{"description":"订单生成状态","properties":{"orderStatus":{"type":"string","description":"订单状态"}}},"required":["productId","quantity","totalPrice"]}]' +
    "给定值表:" +
    '[{"name":"discountCode","description":"折扣码 - 春季促销","define":"SPRING2023"},' +
    '{"name":"productIdExample","description":"示例商品ID","define":"PROD12345"}]' +
    "响应应当为:" +
    '[{"fromNode":{"name":"productIdExample", "instanceId":1}, "toNode":{"name":"checkInventory", "instanceId":1}, "toParam":"productId"},' +
    '{"fromNode":{"name":"productIdExample", "instanceId":1}, "toNode":{"name":"calculatePrice", "instanceId":1}, "toParam":"productId"},' +
    '{"fromNode":{"name":"checkInventory", "instanceId":1}, "toNode":{"name":"createOrder", "instanceId":1}, "toParam":"quantity"},' +
    '{"fromNode":{"name":"calculatePrice", "instanceId":1}, "toNode":{"name":"createOrder", "instanceId":1}, "toParam":"totalPrice"},' +
    '{"fromNode":{"name":"discountCode", "instanceId":1}, "toNode":{"name":"calculatePrice", "instanceId":1}, "toParam":"discountCode"},' +
    '{"fromNode":{"name":"checkInventory", "instanceId":1}, "toNode":{"name":"calculatePrice", "instanceId":2}, "toParam":"quantity"},' +
    '{"fromNode":{"name":"calculatePrice", "instanceId":2}, "toNode":{"name":"createOrder", "instanceId":2}, "toParam":"totalPrice"' +
    "}]";

// 注意事项
const descNote =
    "注意事项:" +
    "1. 如果**不能**或**不确定**能完成用户目的，请**返回空数组[]**" +
    "2. **请确保响应结果为数组格式**。" +
    "3. 请确保同一节点的不同实例具有**不同的`instanceId`**，以区分位于不同位置的同类型节点。";

const descMateEnd = "元描述结束。";

// 用户目的前缀与解释
const descMessage = "以下是用户目的:";

const descMessageEnd = "用户目的结束。";

// 方法说明的前缀与解释
const descMethod = "以下是方法表:";

const descMethodEnd = "方法表结束。";

// 值说明的前缀与解释
const descValue = "以下是值表:";

const descValueEnd = "值表结束。";

const descEnd = "以上是Token的全部内容。";

export const ZH_CN: ITokenConfig = {
    LANGUAGE: EnumLanguage.ZH_CN,
    ABSTRACT: descAbstract,
    PREFIX: descMate + descFormat + descExample + descNote + descMateEnd,
    SUFFIX: descEnd,
    MESSAGE_PREFIX: descMessage,
    MESSAGE_SUFFIX: descMessageEnd,
    METHOD_PREFIX: descMethod,
    METHOD_SUFFIX: descMethodEnd,
    VALUE_PREFIX: descValue,
    VALUE_SUFFIX: descValueEnd
};
