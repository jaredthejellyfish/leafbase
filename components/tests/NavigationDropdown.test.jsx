import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { render, fireEvent, screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom/extend-expect';
import { usePathname } from 'next/navigation';
import { Provider } from 'react-redux';
import React from 'react';

import navDropdownReducer from '../../store/features/navDropdownSlice';
import NavigationDropdown from '../Navigation/NavigationDropdown';

jest.mock('next/navigation');

usePathname.mockReturnValue('/strains');

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: { queries: { staleTime: 300000 } },
  });

describe('NavigationDropdown', () => {
  let store;
  let queryClient;

  beforeEach(() => {
    queryClient = createQueryClient();
    store = configureStore({
      reducer: {
        dropdown: navDropdownReducer,
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <NavigationDropdown />
        </Provider>
      </QueryClientProvider>
    );
    expect(screen.getByText('Strains')).toBeInTheDocument();
    expect(screen.getByText('Dispensaries')).toBeInTheDocument();
    expect(screen.getByText('About Us')).toBeInTheDocument();
  });

  it('dispatches action to open/close dropdown on link click', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <NavigationDropdown />
        </Provider>
      </QueryClientProvider>
    );
    const initialState = store.getState().dropdown.isNavDropdownOpen;
    const strainsLink = screen.getByText('Strains');
    fireEvent.click(strainsLink);
    const updatedState = store.getState().dropdown.isNavDropdownOpen;
    expect(initialState).not.toBe(updatedState);
  });

  it('applies correct class when pathName matches link href', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <NavigationDropdown />
        </Provider>
      </QueryClientProvider>
    );
    const strainsLink = screen.getByText('Strains');
    expect(strainsLink).toHaveClass('text-green-500');
  });
});
