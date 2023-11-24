'use client';

import TextareaAutosize from 'react-textarea-autosize';
import React from 'react';

type Props = {
  placeholder: string;
};

function TextAreaAuto({ placeholder }: Props) {
  return (
    <TextareaAutosize
      className="w-full rounded border border-zinc-500 bg-transparent p-1"
      name="aboutMe"
      id="about-me-textarea"
      minRows={3}
      placeholder={placeholder}
    />
  );
}

export default TextAreaAuto;
