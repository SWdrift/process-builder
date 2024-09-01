/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_AGENT_TOKEN?: string;
    readonly VITE_AGENT_WENXIN_TOKEN?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
