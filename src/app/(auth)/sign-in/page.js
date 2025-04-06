'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useState, useActionState } from 'react';
import { loginUser } from '@/app/actions/authAction';

export default function SignInPage() {
  const [formState, formAction, isPending] = useActionState(loginUser, null);

  useEffect(() => {
    if (formState?.success) {
      window.location.href = '/account';
    }
  }, [formState]);

  return (
    <>
      <form action={formAction} className='mx-auto mt-16 max-w-sm space-y-4'>
        <h2 className='text-2xl font-semibold'>Sign In</h2>
        <Input name='username' placeholder='Username' />
        <Input name='password' type='password' placeholder='Password' />
        <Button type='submit' disabled={isPending}>
          {isPending ? 'Logging in...' : 'Login'}
        </Button>
        {formState?.error && <p className='text-red-500'>{formState.error}</p>}
      </form>

      <Link href='/sign-up' className='mt-4 block w-full text-center'>
        Create acccount
      </Link>
    </>
  );
}
