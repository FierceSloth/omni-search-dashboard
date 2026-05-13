import { useState } from 'react';

type SetStateAction<T> = T | ((value_: T) => T);
type SetFunction<T> = (value: SetStateAction<T>) => void;

export function useLocalStorage<T>(key: string, initialValue: T): [T, SetFunction<T>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = globalThis.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.error('Error reading localStorage', error);
      return initialValue;
    }
  });

  const setValue = (value: SetStateAction<T>): void => {
    try {
      const valueToStore = typeof value === 'function' ? (value as (value_: T) => T)(storedValue) : value;

      setStoredValue(valueToStore);

      globalThis.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error setting localStorage', error);
    }
  };

  return [storedValue, setValue];
}
