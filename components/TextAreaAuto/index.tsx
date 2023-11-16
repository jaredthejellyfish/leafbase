'use client';

import TextareaAutosize from 'react-textarea-autosize';
import React from 'react';

type Props = {
  placeholder: string;
};

function TextAreaAuto({ placeholder }: Props) {
  return (
    <TextareaAutosize
      className="w-full p-1 bg-transparent border rounded border-zinc-500"
      name="aboutMe"
      minRows={3}
      placeholder={placeholder}
    />
  );
}

export default TextAreaAuto;
