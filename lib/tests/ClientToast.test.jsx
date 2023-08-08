import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; //
import fetchMock from 'jest-fetch-mock';
import React from 'react';

import ClientToast from '../ClientToast';
import Providers from '../Providers';

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
