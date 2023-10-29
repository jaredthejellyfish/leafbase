import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

type Props = {
  avatarUrl?: string;
  userInitials?: string;
};

const UserAvatar = (props: Props) => {
  const { avatarUrl, userInitials } = props;

  return (
    <Link href="/profile">
      <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
        <AvatarImage src={avatarUrl} />
        <AvatarFallback className="text-xs sm:text-base">
          {userInitials || "CN"}
        </AvatarFallback>
      </Avatar>
    </Link>
  );
};

export default UserAvatar;
