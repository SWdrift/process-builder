import { IEntNode } from "../../../interface/flowNode";
import { EnumNode, DescribeType } from "../../../interface/flowNode";

export class EntNode<T extends EnumNode> implements IEntNode<EnumNode> {
    public id: string;

    constructor(
        public target: any,
        public describe: DescribeType<T>,
        public type: T
    ) {
        this.id = this.getId(describe);
    }

    private getId(describe: DescribeType<T>): string {
        return describe.id;
    }
}
