"use client";

import useColorTheme from "@/hooks/useColorTheme";
import { setTheme } from "@/store/features/themeSlice";
import { RootState } from "@/store/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsMoonFill, BsFillSunFill } from "react-icons/bs";

type Props = {};

const NavigationThemeSelect = (props: Props) => {
  const dispatch = useDispatch();
  const { colorTheme, setColorTheme } = useColorTheme();

  const currentTheme = useSelector((state: RootState) => state.theme);

  useEffect(() => {
    dispatch(setTheme(colorTheme));
  }, [colorTheme, dispatch]);

  return (
    <button
      aria-label="Toggle Theme"
      className="p-2"
      onClick={() => setColorTheme(colorTheme === "dark" ? "light" : "dark")}
    >
      {currentTheme.theme === "light" ? <BsMoonFill /> : <BsFillSunFill />}
    </button>
  );
};

export default NavigationThemeSelect;
