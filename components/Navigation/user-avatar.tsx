import Image from 'next/image';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import ProfileIcon from '@/public/svg/profile-icon.svg';

import React from 'react';

type Props = {
  avatarUrl?: string | null;
};

const UserAvatar = (props: Props) => {
  const { avatarUrl } = props;

  return (
    <Link href="/profile">
      <Avatar className="h-8 w-8 sm:h-9 sm:w-9">
        <AvatarImage src={avatarUrl || undefined} />
        <AvatarFallback className="text-xs sm:text-base">
          <Image
            src={ProfileIcon}
            alt="profile icon"
            width={30}
            height={30}
            className="rounded-full"
          />
        </AvatarFallback>
      </Avatar>
    </Link>
  );
};

export default UserAvatar;
