import EditProfileForm from '@/components/EditProfileForm';
import NavBreadcrumbs from '@/components/NavBreadcrumbs';

import { getServerUserMetadata } from '@/lib/utils/getServerUserMetadata';

import React from 'react';

export const metadata = {
  title: 'Edit Profile - Leafbase',
};

export default async function ProfileEdit() {
  const { user_metadata, session } = await getServerUserMetadata();

  if (!session) {
    return null;
  }

  return (
    <div className="px-5 py-3 md:px-16">
      <NavBreadcrumbs
        urls={[
          { name: 'Profile', url: '/profile' },
          { name: 'Edit', url: '/profile/edit' },
        ]}
      />
      <EditProfileForm user_metadata={user_metadata} session={session} />
    </div>
  );
}
