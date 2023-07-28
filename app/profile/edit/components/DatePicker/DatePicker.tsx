'use client';

import React, { useState, useEffect } from 'react';

import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const css = `
  .custom-selected:not([disabled]) {
    font-weight: bold;
    border: 2px solid green;
    color: green;
  }
  .custom-selected:hover:not([disabled]) {
    border-color: green;
    color: green;
  }
  .my-today {
    font-weight: bold;
    color: white;
  }
`;

interface Props {
  // eslint-disable-next-line no-unused-vars
  onDateSelect: (day: Date) => void;
  closeCallback?: () => void;
}

export default function DatePicker(props: Props) {
  const [selected, setSelected] = useState<Date>();
  const datePickerRef = React.useRef<HTMLDivElement>(null);

  const { onDateSelect, closeCallback } = props;

  useEffect(() => {
    const checkClickOutside = (event: MouseEvent) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        closeCallback?.();
      }
    };
    // Adding click listener when mounting the component
    document.addEventListener('mousedown', checkClickOutside);
    // Removing click listener when unmounting the component
    return () => {
      document.removeEventListener('mousedown', checkClickOutside);
    };
  }, [closeCallback, datePickerRef]); // Only re-run the effect if `props.closeCallback` or `datePickerRef` changes

  useEffect(() => {
    if (selected && onDateSelect) {
      onDateSelect(selected);
    }
  }, [selected, onDateSelect]);

  const handleSelect = (day?: Date) => {
    if (day) {
      setSelected(day);
      onDateSelect(day);
    }
  };

  return (
    <>
      <style>{css}</style>
      <div
        className="relative z-40 p-1 mt-1 text-white rounded-xl bg-zinc-800"
        ref={datePickerRef}
      >
        <DayPicker
          mode="single"
          selected={selected}
          onSelect={handleSelect}
          showOutsideDays
          fixedWeeks
          modifiersClassNames={{
            selected: 'custom-selected',
            today: 'my-today',
          }}
        />
      </div>
    </>
  );
}
