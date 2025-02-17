export interface StoragePort<T extends Record<string, any> = any> {
  set<K extends string>(key: K, value: T[K] | unknown): void;
  setAll(data: T): void;
  get<K extends keyof T>(key: K, defaultValue?: T[K]): T[K];
  remove<K extends string>(key: K): void;
  clear(): void;
  getAll(): T;
  has<K extends keyof T>(key: K): boolean;
}
