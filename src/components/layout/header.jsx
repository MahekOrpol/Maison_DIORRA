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
  const [activeMenu, setActiveMenu] = useState(null);
  // const cookieStore = await cookies();
  // const token = cookieStore.get('token')?.value;

  // const isLoggedIn = !!token;
  const pathname = usePathname();
  const messages = [
    'Welcome to our jewelry collection!',
    'Enjoy 10% off on your first purchase!'
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 40000); // 10 seconds

    return () => clearInterval(interval);
  }, []);

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
  const menuItems = [
    {
      href: '/diamonds',
      label: 'Diamonds',
      icon: <IoDiamondOutline className='h-4 w-4' />,
      content: (
        <div className='grid h-fit w-full grid-cols-4 gap-8'>
          <div className='col-span-1 p-6'>
            <h3 className='mb-4 font-semibold'>DIAMONDS BY SHAPE</h3>
            <ul className='space-y-2 font-light'>
              {['Round', 'Princess', 'Cushion', 'Emerald', 'Oval'].map(
                (shape) => (
                  <li key={shape}>
                    <Link
                      href={`/diamonds/${shape.toLowerCase()}`}
                      className='hover:underline'
                    >
                      {shape}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
          <div className='col-span-2 p-6'>
            <h3 className='mb-4 font-semibold'>DIAMONDS BY PRICE</h3>
            <ul className='space-y-2 font-light'>
              {[
                'Under $1,000',
                '$1,000 - $2,500',
                '$2,500 - $5,000',
                '$5,000 - $10,000',
                'Over $10,000'
              ].map((price) => (
                <li key={price}>
                  <Link
                    href={`/diamonds?price=${price}`}
                    className='hover:underline'
                  >
                    {price}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className='group relative w-72 overflow-hidden'>
            <Image
              src='/img/ads/add4.png'
              alt='Ad Image'
              fill
              className='h-auto w-full object-cover'
            />
          </div>
        </div>
      )
    },
    {
      href: '#',
      label: 'Fine Jewelry',
      icon: <GiGemPendant className='size-4.5 text-black' />,
      content: (
        <div className='grid h-fit w-full grid-cols-5 gap-2'>
          <div className='col-span-1 p-6'>
            <h3 className='mb-4 font-semibold'>RINGS</h3>
            <ul className='space-y-2 font-light'>
              {[
                'Wedding Bands',
                'Berminy Rings',
                'Anniversary Rings',
                'Stackable Rings',
                'Statement Rings'
              ].map((item) => (
                <li key={item}>
                  <Link
                    href={`/products/rings/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className='hover:underline'
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className='col-span-1 p-6'>
            <h3 className='mb-4 font-semibold'>EARRINGS</h3>
            <ul className='space-y-2 font-light'>
              {[
                'Diamond Earrings',
                'Drop & Dangle',
                'Huggies & Hoops',
                'Crawlers',
                'Studs'
              ].map((item) => (
                <li key={item}>
                  <Link
                    href={`/products/earrings/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className='hover:underline'
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className='col-span-1 p-6'>
            <h3 className='mb-4 font-semibold'>NECKLACES</h3>
            <ul className='space-y-2 font-light'>
              {[
                'Diamond Pendants',
                'Necklaces',
                'Chokers',
                'Lockets',
                'Statement Necklaces'
              ].map((item) => (
                <li key={item}>
                  <Link
                    href={`/products/necklaces/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className='hover:underline'
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className='col-span-1 p-6'>
            <h3 className='mb-4 font-semibold'>BRACELETS</h3>
            <ul className='space-y-2 font-light'>
              {['Bracelets', 'Bangles'].map((item) => (
                <li key={item}>
                  <Link
                    href={`/products/bracelets/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className='hover:underline'
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div class='group relative w-72 overflow-hidden'>
            <Image
              src='/img/DiamondStuds.webp'
              alt='Ad Image'
              fill
              className='h-auto w-full object-cover'
            />
          </div>
        </div>
      )
    },
    {
      href: '/products/rings/engagement-rings',
      label: 'Engagement Rings',
      icon: <Image src='/icons/ring2.svg' alt='ring2' width={16} height={16} />,
      content: (
        <div className='grid w-full grid-cols-4 gap-8'>
          <div className='col-span-1 p-6'>
            <h3 className='mb-4 font-semibold'>ENGAGEMENT RINGS</h3>
            <ul className='space-y-2 font-light'>
              {[
                'Solitaire',
                'Halo',
                'Three-Stone',
                'Vintage',
                'Modern',
                'Custom Design'
              ].map((style) => (
                <li key={style}>
                  <Link
                    href={`/products/rings/engagement-rings?style=${style.toLowerCase().replace(/\s+/g, '-')}`}
                    className='hover:underline'
                  >
                    {style}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className='col-span-1 p-6'>
            <h3 className='mb-4 font-semibold'>METAL TYPES</h3>
            <ul className='space-y-2 font-light'>
              {[
                'Platinum',
                'White Gold',
                'Yellow Gold',
                'Rose Gold',
                'Two-Tone'
              ].map((metal) => (
                <li key={metal}>
                  <Link
                    href={`/products/rings/engagement-rings?metal=${metal.toLowerCase().replace(/\s+/g, '-')}`}
                    className='hover:underline'
                  >
                    {metal}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className='col-span-1 p-6'>
            <h3 className='mb-4 font-semibold'>SHOP BY COLLECTION</h3>
            <ul className='space-y-2 font-light'>
              {[
                'Classic',
                'Bridal',
                'Art Deco',
                'Nature Inspired',
                'Minimalist'
              ].map((collection) => (
                <li key={collection}>
                  <Link
                    href={`/products/rings/engagement-rings/collections/${collection.toLowerCase().replace(/\s+/g, '-')}`}
                    className='hover:underline'
                  >
                    {collection}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className='group relative w-72 overflow-hidden'>
            <Image
              src='/img/ads/add4.png'
              alt='Ad Image'
              fill
              className='h-auto w-full object-cover'
            />
          </div>
        </div>
      )
    },
    {
      href: '/custom-jewelry',
      label: 'Custom Jewelry',
      icon: (
        <Image
          src='/icons/necklace.svg'
          alt='necklace'
          width={16}
          height={16}
        />
      ),
      content: (
        <div className='grid h-fit w-full grid-cols-4 gap-8'>
          <div className='col-span-1 p-6'>
            <h3 className='mb-4 font-semibold'>CUSTOM JEWELRY</h3>
            <ul className='space-y-2 font-light'>
              {[
                'Design Your Own Ring',
                'Custom Engagement Rings',
                'Custom Pendants',
                'Family Heirlooms',
                'Replica Services'
              ].map((service) => (
                <li key={service}>
                  <Link
                    href={`/custom-jewelry/${service.toLowerCase().replace(/\s+/g, '-')}`}
                    className='hover:underline'
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className='col-span-2 p-6'>
            <h3 className='mb-4 font-semibold'>THE PROCESS</h3>
            <ul className='space-y-2 font-light'>
              {[
                'Consultation',
                'Design',
                '3D Rendering',
                'Production',
                'Final Approval'
              ].map((step) => (
                <li key={step}>
                  <Link
                    href='/custom-jewelry#process'
                    className='hover:underline'
                  >
                    {step}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div class='group relative w-72 overflow-hidden'>
            <Image
              src='/img/DiamondStuds.webp'
              alt='Ad Image'
              fill
              className='h-auto w-full object-cover'
            />
          </div>
        </div>
      )
    },
    {
      href: '/education',
      label: 'Education',
      icon: (
        <Image
          src='/icons/education.svg'
          alt='education'
          width={16}
          height={16}
        />
      ),
      content: (
        <div className='grid h-fit w-full grid-cols-4 gap-8'>
          <div className='col-span-1 p-6'>
            <h3 className='mb-4 font-semibold'>DIAMOND EDUCATION</h3>
            <ul className='space-y-2 font-light'>
              {[
                'The 4 Cs',
                'Diamond Shapes',
                'Certifications',
                'Fluorescence',
                'Conflict-Free Diamonds'
              ].map((topic) => (
                <li key={topic}>
                  <Link
                    href={`/education/diamonds/${topic.toLowerCase().replace(/\s+/g, '-')}`}
                    className='hover:underline'
                  >
                    {topic}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className='col-span-2 p-6'>
            <h3 className='mb-4 font-semibold'>JEWELRY CARE</h3>
            <ul className='space-y-2 font-light'>
              {[
                'Cleaning Guide',
                'Storage Tips',
                'Maintenance',
                'Insurance',
                'Appraisals'
              ].map((topic) => (
                <li key={topic}>
                  <Link
                    href={`/education/care/${topic.toLowerCase().replace(/\s+/g, '-')}`}
                    className='hover:underline'
                  >
                    {topic}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className='group relative w-72 overflow-hidden'>
            <Image
              src='/img/ads/add4.png'
              alt='Ad Image'
              fill
              className='h-auto w-full object-cover'
            />
          </div>
        </div>
      )
    }
  ];

  return (
    <>
      <div
        className={`fixed top-0 left-0 z-50 w-full transition-transform duration-200 ease-in ${
          showHeader ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <header className='bg-background text-foreground shadow-xs'>
          {/* banner */}
          <div className='bg-primary relative h-10 overflow-hidden py-2 text-center tracking-wider text-white'>
            <div className='animate-fade absolute w-full opacity-100 transition-opacity duration-1000 ease-in-out'>
              <p key={index} className='text-sm md:text-base'>
                {messages[index]}
              </p>
            </div>
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
          {/* desktop nav */}
          <nav className='wrapper hidden justify-center gap-3 border-t border-gray-100 text-lg font-light lg:flex'>
            {menuItems.map((item, index) => (
              <div
                key={index}
                className='relative'
                onMouseEnter={() => setActiveMenu(item.label)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    'relative flex items-center gap-0.5 px-2 py-1',
                    'after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-center after:scale-x-0 after:content-[""]',
                    'after:bg-black after:transition-transform after:duration-300',
                    activeMenu === item.label && 'font-normal after:scale-x-95'
                  )}
                >
                  {item.icon}
                  {item.label}
                </Link>
              </div>
            ))}
          </nav>

          {/* Mega Menu Dropdown */}
          {activeMenu && (
            <div
              className='wrapper absolute right-0 left-0 z-50 border-t border-gray-100 bg-white shadow-lg'
              onMouseEnter={() => setActiveMenu(activeMenu)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <div className='mx-auto max-w-7xl'>
                {menuItems.find((item) => item.label === activeMenu)?.content}
              </div>
            </div>
          )}
        </header>
      </div>
      {activeMenu && (
        <div
          className='fixed inset-0 z-30 bg-black/40 backdrop-blur-xs'
          onClick={() => setActiveMenu(null)} // Optional: close on click
        />
      )}
      <NotAllowedModal open={showNotAllowed} onOpenChange={setShowNotAllowed} />
      <AddToCartNotAllowedModal
        open={showCartDialog}
        onOpenChange={setShowCartDialog}
      />
    </>
  );
}

// anjalis, mega menu
{
  /* <div
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
          </div> */
}
