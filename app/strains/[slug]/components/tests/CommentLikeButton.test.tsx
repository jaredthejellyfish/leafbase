import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import CommentLikeButton from '../CommentLoader/CommentLikeButton';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

type UserSession = {
  name: string;
  email: string;
  image: string;
};

const createSession = (user?: UserSession) => ({
  user,
  expires: new Date(Date.now() + 86400000).toISOString().slice(0, -5) + 'Z',
});

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: { queries: { staleTime: 300000 } },
  });

describe('CommentLikeButton', () => {
  let queryClient: QueryClient;
  let session: ReturnType<typeof createSession>;

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
          <CommentLikeButton id="1" liked={true} />
        </SessionProvider>
      </QueryClientProvider>
    );

    expect(screen.getByLabelText('Like Strain')).toBeInTheDocument();
  });

  it('renders without a user', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={null}>
          <CommentLikeButton id="1" liked={false} />
        </SessionProvider>
      </QueryClientProvider>
    );
  });
});
