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
        'w-full mt-4 text-white bg-green-700 hover:bg-green-800 transition-all focus:ring-4 focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 mr-2 dark:bg-green-700 dark:hover:bg-green-800 focus:outline-none dark:focus:ring-blue-800',
        className,
      )}
      disabled={pending}
    >
      {pending ? whilePending : text}
    </button>
  );
}

export default SubmitButton;
