import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { signOut } from 'next-auth/react';
import React from 'react';

import SingOutButton from '../SingOutButton/SingOutButton';

jest.mock('next-auth/react');

describe('SingOutButton', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<SingOutButton />);
    expect(screen.getByLabelText('Log Out')).toBeInTheDocument();
  });

  it('calls signOut function on click', () => {
    render(<SingOutButton />);
    const logoutButton = screen.getByLabelText('Log Out');
    fireEvent.click(logoutButton);
    expect(signOut).toHaveBeenCalledTimes(1);
  });
});
