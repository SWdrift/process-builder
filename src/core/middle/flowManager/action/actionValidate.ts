import { ValueDescribe, FnDescribe } from "../../../interface/flowManager";
import { logger } from "../../../public/module/logger";
import { Fn } from "../../../public/types/global";
import { INodeManager } from "../interface/nodeManager";

export class ActionValidate {
    constructor(public nodeManager: INodeManager) {}

    isRegisterMethodOk<T extends Fn>(_target: T, describe: FnDescribe<T>): boolean {
        //TODO: 检查 _target 是否符合要求
        if (this.nodeManager.getNodeById(describe.id)) {
            logger.record(
                `method  ${describe.id} registe error, method id already exists`,
                logger.Level.Warn
            );
            return false;
        }
        if (describe.describe.length < 1) {
            logger.record(
                `method  ${describe.id} registe error, method describe is empty`,
                logger.Level.Warn
            );
            return false;
        }
        if ((describe.params as ValueDescribe[]).length > 0) {
            for (const param of describe.params as ValueDescribe[]) {
                if (param.describe.length < 1) {
                    logger.record(
                        `method  ${describe.id} registe error, param ${param.id} describe is empty`,
                        logger.Level.Warn
                    );
                    return false;
                }
            }
        }
        if (describe.return && describe.return.describe.length < 1) {
            logger.record(
                `method  ${describe.id} registe error, return describe is empty`,
                logger.Level.Warn
            );
            return false;
        }
        return true;
    }

    isRegisterValueOk<T extends Object>(_target: T, describe: ValueDescribe): boolean {
        //TODO: 检查 _target 是否符合要求
        if (this.nodeManager.getNodeById(describe.id)) {
            logger.record(
                `constant  ${describe.id} registe error, constant id already exists`,
                logger.Level.Warn
            );
            return false;
        }
        if (describe.describe.length < 1) {
            logger.record(
                `method  ${describe.id} registe error, method describe is empty`,
                logger.Level.Warn
            );
            return false;
        }
        return true;
    }
}
