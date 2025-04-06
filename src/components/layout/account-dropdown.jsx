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

export function AccountDropdown({ isLoggedIn }) {
  const pathname = usePathname(); // Optional: closes dropdown on route change
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await logoutUser();
    router.push('/');
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className='hidden w-[110px] md:inline-block' asChild>
        <button className='items-center gap-1 outline-none lg:flex'>
          <UserRound />
          <div className='text-left'>
            <p className='text-muted-foreground text-xs leading-2'>
              {isLoggedIn ? 'Welcome back' : 'Sign In'}
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
              <Link href='/sign-in'>Sign In</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href='/sign-up'>Create Account</Link>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem asChild>
              <Link href='/account'>My Account</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href='/orders'>My Orders</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <button className='w-full text-left' onClick={handleLogout}>
                Logout
              </button>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
