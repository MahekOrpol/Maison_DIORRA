'use client';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Heart, LogIn } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useModalStore } from '@/store/modal-stote';

export function WishlistNotAllowed() {
  const modalState = useModalStore((s) => s.modals['wishlistNotAllowed']);
  const closeModal = useModalStore((s) => s.closeModal);
  const router = useRouter();

  const isOpen = modalState?.open || false;

  const handleOpenChange = (open) => {
    if (!open) closeModal('wishlistNotAllowed');
  };

  const handleLoginClick = () => {
    closeModal('wishlistNotAllowed');
    router.push('/login');
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className='overflow-hidden rounded-xl p-0 sm:max-w-4xl'>
        <DialogTitle className='sr-only'>
          Wishlist Access Denied Popup
        </DialogTitle>
        <div className='grid grid-cols-1 md:grid-cols-2'>
          {/* Left Section - Optional Advertisement */}
          <div className='bg-muted relative hidden md:block'>
            <Image
              src='/img/ads/add4.png'
              alt='Ad Image'
              fill
              className='object-fill'
            />
          </div>

          {/* Right Section - Message & Actions */}
          <div className='mx-auto flex max-w-lg flex-col items-center justify-center rounded-2xl bg-white p-6 text-center sm:px-10 sm:py-14'>
            {/* Logo or Icon */}
            {/* <div className='mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-yellow-50 to-amber-100 shadow-md'>
              <Heart className='h-8 w-8 fill-[#C5A880] text-[#C5A880]' />
            </div> */}
            <div className='mb-6 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#C5A880] bg-gradient-to-br from-yellow-50 to-amber-200 shadow-md transition-transform hover:scale-105 hover:shadow-lg'>
              <Heart className='h-6 w-6 fill-[#D8B170] stroke-1 text-[#8B6F43]' />
            </div>

            {/* Title */}
            <h2 className='text-2xl font-bold text-gray-900'>
              Please Login to Your Account
            </h2>

            {/* Description */}
            <p className='mt-3 text-gray-600'>
              To save your favorites and access your wishlist anytime, anywhere.
            </p>

            {/* Divider */}
            <div className='my-4 w-16 border-t border-gray-200'></div>

            {/* Actions */}
            <div className='mt-4 flex w-full flex-col gap-3 sm:flex-row sm:justify-center'>
              <Button
                onClick={handleLoginClick}
                className='mx-auto h-11 w-full max-w-[240px] rounded-4xl text-lg'
              >
                Login
                <LogIn className='mr-2 size-5' />
              </Button>
            </div>

            {/* Additional Help Text */}
            <p className='mt-6 text-sm text-gray-500'>
              Don't have an account?{' '}
              <span
                className='cursor-pointer font-medium text-[#C5A880] hover:underline'
                onClick={handleLoginClick}
              >
                Join us now
              </span>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
