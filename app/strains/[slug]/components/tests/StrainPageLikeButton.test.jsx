import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';
import fetchMock from 'jest-fetch-mock';
import '@testing-library/jest-dom';
import React from 'react';

import StrainPageLikeButton from '../StrainPageLikeButton/StrainPageLikeButton';

fetchMock.enableMocks();

const createSession = (user) => ({
  user,
  expires: new Date(Date.now() + 86400000).toISOString().slice(0, -5) + 'Z',
});

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: { queries: { staleTime: 300000 } },
  });

describe('StrainPageLikeButton', () => {
  let queryClient;
  let session;

  beforeEach(() => {
    queryClient = createQueryClient();
    session = createSession({
      name: 'Gerard Hernandez',
      email: 'ger.almenara@gmail.com',
      image: 'https://avatars.githubusercontent.com/u/50416421?v=4',
    });
  });

  it('renders without crashing', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          <StrainPageLikeButton id="1" />
        </SessionProvider>
      </QueryClientProvider>
    );

    expect(screen.getByLabelText('Like Strain')).toBeInTheDocument();
  });

  it('renders without a user', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={null}>
          <StrainPageLikeButton id="1" />
        </SessionProvider>
      </QueryClientProvider>
    );
  });
});
