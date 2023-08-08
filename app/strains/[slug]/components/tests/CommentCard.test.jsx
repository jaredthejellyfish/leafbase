import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

import CommentCard from '../CommentLoader/CommentCard';

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: { queries: { staleTime: 300000 } },
  });

describe('CommentCard', () => {
  let queryClient;
  let comment;

  beforeEach(() => {
    queryClient = createQueryClient();
    comment = {
      id: 'cljm1azxz0001xisccicclzn1',
      userId: 'cljexq1620000ia08k3qtmjc9',
      strainId: 'cljm0oaev000bxivq33kc2erh',
      body: 'Test Comment',
      createdAt: '2023-07-02T22:59:19.032Z',
      likes: [
        {
          id: 'clkocpcpv0000xidije33934i',
          userId: 'cljbqqse80000k008h9lczinq',
          commentId: 'cljm1azxz0001xisccicclzn1',
          createdAt: '2023-07-29T18:33:39.235Z',
        },
      ],
      user: {
        name: 'leafbase-testing',
        image: 'https://avatars.githubusercontent.com/u/137962346?v=4',
        location: 'Earth',
        displayName: 'leafbase-testing',
      },
    };
  });

  it('renders without crashing', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CommentCard comment={comment} userId="1" />
      </QueryClientProvider>
    );

    const commentElement = screen.getByText(
      (_, element) => element?.textContent === 'Test Comment'
    );

    expect(commentElement).toBeInTheDocument();
  });

  it('transforms the user name correctly', () => {
    comment = {
      id: 'cljm1azxz0001xisccicclzn1',
      userId: 'cljexq1620000ia08k3qtmjc9',
      strainId: 'cljm0oaev000bxivq33kc2erh',
      body: 'Test Comment',
      createdAt: '2023-07-02T22:59:19.032Z',
      likes: [
        {
          id: 'clkocpcpv0000xidije33934i',
          userId: 'cljbqqse80000k008h9lczinq',
          commentId: 'cljm1azxz0001xisccicclzn1',
          createdAt: '2023-07-29T18:33:39.235Z',
        },
      ],
      user: {
        name: 'Leafbase Testing',
        image: 'https://avatars.githubusercontent.com/u/137962346?v=4',
        location: 'Earth',
      },
    };
    render(
      <QueryClientProvider client={queryClient}>
        <CommentCard comment={comment} userId="1" />
      </QueryClientProvider>
    );

    expect(screen.getByText('Leafbase T.')).toBeInTheDocument();
  });
});
