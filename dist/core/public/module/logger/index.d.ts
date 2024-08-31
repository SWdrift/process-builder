declare enum Level {
    Debug = "debug",
    Info = "info",
    Warn = "warn",
    Error = "error"
}
export declare const logger: {
    Level: typeof Level;
    record: (message: string, level: Level) => void;
};
export {};
