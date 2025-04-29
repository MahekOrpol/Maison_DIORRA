'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Link from 'next/link';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log('Sign up with:', { email, username, password });
    // Use your own backend API here
  };

  return (
    <div className='flex flex-col items-center'>
      <form
        onSubmit={handleSignUp}
        className='mx-auto mt-16 w-full max-w-sm space-y-4'
      >
        <h2 className='text-2xl font-semibold'>Sign Up</h2>
        <Input
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type='submit' className='w-full'>
          Create Account
        </Button>
      </form>
      <div className='flex gap-10 text-blue-500'>
        <Link href='/sign-in'>Sign in</Link>
        <Link href='/forgot-password'>Forgot password</Link>
      </div>
    </div>
  );
}
