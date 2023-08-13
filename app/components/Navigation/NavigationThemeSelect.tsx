'use client';

import { BsMoonFill, BsFillSunFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';

import { setTheme } from '@/store/features/themeSlice';
import useColorTheme from '@/hooks/useColorTheme';
import { RootState } from '@/store/store';

const NavigationThemeSelect = () => {
  const dispatch = useDispatch();
  const { colorTheme, setColorTheme } = useColorTheme();

  const currentTheme = useSelector((state: RootState) => state.theme);

  useEffect(() => {
    if (colorTheme !== currentTheme.theme) dispatch(setTheme(colorTheme));
  }, [colorTheme, dispatch, currentTheme]);

  const handleClick = () => {
    setColorTheme(colorTheme === 'dark' ? 'light' : 'dark');
    dispatch(setTheme(colorTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <button aria-label="Toggle Theme" className="p-2" onClick={handleClick}>
      {currentTheme.theme === 'light' ? <BsMoonFill /> : <BsFillSunFill />}
    </button>
  );
};

export default NavigationThemeSelect;
