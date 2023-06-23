import useServerUser from "@/hooks/useServerUser";
import React from "react";

type Props = { params: { displayName: string } };

const ProfileDisplay = async (props: Props) => {
  const user = await useServerUser(props.params.displayName);

  if (!user) return <div>User not found.</div>;

  return <div>{JSON.stringify(user)}</div>;
};

export default ProfileDisplay;
