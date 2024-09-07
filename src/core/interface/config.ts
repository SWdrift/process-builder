import { IAgentApi } from "../module/agent/interface/agentApi";

export interface IModuleConfig {
    /** Agent 实例 */
    agent: IAgentApi;
    /** 语言，默认中文 */
    language?: EnumLanguage;
}

export enum EnumLanguage {
    EN_US = "en_us",
    ZH_CN = "zh_cn"
}
