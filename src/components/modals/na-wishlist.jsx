'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { LogIn, UserPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function NotAllowedModal({ open, onOpenChange }) {
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-sm rounded-xl px-6 py-8 sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='text-center text-xl font-semibold'>
            Wishlist Access Denied
          </DialogTitle>
        </DialogHeader>
        <div className='text-muted-foreground text-center text-sm'>
          Please login or create an account to use the wishlist feature.
        </div>

        <DialogFooter className='mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center'>
          <Button
            onClick={() => router.push('/login')}
            variant='default'
            className='w-full sm:w-auto'
          >
            <LogIn className='mr-2 h-4 w-4' />
            Login
          </Button>
          <Button
            onClick={() => router.push('/signup')}
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
