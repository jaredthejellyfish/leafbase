import React from 'react';

import LoginReloader from '@/components/LoginReloader';
import { signUpUser } from '@/lib/actions/signUpUser';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Login() {
  return (
    <div className="flex flex-col px-20">
      <form action={signUpUser} className="flex flex-col gap-2">
        <Input name="username" type='text' placeholder='jaredthejelly' />
        <Input name="email" type="email" placeholder='jared@leafbase.xyz' />
        <Input type="password" name="password" placeholder='password' />
        <Button type="submit">Sign up</Button>
      </form>
      <LoginReloader />
    </div>
  );
}
