'use client';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export function FloatingInput({
  placeholder,
  type = 'text',
  value: controlledValue,
  onChange
}) {
  const [uncontrolledValue, setUncontrolledValue] = useState('');
  const value =
    controlledValue !== undefined ? controlledValue : uncontrolledValue;

  return (
    <div className='relative w-full'>
      <Input
        type={type}
        value={value}
        onChange={(e) => {
          setUncontrolledValue(e.target.value);
          onChange?.(e.target.value);
        }}
        className={cn(
          'peer h-12 w-full rounded-md border px-3 pt-4 placeholder:text-transparent focus:ring-1 focus:ring-black md:text-base'
        )}
        placeholder={placeholder}
      />
      <label
        className={cn(
          'text-muted-foreground pointer-events-none absolute top-4 left-4 scale-105 text-sm transition-all duration-200',
          value || value === 0
            ? 'top-2 left-3 -translate-y-2 scale-95'
            : 'top-4'
        )}
      >
        {placeholder}
      </label>
    </div>
  );
}
