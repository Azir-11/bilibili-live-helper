export type Rewrite<T, U> = Omit<T, keyof U> & U;

export type SetInterval = ReturnType<typeof setInterval>;

export type SetTimeout = ReturnType<typeof setTimeout>;

export interface operateIconItem {
  title: string;
  iconClass: string;
  active?: boolean;
  clickEvent: () => void;
}

export * from "./bilibili";
export * from "./config";