'use client';

import TextareaAutosize from 'react-textarea-autosize';
import React from 'react';

import { cn } from '@/lib/utils';

type Props = {
  placeholder: string;
  className?: string;
  name?: string;
  id?: string;
  setValue?: (value: string) => void;
  value?: string;
};

function TextAreaAuto({
  placeholder,
  className,
  name,
  id,
  value,
  setValue,
}: Props) {
  return (
    <TextareaAutosize
      className={cn(
        'w-full rounded border border-zinc-500 bg-transparent p-1',
        className
      )}
      name={name || 'aboutMe'}
      id={id || 'about-me-textarea'}
      minRows={3}
      placeholder={placeholder}
      value={value ? value : undefined}
      onChange={(e) => {
        e.preventDefault();
        if (e.target.value.length > 500) return;
        else if (setValue) setValue(e.target.value);
      }}
    />
  );
}

export default TextAreaAuto;
