import useServerUser from "@/hooks/useServerUser";
import React from "react";

type Props = {};

const ProfileDisplay = async (props: Props) => {
  const user = await useServerUser();
  return <div>{JSON.stringify(user)}</div>;
};

export default ProfileDisplay;
