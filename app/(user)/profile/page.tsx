import React from "react";
import useServerUser from "@/hooks/useServerUser";
import Image from "next/image";
import SingOutButton from "@/components/SingOutButton/SingOutButton";

type Props = {};

async function UserProfile({}: Props) {
  const user = await useServerUser();

  return (
    <p>
      {user?.image && (
        <Image
          src={user?.image}
          alt={"user profile picture"}
          width={200}
          height={200}
        />
      )}
      <br />
      Name: {user?.name}
      <br />
      Email: {user?.email}
      <br />
      <SingOutButton />
    </p>
  );
}

export default UserProfile;
