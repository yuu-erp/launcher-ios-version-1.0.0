import { StoragePort } from "./storage.port";

export class InMemoryStorageAdapter<T extends Record<string, any> = any>
  implements StoragePort<T>
{
  private variables: Map<keyof T, T[keyof T]>;

  constructor() {
    this.variables = new Map();
  }

  set<K extends keyof T>(key: K, value: T[K]): void {
    this.variables.set(key, value);
  }

  setAll(data: T): void {
    Object.entries(data).forEach(([key, value]) => {
      this.variables.set(key as keyof T, value);
    });
  }

  get<K extends keyof T>(key: K, defaultValue?: T[K]): T[K] {
    return this.variables.get(key) ?? defaultValue!;
  }

  has<K extends keyof T>(key: K): boolean {
    return this.variables.has(key);
  }

  remove<K extends keyof T>(key: K): void {
    this.variables.delete(key);
  }

  clear(): void {
    this.variables.clear();
  }

  getAll(): T {
    return Object.fromEntries(this.variables) as T;
  }
}
