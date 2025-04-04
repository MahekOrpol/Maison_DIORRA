'use client';

import { cn } from '@/lib/utils'; // optional, just for merging classNames
import { useId } from 'react';

export default function FloatingInput({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder = ' ',
  className = '',
  ...props
}) {
  const id = useId();

  return (
    <div className='relative w-full'>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(
          'peer bg-muted block w-full appearance-none rounded-lg border px-2.5 pt-5 pb-2.5 text-sm focus:ring-0 focus:outline-none',

          className
        )}
        {...props}
      />
      <label
        htmlFor={id}
        className={cn(
          'absolute start-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 transform text-sm text-[#606060] transition-all',
          'peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100',
          'peer-focus:-translate-y-4 peer-focus:scale-75'
        )}
      >
        {label}
      </label>
    </div>
  );
}
