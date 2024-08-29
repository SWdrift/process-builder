import { ValueDescribe, FnDescribe } from "../../../interface/flowNode";
import { logger } from "../../../public/module/logger";
import { INodeStorage } from "../interface/nodeManager";

export class ActionValidate {
    constructor(public nodeManager: INodeStorage) {}

    isRegisterMethodOk<T extends Fn>(target: T, describe: FnDescribe<T>): boolean {
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

    isRegisterValueOk<T extends Object>(target: T, describe: ValueDescribe): boolean {
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
