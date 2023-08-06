import '@testing-library/jest-dom/extend-expect'; //
import { render, screen } from '@testing-library/react';
import React from 'react';
import Providers from '../Providers';
import fetchMock from 'jest-fetch-mock';

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
