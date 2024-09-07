interface JsonSchemaString {
    type: "string";
    description?: string;
    enum?: string[];
    maxLength?: number;
    minLength?: number;
    pattern?: string;
}

interface JsonSchemaNumber {
    type: "number";
    description?: string;
    maximum?: number;
    minimum?: number;
    exclusiveMaximum?: boolean;
    exclusiveMinimum?: boolean;
}

interface JsonSchemaBoolean {
    type: "boolean";
    description?: string;
}

interface JsonSchemaObject {
    type: "object";
    description?: string;
    properties?: { [key: string]: JsonSchema };
    required?: string[];
    additionalProperties?: boolean | JsonSchema;
}

interface JsonSchemaArray {
    type: "array";
    description?: string;
    items: JsonSchema;
    additionalItems?: boolean | JsonSchema;
}

interface JsonSchemaFunction {
    type: "function";
    description?: string;
    properties?: { [key: string]: JsonSchema };
    responses?: {
        result: JsonSchema;
    };
}

export type JsonSchema =
    | JsonSchemaString
    | JsonSchemaNumber
    | JsonSchemaBoolean
    | JsonSchemaObject
    | JsonSchemaArray
    | JsonSchemaFunction;
