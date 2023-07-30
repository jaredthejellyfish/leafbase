'use client';

import useColorTheme from '@/hooks/useColorTheme';
import { setTheme } from '@/store/features/themeSlice';
import { RootState } from '@/store/store';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsMoonFill, BsFillSunFill } from 'react-icons/bs';

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
