'use client';

import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react'; // optional icon
import { Button } from '@/components/ui/button';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('Caught error:', error);
  }, [error]);

  return (
    <div className='mx-auto my-20 max-w-md rounded-xl border border-neutral-200 bg-white p-8 shadow-md'>
      <div className='flex flex-col items-center text-center'>
        <AlertTriangle className='mb-2 h-10 w-10' />
        <h2 className='text-2xl font-semibold'>Something went wrong</h2>
        <p className='mt-2 text-sm text-gray-500'>
          An unexpected error occurred. Please try again.
        </p>
        <div className='mt-4 w-full rounded-md bg-red-50 p-4 text-left text-sm text-red-700'>
          <strong className='mb-1 block'>Error Message :</strong>
          <code className='break-words'>{error?.message}</code>
        </div>
        <Button onClick={reset} className='mt-6 w-full rounded-full'>
          Try Again
        </Button>
      </div>
    </div>
  );
}
