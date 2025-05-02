'use client';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { IoDiamondOutline } from 'react-icons/io5';
import { BsHandbag } from 'react-icons/bs';
import MobileNavDrawer from './mobile-nav';
import { AccountDropdown } from './account-dropdown';
import LocateAndSearch from './locate-search';
import { useState, useEffect } from 'react';
import { NotAllowedModal } from '../modals/na-wishlist';
import { AddToCartNotAllowedModal } from '../modals/na-addtocart';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { GiGemPendant } from 'react-icons/gi';

export default function Header() {
  const [showNotAllowed, setShowNotAllowed] = useState(false);
  const [showCartDialog, setShowCartDialog] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showFineJewelryMenu, setShowFineJewelryMenu] = useState(false);
  // const cookieStore = await cookies();
  // const token = cookieStore.get('token')?.value;

  // const isLoggedIn = !!token;
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowHeader(false); // scroll down
      } else {
        setShowHeader(true); // scroll up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleWishlistClick = () => {
    // If not logged in
    setShowNotAllowed(true);
  };
  const handleAddToCart = () => {
    setShowCartDialog(true);
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 z-50 w-full transition-transform duration-200 ${showHeader ? 'translate-y-0' : '-translate-y-full'
          }`}
      >
        <header className='bg-background text-foreground shadow-xs'>
          {/* banner */}
          <div className='bg-primary py-2 text-center tracking-wider text-white md:py-1'>
            {/* <p className='wrapper text-sm leading-4 md:hidden'>
          Shop Gold and Diamond Jewellery
        </p> */}
            <p className='text-xs leading-4 md:text-sm'>
              THE ESSENSTIALS |{' '}
              <span className='font-semibold md:text-base'>
                UPTO 40% OFF<sup>* </sup>
              </span>
              Ends in April
            </p>
          </div>
          {/* header */}
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
                  height={80}
                  className=''
                  priority
                />
              </Link>
            </div>
            <div className='flex gap-0.5 min-[340px]:gap-1.5 md:gap-4'>
              <AccountDropdown isLoggedIn={true} />
              {/* Wishlist Link */}
              <button
                className='relative rounded-full p-1 transition-all duration-200 hover:scale-110 hover:bg-gray-100'
                onClick={handleWishlistClick}
              >
                <Heart strokeWidth={1.2} size={28} />
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

          {/* web nav */}
          <nav className='wrapper hidden justify-center gap-3 py-1.5 text-lg md:py-2 lg:flex'>
            {[
              {
                href: '/diamonds',
                label: 'Diamonds',
                icon: <IoDiamondOutline className='h-5 w-5' />
              },
              {
                href: '/products',
                label: 'Fine Jewelry',
                icon: <GiGemPendant className='size-5 text-black' />,
                onMouseEnter: () => setShowFineJewelryMenu(true),
                onMouseLeave: () => setShowFineJewelryMenu(false),
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
                    className='h-[20px] w-[20px]'
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
                    className='h-[20px] w-[20px]'
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
                    className='h-[20px] w-[20px]'
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
                    className='h-[20px] w-[20px]'
                  />
                )
              }
            ].map((item, index) => (
              // show underline when active page
              <Link
                key={index}
                href={item.href}
                onMouseEnter={() => {
                  if (item.label === 'Fine Jewelry') setShowFineJewelryMenu(true);
                }}
                onMouseLeave={() => {
                  if (item.label === 'Fine Jewelry') setShowFineJewelryMenu(false);
                }}
                className={cn(
                  'flex items-center gap-0.5 px-2 underline-offset-8 transition-all duration-400 hover:underline decoration-2',
                  pathname === item.href && 'underline'
                )}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>
        </header>
        {showFineJewelryMenu && (
          <div
            className="wrapper gap-[5%] p-2 3xl:p-6 absolute top-full z-40 w-full bg-white shadow-md border-t px-[4%] 3xl:px-[12%] grid grid-cols-5 text-sm"
            onMouseEnter={() => setShowFineJewelryMenu(true)}
          >
            <div className='border-r py-10'>
              <p className='font-semibold mb-2 text-lg'>Rings</p>
              <ul className='space-y-1'>
                <li>Wedding Bands</li>
                <li>Eternity Rings</li>
                <li>Anniversary Rings</li>
              </ul>
            </div>
            <div className='border-r py-10'>
              <p className='font-semibold mb-2 text-lg'>Earrings</p>
              <ul className='space-y-1'>
                <li>Diamond Earrings</li>
                <li>Drop & Dangle</li>
                <li>Huggies & Hoops</li>
                <li>Crawlers</li>
              </ul>
            </div>
            <div className='border-r py-10'>
              <p className='font-semibold mb-2 text-lg'>Necklaces</p>
              <ul className='space-y-1'>
                <li>Diamond Pendants</li>
                <li>Necklaces</li>
              </ul>
            </div>
            <div className='py-10'>
              <p className='font-semibold mb-2 text-lg'>Bracelets</p>
              <ul className='space-y-1'>
                <li>Tennis</li>
                <li>Bangles</li>
              </ul>
            </div>
            <div>
              <img src='img/headerimg.webp' className='h-full' />
            </div>
          </div>
        )}
      </div>
      <NotAllowedModal open={showNotAllowed} onOpenChange={setShowNotAllowed} />
      <AddToCartNotAllowedModal
        open={showCartDialog}
        onOpenChange={setShowCartDialog}
      />
    </>
  );
}
