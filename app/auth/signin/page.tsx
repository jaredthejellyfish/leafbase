import Link from 'next/link';
import React from 'react';

import { signInUser } from '@/lib/actions/auth/signInUser';
import LoginReloader from '@/components/LoginReloader';
import SubmitButton from '@/components/SubmitButton';
import SocialSignin from '@/components/SocialSignin';

export default function AuthSignIn() {
  return (
    <main className="flex items-center justify-center py-32 bg-zinc-50/50 dark:bg-zinc-950 px-4 sm:px-0">
      <div className="mx-auto max-w-sm space-y-3 bg-white dark:bg-zinc-900 p-5 sm:p-8 rounded-lg shadow-xl">
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
            <Link className="underline ml-2" href="/auth/signup">
              Sign up
            </Link>
          </div>
          <div className="flex items-center justify-center mt-4 mb-2">
            <hr className="border-zinc-600 w-full" />
            <p className="px-2 text-center text-zinc-400">Or</p>
            <hr className="border-zinc-600 w-full" />
          </div>
          <SocialSignin />
        </form>
      </div>
      <LoginReloader />
    </main>
  );
}
