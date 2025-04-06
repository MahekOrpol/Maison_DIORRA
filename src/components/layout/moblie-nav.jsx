'use client';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function MobileNavDrawer() {
  return (
    <Drawer direction='left'>
      <DrawerTrigger asChild>
        <Button variant='ghost' size='icon' className='lg:hidden'>
          <Image
            src='/icons/menu.svg'
            alt='logo'
            width={40}
            height={40}
            className='h-[40px] w-[40px]'
          />
        </Button>
      </DrawerTrigger>

      <DrawerContent className='flex w-3/4 max-w-xs flex-col gap-4 bg-white px-6 py-4'>
        <DrawerTitle className='sr-only'>Navigation</DrawerTitle>
        <DrawerClose className='ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-[#D9D9D9] text-gray-600 transition hover:bg-gray-300'>
          <X size={20} />
        </DrawerClose>
        <nav className='mt-8 flex flex-col gap-4'>
          <Link href='/' className='text-lg font-medium hover:underline'>
            Home
          </Link>
          <Link
            href='/products'
            className='text-lg font-medium hover:underline'
          >
            Products
          </Link>
          <Link href='/blogs' className='text-lg font-medium hover:underline'>
            Blogs
          </Link>
          <Link href='/about' className='text-lg font-medium hover:underline'>
            About
          </Link>
          <Link href='/contact' className='text-lg font-medium hover:underline'>
            Contact
          </Link>
          <Link href='/login' className='text-lg font-medium hover:underline'>
            Login
          </Link>
        </nav>
      </DrawerContent>
    </Drawer>
  );
}
