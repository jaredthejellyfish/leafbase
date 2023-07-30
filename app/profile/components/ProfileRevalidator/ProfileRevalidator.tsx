'use client';

import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

const ProfileRevalidator = () => {
  const searchParams = useSearchParams();
  const revalidate = searchParams.get('revalidate');
  const router = useRouter();

  useEffect(() => {
    if (revalidate === 'true') {
      router.replace('/profile');
      router.refresh();
    }
  }, [revalidate, router]);

  return <></>;
};

export default ProfileRevalidator;
