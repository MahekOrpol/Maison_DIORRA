import { Heart, MapPin, Search, UserRound } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { IoDiamondOutline } from 'react-icons/io5';
import { BsHandbag } from 'react-icons/bs';
import { Input } from '../ui/input';

export default function Header() {
  return (
    <header className=''>
      <div className='bg-primary py-2 text-center tracking-wider text-white md:py-1'>
        <p className='container text-sm leading-4 md:hidden'>
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
      <div className='relative container flex items-center justify-between py-2'>
        <button className='lg:hidden'>
          <Image
            src='/icons/menu.svg'
            alt='logo'
            width={40}
            height={40}
            className='h-[40px] w-[40px]'
          />
        </button>
        <div className='relative hidden items-center gap-3 lg:flex'>
          <button className='rounded-full p-2 hover:bg-gray-200'>
            <MapPin className='h-5 w-5' />
          </button>

          <div className='relative w-full'>
            <Search className='absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform' />
            <Input
              type='text'
              placeholder='Search...'
              className='w-full rounded-md border-0 py-2 pr-4 pl-10 shadow-none focus:ring-2 focus:outline-none'
            />
          </div>
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
          <button className='hidden cursor-pointer items-center gap-1 lg:flex'>
            <UserRound />
            <div className='text-left'>
              <p className='text-muted-foreground text-xs leading-2'>Sign In</p>
              <p>Account</p>
            </div>
          </button>
          <button className='relative'>
            <Heart strokeWidth={1.2} size={30} />
            <span className='text-background absolute top-0 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-xs'>
              8
            </span>
          </button>
          <button className='relative'>
            <BsHandbag size={26} />
            <span className='text-background absolute top-0 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-xs'>
              2
            </span>
          </button>
        </div>
      </div>
      <hr />
      <nav className='container hidden justify-center gap-6 py-2 text-lg font-medium lg:flex'>
        <Link href={'#'} className='flex items-center gap-1'>
          <IoDiamondOutline /> Diamonds
        </Link>
        <Link href={'#'} className='flex items-center gap-1'>
          <Image
            src='/icons/ring1.svg'
            alt='logo'
            width={20}
            height={20}
            className='h-[20px] w-[20px]'
          />{' '}
          Fine Jewelry
        </Link>
        <Link href={'#'} className='flex items-center gap-1'>
          <Image
            src='/icons/ring2.svg'
            alt='logo'
            width={20}
            height={20}
            className='h-[20px] w-[20px]'
          />{' '}
          Engagement Rings
        </Link>
        <Link href={'#'} className='flex items-center gap-1'>
          <Image
            src='/icons/gift.svg'
            alt='logo'
            width={20}
            height={20}
            className='h-[20px] w-[20px]'
          />{' '}
          Gifting Guide
        </Link>
        <Link href={'#'} className='flex items-center gap-1'>
          <Image
            src='/icons/necklace.svg'
            alt='logo'
            width={20}
            height={20}
            className='h-[20px] w-[20px]'
          />{' '}
          Custome Jewelry
        </Link>
      </nav>
    </header>
  );
}
