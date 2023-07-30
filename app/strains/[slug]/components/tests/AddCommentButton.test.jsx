import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import AddCommentButton from '../CommentLoader/AddCommentButton';
import { useRouter } from 'next/navigation';
import React from 'react';
import { mockStrain } from '@/test_data/mockStrain';

jest.mock('next/navigation');

useRouter.mockReturnValue({
  push: jest.fn(),
  prefetch: jest.fn().mockResolvedValue(true),
  refresh: jest.fn(),
});

describe('AddCommentButton', () => {
  let mockRouter;

  beforeEach(() => {
    mockRouter = useRouter();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<AddCommentButton strain={mockStrain} />);
    expect(
      screen.getByRole('button', { name: /add comment/i })
    ).toBeInTheDocument();
  });

  it('opens and closes the modal on button click', () => {
    render(<AddCommentButton strain={mockStrain} />);
    const addButton = screen.getByTestId('add-comment-button');
    fireEvent.click(addButton);
    expect(screen.getByTestId('save-comment-button')).toBeInTheDocument();

    const closeButton = screen.getByTestId('close-comment-modal'); // assuming the close button has no accessible name
    fireEvent.click(closeButton);
    expect(screen.queryByText('Add comment:')).not.toBeInTheDocument();
  });

  it('saves the comment when save button is clicked', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve({}),
      })
    );
    render(<AddCommentButton strain={mockStrain} />);
    const addButton = screen.getByRole('button', { name: /add comment/i });
    fireEvent.click(addButton);
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'Test comment' } });
    const saveButton = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveButton);
    await waitFor(() =>
      expect(screen.queryByText('Saving...')).toBeInTheDocument()
    );
    expect(fetch).toHaveBeenCalledWith(
      '/api/strains/comment/add',
      expect.anything()
    );
    expect(mockRouter.refresh).toHaveBeenCalled();
  });
});
