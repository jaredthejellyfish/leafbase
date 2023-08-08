import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

import StrainLoaderSkeleton from '../StrainLoader/StrainLoaderSkeleton';

describe('StrainLoaderSkeleton', () => {
  it('renders without crashing', () => {
    render(<StrainLoaderSkeleton />);
  });
});
