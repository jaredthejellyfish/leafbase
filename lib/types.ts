import type { DatabaseStrain, StrainComment } from './database/database_types';

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
  username: string;
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
      username: string;
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

export interface StrainWithComments extends Strain {
  strain_comments: {
    comment: string;
    created_at: string;
    id: string;
    strain_id: string;
    user_id: string;
    profile: {
      username: string;
      image: string | null;
    };
  }[];
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

export interface StrainCommentWithUser extends StrainComment {
  profile: {
    id: string;
    username: string;
    image: string;
  };
}

export type StrainWithCommentsWithUser = Omit<
  StrainWithComments,
  'strain_comments' & { strain_comments: StrainCommentWithUser[] }
>[];

interface ProfileEffect {
  icon: null | string;
  name: string;
  type: null | string;
  score: number;
  votes: null | number;
}

interface ProfileTerpene {
  name: string;
  score: number;
  description: null | string;
}

export interface StrainData {
  thcPercent: number | null;
  effects: { [key: string]: ProfileEffect };
  terps: { [key: string]: ProfileTerpene };
}

export interface AggregatedData {
  averageThcPercent: number;
  effectScores: { [effectName: string]: number };
  terpeneScores: { [terpeneName: string]: number };
}

export interface NormalizedData {
  averageThcPercent: number;
  effectPercentages: { [effectName: string]: number };
  terpenePercentages: { [terpeneName: string]: number };
}
