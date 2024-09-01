import { IEntProcess } from "../../interface/manager";
import { INodeManager, IProcessActuator } from "../../middle/manager";
import { Executor } from "./service/executor";
import { Validator } from "./service/validator";
import { GraphDrive } from "./service/graphDrive";

export class ProcessActuator implements IProcessActuator {
    private executor: Executor;
    private validator: Validator;

    constructor(nodeManager: INodeManager, graphDrive: GraphDrive = new GraphDrive()) {
        (this.executor = new Executor(nodeManager)),
            (this.validator = new Validator(nodeManager, graphDrive));
    }

    async execute(process: IEntProcess): Promise<any | undefined> {
        const checkResult = this.validator.check(process);
        if (!checkResult.success) return undefined;
        return await this.executor.run(checkResult.data);
    }
}
