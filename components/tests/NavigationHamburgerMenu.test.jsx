import { render, fireEvent, screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import React from 'react';

import NavigationHamburgerMenu from '../Navigation/NavigationHamburgerMenu';
import navDropdownReducer from '../../store/features/navDropdownSlice';

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
