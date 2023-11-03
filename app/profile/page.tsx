import React from 'react';

import { getServerUserMetadata } from '@/lib/utils/getServerUserMetadata';
import { signOutUser } from '@/lib/actions/signOutUser';

async function ProfilePage() {
  const { session } = await getServerUserMetadata();

  return (
    <div>
      {session && JSON.stringify(session.user.user_metadata)}
      <form action={signOutUser}>
        <button type="submit">Sign out</button>
      </form>
    </div>
  );
}

export default ProfilePage;
