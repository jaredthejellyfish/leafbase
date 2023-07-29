import '@testing-library/jest-dom/extend-expect'; //
import { render, fireEvent, screen } from '@testing-library/react';
import FilterByMenu from '../FilterByMenu/FilterByMenu';
import { useRouter } from 'next/navigation';
import React from 'react';

jest.mock('next/navigation');

useRouter.mockReturnValue({
  push: jest.fn(),
  prefetch: jest.fn().mockResolvedValue(true),
});

describe('FilterByMenu', () => {
  let mockRouter;

  beforeEach(() => {
    mockRouter = useRouter();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<FilterByMenu filter="re" />);
    expect(screen.getByText('Sort by')).toBeInTheDocument();
  });

  it('prefetches routes on mount', () => {
    render(<FilterByMenu filter="re" />);
    expect(mockRouter.prefetch).toHaveBeenCalledTimes(4);
    expect(mockRouter.prefetch).toHaveBeenCalledWith('/strains?filter=re');
    expect(mockRouter.prefetch).toHaveBeenCalledWith('/strains?filter=az');
    expect(mockRouter.prefetch).toHaveBeenCalledWith('/strains?filter=za');
    expect(mockRouter.prefetch).toHaveBeenCalledWith('/strains?filter=mr');
  });

  it('toggles menu on click', () => {
    render(<FilterByMenu filter="re" />);
    const sortButton = screen.getByText('Sort by');
    fireEvent.click(sortButton);
    expect(screen.getByText('A-Z')).toBeInTheDocument();
    expect(screen.getByText('Z-A')).toBeInTheDocument();
    expect(screen.getByText('Most Reviews')).toBeInTheDocument();
  });

  it('navigates to correct route on menu item click', () => {
    render(<FilterByMenu filter="re" />);
    const sortButton = screen.getByText('Sort by');
    fireEvent.click(sortButton);
    const menuItem = screen.getByText('A-Z').closest('a'); // get the closest 'a' element
    expect(menuItem).toHaveAttribute('href', '/strains?filter=az');
  });
});
