import { useState, useEffect, Dispatch, SetStateAction } from 'react';

type ReturnType<T> = [T, Dispatch<SetStateAction<T>>];

const useLocalStorage = <T>(key: string, initialValue: T): ReturnType<T> => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window === 'undefined') return initialValue;
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      if (typeof window === 'undefined') return;
      const valueToStore =
        storedValue instanceof Function
          ? storedValue(storedValue)
          : storedValue;
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};

export default useLocalStorage;
