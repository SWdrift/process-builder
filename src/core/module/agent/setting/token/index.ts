import { EnumLanguage } from "../../../../interface/config";
import { ITokenConfig } from "../../interface/tokenConfig";
import { ZH_CN } from "./zh_cn";
import { EN_US } from "./en_us";

export const TOKEN_CONFIG: { [key in EnumLanguage]: ITokenConfig } = {
    [EnumLanguage.ZH_CN]: ZH_CN,
    [EnumLanguage.EN_US]: EN_US
};
