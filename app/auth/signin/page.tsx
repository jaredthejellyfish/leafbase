import Link from 'next/link';

import LoginReloader from '@/components/LoginReloader';
import SocialSignin from '@/components/SocialSignin';
import SubmitButton from '@/components/SubmitButton';

import { signInUser } from '@/lib/actions/auth/signInUser';

import React from 'react';

export default function AuthSignIn() {
  return (
    <main className="flex h-[85vh] items-center justify-center bg-zinc-50/50 px-4 sm:h-screen-bar sm:px-0 dark:bg-zinc-950">
      <div className="mx-auto max-w-sm space-y-3 rounded-lg bg-white p-5 shadow-xl sm:p-8 dark:bg-zinc-900">
        <div className="space-y-2 text-center">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-zinc-900 dark:text-white">
            Log in
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400">
            Enter your email below to login to your account
          </p>
        </div>
        <form className="space-y-4" action={signInUser}>
          <div className="space-y-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="email"
              name="email"
              placeholder="m@example.com"
              required={true}
              type="email"
            />
          </div>
          <div className="space-y-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="password"
              name="password"
              required={true}
              type="password"
            />
          </div>
          <SubmitButton text={'Sign in'} whilePending={'Signing in...'} />
          <div className="mt-0 text-center text-sm">
            Dont have an account?
            <Link className="ml-2 underline" href="/auth/signup">
              Sign up
            </Link>
          </div>
          <div className="mb-2 mt-4 flex items-center justify-center">
            <hr className="w-full border-zinc-600" />
            <p className="px-2 text-center text-zinc-400">Or</p>
            <hr className="w-full border-zinc-600" />
          </div>
          <SocialSignin />
        </form>
      </div>
      <LoginReloader />
    </main>
  );
}
