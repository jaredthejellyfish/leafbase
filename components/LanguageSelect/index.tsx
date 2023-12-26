'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import React from 'react';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { languages } from '@/lib/utils/languages';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

type Props = { initialLanguage?: string };

export default function LanguageSelect({ initialLanguage }: Props) {
  const [value, setValue] = React.useState(initialLanguage);
  return (
    <>
      <Popover>
        <PopoverTrigger asChild className="bg-transparent">
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              'w-[200px] justify-between',
              !value && 'text-muted-foreground',
            )}
          >
            {value
              ? languages.find((language) => language.value === value)?.label
              : 'Select language'}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search language..." />
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup>
              {languages.map((language) => (
                <CommandItem
                  value={language.label}
                  key={language.value}
                  onSelect={() => {
                    setValue(language.value);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      language.value === value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {language.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <input
        type="text"
        name="language"
        className="hidden"
        value={value}
        onChange={() => {}}
      />
    </>
  );
}
