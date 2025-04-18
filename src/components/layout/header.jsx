'use client';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { IoDiamondOutline } from 'react-icons/io5';
import { BsHandbag } from 'react-icons/bs';
import MobileNavDrawer from './mobile-nav';
import { AccountDropdown } from './account-dropdown';
import LocateAndSearch from './locate-search';
import { useState } from 'react';
import { NotAllowedModal } from '../modals/na-wishlist';
import { AddToCartNotAllowedModal } from '../modals/na-addtocart';

export default function Header() {
  const [showNotAllowed, setShowNotAllowed] = useState(false);
  const [showCartDialog, setShowCartDialog] = useState(false);
  // const cookieStore = await cookies();
  // const token = cookieStore.get('token')?.value;

  // const isLoggedIn = !!token;

  const handleWishlistClick = () => {
    // If not logged in
    setShowNotAllowed(true);
  };
  const handleAddToCart = () => {
    setShowCartDialog(true);
  };

  return (
    <>
      <header className=''>
        <div className='bg-primary py-2 text-center tracking-wider text-white md:py-1'>
          {/* <p className='wrapper text-sm leading-4 md:hidden'>
          Shop Gold and Diamond Jewellery
        </p> */}
          <p className='text-xs leading-4 md:text-base'>
            THE ESSENSTIALS |{' '}
            <span className='font-semibold md:text-lg'>
              UPTO 40% OFF<sup>* </sup>
            </span>
            Ends in April
          </p>
        </div>
        <div className='header-wrapper relative flex items-center justify-between py-2'>
          <MobileNavDrawer />
          <div className='relative hidden items-center gap-3 lg:flex'>
            <LocateAndSearch />
          </div>

          <div className='absolute inset-0 z-10 mx-auto w-fit'>
            <Link href={'/'}>
              <Image
                src='/icons/diorra-logo.png'
                alt='logo'
                width={150}
                height={40}
                className=''
              />
            </Link>
          </div>

          <div className='flex gap-3 md:gap-4'>
            <AccountDropdown isLoggedIn={true} />
            {/* Wishlist Link */}
            <button
              className='relative rounded-full p-1 transition-all duration-200 hover:scale-110 hover:bg-gray-100'
              onClick={handleWishlistClick}
            >
              <Heart strokeWidth={1.2} size={30} />
              <span className='text-background absolute top-0 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-xs'>
                8
              </span>
            </button>
            <button
              onClick={handleAddToCart}
              className='relative rounded-full p-1 transition-all duration-200 hover:scale-110 hover:bg-gray-100'
            >
              <BsHandbag size={26} />
              <span className='text-background absolute top-0 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-xs'>
                2
              </span>
            </button>
          </div>
        </div>
        <hr />
        <nav className='wrapper hidden justify-center gap-5 py-2 text-lg lg:flex'>
          {[
            {
              href: '/diamonds',
              label: 'Diamonds',
              icon: (
                <IoDiamondOutline className='h-5 w-5 text-gray-700 transition-colors group-hover:text-black' />
              )
            },
            {
              href: '/products',
              label: 'Fine Jewelry',
              icon: (
                <Image
                  src='/icons/ring1.svg'
                  alt='ring'
                  width={20}
                  height={20}
                  className='h-[20px] w-[20px] transition-transform group-hover:scale-110'
                />
              )
            },
            {
              href: '/products',
              label: 'Engagement Rings',
              icon: (
                <Image
                  src='/icons/ring2.svg'
                  alt='ring2'
                  width={20}
                  height={20}
                  className='h-[20px] w-[20px] transition-transform group-hover:scale-110'
                />
              )
            },
            {
              href: '/gifting',
              label: 'Gifting Guide',
              icon: (
                <Image
                  src='/icons/gift.svg'
                  alt='gift'
                  width={20}
                  height={20}
                  className='h-[20px] w-[20px] transition-transform group-hover:scale-110'
                />
              )
            },
            {
              href: '/custom-jewelry',
              label: 'Custom Jewelry',
              icon: (
                <Image
                  src='/icons/necklace.svg'
                  alt='necklace'
                  width={20}
                  height={20}
                  className='h-[20px] w-[20px] transition-transform group-hover:scale-110'
                />
              )
            },
            {
              href: '/education',
              label: 'Education',
              icon: (
                <Image
                  src='/icons/education.svg'
                  alt='education'
                  width={20}
                  height={20}
                  className='h-[20px] w-[20px] transition-transform group-hover:scale-110'
                />
              )
            }
          ].map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className='group flex items-center gap-1 underline-offset-4 transition-all duration-200 hover:font-medium hover:underline'
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      <NotAllowedModal open={showNotAllowed} onOpenChange={setShowNotAllowed} />
      <AddToCartNotAllowedModal
        open={showCartDialog}
        onOpenChange={setShowCartDialog}
      />
    </>
  );
}
