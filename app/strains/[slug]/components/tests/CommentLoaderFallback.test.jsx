import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

import CommentLoaderFallback from '../CommentLoader/CommentLoaderFallback';
import { mockStrain } from '@/test_data/mockStrain';

describe('CommentLoaderFallback', () => {
  it('renders without crashing', () => {
    render(<CommentLoaderFallback strain={mockStrain} />);
    expect(
      screen.getByText(
        'There was an error loading the comments. Please reload the page to try again.'
      )
    ).toBeInTheDocument();
  });
});
