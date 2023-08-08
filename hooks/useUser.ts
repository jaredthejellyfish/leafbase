'use client';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { User } from '@prisma/client';

const getUser = async () => {
  const res = await fetch('/api/user');
  const user = await res.json();

  return user as { user: User };
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

  if (!user && !isLoading && !isFetching)
    return { user: null, error, isLoading, isFetching };

  return { user, isLoading, isFetching, error };
};

export default useUser;
