import { JsonSchema } from "./jsonSchema";
import { Fn } from "./global";

export type ParameterProperties<T extends any[]> = T["length"] extends 0
    ? Record<string, never>
    : {
          [key: string]: {
              /** 参数类型  */
              description: string;
          } & JsonSchema;
      };

export type FunctionParameters<T extends Fn, U extends any[] = Parameters<T>> = {
    type: "object";
    /** 参数定义 使用 JSON Schema 描述 */
    properties: ParameterProperties<U>;
    /** 必须参数，数组中元素为参数名, 未定义则默认所有参数都为必填 */
    required?: string[];
};

export type ResponsProperties<T> = T extends undefined | void
    ? Record<string, never>
    : {
          result: {
              /** 返回值描述 */
              description: string;
          } & JsonSchema;
      };

export type FunctionResponses<T extends Fn, U extends any[] = ReturnType<T>> = {
    type: "object";
    /** 返回值定义 使用 JSON Schema 描述 */
    properties: ResponsProperties<U>;
};

export interface SubFunctionDefine<T extends Fn> {
    /** 函数名称 */
    name: string;
    /** 函数描述 */
    description: string;
    /** 参数定义 */
    parameters: FunctionParameters<T>;
    /** 返回值定义 */
    responses: FunctionResponses<T>;
}

export interface SubConstantDefine<_T> {
    /** 值名称 */
    name: string;
    /** 值描述 */
    description: string;
    /** 值定义 使用 JSON Schema 描述  */
    define: JsonSchema;
}

/**
 * 函数定义
 */
export interface FunctionDefine<T extends Fn> {
    type: "function";
    function: SubFunctionDefine<T>;
}

/**
 * 常量定义
 */
export interface ConstantDefine<T> {
    type: "constant";
    constant: SubConstantDefine<T>;
}
