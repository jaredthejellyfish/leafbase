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
  likes: Like[];
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

export interface CommentLike {
  id: string;
  userId: string;
  commentId: string;
  createdAt: string;
}

interface Terp {
  name: string;
  score: number;
  description: string | null;
}

export interface Terps {
  pinene: Terp;
  myrcene: Terp;
  ocimene: Terp;
  humulene: Terp;
  limonene: Terp;
  linalool: Terp;
  terpinolene: Terp;
  caryophyllene: Terp;
}

interface Effect {
  icon: null;
  name: string;
  type: null;
  score: number;
  votes: null;
}

export interface Effects {
  happy: Effect;
  giggly: Effect;
  hungry: Effect;
  sleepy: Effect;
  tingly: Effect;
  aroused: Effect;
  focused: Effect;
  relaxed: Effect;
  creative: Effect;
  euphoric: Effect;
  uplifted: Effect;
  energetic: Effect;
  talkative: Effect;
}

interface Cannabinoid {
  order: number;
  displayName: string;
  percentile25: number | null;
  percentile50: number;
  percentile75: number | null;
}

export interface Cannabinoids {
  cbc: Cannabinoid;
  cbd: Cannabinoid;
  cbg: Cannabinoid;
  thc: Cannabinoid;
  thcv: Cannabinoid;
}

export type nearbyDispensary = {
  id: string;
  latitude: number;
  longitude: number;
  slug: string;
  name: string;
  city: string;
  address: string;
  menus: {
    strains: {
      id: string;
      name: string;
    }[];
    prices: {
      price: number;
      strainId: string;
    }[];
  }[];
};

export interface CommentExtended {
  id: string;
  userId: string;
  strainId: string;
  body: string;
  createdAt: Date | string;
  strain: StrainExtended;
  likes?: CommentLike[];
  user: {
    name: string;
    image: string;
    location: string;
    displayName: string;
  };
}
