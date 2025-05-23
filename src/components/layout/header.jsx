'use client';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { IoDiamondOutline } from 'react-icons/io5';
import { BsHandbag } from 'react-icons/bs';
import MobileNavDrawer from './mobile-nav';
import { AccountDropdown } from './account-dropdown';
import LocateAndSearch from './locate-search';
import { useState, useEffect, use } from 'react';
import { baseApiUrl, cn } from '@/lib/utils';
import { GiGemPendant } from 'react-icons/gi';
import { useModalStore } from '@/store/modal-stote';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/user-store';
import { useWishlistStore } from '@/store/wishlist-store';
const messages = [
  'Welcome to our jewelry collection!',
  'Enjoy 10% off on your first purchase!',
  'THE ESSENTIALS | UP TO 40% OFF* Ends in April'
];

export default function Header({ categories, DiamondShapes, availableStyles }) {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeMenu, setActiveMenu] = useState(null);
  const [index, setIndex] = useState(0);
  const openModal = useModalStore((state) => state.openModal);
  const { isLoggedIn, authUser } = useUserStore((state) => state);
  const wishlistCount = useWishlistStore((state) => state.wishlist.length);
  const router = useRouter();

  // const router = useRouter();
  // const cookieStore = await cookies();
  // const token = cookieStore.get('token')?.value;
  // const isLoggedIn = !!token;

  useEffect(() => {
    //banner interval
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 4000);

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
    if (isLoggedIn) {
      router.push('/account/wishlist');
    } else {
      openModal('wishlistNotAllowed');
    }
  };

  const handleAddToCart = () => {
    if (isLoggedIn) {
      router.push('/checkout');
    } else {
      openModal('cartNotAllowed');
    }
  };

  const ringStyless = [
    { name: 'Solitaire', image: '/img/ring-style-solitaire.svg' },
    { name: 'Halo', image: '/img/ring-style-halo.svg' },
    { name: 'Pave', image: '/img/ring-style-pave.svg' },
    { name: 'Hidden Halo', image: '/img/ring-style-hidden.svg' },
    { name: 'Stone', image: '/img/ring-style-stone.svg' }
  ];

  const metalOptions = [
    { name: 'White Gold', image: '/img/white-theme.png' },
    { name: 'Yellow Gold', image: '/img/gold-theme.png' },
    { name: 'Rose Gold', image: '/img/rose-theme.png' }
  ];

  const menuItems = [
    {
      href: '/diamonds',
      label: 'Diamonds',
      icon: <IoDiamondOutline className='h-4 w-4' />,
      content: (
        <div className='grid grid-cols-3 gap-0 xl:grid-cols-4 xl:gap-4'>
          <div className='col-span-1 p-4 xl:p-6'>
            <h3 className='mb-4 font-semibold'>DIAMONDS BY SHAPE</h3>
            <ul className='space-y-2 border-r-2 font-light'>
              {DiamondShapes && DiamondShapes?.length > 0 ? (
                DiamondShapes.map((shape) => (
                  <li key={shape.id} className='flex items-center space-x-2'>
                    {shape.diamondImage && (
                      <Image
                        src={baseApiUrl + shape.diamondImage}
                        alt={shape.diamondShape || 'Diamond Shape'}
                        width={24}
                        height={24}
                        className='object-contain'
                      />
                    )}
                    <span>{shape.diamondShape}</span>
                  </li>
                ))
              ) : (
                <li>Loading diamond shapes...</li>
              )}
            </ul>
          </div>
          <div className='col-span-1 p-4 xl:col-span-2 xl:p-6'>
            <h3 className='mb-4 font-semibold'>DIAMONDS BY PRICE</h3>
            <ul className='space-y-2 font-light'>
              {[
                'Under $1,000',
                '$1,000 - $2,500',
                '$2,500 - $5,000',
                'Over $5,000'
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
          <div className='group relative h-[230px] w-[320px] overflow-hidden xl:h-[300px] xl:w-[400px]'>
            <Image
              src='/img/ads/add4.png'
              alt='Ad Image'
              fill
              className='h-fill w-full object-fill'
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
        <div className='grid w-full grid-cols-4 items-stretch gap-2 xl:grid-cols-5'>
          {categories &&
            categories.length > 0 &&
            categories.map((category, index) => (
              <div key={category.id} className='col-span-1 px-4 py-8 2xl:px-6'>
                <div
                  className={`flex h-full flex-col ${
                    index !== categories.length - 1 ? 'border-r-1' : ''
                  }`}
                >
                  <h3 className='mb-4 font-semibold uppercase'>
                    {category.categoryName}
                  </h3>
                  <ul className='flex-1 space-y-2 font-light'>
                    {category.subcategories.map((sub) => (
                      <li key={sub._id}>
                        <Link
                          href={`/products/${sub.subcategoryName
                            .toLowerCase()
                            .replace(/\s+/g, '-')}
                            `}
                          className='decoration-1 underline-offset-3 hover:underline'
                        >
                          {sub.subcategoryName}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

          {/* Promotional Image */}
          <div className='group relative hidden h-[230px] w-[230px] overflow-hidden xl:block xl:h-[300px] xl:w-[400px]'>
            <Image
              src='/img/DiamondStuds.webp'
              alt='Ad Image'
              fill
              className='h-fill w-full object-fill'
            />
          </div>
        </div>
      )
    },
    {
      href: '/products/rings',
      label: 'Engagement Rings',
      icon: <Image src='/icons/ring2.svg' alt='ring2' width={16} height={16} />,
      content: (
        <div className='grid w-full grid-cols-4 gap-0 xl:gap-2'>
          <div className='col-span-1 p-3 xl:p-6'>
            <h3 className='mb-4 font-semibold'>ENGAGEMENT RINGS</h3>
            <ul className='h-40 space-y-2 overflow-y-auto border-r-2 font-light'>
              {availableStyles &&
                availableStyles.length > 0 &&
                availableStyles.map(({ name, image }) => (
                  <li key={name} className='flex items-center space-x-2'>
                    <Link
                      href={`/products/rings?style=${name}`}
                      className='flex items-center space-x-2 hover:underline'
                    >
                      <Image
                        src={baseApiUrl + image}
                        alt={name}
                        width={24}
                        height={24}
                        className='h-6 w-6 object-contain'
                      />
                      <span>{name}</span>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <div className='col-span-1 p-3 xl:p-6'>
            <h3 className='mb-4 font-semibold'>METAL TYPES</h3>
            <ul className='h-40 space-y-2 overflow-y-auto border-r-2 font-light'>
              {metalOptions.map(({ name, image }) => (
                <li key={name} className='flex items-center space-x-2'>
                  <Link
                    href={`/products/rings?metal=${name.toLowerCase().replace(/\s+/g, '-')}`}
                    className='flex items-center space-x-2 hover:underline'
                  >
                    <Image
                      src={image}
                      alt={name}
                      width={16}
                      height={16}
                      className='h-4 w-4 object-contain'
                    />
                    <span>{name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className='col-span-1 p-3 xl:p-6'>
            <h3 className='mb-4 font-semibold'>SHOP BY COLLECTION</h3>
            <ul className='space-y-2 font-light'>
              {['Classic', 'Bridal', 'Nature Inspired', 'Minimalist'].map(
                (collection) => (
                  <li key={collection}>
                    <Link
                      // href={`/products/rings/engagement-rings/collections/${collection.toLowerCase().replace(/\s+/g, '-')}`}
                      href={`/products/rings`}
                      className='hover:underline'
                    >
                      {collection}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
          <div className='group relative h-[230px] w-[250px] overflow-hidden xl:h-[300px] xl:w-[400px]'>
            <Image
              src='/img/ads/add4.png'
              alt='Ad Image'
              fill
              className='h-full w-full object-fill'
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
        <div className='grid grid-cols-3 gap-0 xl:grid-cols-4 xl:gap-4'>
          <div className='col-span-1 p-3 xl:p-6'>
            <h3 className='mb-4 font-semibold'>CUSTOM JEWELRY</h3>
            <ul className='h-40 space-y-2 border-r-2 font-light'>
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
          <div className='col-span-1 p-3 xl:col-span-2 xl:p-6'>
            <h3 className='mb-4 font-semibold'>THE PROCESS</h3>
            <ul className='space-y-2 font-light'>
              {[
                '1. Consultation',
                '2. Design',
                '3. 3D Rendering',
                '4. Production',
                '5. Final Approval'
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
          <div className='group relative h-[230px] w-[320px] overflow-hidden xl:h-[300px] xl:w-[400px]'>
            <Image
              src='/img/DiamondStuds.webp'
              alt='Ad Image'
              fill
              className='h-full w-full object-fill'
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
        <div className='grid grid-cols-3 gap-0 xl:grid-cols-4 xl:gap-4'>
          <div className='col-span-1 p-3 xl:p-6'>
            <h3 className='mb-4 font-semibold'>DIAMOND EDUCATION</h3>
            <ul className='h-40 space-y-2 border-r-2 font-light'>
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
          <div className='col-span-1 p-3 xl:col-span-2 xl:p-6'>
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
          <div className='group relative h-[230px] w-[320px] overflow-hidden xl:h-[300px] xl:w-[400px]'>
            <Image
              src='/img/ads/add4.png'
              alt='Ad Image'
              fill
              className='object-cover'
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
          {/* black banner */}
          <div className='bg-primary relative h-9 overflow-hidden py-2 text-center tracking-wider text-white'>
            <div className='animate-fade absolute w-full opacity-100 transition-opacity duration-1000 ease-in-out'>
              <p key={index} className='xs:text-sm text-xs md:text-base'>
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
                  width={132}
                  height={58}
                  className=''
                  priority
                />
              </Link>
            </div>
            <div className='flex gap-0.5 min-[340px]:gap-1.5 md:gap-4'>
              <AccountDropdown />
              {/* Wishlist Link */}
              <button
                className='relative rounded-full p-1 transition-all duration-200 hover:scale-110 hover:bg-gray-100'
                onClick={handleWishlistClick}
              >
                <Heart strokeWidth={1.2} size={28} />
                {wishlistCount > 0 ? (
                  <span className='text-background absolute top-1 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-black text-xs'>
                    {wishlistCount}
                  </span>
                ) : (
                  ''
                )}
              </button>
              <button
                onClick={handleAddToCart}
                className='relative rounded-full p-1 transition-all duration-200 hover:scale-110 hover:bg-gray-100'
              >
                <BsHandbag size={26} />
                <span className='text-background absolute top-1 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-black text-xs'>
                  2
                </span>
              </button>
            </div>
          </div>
          {/* desktop nav */}
          <nav className='wrapper 3xl:text-base hidden justify-center border-t border-gray-100 text-sm uppercase lg:flex'>
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
                    'relative flex items-center gap-1 px-4 py-2 font-light',
                    'after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-center after:scale-x-0 after:content-[""]',
                    'after:bg-black after:transition-transform after:duration-300',
                    activeMenu === item.label && 'font-medium after:scale-x-95'
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
              <div className='mx-auto max-w-4xl xl:max-w-5xl 2xl:max-w-7xl'>
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
