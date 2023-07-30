import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import NavigationThemeSelect from '../Navigation/NavigationThemeSelect';
import themeSlice, { setTheme } from '../../store/features/themeSlice';
import React from 'react';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import useColorTheme from '../../hooks/useColorTheme';

jest.mock('../../hooks/useColorTheme', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('NavigationThemeSelect', () => {
  let store;

  beforeEach(() => {
    useColorTheme.mockImplementation(() => ({
      colorTheme: 'light',
      setColorTheme: jest.fn(),
    }));

    const rootReducer = combineReducers({
      theme: themeSlice,
    });

    store = configureStore({
      reducer: rootReducer,
    });
  });

  it('renders correctly', () => {
    render(
      <Provider store={store}>
        <NavigationThemeSelect />
      </Provider>
    );
    expect(screen.getByLabelText('Toggle Theme')).toBeInTheDocument();
  });

  it('dispatches setTheme action on mount', () => {
    const mockDispatch = jest.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <NavigationThemeSelect />
      </Provider>
    );

    expect(mockDispatch).toHaveBeenCalledWith(setTheme('light'));
  });

  it('toggles theme on click', () => {
    const setColorThemeMock = jest.fn();

    useColorTheme.mockImplementation(() => ({
      colorTheme: 'light',
      setColorTheme: setColorThemeMock,
    }));

    render(
      <Provider store={store}>
        <NavigationThemeSelect />
      </Provider>
    );
    console.log(store.getState().theme);
    const button = screen.getByLabelText('Toggle Theme');
    fireEvent.click(button);

    expect(setColorThemeMock).toHaveBeenCalledWith('dark');
  });
});
