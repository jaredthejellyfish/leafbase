import type { Database } from './database';

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
