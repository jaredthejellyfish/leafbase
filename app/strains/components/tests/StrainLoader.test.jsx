import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import StrainLoader from '../StrainLoader/StrainLoader';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { waitFor } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

const createSession = (user) => ({
  user,
  expires: new Date(Date.now() + 86400000).toISOString().slice(0, -5) + 'Z',
});

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: { queries: { staleTime: 300000 } },
  });

describe('StrainLoader', () => {
  let queryClient;
  let session;

  beforeEach(() => {
    queryClient = createQueryClient();
    session = createSession({
      name: 'Gerard Hernandez',
      email: 'gs',
      image: 'https://avatars.githubusercontent.com/u/50416421?v=4',
    });
  });

  it('renders without crashing', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          <StrainLoader />
        </SessionProvider>
      </QueryClientProvider>
    );

    expect(screen.getByText('Nothing more to load')).toBeInTheDocument();
  });

  it('renders without a user', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={null}>
          <StrainLoader />
        </SessionProvider>
      </QueryClientProvider>
    );
  });

  it('renders with a filter', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          <StrainLoader filter="az" />
        </SessionProvider>
      </QueryClientProvider>
    );
  });

  it('renders with a filter and without a user', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={null}>
          <StrainLoader filter="az" />
        </SessionProvider>
      </QueryClientProvider>
    );
  });

  it('fetches strains when user is logged in', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        strains: [],
        page: 1,
        totalPages: 1,
      })
    );

    render(
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          <StrainLoader />
        </SessionProvider>
      </QueryClientProvider>
    );

    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
  });

  it('fetches strains when user is not logged in', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        strains: [],
        page: 1,
        totalPages: 1,
      })
    );

    render(
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={null}>
          <StrainLoader />
        </SessionProvider>
      </QueryClientProvider>
    );

    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
  });
});
