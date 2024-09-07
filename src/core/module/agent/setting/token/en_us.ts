import { EnumLanguage } from "../../../../interface/config";
import { ITokenConfig } from "../../interface/tokenConfig";

// Abstract
const descAbstract =
    "You need to generate structured image processing workflow data based on the user's image processing objectives, combining the method table and value table. Your output should be in the specified array format.";

// Meta Description
const descMate =
    "The following is the meta description:" +
    "This message is used to construct nodes. You need to generate structured data that can be parsed and executed by the application to fulfill the user's objectives based on the meta description, user objectives, method table, and value table. The Token includes the following parts:" +
    "1. Meta Description:" +
    "Used to describe the purpose of the message, format description, response example, notes, etc. You need to construct executable structured data based on the meta description;" +
    "2. User Objectives:" +
    "Used to describe the user's objectives. Executable structured data should be generated based on the user objectives combined with the method table and value table;" +
    "3. Method Table:" +
    "Contains the unique identifier, description, parameter list with descriptions, and return value description for each method;" +
    "4. Value Table:" +
    "Contains the unique identifier and description for each constant.";

// Format Description
const descFormat =
    "Format Description:" +
    "1. Method Table Format:" +
    "[{name: methodName, description: methodDescription, parameters: {properties: {[paramName]: paramDescription}}, responses: {description: {result: returnDescription, error: errorDescription}}, required: string[](required parameters, elements in the array are parameter names)}]" +
    "2. Value Table Format:" +
    "[{name: valueName, description: valueDescription, define: valueDefinition}]" +
    "3. Response Format: Please ensure the return result is in array format:" +
    "[{fromNode: {name: sourceNodeName, instanceId: sourceNodeInstanceId}, toNode: {name: targetNodeName, instanceId: targetNodeInstanceId}, toParam: targetParameterName}]";

// Response Example
const descExample =
    "Response Example: Suppose we need to construct an order processing workflow to fulfill the user's need to 'check inventory, calculate prices, and finally generate an order based on order information'." +
    "Given Method Table:" +
    '[{"name":"checkInventory","description":"Check product inventory","parameters":{"properties":{"productId":{"type":"string","description":"Product ID"},"quantity":{"type":"integer","description":"Quantity"}}},"responses":{"description":"Inventory check result","properties":{"result":{"type":"boolean","description":"Is inventory sufficient"}}},"required":["productId","quantity"]},' +
    '{"name":"calculatePrice","description":"Calculate total product price","parameters":{"properties":{"productId":{"type":"string","description":"Product ID"},"quantity":{"type":"integer","description":"Quantity"},"discountCode":{"type":"string","description":"Discount code (optional)"}}},"responses":{"description":"Calculated price","properties":{"result":{"type":"number","description":"Total price"}}},"required":["productId","quantity"]},' +
    '{"name":"createOrder","description":"Generate order","parameters":{"properties":{"productId":{"type":"string","description":"Product ID"},"quantity":{"type":"integer","description":"Quantity"},"totalPrice":{"type":"number","description":"Total price"}}},"responses":{"description":"Order generation status","properties":{"orderStatus":{"type":"string","description":"Order status"}}},"required":["productId","quantity","totalPrice"]}]' +
    "Given Value Table:" +
    '[{"name":"discountCode","description":"Discount code - Spring Promotion","define":"SPRING2023"},' +
    '{"name":"productIdExample","description":"Example Product ID","define":"PROD12345"}]' +
    "The response should be:" +
    '[{"fromNode":{"name":"productIdExample", "instanceId":1}, "toNode":{"name":"checkInventory", "instanceId":1}, "toParam":"productId"},' +
    '{"fromNode":{"name":"productIdExample", "instanceId":1}, "toNode":{"name":"calculatePrice", "instanceId":1}, "toParam":"productId"},' +
    '{"fromNode":{"name":"checkInventory", "instanceId":1}, "toNode":{"name":"createOrder", "instanceId":1}, "toParam":"quantity"},' +
    '{"fromNode":{"name":"calculatePrice", "instanceId":1}, "toNode":{"name":"createOrder", "instanceId":1}, "toParam":"totalPrice"},' +
    '{"fromNode":{"name":"discountCode", "instanceId":1}, "toNode":{"name":"calculatePrice", "instanceId":1}, "toParam":"discountCode"},' +
    '{"fromNode":{"name":"checkInventory", "instanceId":1}, "toNode":{"name":"calculatePrice", "instanceId":2}, "toParam":"quantity"},' +
    '{"fromNode":{"name":"calculatePrice", "instanceId":2}, "toNode":{"name":"createOrder", "instanceId":2}, "toParam":"totalPrice"' +
    "}]";

// Notes
const descNote =
    "Notes:" +
    "1. If it is not possible or uncertain to achieve the user's objectives, please return an empty array []" +
    "2. Please ensure the response result is in array format." +
    "3. Please ensure that different instances of the same node have different instanceId to distinguish between nodes of the same type located in different positions.";

const descMateEnd = "End of meta description.";

// User Objective Prefix and Explanation
const descMessage = "The following are the user objectives:";

const descMessageEnd = "End of user objectives.";

// Method Table Prefix and Explanation
const descMethod = "The following is the method table:";

const descMethodEnd = "End of method table.";

// Value Table Prefix and Explanation
const descValue = "The following is the value table:";
const descValueEnd = "End of value table.";

const descEnd = "The above is the entire content of the Token.";

export const EN_US: ITokenConfig = {
    LANGUAGE: EnumLanguage.EN_US,
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
