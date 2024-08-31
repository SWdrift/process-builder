import { IEntProcess } from "../../interface/flowManager";
import { INodeManager, IProcessActuator } from "../../middle/flowManager";
import { Executor } from "./service/executor";
import { Validator } from "./service/validator";
import { GraphDrive } from "./service/graphDrive";

export class ProcessActuator implements IProcessActuator {
    constructor(
        private nodeManager: INodeManager,
        private graphDrive: GraphDrive = new GraphDrive(),
        private executor: Executor = new Executor(nodeManager),
        private validator: Validator = new Validator(nodeManager, graphDrive)
    ) {}

    async execute(process: IEntProcess): Promise<any | undefined> {
        const checkResult = this.validator.check(process);
        if (!checkResult.success) return undefined;
        return await this.executor.run(checkResult.data);
    }
}
