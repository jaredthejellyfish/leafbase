'use client';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

const getUser = async () => {
  const res = await fetch('/api/user');
  const user = await res.json();

  return user;
};

const useUser = () => {
  const { data: session } = useSession();

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ['user-profile'],
    queryFn: () => getUser(),
    enabled: !!session?.user,
    cacheTime: 0,
  });

  const user = data?.user;

  return { user, isLoading, isFetching, error };
};

export default useUser;
