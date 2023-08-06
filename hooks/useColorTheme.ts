'use client';

import { useEffect, Dispatch, SetStateAction } from 'react';
import useLocalStorage from './useLocalStorage';

const useColorTheme = (): {
  colorTheme: string;
  setColorTheme: Dispatch<SetStateAction<string>>;
} => {
  const [colorTheme, setColorTheme] = useLocalStorage('color-theme', 'light');

  useEffect(() => {
    try {
      const className = 'dark';
      const htmlClass = window.document.documentElement.classList;
      const bodyClass = window.document.body.classList;
      const expirationDate = new Date();

      expirationDate.setFullYear(expirationDate.getFullYear() + 1);
      document.cookie = `theme=${colorTheme}; expires=${expirationDate.toUTCString()}; path=/`;

      colorTheme === 'dark'
        ? htmlClass.add(className)
        : htmlClass.remove(className);

      colorTheme === 'dark'
        ? bodyClass.add(className)
        : bodyClass.remove(className);
    } catch (error) {
      console.error(error);
    }
  }, [colorTheme]);

  return { colorTheme, setColorTheme } as {
    colorTheme: string;
    setColorTheme: Dispatch<SetStateAction<string>>;
  };
};

export default useColorTheme;
