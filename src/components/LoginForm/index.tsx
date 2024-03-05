'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import React, { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import Input from '@c/Input';

import type { LoginSchemaType } from '@l/schemas/LoginSchema';
import LoginSchema from '@l/schemas/LoginSchema';

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<LoginSchemaType> = async (data) => {
    try {
      setLoading(true);
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = (await res.json()) as { result: 'error' | 'success' };

      if (result.result === 'error') {
        alert('Invalid email or password');
      }

      if (result.result === 'success') {
        window.location.replace('/profile');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="px-5 py-4 bg-zinc-900 rounded-md max-w-md w-full gap-y-2 flex flex-col"
    >
      <div className="flex flex-col items-center py-2 gap-y-2 px-3 text-center">
        <span className="text-2xl font-bold">Log In</span>
        <span className="text-zinc-400">
          Enter your email and password to log in.
        </span>
      </div>
      <Input
        autoComplete="username"
        id="email-address"
        type="email"
        placeholder="Email"
        {...register('email')}
        error={errors.email?.message}
      />
      <Input
        id="password"
        type="password"
        placeholder="Password"
        {...register('password')}
        error={errors.password?.message}
      />
      <div className="px-5 py-2">
        <button
          className="w-full bg-green-700 px-3 font-medium  py-2 rounded-xl disabled:bg-green-800"
          type="submit"
        >
          {!loading ? 'Log In' : 'Logging In...'}
        </button>
      </div>
      <div className="flex flex-row items-center jusitfy-start w-full gap-x-2 px-2 text-sm text-zinc-400">
        <span>
          Need an account?{' '}
          <Link href="/auth/signup" className="underiline text-green-700/80">
            Sign Up
          </Link>
        </span>
      </div>
    </form>
  );
}
