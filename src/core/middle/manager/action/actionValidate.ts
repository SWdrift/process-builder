import { NodeDefine, EnumNode } from "../../../interface/manager";
import { logger } from "../../../public/module/logger";
import { Fn } from "../../../public/types/global";
import { IProcessNode } from "../interface/processNode";

export class ActionValidate {
    constructor(public nodeManager: IProcessNode) {}

    isRegisterOk<T>(target: T, define: NodeDefine): boolean {
        if (define.type === "function") {
            if (this.isRegisterMethodOk(target as Fn, define)) {
                return true;
            }
        }
        if (define.type === "constant") {
            if (this.isRegisterValueOk(target as object, define)) {
                return true;
            }
        }
        return false;
    }

    isRegisterMethodOk<T extends Fn>(_target: T, define: NodeDefine<EnumNode.Function>): boolean {
        const def = define.function;
        //TODO: 检查 _target 是否符合要求
        if (this.nodeManager.getNodeByName(def.name)) {
            logger.record(
                `method ${def.name} registe error, method id already exists`,
                logger.Level.Warn
            );
            return false;
        }
        return true;
    }

    isRegisterValueOk<T extends object>(
        _target: T,
        define: NodeDefine<EnumNode.Constant>
    ): boolean {
        const def = define.constant;
        //TODO: 检查 _target 是否符合要求
        if (this.nodeManager.getNodeByName(def.name)) {
            logger.record(
                `constant  ${def.name} registe error, constant id already exists`,
                logger.Level.Warn
            );
            return false;
        }
        return true;
    }
}
