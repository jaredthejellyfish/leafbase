"use client";
import { useQuery } from "@tanstack/react-query";

const getUser = async () => {
  const res = await fetch("/api/strains/liked");
  const strains = await res.json();

  return strains;
};

const useLikedStrains = () => {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["liked-strains"],
    queryFn: () => getUser(),
    cacheTime: 3000,
  });

  const strains = data?.strains;

  return { strains, isLoading, isFetching, error };
};

export default useLikedStrains;
