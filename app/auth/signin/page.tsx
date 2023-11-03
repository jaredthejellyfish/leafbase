import React from 'react';

import LoginReloader from '@/components/LoginReloader';
import { signInUser } from '@/lib/actions/signInUser';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Login() {
  return (
    <div className="flex flex-col px-20">
      <form action={signInUser} className="flex flex-col gap-2">
        <Input name="email" placeholder='jared@leafbase.xyz' />
        <Input type="password" name="password" placeholder='password' />
        <Button type="submit">Sign in</Button>
      </form>
      <LoginReloader />
    </div>
  );
}
