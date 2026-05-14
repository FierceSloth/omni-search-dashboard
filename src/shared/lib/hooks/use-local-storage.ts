import { useState } from 'react';

type ReturnType = [string, (value: string) => void];

export function useLocalStorage(key: string, initialValue: string): ReturnType {
  const [storedValue, setStoredValue] = useState<string>(() => {
    const item = globalThis.localStorage.getItem(key);
    return item ?? initialValue;
  });

  const setValue = (value: string): void => {
    setStoredValue(value);
    globalThis.localStorage.setItem(key, value);
  };

  return [storedValue, setValue];
}
