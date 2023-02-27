export type OmitFunctions<T> = {
  [P in keyof T as T[P] extends Function ? never : P]: T[P];
};

export type ValueOf<T> = T[keyof T];

export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };
