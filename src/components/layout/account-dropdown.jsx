'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import { logoutUser } from '@/app/actions/authAction';
import { UserRound } from 'lucide-react';
import { CiLogin } from 'react-icons/ci';
import { CiLogout } from 'react-icons/ci';
import { MdOutlineAccountBox, MdOutlineAccountCircle } from 'react-icons/md';
import { toast } from 'sonner';
import { useUserStore } from '@/store/user-store';
import { useWishlistStore } from '@/store/wishlist-store';
import { FaUser } from 'react-icons/fa6';

export function AccountDropdown() {
  const { authUser, hydrateUser, clearUser, isLoggedIn } = useUserStore(
    (state) => state
  );
  const { fetchWishlist, clearWishlist } = useWishlistStore((state) => state);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const user = hydrateUser();
    if (user) {
      fetchWishlist();
    }
  }, []);

  const handleLogout = async () => {
    try {
      // clear access token from cookie
      await logoutUser();
      // Clear client-side storage
      clearUser();
      clearWishlist();
      router.push('/login');
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Logout failed. Please try again.');
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className='hidden lg:inline-flex' asChild>
        <button className='flex items-center gap-1 outline-none'>
          <UserRound className='h-6 w-6' /> {/* Adjusted icon size */}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='mt-2 w-52 rounded-md border border-gray-200 bg-white shadow-lg'>
        {isLoggedIn ? (
          <>
            <DropdownMenuLabel className='bg-gray-100 px-3 py-2'>
              <div className='flex items-center gap-2'>
                <FaUser className='h-4 w-4 text-gray-700' />
                <p className='truncate text-base font-medium text-black'>
                  {authUser?.name}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className='bg-gray-100' />
            <DropdownMenuItem className='cursor-pointer px-3 py-2 focus:bg-gray-50'>
              <Link href='/account' className='flex w-full items-center'>
                <MdOutlineAccountCircle className='mr-2 h-20 w-20 text-gray-700' />
                <span className='text-sm text-gray-800'>My Account</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className='bg-gray-100' />
            <DropdownMenuItem
              className='cursor-pointer px-3 py-2 focus:bg-gray-50'
              onClick={handleLogout}
            >
              <div className='flex w-full items-center'>
                <CiLogout className='mr-2 h-4 w-4 text-gray-700' />
                <span className='text-sm text-gray-800'>Logout</span>
              </div>
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem className='cursor-pointer px-4 py-3 hover:bg-gray-50'>
            <Link href='/login' className='flex w-full items-center'>
              <div className='relative mr-3'>
                <div className='absolute -inset-1 rounded-full bg-gray-200 opacity-0 transition-opacity hover:opacity-100'></div>
                <CiLogin className='relative h-5 w-5 text-gray-700' />
              </div>
              <div className='border-l border-gray-200 pl-3'>
                <p className='text-base font-medium text-gray-900'>
                  Please Login!
                </p>
                <p className='mt-0.5 text-xs text-gray-500 italic'>
                  Login to your account to access favorites
                </p>
              </div>
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
