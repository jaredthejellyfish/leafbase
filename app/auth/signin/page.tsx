import React from 'react';

import { signInUser } from '@/lib/actions/auth/signInUser';
import LoginReloader from '@/components/LoginReloader';
import SubmitButton from '@/components/SubmitButton';

export default function Login() {
  return (
    <div className="flex items-center justify-center h-screen-bar bg-zinc-100 dark:bg-zinc-950">
      <div className="mx-auto max-w-sm space-y-6 bg-white dark:bg-zinc-800 p-8 rounded-lg shadow-md">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
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
          <div className="flex items-center justify-center mt-4 mb-2">
            <hr className="border-zinc-300 w-full" />
            <p className="px-2 text-center text-zinc-600 dark:text-zinc-400">
              Or
            </p>
            <hr className="border-zinc-300 w-full" />
          </div>
          <button className="rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full flex items-center justify-center space-x-2 bg-white border border-zinc-300 text-zinc-700">
            {/* <icon prompt="google" className="h-5 w-5 text-red-600"></icon> */}
            Login with Google
          </button>
          <button className="rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full flex items-center justify-center space-x-2 bg-white border border-zinc-300 text-zinc-700">
            {/* <icon prompt="github" className="h-5 w-5 text-black"></icon> */}
            Login with GitHub
          </button>
        </form>
      </div>
      <LoginReloader />
    </div>
    // <div className="flex flex-col px-20">
    //   <form action={signInUser} className="flex flex-col gap-2">
    //     <Input name="email" placeholder='jared@leafbase.xyz' />
    //     <Input type="password" name="password" placeholder='password' />
    //     <SubmitButton text={'Sign in'} whilePending={'Signing in...'} />
    //   </form>
    //   <LoginReloader />
    // </div>
  );
}
