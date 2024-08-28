enum Level {
    Debug = "debug",
    Info = "info",
    Warn = "warn",
    Error = "error"
}

const logMap = {
    [Level.Debug]: console.debug,
    [Level.Info]: console.info,
    [Level.Warn]: console.warn,
    [Level.Error]: console.error
};

const record = (message: string, level: Level) => {
    logMap[level](message);
};

export const logger = {
    Level,
    record
};
