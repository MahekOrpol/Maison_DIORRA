'use client';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'nextjs-toploader/app';
import { useRef, useState } from 'react';

import {
  X,
  Home,
  Diamond,
  BookOpen,
  User,
  ShoppingBag,
  LogIn,
  Gift,
  Gem,
  Search,
  Phone,
  Book
} from 'lucide-react';
import { GiGemPendant } from 'react-icons/gi';

export default function MobileNavDrawer() {
  const [searchValue, setSearchValue] = useState('');
  const drawerCloseRef = useRef(null);
  const router = useRouter();

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      const query = searchValue.trim();
      if (!query || query.length < 2) return;

      router.push('/products?query=' + encodeURIComponent(query));
      setSearchValue('');
      if (drawerCloseRef.current) {
        drawerCloseRef.current.click(); // Trigger drawer close
      }
    }
  };

  return (
    <Drawer direction='left' repositionInputs={false}>
      <DrawerTrigger asChild>
        <Button variant='ghost' size='icon' className='lg:hidden'>
          <Image
            src='/icons/menu.svg'
            alt='Menu'
            width={40}
            height={40}
            className='h-[40px] w-[40px]'
            priority
          />
        </Button>
      </DrawerTrigger>
      <DrawerClose ref={drawerCloseRef} className='hidden' />

      <DrawerContent className='flex flex-col p-0 data-[vaul-drawer-direction=left]:w-[85%]'>
        <DrawerTitle className='sr-only'>Mobile side nav bar</DrawerTitle>

        {/* TOP SECTION */}
        <div className='flex items-center justify-between bg-black px-4 py-1'>
          <DrawerClose asChild>
            <Link href='/' className='mx-auto'>
              <Image
                src='/icons/diorra-logo.png'
                height={63}
                width={160}
                alt='Company logo'
                priority
                className='mx-auto h-[58px] object-cover invert-100'
              />
            </Link>
          </DrawerClose>
          <DrawerClose className='flex h-7 w-7 items-center justify-center rounded-full bg-gray-700 text-white transition hover:bg-gray-600'>
            <X size={18} />
          </DrawerClose>
        </div>

        {/* CONTENT SECTION */}
        <div className='flex-1 overflow-y-auto bg-white px-4 py-2 text-black'>
          {/* Search */}
          <div className='relative mb-4 w-full'>
            <Search className='absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-500' />
            <Input
              type='text'
              placeholder='Search products...'
              className='h-10 w-full rounded-full border border-gray-300 pr-4 pl-10 shadow-none focus:ring-1'
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>

          {/* Navigation Sections */}
          <nav className='space-y-3'>
            <DrawerSection title='Main'>
              <DrawerNavLink
                href='/'
                icon={<Home size={18} strokeWidth={1.5} />}
              >
                Home
              </DrawerNavLink>
              <DrawerNavLink
                href='/diamonds'
                icon={<Gem size={18} strokeWidth={1.5} />}
              >
                Diamonds
              </DrawerNavLink>
              <DrawerNavLink
                href='/products'
                icon={<GiGemPendant className='size-4.5' strokeWidth={1} />}
              >
                Fine Jewelry
              </DrawerNavLink>
              <DrawerNavLink
                href='/products'
                icon={
                  <Image
                    src='/icons/ring2.svg'
                    alt='ring2'
                    width={18}
                    height={18}
                  />
                }
              >
                Engagement Rings
              </DrawerNavLink>
              <DrawerNavLink
                href='/gifting'
                icon={
                  <Image
                    src='/icons/gift.svg'
                    alt='gift'
                    width={18}
                    height={18}
                  />
                }
              >
                Gifting Guide
              </DrawerNavLink>
              <DrawerNavLink
                href='/custom-jewelry'
                icon={
                  <Image
                    src='/icons/necklace.svg'
                    alt='necklace'
                    width={18}
                    height={18}
                  />
                }
              >
                Custom Jewelry
              </DrawerNavLink>
            </DrawerSection>

            <hr className='my-2' />

            <DrawerSection title='Explore'>
              <DrawerNavLink href='/blogs' icon={<Book size={18} />}>
                Blogs
              </DrawerNavLink>
              <DrawerNavLink
                href='/education'
                icon={
                  <Image
                    src='/icons/education.svg'
                    alt='education'
                    width={18}
                    height={18}
                  />
                }
              >
                Education
              </DrawerNavLink>
            </DrawerSection>

            <hr className='my-2' />

            <DrawerSection title='Account'>
              <DrawerNavLink href='/account' icon={<User size={18} />}>
                My Profile
              </DrawerNavLink>
              <DrawerNavLink
                href='/account/orders'
                icon={<ShoppingBag size={18} />}
              >
                My Orders
              </DrawerNavLink>
            </DrawerSection>

            <hr className='my-2' />

            <DrawerSection title='Support'>
              <DrawerNavLink href='/contact' icon={<Phone size={18} />}>
                Contact Us
              </DrawerNavLink>
            </DrawerSection>
          </nav>
        </div>

        {/* BOTTOM SECTION */}
        <div className='bg-primary text-primary-foreground px-4 py-1.5'>
          <DrawerClose asChild>
            <Link href='/login'>
              <Button
                variant='ghost'
                className='w-full justify-start gap-2 text-white hover:bg-gray-800'
              >
                <LogIn size={18} />
                Login / Sign Up
              </Button>
            </Link>
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function DrawerNavLink({ href, icon, children }) {
  return (
    <DrawerClose asChild>
      <Link
        href={href}
        className='flex items-center gap-2 rounded-md p-1 transition hover:bg-gray-100'
      >
        {icon}
        {children}
      </Link>
    </DrawerClose>
  );
}

function DrawerSection({ title, children }) {
  return (
    <div className=''>
      <h4 className='text-xs font-medium text-gray-500 uppercase'>{title}</h4>
      <div className='flex flex-col'>{children}</div>
    </div>
  );
}
