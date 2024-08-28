import { EnumFlowNode, DescribeType } from "../../../interface/flowManager";

export class FlowNode<T extends EnumFlowNode> {
    public id: string;

    constructor(
        public target: any,
        public describe: DescribeType<T>,
        public type: T
    ) {
        this.id = this.getId(describe);
    }

    private getId(describe: DescribeType<T>): string {
        return describe.id
    }
}
