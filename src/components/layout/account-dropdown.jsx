'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
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
import { FaWpforms } from 'react-icons/fa6';
import { MdOutlineAccountBox } from 'react-icons/md';
import { toast } from 'sonner';

export function AccountDropdown({ user, setUser }) {
  const pathname = usePathname(); // Optional: closes dropdown on route change
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const isLoggedIn = !!user;

  // console.log(isLoggedIn);
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      // Call your logout API
      await logoutUser();

      // Clear client-side storage
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('authUser');
      // Update state
      if (setUser) setUser(null);

      // Redirect and refresh
     window.location.href = '/';

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
              {isLoggedIn ? user?.name : 'Account'}
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
