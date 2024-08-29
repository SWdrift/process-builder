/**
 * 方法、常量注册接口
 *
 * 将方法、常量注册到 FlowExpress 中，流构建器可以根据这些注册信息进行流的构建
 */
export interface IFlowManager {
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
     * 注册方法
     */
    registerMethodNode<T extends Fn>(target: T, describe: FnDescribe<T>): void;
    /**
     * 注册常量
     */
    registerValueNode<T extends Object>(target: T, describe: ValueDescribe): void;
    /**
     * 获取节点
     */
    getNodeById(id: string): IEntNode<EnumNode> | undefined;
    /**
     * 获取所有节点
     */
    getAllNodes(): IEntNode<EnumNode>[];
}

/**
 * 流程对象
 */
export interface IEntProcess {
    id: string;
    timestamp: number;
    nodeTree: IEntConnect[];
}

/**
 * 流程连接对象
 */
export interface IEntConnect {
    fromNode: string;
    toNode: string;
    toParam: string;
}

/**
 * 描述
 */
export interface BaseDescribe {
    /** 唯一标识 */
    id: string;
    /** 描述 */
    describe: string;
}

/**
 * 常量描述
 */
export interface ValueDescribe extends BaseDescribe {}

/**
 * 方法描述
 */
export interface FnDescribe<T extends Fn> extends BaseDescribe {
    /** 入参 */
    params: ParamDescribe<T>;
    /** 出参 */
    return: ReturnDescribe<T>;
}

/**
 * 节点
 */
export interface IEntNode<T extends EnumNode> {
    id: string;
    describe: DescribeType<T>;
    type: T;
}

/**
 * 节点类型
 */
export enum EnumNode {
    Method = "Method",
    Value = "Value"
}

export type DescribeType<T extends EnumNode> = {
    [EnumNode.Method]: FnDescribe<Fn>;
    [EnumNode.Value]: ValueDescribe;
}[T];

type ParamType<T extends Fn> = T extends (...arg: infer P) => any ? [...P] : [];

type ConstructTuple<T extends number, U extends any[] = []> = {
    done: U;
    recurse: ConstructTuple<T, [ValueDescribe, ...U]>;
}[T extends U["length"] ? "done" : "recurse"];

type ParamDescribe<T extends Fn> = ConstructTuple<ParamType<T>["length"]>;

type ReturnDescribe<T extends Fn> = ReturnType<T> extends void ? undefined : ValueDescribe;
