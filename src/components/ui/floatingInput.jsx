// FloatingInput.js
'use client';
import { useFormContext } from 'react-hook-form';
import { useId } from 'react';
import { cn } from '@/lib/utils';

export default function FloatingInput({
  label,
  type = 'text',
  name,
  placeholder = ' ',
  className = '',
  rules = {}, // 💡 Receive rules from parent
  ...props
}) {
  const id = useId();
  const form = useFormContext();

  if (!form) {
    console.warn('FloatingInput must be used inside a FormProvider');
    return null;
  }
  const {
    register,
    formState: { errors }
  } = form;

  const hasError = !!errors[name];

  return (
    <div className='relative w-full'>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(name, rules)}
        className={cn(
          'peer bg-muted block w-full appearance-none rounded-lg border px-2.5 pt-5 pb-2.5 text-sm focus:ring-0 focus:outline-none',
          hasError ? 'border-red-500' : 'border-gray-300',
          className
        )}
        {...props}
      />
      <label
        htmlFor={id}
        className={cn(
          'text-muted-foreground absolute start-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 transform text-sm transition-all',
          'peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100',
          'peer-focus:-translate-y-4 peer-focus:scale-75'
        )}
      >
        {label}
      </label>
      {hasError && (
        <p className='mt-1 text-sm text-red-500'>{errors[name]?.message}</p>
      )}
    </div>
  );
}
