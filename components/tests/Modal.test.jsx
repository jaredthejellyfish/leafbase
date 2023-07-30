import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, screen } from '@testing-library/react';
import Modal from '../Modal/Modal';
import React from 'react';

describe('Modal', () => {
  const mockClose = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when open', () => {
    render(<Modal open={true} close={mockClose} title="Test Modal">Test Content</Modal>);
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('does not render when not open', () => {
    render(<Modal open={false} close={mockClose} title="Test Modal">Test Content</Modal>);
    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
    expect(screen.queryByText('Test Content')).not.toBeInTheDocument();
  });

  it('calls close function when close button is clicked', () => {
    render(<Modal open={true} close={mockClose} title="Test Modal">Test Content</Modal>);
    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);
    expect(mockClose).toHaveBeenCalledTimes(1);
  });
});
