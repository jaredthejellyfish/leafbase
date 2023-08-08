import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom/extend-expect';
import fetchMock from 'jest-fetch-mock';
import { Provider } from 'react-redux';

import isNavDropdownOpenSlice, {
  setNavDropdownOpen,
} from '../../store/features/navDropdownSlice';
import NavigationSearchBar from '../Navigation/NavigationSearchBar';

fetchMock.enableMocks();

const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: { queries: { staleTime: 300000 } },
  });
};

describe('NavigationSearchBar', () => {
  let store;
  let queryClient;

  beforeEach(() => {
    queryClient = createQueryClient();
    const rootReducer = combineReducers({
      theme: isNavDropdownOpenSlice,
    });

    store = configureStore({
      reducer: rootReducer,
    });
  });
  it('renders correctly', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <NavigationSearchBar />
        </Provider>
      </QueryClientProvider>
    );
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('fetches and displays search results', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        strains: [
          {
            name: 'Strain 1',
            slug: 'strain-1',
            id: '1',
          },
          {
            name: 'Strain 2',
            slug: 'strain-2',
            id: '2',
          },
        ],
      })
    );

    render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <NavigationSearchBar />
        </Provider>
      </QueryClientProvider>
    );

    fireEvent.change(screen.getByPlaceholderText('Search...'), {
      target: { value: 'strain' },
    });

    await waitFor(() =>
      expect(screen.getByText('Strain 1')).toBeInTheDocument()
    );
    expect(screen.getByText('Strain 2')).toBeInTheDocument();
  });
});
