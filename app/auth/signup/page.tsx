import Link from 'next/link';

import LoginReloader from '@/components/LoginReloader';
import SubmitButton from '@/components/SubmitButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { signUpUser } from '@/lib/actions/auth/signUpUser';

import React from 'react';

export default function AuthSignUp() {
  return (
    <main className="flex h-[85vh] items-center justify-center bg-zinc-50/50 px-4 dark:bg-zinc-950 sm:h-screen-bar sm:px-0">
      <div className="flex h-full w-full items-center justify-center">
        <div className="w-full max-w-md space-y-3 rounded-lg bg-white p-5 shadow-xl dark:bg-zinc-900 sm:px-8">
          <div className="flex flex-col gap-y-2">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-zinc-900 dark:text-white">
              Sign up
            </h2>
            <p className="text-center text-zinc-500 dark:text-zinc-400">
              Enter your email below to login to your account
            </p>
          </div>
          <form action={signUpUser} className="mt-8 flex flex-col gap-y-4">
            <input name="remember" type="hidden" value="true" />
            <div className="flex flex-col gap-3 rounded-md shadow-sm">
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
                  id="username"
                  name="username"
                  placeholder="johndoe123"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email-address">Email address</Label>
                <Input
                  autoComplete="username"
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
                  className="h-4 w-4 rounded border-zinc-300 text-zinc-600 focus:ring-zinc-500"
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required={true}
                  title="Please agree to the terms and conditions"
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
              <SubmitButton
                className={'mt-0'}
                text={'Sign up'}
                whilePending={'Signing up...'}
              />
            </div>
            <div className="mt-0 text-center text-sm">
              Already have an account?
              <Link className="ml-2 underline" href="/auth/signin">
                Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
      <LoginReloader />
    </main>
  );
}
