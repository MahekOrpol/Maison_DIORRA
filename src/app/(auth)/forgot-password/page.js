'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');

  const handleForgot = (e) => {
    e.preventDefault();
    console.log('Send reset to:', email);
    // Use your own backend API
  };

  return (
    <form onSubmit={handleForgot} className='mx-auto mt-16 max-w-sm space-y-4'>
      <h2 className='text-2xl font-semibold'>Forgot Password</h2>
      <Input
        placeholder='Enter your email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button type='submit' className='w-full'>
        Reset Password
      </Button>

      <Link href='/sign-in' className='mt-10'>
        Sign in
      </Link>
    </form>
  );
}
