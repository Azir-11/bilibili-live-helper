export type Rewrite<T, U> = Omit<T, keyof U> & U;