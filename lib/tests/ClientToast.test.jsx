import '@testing-library/jest-dom/extend-expect'; //
import { render, screen } from '@testing-library/react';
import React from 'react';
import ClientToast from '../ClientToast';
import Providers from '../Providers';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('ClientToast', () => {
  it('renders correctly', () => {
    render(
      <Providers>
        <ClientToast />
        <p>client-toast</p>
      </Providers>
    );
    expect(screen.getByText('client-toast')).toBeInTheDocument();
  });
});
