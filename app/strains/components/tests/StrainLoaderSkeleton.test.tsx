import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import StrainLoaderSkeleton from '../StrainLoader/StrainLoaderSkeleton';

describe('StrainLoaderSkeleton', () => {
  it('renders without crashing', () => {
    render(<StrainLoaderSkeleton />);
  });
});
