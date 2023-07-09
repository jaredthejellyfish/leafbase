import { Strain, User } from '@prisma/client';

export interface StrainExtended extends Strain {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: string;
  phenotype: string;
  averageRating: number;
  shortDescription: string | null;
  description: string;
  nugImage: string;
  flowerImageSvg: string;
  topTerpene: string;
  thcPercent: number;
  topEffect: string;
  cannabinoids: {
    [key: string]: {
      displayName: string;
      order: number;
      percentile25: number | null;
      percentile50: number;
      percentile75: number | null;
    };
  };
  effects: {
    [key: string]: {
      name: string;
      icon: null;
      score: number;
      type: null;
      votes: null;
    };
  };
  terps: {
    [key: string]: {
      name: string;
      description: null;
      score: number;
    };
  };
  comments?: Comment[];
}

export interface Comment {
  id: string;
  userId: string;
  strainId: string;
  body: string;
  createdAt: string;
  user: User;
  strain: StrainExtended;
}

export interface Like {
  id: string;
  userId: string;
  strainId: string;
  createdAt: string;
}
