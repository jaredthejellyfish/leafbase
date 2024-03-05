'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import React, { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import Input from '@c/Input';

import type { SignupSchemaType } from '@l/schemas/SignupSchema';
import SignupSchema from '@l/schemas/SignupSchema';

function SignupForm() {
  const [termsConfirmed, setTermsConfirmed] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupSchemaType>({
    resolver: zodResolver(SignupSchema),
  });

  const onSubmit: SubmitHandler<SignupSchemaType> = async (data) => {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    console.log(result);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="px-5 py-4 bg-zinc-900 rounded-md max-w-md w-full gap-y-2 flex flex-col"
    >
      <div className="flex flex-col items-center py-2 gap-y-2 px-3 text-center">
        <span className="text-2xl font-bold">Sign Up</span>
        <span className="text-zinc-400">
          Enter your information below to create your account
        </span>
      </div>
      <Input
        id="name"
        autoComplete="name"
        type="name"
        placeholder="Name"
        {...register('name')}
        error={errors.name?.message}
      />
      <Input
        id="username"
        placeholder="Username"
        {...register('username')}
        error={errors.username?.message}
      />
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
      <Input
        id="dateOfBirth"
        type="date"
        autoComplete="bday"
        placeholder="date"
        {...register('dateOfBirth')}
        error={errors.dateOfBirth?.message}
      />

      <div className="flex flex-row items-center jusitfy-start w-full gap-x-2 px-2 text-sm py-1">
        <input
          type="checkbox"
          checked={termsConfirmed}
          onChange={(e) => setTermsConfirmed(e.target.checked)}
        />
        <span>
          I agree to the{' '}
          <Link href="/tnc" className="underiline text-green-700">
            Terms and Conditions
          </Link>
        </span>
      </div>

      <div className="px-5 py-2">
        <button
          className="w-full bg-green-700 px-3 font-medium  py-2 rounded-xl disabled:bg-green-800"
          type="submit"
          disabled={!termsConfirmed}
        >
          Submit
        </button>
      </div>
      <div className="flex flex-row items-center jusitfy-start w-full gap-x-2 px-2 text-sm text-zinc-400">
        <span>
          Already have an account?{' '}
          <Link href="/auth/login" className="underiline text-green-700/80">
            Log in
          </Link>
        </span>
      </div>
    </form>
  );
}

export default SignupForm;
