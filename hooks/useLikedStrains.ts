"use client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const getUser = async () => {
  const res = await fetch("http://localhost:3000/api/strains/liked");
  const strains = await res.json();

  return strains;
};

const useLikedStrains = () => {
  const { data: session } = useSession();

  const {
    data,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["liked-strains"],
    queryFn: () => getUser(),
    cacheTime: 3000,
    enabled: !!session?.user,
  });

  const strains = data?.strains;

  return { strains, isLoading, isFetching, error };
};

export default useLikedStrains;
