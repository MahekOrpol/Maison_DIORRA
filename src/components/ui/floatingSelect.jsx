import { cn } from '@/lib/utils';
import { useId } from 'react';

export function FloatingSelect({
  placeholder,
  value,
  onChange,
  options,
  className
}) {
  const id = useId();
  const isSelected = value !== '' && value !== undefined;

  return (
    <div className='relative w-full'>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={cn(
          'peer focus:outlin-none bg-muted w-full appearance-none rounded-md border px-3 pt-5 pb-2 text-sm',
          !isSelected && 'text-gray-400',
          className
        )}
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
          isSelected ? 'top-1 text-xs' : 'top-3.5'
        )}
      >
        {placeholder}
      </label>
    </div>
  );
}
