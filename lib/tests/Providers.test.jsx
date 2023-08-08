import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; //
import fetchMock from 'jest-fetch-mock';
import React from 'react';

import Providers from '../Providers';

fetchMock.enableMocks();

describe('Providers', () => {
  it('renders correctly', () => {
    render(
      <Providers>
        <div>Hello world!</div>{' '}
      </Providers>
    );
    expect(screen.getByText('Hello world!')).toBeInTheDocument();
  });
});
