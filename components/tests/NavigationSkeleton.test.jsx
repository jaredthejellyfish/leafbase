import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import React from 'react';
import NavigationSkeleton from '../Navigation/NavigationSkeleton';

describe('NavigationSkeleton', () => {
  it('renders correctly', () => {
    render(<NavigationSkeleton />);
    expect(screen.getByTestId('navigation-skeleton')).toBeInTheDocument();
  });
});
