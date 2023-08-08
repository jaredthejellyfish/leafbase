import { renderHook, act } from '@testing-library/react';

import useColorTheme from '../useColorTheme';

jest.mock('../useLocalStorage', () => jest.fn());

describe('useColorTheme hook', () => {
  // As we can't directly manipulate the cookie storage in jsdom, we mock the useLocalStorage hook
  beforeEach(() => {
    require('../useLocalStorage').mockImplementation((key, initial) => {
      const react = require('react');
      const [storedValue, setStoredValue] = react.useState(initial);
      return [storedValue, setStoredValue];
    });
  });

  it('returns light as the default color theme', () => {
    const { result } = renderHook(() => useColorTheme());
    expect(result.current.colorTheme).toEqual('light');
  });

  it('sets a new color theme', () => {
    const { result } = renderHook(() => useColorTheme());

    act(() => {
      result.current.setColorTheme('dark');
    });

    expect(result.current.colorTheme).toEqual('dark');
  });

  it('updates class of html and body elements when colorTheme changes to dark', () => {
    const { result } = renderHook(() => useColorTheme());
    act(() => {
      result.current.setColorTheme('dark');
    });

    const htmlClass = document.documentElement.classList;
    const bodyClass = document.body.classList;

    expect(htmlClass.contains('dark')).toEqual(true);
    expect(bodyClass.contains('dark')).toEqual(true);
  });

  it('removes dark class from html and body elements when colorTheme changes to light', () => {
    const { result } = renderHook(() => useColorTheme());

    act(() => {
      result.current.setColorTheme('dark');
    });

    act(() => {
      result.current.setColorTheme('light');
    });

    const htmlClass = document.documentElement.classList;
    const bodyClass = document.body.classList;

    expect(htmlClass.contains('dark')).toEqual(false);
    expect(bodyClass.contains('dark')).toEqual(false);
  });
});
