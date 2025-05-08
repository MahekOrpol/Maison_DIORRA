'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
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
import { AiOutlineUnorderedList } from 'react-icons/ai';

export function AccountDropdown({ isLoggedIn }) {
  const pathname = usePathname(); // Optional: closes dropdown on route change
  const [open, setOpen] = useState(false);
  const router = useRouter();

  console.log(isLoggedIn);
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await logoutUser();
    router.push('/');
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
              {isLoggedIn ? 'Jhon Doe' : 'Account'}
            </p>
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='mt-2 w-48'>
        {!isLoggedIn ? (
          <>
            <DropdownMenuItem asChild>
              <Link href='/sign-in'>
                {' '}
                <CiLogin className='' />
                Sign In
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href='/sign-up'>
                {' '}
                <FaWpforms />
                Create Account
              </Link>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            {/* for testing purpose */}
            <DropdownMenuItem asChild>
              <Link href='/login'>
                {' '}
                <CiLogin className='' />
                Sign In
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href='/account'>
                <MdOutlineAccountBox className='' />
                My Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href='/account/orders'>
                {' '}
                <AiOutlineUnorderedList />
                My Orders
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
