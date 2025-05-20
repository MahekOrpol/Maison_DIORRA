'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { logoutUser } from '@/app/actions/authAction';
import { UserRound } from 'lucide-react';
import { CiLogin } from 'react-icons/ci';
import { CiLogout } from 'react-icons/ci';
import { MdOutlineAccountBox } from 'react-icons/md';
import { toast } from 'sonner';
import { useUserStore } from '@/store/user-store';
import { useWishlistStore } from '@/store/wishlist-store';

export function AccountDropdown() {
  const { authUser, hydrateUser, clearUser, isLoggedIn } = useUserStore(
    (state) => state
  );
  const { fetchWishlist } = useWishlistStore((state) => state);
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
      router.push('/login');
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Logout failed. Please try again.');
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className='hidden w-[120px] lg:inline-flex' asChild>
        <button className='flex items-center gap-1 outline-none'>
          <UserRound />
          <div className='text-left'>
            <p className='text-muted-foreground text-xs leading-2'>
              {isLoggedIn ? 'Welcome back' : 'Login'}
            </p>
            <p className='hover:text-muted-foreground'>
              {isLoggedIn ? authUser?.name : 'Account'}
            </p>
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='mt-2 w-48'>
        {!isLoggedIn ? (
          <>
            <DropdownMenuItem asChild>
              <Link href='/login'>
                {' '}
                <CiLogin className='' />
                Sign In
              </Link>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            {/* for testing purpose */}
            <DropdownMenuItem asChild>
              <Link href='/account'>
                <MdOutlineAccountBox className='' />
                My Account
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <button className='w-full text-left' onClick={handleLogout}>
                <CiLogout /> Logout
              </button>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
