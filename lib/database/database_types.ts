import type { Database } from '@/lib/database';

export type DatabaseStrain = Database['public']['Tables']['strains']['Row'];
export type UserMetadataExtended = {
  aboutMe: string;
  birthDate: string;
  commentNotify: boolean;
  dispensaryNotify: boolean;
  displayName: string;
  image: string;
  languages: string;
  location: string;
  name: string;
  phone: string;
};
export type PublicProfile =
  Database['public']['Tables']['public_profiles']['Row'];

export type SearchStrain =
  Database['public']['Functions']['search_strains']['Returns'][0];
