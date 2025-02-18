import { StoragePort } from "./storage.port";

export class LocalStorageAdapter<T extends Record<string, any> = any>
  implements StoragePort<T>
{
  constructor() {}

  set<K extends keyof T>(key: K, value: T[K] | unknown): void {
    try {
      // Ensure that value is of type T[K]
      const valueToStore = JSON.stringify(value as T[K]);
      const keyAsString = String(key); // Ensure key is treated as a string
      localStorage.setItem(keyAsString, valueToStore);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }

  setAll(data: T): void {
    try {
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const keyAsString = String(key); // Ensure key is a string
          localStorage.setItem(keyAsString, JSON.stringify(data[key]));
        }
      }
    } catch (error) {
      console.error("Error saving all data to localStorage:", error);
    }
  }

  get<K extends keyof T>(key: K, defaultValue: T[K] = null as any): T[K] {
    try {
      const storedValue = localStorage.getItem(String(key)); // Ensure key is a string
      if (storedValue === null) {
        return defaultValue;
      }
      return JSON.parse(storedValue) as T[K]; // Ensure value is of type T[K]
    } catch (error) {
      console.error("Error getting from localStorage:", error);
      return defaultValue;
    }
  }

  remove<K extends keyof T>(key: K): void {
    try {
      localStorage.removeItem(String(key)); // Ensure key is a string
    } catch (error) {
      console.error("Error removing from localStorage:", error);
    }
  }

  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  }

  getAll(): T {
    const result: Partial<T> = {};
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key !== null) {
          const value = localStorage.getItem(key);
          if (value !== null) {
            result[key as keyof T] = JSON.parse(value) as T[keyof T];
          }
        }
      }
    } catch (error) {
      console.error("Error getting all data from localStorage:", error);
    }
    return result as T;
  }

  has<K extends keyof T>(key: K): boolean {
    try {
      return localStorage.getItem(String(key)) !== null; // Ensure key is a string
    } catch (error) {
      console.error("Error checking if key exists in localStorage:", error);
      return false;
    }
  }
}
