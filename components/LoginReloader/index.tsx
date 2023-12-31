'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

import type { Database } from '@/lib/database';

import { useEffect } from 'react';

const LoginReloader = () => {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.access_token) {
        router.push('/profile');
      }
    });
  }, [supabase, router]);

  return null;
};

export default LoginReloader;
