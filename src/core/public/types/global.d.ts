export {};
declare global {
    type Fn = (...args: any[]) => any;

    type AsyncFn = (...args: any) => Promise<any>;
}
