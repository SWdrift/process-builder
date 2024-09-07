import { Fn } from "../public/types/global";
import {
    FunctionDefine,
    ConstantDefine,
    SubFunctionDefine,
    SubConstantDefine
} from "../public/types/app";

/**
 * 方法、常量注册接口
 *
 * 将方法、常量注册到 FlowLLM 中，流构建器可以根据这些注册信息进行流的构建
 */
export interface IManager {
    /**
     * 执行当前流程
     * @returns 是否成功
     */
    performProcess(): Promise<boolean>;
    /**
     * 添加流程
     * @param processString 流程字符串或流程对象
     */
    addProcess(processString: string | object): void;

    /**
     * 注册节点
     */
    registerNode<T>(target: T, define: UseNodeDefine<T>): void;
    /**
     * 注册方法
     */
    registerFunction<T extends Fn>(target: T, define: SubFunctionDefine<T>): void;
    /**
     * 注册常量
     */
    registerConstant<T>(target: T, define: SubConstantDefine<T>): void;
    /**
     * 获取节点
     */
    getNodeByName<T extends EnumNode = EnumNode>(name: string): IEntNode<T> | undefined;
    /**
     * 获取所有节点
     */
    getAllNodes(): IEntNode[];
}

/**
 * 节点注册时定义，可以是函数定义或常量定义
 * @template T 类型参数
 */
export type UseNodeDefine<T> = T extends Fn ? FunctionDefine<T> : ConstantDefine<T>;

/**
 * 节点类型枚举
 */
export enum EnumNode {
    Function = "function",
    Constant = "constant"
}

/**
 * 节点定义
 * @template T 节点类型
 */
export type NodeDefine<T extends EnumNode = EnumNode> = {
    [EnumNode.Function]: FunctionDefine<(args: any) => any>;
    [EnumNode.Constant]: ConstantDefine<any>;
}[T];

/**
 * 节点实体
 * @template T 节点类型
 */
export interface IEntNode<T extends EnumNode = EnumNode> {
    name: string;
    target: any;
    define: NodeDefine<T>;
}

/**
 * 流程对象
 */
export interface IEntProcess {
    id: string;
    timestamp: number;
    nodeGraph: IEntConnect[];
}

/**
 * 流程连接对象
 * @template T 起点节点类型
 * @template U 终点节点类型
 */
export interface IEntConnect {
    fromNode: INodeIndex;
    toNode: INodeIndex;
    toParam: string;
}

/**
 * 节点描述
 */
export interface INodeIndex {
    /** 节点名称 */
    name: string;
    /** 实例id  */
    instanceId: number;
}
