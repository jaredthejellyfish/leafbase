'use client';

import { useFormStatus } from 'react-dom';

import { cn } from '@/lib/utils';

import React from 'react';

type Props = {
  name?: string;
  ariaLabel?: string;
  type?: 'submit' | 'button' | 'reset';
  className?: string;
  text: string;
  whilePending?: string;
  id?: string;
};

function SubmitButton({
  name = 'save',
  ariaLabel = 'Save',
  type = 'submit',
  id,
  className,
  text,
  whilePending,
}: Props) {
  const { pending } = useFormStatus();
  return (
    <button
      aria-label={ariaLabel}
      name={name}
      id={id}
      type={type}
      className={cn(
        'mr-2 mt-4 w-full rounded-xl bg-green-700 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-green-700 dark:hover:bg-green-800 dark:focus:ring-blue-800',
        className,
      )}
      disabled={pending}
    >
      {pending ? whilePending : text}
    </button>
  );
}

export default SubmitButton;
