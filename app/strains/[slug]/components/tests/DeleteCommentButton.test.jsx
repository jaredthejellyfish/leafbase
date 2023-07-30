import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import DeleteCommentButton from '../CommentLoader/DeleteCommentButton';
import { useRouter } from 'next/navigation';
import fetchMock from 'jest-fetch-mock';
import { ToastContainer } from 'react-toastify';

fetchMock.enableMocks();

jest.mock('next/navigation');

useRouter.mockReturnValue({
  push: jest.fn(),
  prefetch: jest.fn().mockResolvedValue(true),
  refresh: jest.fn(),
});

describe('DeleteCommentButton', () => {
  let mockRouter;

  beforeEach(() => {
    mockRouter = useRouter();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<DeleteCommentButton commentId="1" />);
    const button = screen.getByTestId('delete-comment-button');
    expect(button).toBeInTheDocument();
  });

  it('calls deleteComment function on click', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          comment: {
            id: 'clkavgxaz0001xijp08zdc016',
            userId: 'cljbqqse80000k008h9lczinq',
            strainId: 'cljm0oaev000bxivq33kc2erh',
            body: 'meowwwwww',
            createdAt: '2023-07-20T08:10:12.251Z',
          },
        }),
    });

    const { getByTestId } = render(<DeleteCommentButton commentId="1" />);
    const button = getByTestId('delete-comment-button');
    fireEvent.click(button);

    expect(fetch).toHaveBeenCalled();
  });

  it('shows error toast when deleteComment fails', async () => {
    // Mocking fetch here as you've done in the test
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ error: 'Error' }),
      })
    );

    // Render the component
    const { getByRole } = render(
      <>
        <ToastContainer />
        <DeleteCommentButton commentId="1" />`
      </>
    );
    const button = getByRole('button');

    // Trigger the click event
    fireEvent.click(button);

    // Check if fetch and mockRouter.refresh were called
    expect(fetch).toHaveBeenCalled();

    // Check if the error toast was called with the expected message
    expect(
      await screen.findByText('Error deleting comment')
    ).toBeInTheDocument();
  });

  it('shows success toast when deleteComment succeeds', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ comment: { id: '1' } }),
      })
    );

    const { getByRole } = render(
      <>
        <ToastContainer />
        <DeleteCommentButton commentId="1" />`
      </>
    );
    const button = getByRole('button');

    fireEvent.click(button);

    expect(fetch).toHaveBeenCalled();

    expect(await screen.findByText('Comment deleted')).toBeInTheDocument();
  });
});
