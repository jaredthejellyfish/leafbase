import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';

import Badge from '../Badge/Badge';

describe('Badge', () => {
  it('renders correctly with default color', () => {
    render(<Badge color="default" text="Test" />);
    const badge = screen.getByText('Test');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-blue-100 text-blue-800');
  });

  it('renders correctly with dark color', () => {
    render(<Badge color="dark" text="Test" />);
    const badge = screen.getByText('Test');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-gray-100 text-gray-800');
  });

  it('renders correctly with red color', () => {
    render(<Badge color="red" text="Test" />);
    const badge = screen.getByText('Test');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-red-100 text-red-800');
  });

  it('renders correctly with green color', () => {
    render(<Badge color="green" text="Test" />);
    const badge = screen.getByText('Test');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-green-100 text-green-800');
  });

  it('renders correctly with yellow color', () => {
    render(<Badge color="yellow" text="Test" />);
    const badge = screen.getByText('Test');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-yellow-100 text-yellow-800');
  });

  it('renders correctly with indigo color', () => {
    render(<Badge color="indigo" text="Test" />);
    const badge = screen.getByText('Test');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-indigo-100 text-indigo-800');
  });

  it('renders correctly with purple color', () => {
    render(<Badge color="purple" text="Test" />);
    const badge = screen.getByText('Test');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-purple-100 text-purple-800');
  });

  it('renders correctly with pink color', () => {
    render(<Badge color="pink" text="Test" />);
    const badge = screen.getByText('Test');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-pink-100 text-pink-800');
  });

  it('renders correctly with non-existing color', () => {
    render(<Badge color="non-existing" text="Test" />);
    const badge = screen.getByText('Test');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-blue-100 text-blue-800'); // default color
  });
});
