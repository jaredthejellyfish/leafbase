'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const ProfileRevalidator = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const revalidate = searchParams ? searchParams.get('revalidate') : 'false';

  useEffect(() => {
    if (revalidate === 'true') {
      router.replace('/profile');
      router.refresh();
    }
  }, [revalidate, router]);

  return <></>;
};

export default ProfileRevalidator;
