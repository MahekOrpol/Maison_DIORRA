'use client';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import {
  X,
  Home,
  Diamond,
  BookOpen,
  User,
  ShoppingBag,
  LogIn,
  LogOut,
  Gift,
  Gem,
  Search,
  Phone,
  Book
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function MobileNavDrawer() {
  const [open, setOpen] = useState(false);

  const handleNavClick = () => {
    setOpen(false);
  };
  return (
    <Drawer open={open} onOpenChange={setOpen} direction='left'>
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

      <DrawerContent className='flex w-[90%] max-w-xs flex-col p-0 data-[vaul-drawer-direction=left]:border-r-0'>
        <DrawerTitle className='sr-only'>Mobile side nav bar</DrawerTitle>
        {/* TOP BLACK SECTION */}
        <div className='flex items-center justify-between bg-black px-4 py-1'>
          <Link href='/' className='mx-auto' onClick={handleNavClick}>
            <Image
              src='/icons/diorra-logo.png'
              height={80}
              width={160}
              alt='Company logo'
              className='mx-auto invert-100 lg:mx-0'
            />
          </Link>
          <DrawerClose className='flex h-7 w-7 items-center justify-center rounded-full bg-gray-700 text-white transition hover:bg-gray-600'>
            <X size={18} />
          </DrawerClose>
        </div>

        {/* MIDDLE WHITE SECTION */}
        <div className='flex-1 overflow-y-auto bg-white py-2 pl-4 text-black'>
          {/* Search */}
          <div className='relative mb-4 w-full'>
            <Search className='absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-500' />
            <Input
              type='text'
              placeholder='Search...'
              className='w-full rounded-md border border-gray-300 py-2 pr-4 pl-10 shadow-none focus:ring-1'
            />
          </div>

          {/* Navigation Sections */}
          <nav className='space-y-3'>
            <DrawerSection title='Main'>
              <DrawerLink
                href='/'
                icon={<Home size={18} />}
                onClick={handleNavClick}
              >
                Home
              </DrawerLink>
              <DrawerLink
                href='/diamonds'
                icon={<Diamond size={18} />}
                onClick={handleNavClick}
              >
                Diamonds
              </DrawerLink>
              <DrawerLink
                href='/products'
                icon={<Gem size={18} />}
                onClick={handleNavClick}
              >
                Fine Jewelry
              </DrawerLink>
              <DrawerLink
                href='/products'
                icon={<Gem size={18} />}
                onClick={handleNavClick}
              >
                Engagement Rings
              </DrawerLink>
              <DrawerLink
                href='/gifting'
                icon={<Gift size={18} />}
                onClick={handleNavClick}
              >
                Gifting Guide
              </DrawerLink>
              <DrawerLink
                href='/custom-jewelry'
                icon={<Gem size={18} />}
                onClick={handleNavClick}
              >
                Custom Jewelry
              </DrawerLink>
            </DrawerSection>
            <hr className='my-1' />
            <DrawerSection title='Explore'>
              <DrawerLink
                href='/blogs'
                icon={<BookOpen size={18} />}
                onClick={handleNavClick}
              >
                Blogs
              </DrawerLink>
              <DrawerLink
                href='/education'
                icon={<Book size={18} />}
                onClick={handleNavClick}
              >
                Education
              </DrawerLink>
            </DrawerSection>
            <hr />
            <DrawerSection title='Account'>
              <DrawerLink
                href='/account'
                icon={<User size={18} />}
                onClick={handleNavClick}
              >
                My Profile
              </DrawerLink>
              <DrawerLink
                href='/account/orders'
                icon={<ShoppingBag size={18} />}
                onClick={handleNavClick}
              >
                My Orders
              </DrawerLink>
            </DrawerSection>
            <hr />
            <DrawerSection title='Support'>
              <DrawerLink
                href='/contact'
                icon={<Phone size={18} />}
                onClick={handleNavClick}
              >
                Contact Us
              </DrawerLink>
            </DrawerSection>
          </nav>

          {/* Newsletter */}
          <div className='bg-secondary mt-2 border-t p-2'>
            <h4 className='mb-2 text-sm font-semibold'>Join Our Newsletter</h4>
            <p className='mb-2 text-xs text-gray-500'>
              Get exclusive offers, new arrivals & tips
            </p>
            <div className='flex items-center gap-2'>
              <Input placeholder='Enter email' className='flex-1 bg-white' />
              <Button size='sm'>Join</Button>
            </div>
          </div>
        </div>

        {/* BOTTOM BLACK SECTION */}
        <div className='bg-black px-4 py-1'>
          <Link href='/sign-in'>
            <Button
              variant='ghost'
              className='w-full justify-start gap-2 text-white hover:bg-gray-800'
              onClick={handleNavClick}
            >
              <LogIn size={18} />
              Login / Sign Up
            </Button>
          </Link>
          {/* 
          <Button variant='ghost' className='w-full justify-start gap-2 text-white hover:bg-gray-800'>
            <LogOut size={18} />
            Logout
          </Button> 
          */}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function DrawerLink({ href, icon, children, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className='flex items-center gap-2 transition hover:text-black'
    >
      {icon}
      {children}
    </Link>
  );
}

function DrawerSection({ title, children }) {
  return (
    <div className='space-y-1'>
      <h4 className='text-xs font-medium text-gray-500 uppercase'>{title}</h4>
      <div className='flex flex-col gap-1'>{children}</div>
    </div>
  );
}
