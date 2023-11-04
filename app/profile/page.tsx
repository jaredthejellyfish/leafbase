import React from 'react';

import { getServerUserMetadata } from '@/lib/utils/getServerUserMetadata';
import GeneralInformation from '@/components/GeneralInformation';
import NavBreadcrumbs from '@/components/NavBreadcrumbs';
import Profile from '@/components/Profile';

export const metadata = {
  title: 'Profile - Leafbase',
  description:
    'Explore your personal user page, showcasing your profile, comments, and a curated list of your favorite cannabis strains. Stay updated and engaged with the community.',
};

async function ProfilePage() {
  const { user_metadata, session } = await getServerUserMetadata();

  if (!user_metadata) {
    return null;
  }

  return (
    <div className="px-5 md:px-16 py-3">
      <NavBreadcrumbs
        urls={[
          {
            name: 'Profile',
            url: `/profile/${user_metadata?.displayName}`,
          },
        ]}
      />
      <div className="flex flex-col gap-6 mt-3 lg:flex-row">
        <div id="vertical 1" className="flex flex-col gap-4 lg:w-1/3">
          <Profile user={user_metadata} session={session} />
        </div>
        <div id="vertical 2" className="flex flex-col gap-4 pb-3 lg:w-2/3">
          <GeneralInformation user={user_metadata} />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
