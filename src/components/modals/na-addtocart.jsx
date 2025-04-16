'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ShoppingCart, LogIn, UserPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function AddToCartNotAllowedModal({ open, onOpenChange }) {
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-sm rounded-xl px-6 py-8 sm:max-w-md'>
        <DialogHeader className='flex flex-col items-center'>
          <div className='mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-500'>
            <ShoppingCart className='h-6 w-6' />
          </div>
          <DialogTitle className='text-center text-xl font-semibold'>
            You must be logged in to add items to your cart
          </DialogTitle>
        </DialogHeader>

        <div className='text-muted-foreground mt-2 text-center text-sm'>
          Please login or create an account to continue shopping.
        </div>

        <DialogFooter className='mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center'>
          <Button
            onClick={() => router.push('/sign-in')}
            variant='default'
            className='w-full sm:w-auto'
          >
            <LogIn className='mr-2 h-4 w-4' />
            Login
          </Button>
          <Button
            onClick={() => router.push('/sign-up')}
            variant='outline'
            className='w-full sm:w-auto'
          >
            <UserPlus className='mr-2 h-4 w-4' />
            Sign Up
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
