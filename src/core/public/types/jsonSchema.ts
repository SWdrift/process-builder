interface JsonSchemaString {
    type: "string";
    enum?: string[];
    maxLength?: number;
    minLength?: number;
    pattern?: string;
}

interface JsonSchemaNumber {
    type: "number";
    maximum?: number;
    minimum?: number;
    exclusiveMaximum?: boolean;
    exclusiveMinimum?: boolean;
}

interface JsonSchemaBoolean {
    type: "boolean";
}

interface JsonSchemaObject {
    type: "object";
    properties?: { [key: string]: JsonSchema };
    required?: string[];
    additionalProperties?: boolean | JsonSchema;
}

interface JsonSchemaArray {
    type: "array";
    items: JsonSchema;
    additionalItems?: boolean | JsonSchema;
}

export type JsonSchema =
    | JsonSchemaString
    | JsonSchemaNumber
    | JsonSchemaBoolean
    | JsonSchemaObject
    | JsonSchemaArray;
