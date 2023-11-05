import type { DatabaseStrain } from './database/database_types';

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

export interface Strain extends DatabaseStrain {
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
}

export type StrainLike = {
  id: string;
  created_at: string;
  strain_id: {
    name: string;
    nugImage: string;
    slug: string;
    id: string;
  };
};
