import { JsonSchema } from "./jsonSchema";
import { Fn } from "./global";

export type PropertiesScheam<T extends any[]> = T["length"] extends 0
    ? Record<string, never>
    : {
          [key: string]: JsonSchema;
      };

export type FunctionParameters<T extends Fn, U extends any[] = Parameters<T>> = {
    type: "object";
    properties: PropertiesScheam<U>;
    required?: string[];
};

export type FunctionResponses<T extends Fn> =
    ReturnType<T> extends void
        ? {}
        : {
              type: "object";
              properties: {
                  result: JsonSchema;
              };
          };

export interface FunctionDefine<T extends Fn> {
    type: "function";
    function: {
        name: string;
        description: string;
        parameters: FunctionParameters<T>;
        responses: FunctionResponses<T>;
    };
}

// 示例使用
type MyFunction = (x: number, y: string, z: string) => boolean;

const myFunctionDefine: FunctionDefine<MyFunction> = {
    type: "function",
    function: {
        name: "myFunction",
        description: "A sample function",
        parameters: {
            type: "object",
            properties: {
                x: { type: "boolean" },
                y: { type: "string" },
                z: { type: "string" }
            },
            required: ["x", "y", "z"]
        },
        responses: {
            type: "object",
            properties: {
                result: { type: "boolean" }
            }
        }
    }
};
