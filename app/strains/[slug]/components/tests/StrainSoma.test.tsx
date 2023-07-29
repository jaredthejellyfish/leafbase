import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import StrainSoma from '../StrainSoma/StrainSoma';
import { mockStrain } from '@/test_data/mockStrain';

describe('StrainSoma', () => {
  it('renders without crashing', () => {
    render(<StrainSoma strain={mockStrain} />);
    expect(screen.getByText('Strain soma')).toBeInTheDocument();
  });

  it('displays top three positive effects', () => {
    render(<StrainSoma strain={mockStrain} />);
    expect(screen.getByText('giggly')).toBeInTheDocument();
    expect(screen.getByText('talkative')).toBeInTheDocument();
    expect(screen.getByText('relaxed')).toBeInTheDocument();
  });

  it('displays top three negative effects', () => {
    render(<StrainSoma strain={mockStrain} />);
    expect(screen.getByText('downcast')).toBeInTheDocument();
    expect(screen.getByText('unimaginative')).toBeInTheDocument();
    expect(screen.getByText('numb')).toBeInTheDocument();
  });

  it('displays "helps with"', () => {
    render(<StrainSoma strain={mockStrain} />);
    expect(screen.getByText('apathy')).toBeInTheDocument();
    expect(screen.getByText('social anxiety')).toBeInTheDocument();
    expect(screen.getByText('anxiety')).toBeInTheDocument();
  });

  it('displays THC level', () => {
    render(<StrainSoma strain={mockStrain} />);
    const thcLevel = screen.getByText('high THC');
    expect(thcLevel).toBeInTheDocument();
    const thcLevelBar =
      thcLevel.parentElement?.parentElement?.lastChild?.firstChild;
    expect(thcLevelBar).toHaveStyle('width: 40%');
  });

  it('displays calm level', () => {
    render(<StrainSoma strain={mockStrain} />);
    const calmLevel = screen.getByText('calm');
    const calmLevelBar =
      calmLevel.parentElement?.parentElement?.lastChild?.firstChild;
    expect(calmLevelBar).toHaveStyle('width: 52%');
  });
});
