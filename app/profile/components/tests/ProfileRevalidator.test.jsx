import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { useRouter, useSearchParams} from 'next/navigation';
import React from 'react';
import ProfileRevalidator from '../ProfileRevalidator/ProfileRevalidator';

jest.mock('next/navigation');

useRouter.mockReturnValue({
  push: jest.fn(),
  prefetch: jest.fn().mockResolvedValue(true),
  refresh: jest.fn(),
  replace: jest.fn(),
});



describe('ProfileRevalidator', () => {
  let mockRouter;
  let mockSearchParams;

  beforeEach(() => {
    mockSearchParams = new URLSearchParams();
    mockRouter = useRouter();});

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('does not call router.replace and router.refresh when revalidate is not true', () => {
    useSearchParams.mockReturnValue({
      get: jest.fn().mockReturnValue('false'),
    });
    render(<ProfileRevalidator />);
    expect(mockRouter.replace).not.toHaveBeenCalled();
    expect(mockRouter.refresh).not.toHaveBeenCalled();
  });

  it('calls router.replace and router.refresh when revalidate is true', () => {
    useSearchParams.mockReturnValue({
      get: jest.fn().mockReturnValue('true'),
    });
    render(<ProfileRevalidator />);
    expect(mockRouter.replace).toHaveBeenCalledWith('/profile');
    expect(mockRouter.refresh).toHaveBeenCalled();
  });
});
