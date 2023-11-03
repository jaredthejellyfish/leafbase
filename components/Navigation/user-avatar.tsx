import Link from 'next/link';
import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type Props = {
  avatarUrl?: string | null;
  username?: string | null;
};

function generateInitials(word: string): string {
  if (word.length < 2) {
    // Handle cases where the word is too short to generate initials
    return word.toUpperCase();
  }

  const firstLetter = word.charAt(0);
  const lastLetter = word.charAt(word.length - 1);

  const initials = `${firstLetter}${lastLetter}`.toUpperCase();

  return initials;
}

const UserAvatar = (props: Props) => {
  const { avatarUrl, username } = props;

  const userInitials = username ? generateInitials(username) : null;

  return (
    <Link href="/profile">
      <Avatar className="h-8 w-8 sm:h-9 sm:w-9">
        <AvatarImage src={avatarUrl || undefined} />
        <AvatarFallback className="text-xs sm:text-base">
          {userInitials || 'CN'}
        </AvatarFallback>
      </Avatar>
    </Link>
  );
};

export default UserAvatar;
