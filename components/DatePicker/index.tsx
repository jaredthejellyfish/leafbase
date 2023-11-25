'use client';

import { Calendar as CalendarIcon } from 'lucide-react';
import { format, parse } from 'date-fns';
import { useState } from 'react';
import * as React from 'react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Props = {
  initialDate?: string;
};

export function DatePicker({ initialDate }: Props) {
  const [date, setDate] = useState(
    initialDate ? parse(initialDate, 'yyyy-MM-dd', new Date()) : undefined
  );

  return (
    <>
      <Popover>
        <PopoverTrigger asChild className="bg-transparent">
          <Button
            variant={'outline'}
            className={cn(
              'w-[280px] justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, 'PPP') : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => setDate(date)}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <input
        type="hidden"
        name="birthDate"
        value={date ? format(date, 'yyyy-MM-dd') : undefined}
      />
    </>
  );
}
