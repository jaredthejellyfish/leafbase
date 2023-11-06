import Link from 'next/link';
import React from 'react';

import { signUpUser } from '@/lib/actions/auth/signUpUser';
import LoginReloader from '@/components/LoginReloader';
import SubmitButton from '@/components/SubmitButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Login() {
  return (
    <div className="flex items-center justify-center h-screen-bar bg-zinc-50/50 dark:bg-zinc-950">
      <div className="flex justify-center items-center h-full w-full">
        <div className="max-w-md w-full space-y-3 bg-white dark:bg-zinc-900 px-8 py-5 rounded-lg shadow-xl">
          <div className="flex flex-col gap-y-2">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-zinc-900 dark:text-white">
              Sign up
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-center">
              Enter your email below to login to your account
            </p>
          </div>
          <form action={signUpUser} className="mt-8 flex flex-col gap-y-4">
            <input name="remember" type="hidden" value="true" />
            <div className="rounded-md shadow-sm flex flex-col gap-3">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  autoComplete="name"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  autoComplete="username"
                  id="username"
                  name="username"
                  placeholder="johndoe123"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email-address">Email address</Label>
                <Input
                  autoComplete="email"
                  id="email-address"
                  name="email"
                  placeholder="john.doe@example.com"
                  required
                  type="email"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  autoComplete="current-password"
                  id="password"
                  name="password"
                  placeholder="********"
                  required
                  type="password"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  className="h-4 w-4 text-zinc-600 focus:ring-zinc-500 border-zinc-300 rounded"
                  id="terms"
                  name="terms"
                  type="checkbox"
                />
                <Label
                  className="ml-2 block text-sm text-zinc-900 dark:text-white"
                  htmlFor="terms"
                >
                  I agree to the terms and conditions
                </Label>
              </div>
            </div>
            <div>
              <SubmitButton className={"mt-0"} text={'Sign up'} whilePending={'Signing up...'} />
            </div>
            <div className="mt-0 text-center text-sm">
              Already have an account?
              <Link className="underline ml-2" href="/auth/signin">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
      <LoginReloader />
    </div>
  );
}
