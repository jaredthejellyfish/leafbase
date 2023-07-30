import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import StrainCard from '../StrainCard/StrainCard';
import React from 'react';
import { QueryClientProvider, QueryClient} from '@tanstack/react-query';

jest.mock('next/image');

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: { queries: { staleTime: 300000 } },
  });

describe('StrainCard', () => {
  const defaultProps = {
    id: '1',
    slug: 'test-slug',
    name: 'Test Strain',
    subtitle: 'Test Subtitle',
    category: 'Test Category',
    phenotype: 'Test Phenotype',
    averageRating: 4.5,
    shortDescription: 'Test Description',
    nugImage:
      'https://leafly-public.s3-us-west-2.amazonaws.com/strains/photos/lfgn9PfQcS7RL18QA4te_Jealousy-PDP-Image-v1%20copy.jpeg',
    flowerImageSvg:
      'https://public.leafly.com/strains/flowers/jealousy-flower.svg',
    topTerpene: 'myrcene',
    thcPercent: 20,
    topEffect: 'Euphoric',
    cannabinoids: { cbd: { percentile50: 10 } },
    effects: { effect1: 'Euphoric' },
    liked: true,
    priority: true,
  };

  let queryClient;

  beforeEach(() => {
    queryClient = createQueryClient();
  });

  it('renders correctly', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <StrainCard {...defaultProps} />
      </QueryClientProvider>
    );
    expect(screen.getByText('Test Strain')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
    expect(screen.getByText('Test Phenotype')).toBeInTheDocument();
    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByText('THC 20%')).toBeInTheDocument();
    expect(screen.getByText('CBD:10%')).toBeInTheDocument();
    expect(screen.getByText('Euphoric')).toBeInTheDocument();
    expect(screen.getByText('myrcene')).toBeInTheDocument();
  });

  it('renders default subtitle when subtitle is not provided', () => {
    const props = { ...defaultProps, subtitle: '' };
    render(
      <QueryClientProvider client={queryClient}>
        <StrainCard {...props} />
      </QueryClientProvider>
    );
    expect(
      screen.getByText(`No description found for ${props.name}`)
    ).toBeInTheDocument();
  });

  it('renders unknown CBD percentage when cannabinoids are not provided', () => {
    const props = { ...defaultProps, cannabinoids: undefined };
    render(
      <QueryClientProvider client={queryClient}>
        <StrainCard {...props} />
      </QueryClientProvider>
    );
    expect(screen.getByText('CBD:unknown%')).toBeInTheDocument();
  });
});
