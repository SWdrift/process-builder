import { IEntNode, EnumNode, DescribeType } from '../../../interface/manager';
export declare class EntNode<T extends EnumNode> implements IEntNode<EnumNode> {
    target: any;
    describe: DescribeType<T>;
    type: T;
    id: string;
    constructor(target: any, describe: DescribeType<T>, type: T);
    private getId;
}
