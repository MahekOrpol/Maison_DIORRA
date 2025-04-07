'use client';
import { cn } from '@/lib/utils';
import { useId } from 'react';
// RHF-Aware FloatingSelect.js
import { useController, useFormContext } from 'react-hook-form';

export default function FloatingSelect({
  placeholder,
  value,
  onChange,
  options,
  className,
  rules = {},
  name,
  ...props
}) {
  const id = useId();
  const isSelected = value !== '' && value !== undefined;
  const form = useFormContext();

  if (!form) {
    console.warn('FloatingSelect must be used inside a FormProvider');
    return null;
  }
  const {
    register,
    formState: { errors }
  } = form;

  const hasError = !!errors[name];
  return (
    <div className={cn('relative w-full', className)}>
      <select
        id={id}
        {...register(name, rules)} // 💡 Apply rules here
        className={cn(
          'peer bg-muted w-full appearance-none rounded-md border px-3 pt-5 pb-2 text-sm',
          hasError ? 'border-red-500' : 'border-gray-300'
        )}
        {...props}
      >
        <option value='' disabled hidden>
          {''}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <label
        htmlFor={id}
        className={cn(
          'pointer-events-none absolute left-3 text-sm text-[#606060] transition-all duration-200',
          'top-1 text-xs'
        )}
      >
        {placeholder}
      </label>
      {hasError && (
        <p className='mt-1 text-sm text-red-500'>{errors[name]?.message}</p>
      )}
    </div>
  );
}
