import React, { forwardRef } from 'react';
import { MdError } from 'react-icons/md';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@c/ui/tooltip';

import { cn } from '@u/cn';

const Input = forwardRef<
  HTMLInputElement,
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > & { error?: string }
>(
  (
    props: React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    > & { error?: string },
    ref,
  ) => {
    return (
      <div className="w-full text-sm leading-tight border rounded appearance-none focus:outline-none focus:shadow-outline bg-zinc-950 flex flex-row items-center justify-between">
        <input
          ref={ref}
          className={cn(
            'bg-transparent border-transparent px-3 py-3 outline-none focus:outline-none w-full h-full',
            props.className,
          )}
          {...props}
        />
        {props.error && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <MdError size={20} className="text-red-700 mr-1" />
              </TooltipTrigger>
              <TooltipContent>
                <span>{props.error}</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
