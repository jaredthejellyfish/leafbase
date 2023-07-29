import '@testing-library/jest-dom/extend-expect';
import { act, screen } from '@testing-library/react';
import CommentLoader from '../CommentLoader/CommentLoader';
import { useRouter } from 'next/navigation';
import React from 'react';
import { mockStrain } from '@/test_data/mockStrain';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';

jest.mock('next/navigation');

useRouter.mockReturnValue({
  push: jest.fn(),
  prefetch: jest.fn().mockResolvedValue(true),
  refresh: jest.fn(),
});

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: { queries: { staleTime: 300000 } },
  });

describe('CommentLoader', () => {
  const mockUser = {
    id: 'cljbqqse80000k008h9lczinq',
    name: 'Gerard Hernandez',
    displayName: 'jaredthejelly',
    email: 'ger.almenara@gmail.com',
    emailVerified: '2023-07-29T16:33:47.569Z',
    image: 'https://avatars.githubusercontent.com/u/50416421?v=4',
    aboutMe:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque commodo sem quis sollicitudin cursus. Nam vestibulum tristique augue. Vestibulum id odio augue. Aliquam fringilla mattis erat et luctus. In et lorem feugiat, molestie nunc vitae, condimentum lorem. Phasellus quis pretium tellus. Praesent auctor imperdiet enim, id feugiat felis laoreet et. Duis eu porttitor orci.',
    birthDate: '2003-06-18T22:00:00.000Z',
    languages: 'English',
    phone: '+34605660521',
    location: 'Barcelona, Spain',
    createdAt: '2023-06-25T18:05:58.209Z',
    updatedAt: '2023-07-29T16:33:47.569Z',
  };

  let queryClient: QueryClient;
  let container: Node | null = null;

  afterEach(() => {
    document.body.removeChild(container as Node);
    container = null;
  });

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    queryClient = createQueryClient();
  });

  it('renders correctly', () => {
    act(() => {
      ReactDOM.createRoot(container).render(
        <QueryClientProvider client={queryClient}>
          <CommentLoader strain={mockStrain} user={mockUser} />
        </QueryClientProvider>
      );
    });
    expect(
      screen.getByText(`Comments for ${mockStrain.name}:`)
    ).toBeInTheDocument();
    expect(screen.getByText('Add Comment')).toBeInTheDocument();

    mockStrain.comments.forEach((comment) => {
      expect(screen.queryByText(comment.body)).not.toBeInTheDocument(); // Use queryByText instead of getByText
    });
  });

  it('does not render comments if user is not provided', async () => {
    act(() => {
      ReactDOM.createRoot(container).render(
        <QueryClientProvider client={queryClient}>
          <CommentLoader strain={mockStrain} user={null} />
        </QueryClientProvider>
      );
    });

    mockStrain.comments.forEach((comment) => {
      expect(screen.queryByText(comment.body)).not.toBeInTheDocument(); // Use queryByText instead of getByText
    });
  });

  it('does not render comments if comments array is empty', () => {
    const strainWithNoComments = { ...mockStrain, comments: [] };
    act(() => {
      ReactDOM.createRoot(container).render(
        <QueryClientProvider client={queryClient}>
          <CommentLoader strain={strainWithNoComments} user={mockUser} />
        </QueryClientProvider>
      );
    });

    mockStrain.comments.forEach((comment) => {
      expect(screen.queryByText(comment.body)).not.toBeInTheDocument();
    });
  });
});
