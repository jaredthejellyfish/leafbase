"use client";

import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

const useColorTheme = (): {
  colorTheme: string;
  setColorTheme: (value: string) => void;
} => {
  const [colorTheme, setColorTheme] = useLocalStorage("color-theme", "light");

  useEffect(() => {
    try {
      const className: string = "dark";
      const htmlClass = window.document.documentElement.classList;
      const bodyClass = window.document.body.classList;

      colorTheme === "dark"
        ? htmlClass.add(className)
        : htmlClass.remove(className);

      colorTheme === "dark"
        ? bodyClass.add(className)
        : bodyClass.remove(className);
    } catch (error) {
      console.log(error);
    }
  }, [colorTheme]);

  return { colorTheme, setColorTheme };
};

export default useColorTheme;