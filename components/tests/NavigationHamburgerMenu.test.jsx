import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import navDropdownReducer from '../../store/features/navDropdownSlice';
import NavigationHamburgerMenu from '../Navigation/NavigationHamburgerMenu';
import React from 'react';

describe('NavigationHamburgerMenu', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        dropdown: navDropdownReducer,
      },
    });
  });

  it('renders correctly', () => {
    render(
      <Provider store={store}>
        <NavigationHamburgerMenu />
      </Provider>
    );
    expect(screen.getByTestId('hamburger-button')).toBeInTheDocument();
  });

  it('toggles isOpen state on click', () => {
    render(
      <Provider store={store}>
        <NavigationHamburgerMenu />
      </Provider>
    );
    const hamburgerButton = screen.getByTestId('hamburger-button');
    fireEvent.click(hamburgerButton);
    expect(store.getState().dropdown.isNavDropdownOpen).toBe(true);
    fireEvent.click(hamburgerButton);
    expect(store.getState().dropdown.isNavDropdownOpen).toBe(false);
  });
});
