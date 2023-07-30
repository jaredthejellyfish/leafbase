import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import MixersButton from '../Mixers/MixersButton';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import fetchMock from 'jest-fetch-mock';


fetchMock.enableMocks();

const mockStrain= {
  id: 'cljm0oaev000bxivq33kc2erh',
  slug: 'jealousy',
  name: 'Jealousy',
  subtitle:
    'A potent hybrid weed with balancing effects, high THC, and fuel aroma. Ideal for experienced users.',
  category: 'Hybrid',
  phenotype: 'Hybrid',
  averageRating: 4.585987261146497,
  shortDescription: null,
  description:
    "Jealousy is a hybrid weed strain made by crossing Sherbert Bx1 with Gelato 41. Jealousy is known for its balancing effects. Reviewers on Leafly who have smoked this strain say it makes them feel mentally relaxed but physically energetic. Jealousy can test into the high 20s interms of THC percentage, ideal for experienced cannabis consumers. The dominant terpene of this strain is caryophyllene, which is often associated with a fuel aroma. There's also limonene and myrcene and sometimes linalool and humulene.  Reviewers tell Leafly Jealousy tastes earthy and funky. Medical marijuana patients say they buy this strain when feeling symptoms of mild stress. Jealousy was originally bred by Seed Junky Genetics. ",
  nugImage:
    'https://leafly-public.s3-us-west-2.amazonaws.com/strains/photos/lfgn9PfQcS7RL18QA4te_Jealousy-PDP-Image-v1%20copy.jpeg',
  flowerImageSvg:
    'https://public.leafly.com/strains/flowers/jealousy-flower.svg',
  topTerpene: 'caryophyllene',
  thcPercent: 18,
  topEffect: 'Giggly',
  cannabinoids: {
    cbc: {
      order: 3,
      displayName: 'CBC',
      percentile25: null,
      percentile50: 0,
      percentile75: null,
    },
    cbd: {
      order: 2,
      displayName: 'CBD',
      percentile25: 0,
      percentile50: 0,
      percentile75: 0,
    },
    cbg: {
      order: 4,
      displayName: 'CBG',
      percentile25: null,
      percentile50: 0,
      percentile75: null,
    },
    thc: {
      order: 1,
      displayName: 'THC',
      percentile25: 17,
      percentile50: 18,
      percentile75: 22,
    },
    thcv: {
      order: 5,
      displayName: 'THCV',
      percentile25: null,
      percentile50: 0,
      percentile75: null,
    },
  },
  effects: {
    happy: {
      icon: null,
      name: 'happy',
      type: null,
      score: 0.0994294846414687,
      votes: null,
    },
    giggly: {
      icon: null,
      name: 'giggly',
      type: null,
      score: 1.30786841564788,
      votes: null,
    },
    hungry: {
      icon: null,
      name: 'hungry',
      type: null,
      score: -0.113688936800425,
      votes: null,
    },
    sleepy: {
      icon: null,
      name: 'sleepy',
      type: null,
      score: -0.572040753717086,
      votes: null,
    },
    tingly: {
      icon: null,
      name: 'tingly',
      type: null,
      score: -0.614851597950853,
      votes: null,
    },
    aroused: {
      icon: null,
      name: 'aroused',
      type: null,
      score: 0.167877363540275,
      votes: null,
    },
    focused: {
      icon: null,
      name: 'focused',
      type: null,
      score: -0.180044929004744,
      votes: null,
    },
    relaxed: {
      icon: null,
      name: 'relaxed',
      type: null,
      score: 0.518755658552153,
      votes: null,
    },
    creative: {
      icon: null,
      name: 'creative',
      type: null,
      score: -0.821001717884685,
      votes: null,
    },
    euphoric: {
      icon: null,
      name: 'euphoric',
      type: null,
      score: -0.286562287167025,
      votes: null,
    },
    uplifted: {
      icon: null,
      name: 'uplifted',
      type: null,
      score: -1.13980506750109,
      votes: null,
    },
    energetic: {
      icon: null,
      name: 'energetic',
      type: null,
      score: -0.196353708096944,
      votes: null,
    },
    talkative: {
      icon: null,
      name: 'talkative',
      type: null,
      score: 1.01743075376685,
      votes: null,
    },
  },
  terps: {
    pinene: {
      name: 'pinene',
      score: 0.166,
      description: null,
    },
    myrcene: {
      name: 'myrcene',
      score: 0.352,
      description: null,
    },
    ocimene: {
      name: 'ocimene',
      score: 0.034,
      description: null,
    },
    humulene: {
      name: 'humulene',
      score: 0.158,
      description: null,
    },
    limonene: {
      name: 'limonene',
      score: 0.508,
      description: null,
    },
    linalool: {
      name: 'linalool',
      score: 0.192,
      description: null,
    },
    terpinolene: {
      name: 'terpinolene',
      score: 0.03,
      description: null,
    },
    caryophyllene: {
      name: 'caryophyllene',
      score: 0.542,
      description: null,
    },
  },
  dispensaryMenuId: null,
  comments: [
    {
      id: 'cljm1azxz0001xisccicclzn1',
      userId: 'cljexq1620000ia08k3qtmjc9',
      strainId: 'cljm0oaev000bxivq33kc2erh',
      body: 'meow meow',
      createdAt: '2023-07-02T22:59:19.032Z',
      likes: [
        {
          id: 'clkaw0km20004xi30j2rrkk06',
          userId: 'cljbqqse80000k008h9lczinq',
          commentId: 'cljm1azxz0001xisccicclzn1',
          createdAt: '2023-07-20T08:25:28.923Z',
        },
      ],
      user: {
        name: 'leafbase-testing',
        image: 'https://avatars.githubusercontent.com/u/137962346?v=4',
        location: 'Earth',
        displayName: 'leafbase-testing',
      },
    },
    {
      id: 'cljvur6tr0001ximoyg9je42m',
      userId: 'cljbqqse80000k008h9lczinq',
      strainId: 'cljm0oaev000bxivq33kc2erh',
      body: 'good strain uwu',
      createdAt: '2023-07-09T19:53:38.895Z',
      likes: [
        {
          id: 'clkavysoo0001xi30voulshs4',
          userId: 'cljbqqse80000k008h9lczinq',
          commentId: 'cljvur6tr0001ximoyg9je42m',
          createdAt: '2023-07-20T08:24:06.072Z',
        },
      ],
      user: {
        name: 'Gerard Hernandez',
        image: 'https://avatars.githubusercontent.com/u/50416421?v=4',
        location: 'Barcelona, Spain',
        displayName: 'jaredthejelly',
      },
    },
    {
      id: 'clkavgxaz0001xijp08zdc016',
      userId: 'cljbqqse80000k008h9lczinq',
      strainId: 'cljm0oaev000bxivq33kc2erh',
      body: 'meowwwwww',
      createdAt: '2023-07-20T08:10:12.251Z',
      likes: [
        {
          id: 'clkaw0kl40003xi30nelcmc81',
          userId: 'cljbqqse80000k008h9lczinq',
          commentId: 'clkavgxaz0001xijp08zdc016',
          createdAt: '2023-07-20T08:25:28.888Z',
        },
      ],
      user: {
        name: 'Gerard Hernandez',
        image: 'https://avatars.githubusercontent.com/u/50416421?v=4',
        location: 'Barcelona, Spain',
        displayName: 'jaredthejelly',
      },
    },
  ],
};

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: { queries: { staleTime: 300000 } },
  });

describe('MixersButton', () => {
  let queryClient

  beforeEach(() => {
    queryClient = createQueryClient();
  });

  it('renders without crashing', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MixersButton strain={mockStrain} />
      </QueryClientProvider>
    );

    const element = screen.getByTestId('mixers-button');
    expect(element).toBeInTheDocument();
  });

  it('opens and closes the modal on button click', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MixersButton strain={mockStrain} />
      </QueryClientProvider>
    );

    const element = screen.getByTestId('mixers-button');
    fireEvent.click(element);

    expect(screen.getByText('Recommended Strains')).toBeInTheDocument();

    fireEvent.click(element);

    expect(screen.queryByText('Recommended Strains')).not.toBeInTheDocument();
  });

  it('fetches recommended strains data when modal is opened', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        mixers: [],
      })
    );

    render(
      <QueryClientProvider client={queryClient}>
        <MixersButton strain={mockStrain} />
      </QueryClientProvider>
    );

    const element = screen.getByTestId('mixers-button');
    fireEvent.click(element);

    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
  });
});
