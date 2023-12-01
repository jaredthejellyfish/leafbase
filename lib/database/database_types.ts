import type { Database } from '@/lib/database';

export type DatabaseStrain = Database['public']['Tables']['strains']['Row'];

export type UserMetadataExtended = {
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
};

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
}