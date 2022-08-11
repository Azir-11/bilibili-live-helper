export type Rewrite<T, U> = Omit<T, keyof U> & U;

export type SetInterval = ReturnType<typeof setInterval>;

export type SetTimeout = ReturnType<typeof setTimeout>;

export * from "./bilibili";
export * from "./config";