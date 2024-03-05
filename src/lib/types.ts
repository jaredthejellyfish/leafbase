import type { Database } from '@l/database';

export type DatabaseStrain = Database['public']['Tables']['strains']['Row'];

export type UserMetadataExtended = {
  id: string;
  about: string;
  birth_date: string;
  comment_notify: boolean;
  dispensary_notify: boolean;
  username: string;
  image: string;
  language: string;
  location: string;
  name: string;
  phone: string;
  pronouns: string;
};

export type Notification = Database['public']['Tables']['notifications']['Row'];

export type PublicProfile = Database['public']['Tables']['profiles']['Row'];

export type SearchStrain =
  Database['public']['Functions']['search_strains']['Returns'][0];

export type StrainComment =
  Database['public']['Tables']['strain_comments']['Row'];

export type FriendExtended = {
  from: {
    id: string;
    username: string;
    name: string;
    image: string;
  };
  to: {
    id: string;
    username: string;
    name: string;
    image: string;
  };
  pending: boolean;
};

export type Profile = Database['public']['Tables']['profiles']['Row'];

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
  cannabinoids: Record<
    string,
    {
      username: string;
      order: number;
      percentile25: number | null;
      percentile50: number;
      percentile75: number | null;
    }
  >;
  effects: Record<
    string,
    {
      name: string;
      icon: null;
      score: number;
      type: null;
      votes: null;
    }
  >;
  terps: Record<
    string,
    {
      name: string;
      description: null;
      score: number;
    }
  >;
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
    comment_likes: {
      user_id: string;
      id: string;
    }[];
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

  effects: Record<string, ProfileEffect>;
  terps: Record<string, ProfileTerpene>;
}

export interface AggregatedData {
  averageThcPercent: number;
  effectScores: Record<string, number>;
  terpeneScores: Record<string, number>;
}

export interface NormalizedData {
  averageThcPercent: number;
  effectPercentages: Record<string, number>;
  terpenePercentages: Record<string, number>;
}

export type SmokingProfile = {
  thc: number;
  effects: {
    happy: number;
    giggly: number;
    hungry: number;
    sleepy: number;
    tingly: number;
    aroused: number;
    focused: number;
    relaxed: number;
    creative: number;
    euphoric: number;
    uplifted: number;
    energetic: number;
    talkative: number;
  };
  terps: {
    pinene: number;
    myrcene: number;
    ocimene: number;
    humulene: number;
    limonene: number;
    linalool: number;
    terpinolene: number;
    caryophyllene: number;
  };
};

export type Filter = 're' | 'az' | 'za' | 'sr';

export type MiddlewareRedirects = {
  matcher: string;
  redirect: string;
  isAuth: boolean;
}[];
