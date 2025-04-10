import { Heart, UserRound } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { IoDiamondOutline } from 'react-icons/io5';
import { BsHandbag } from 'react-icons/bs';
import MobileNavDrawer from './moblie-nav';
import { cookies } from 'next/headers';
import { AccountDropdown } from './account-dropdown';
import LocateAndSearch from './locate-search';

export default async function Header() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  const isLoggedIn = !!token;

  return (
    <header className=''>
      <div className='bg-primary py-2 text-center tracking-wider text-white md:py-1'>
        <p className='wrapper text-sm leading-4 md:hidden'>
          Shop Gold and Diamond Jewellery
        </p>
        <p className='hidden text-base md:block'>
          THE ESSENSTIALS |{' '}
          <span className='text-lg font-semibold'>
            UPTO 40% OFF<sup>* </sup>
          </span>
          Ends in April
        </p>
      </div>
      <div className='wrapper relative flex items-center justify-between py-2'>
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

        <div className='flex gap-3 md:gap-6'>
          <AccountDropdown isLoggedIn={isLoggedIn} />
          {/* Wishlist Link */}
          <Link
            href='/account/wishlist'
            className='relative rounded-full p-1 transition-all duration-200 hover:scale-110 hover:bg-gray-100'
          >
            <Heart strokeWidth={1.2} size={30} />
            <span className='text-background absolute top-0 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-xs'>
              8
            </span>
          </Link>

          <Link
            href='/checkout'
            className='relative rounded-full p-1 transition-all duration-200 hover:scale-110 hover:bg-gray-100'
          >
            <BsHandbag size={26} />
            <span className='text-background absolute top-0 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-xs'>
              2
            </span>
          </Link>
        </div>
      </div>
      <hr />
      <nav className='wrapper hidden justify-center gap-6 py-2 text-lg lg:flex'>
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
                src='/icons/necklace.svg'
                alt='necklace'
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
  );
}
