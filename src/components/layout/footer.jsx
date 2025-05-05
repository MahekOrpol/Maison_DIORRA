import React from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { MoveRight, User } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaTiktok
} from 'react-icons/fa6';
import { AiOutlineYoutube } from 'react-icons/ai';

const socialLinks = [
  {
    name: 'Instagram',
    icon: <FaInstagram size={24} />,
    href: '#',
    color: 'hover:bg-pink-500'
  },
  {
    name: 'Facebook',
    icon: <FaFacebookF size={24} />,
    href: '#',
    color: 'hover:bg-blue-600'
  },
  {
    name: 'Twitter',
    icon: <FaXTwitter size={24} />,
    href: '#',
    color: 'hover:bg-sky-500'
  },
  {
    name: 'YouTube',
    icon: <AiOutlineYoutube size={24} />,
    href: '#',
    color: 'hover:bg-red-600'
  },
  {
    name: 'TikTok',
    icon: <FaTiktok size={24} />,
    href: '#',
    color: 'hover:bg-black'
  }
];
const footerLinks = [
  {
    heading: 'Useful Links',
    links: [
      { href: '/', label: 'Home' },
      { href: '/about', label: 'About' },
      { href: '/products', label: 'Shop' },
      { href: '/blogs', label: 'Blog' },
      { href: '/contact', label: 'Contact' }
    ]
  },
  {
    heading: 'Services',
    links: [
      { href: 'd', label: 'Refund' },
      { href: 'd', label: 'Shipping' },
      { href: 'd', label: 'Order Status' },
      { href: 'd', label: 'FAQ' },
      { href: 'd', label: 'Exchange' }
    ]
  },
  {
    heading: 'Support',
    links: [
      { href: 'd', label: 'Privacy Policy' },
      { href: 'd', label: 'Terms of Use' }
    ]
  }
];
export default function Footer() {
  return (
    <footer>
      <div className='relative z-10 bg-black pt-4 text-white lg:pt-12'>
        {/* subscribe newsletter*/}
        <div className='mx-auto mb-4 hidden w-4/5 max-w-6xl justify-between gap-2 rounded-sm bg-[#FFFFFF42] p-6 text-center md:flex md:flex-col lg:mb-12 lg:flex-row lg:items-center lg:text-left'>
          <div className='flex-1'>
            <p className='text-2xl font-medium lg:text-[28px]'>
              Subscribe to get Updated
            </p>
            <p className='mt-2 text-sm font-extralight'>
              Perks include $100 off your first order. <br /> Plus new product
              launches, store openings, and more!
            </p>
          </div>
          <form className='mx-auto mt-2 flex w-full max-w-lg items-center rounded bg-white p-1 text-black lg:mt-0 lg:max-w-sm'>
            <Input
              placeholder='Enter your email'
              required
              type='email'
              className='w-full border-0 text-base shadow-none outline-none focus-visible:ring-0'
            />
            <button
              type='submit'
              className='ml-2 flex w-[120px] justify-center rounded bg-black px-4 py-2 text-white'
            >
              <MoveRight className='text-xl' size={24} />
            </button>
          </form>
        </div>
        {/* main section */}
        <div className='wrapper relative z-10 mb-8 grid gap-x-2 gap-y-2 sm:grid-cols-3 lg:mb-16 lg:grid-cols-5 lg:gap-4'>
          <div className='col-span-2 mb-4 text-center sm:col-span-3 lg:col-span-2 lg:text-left'>
            <Image
              src='/img/footer-diorra-logo.svg'
              height={80}
              width={270}
              alt='Company logo'
              className='mx-auto mb-2 hidden lg:-ml-3 lg:block'
            />
            <Image
              src='/icons/diorra-logo.png'
              height={70}
              width={180}
              alt='Company logo'
              className='mx-auto invert-100 lg:-ml-3 lg:hidden'
            />
            <p className='xs:text-sm mx-auto text-xs font-extralight md:w-4/5 md:text-base lg:mx-0'>
              At Feronia, we believe that jewelry is more than just an
              accessory—it’s a reflection of your style, your story, and your
              most treasured moments.
            </p>
            <div className='mt-6 flex justify-center space-x-3 lg:hidden'>
              <Link
                href='#'
                aria-label='instagram'
                className={`flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-all duration-300 hover:scale-110`}
              >
                <FaInstagram size={22} />
              </Link>
              <Link
                href='#'
                aria-label='facebook'
                className={`flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-all duration-300 hover:scale-110`}
              >
                <FaFacebookF size={22} />
              </Link>
              <Link
                href=''
                aria-label='twitter'
                className={`flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-all duration-300 hover:scale-110`}
              >
                <FaXTwitter size={22} />
              </Link>
              <Link
                href=''
                aria-label='youtube'
                className={`flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-all duration-300 hover:scale-110`}
              >
                <AiOutlineYoutube size={22} />
              </Link>
              <Link
                href=''
                aria-label='tiktok'
                className={`flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-all duration-300 hover:scale-110`}
              >
                <FaTiktok size={22} />
              </Link>
            </div>
          </div>

          {footerLinks &&
            footerLinks.map((link) => (
              <div
                key={link.heading}
                className='last:mt-3 max-[768px]:pl-6 sm:last:mt-0 md:pl-10'
              >
                <h4 className='mb-3 text-2xl font-light tracking-wider text-nowrap md:font-normal lg:text-3xl'>
                  {link.heading}
                </h4>
                <ul>
                  {link?.links &&
                    link?.links.map((link) => (
                      <li
                        key={link.label}
                        className='hover:text-muted-foreground text-sm leading-8 font-extralight tracking-wide md:text-base md:font-light lg:text-lg lg:leading-[280%]'
                      >
                        <Link href={link.href} className='block'>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
        </div>
        {/* social links */}
        <div className='relative z-10'>
          <div className='hidden items-center justify-center lg:flex'>
            <div className='h-[0.8px] flex-1 bg-white'></div>
            <div className='flex space-x-3'>
              <Link
                href='#'
                aria-label='instagram'
                className={`flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-all duration-300 hover:scale-110`}
              >
                <FaInstagram size={22} />
              </Link>
              <Link
                href='#'
                aria-label='facebook'
                className={`flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-all duration-300 hover:scale-110`}
              >
                <FaFacebookF size={22} />
              </Link>
              <Link
                href=''
                aria-label='twitter'
                className={`flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-all duration-300 hover:scale-110`}
              >
                <FaXTwitter size={22} />
              </Link>
              <Link
                href=''
                aria-label='youtube'
                className={`flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-all duration-300 hover:scale-110`}
              >
                <AiOutlineYoutube size={22} />
              </Link>
              <Link
                href=''
                aria-label='tiktok'
                className={`flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-all duration-300 hover:scale-110`}
              >
                <FaTiktok size={22} />
              </Link>
            </div>
            <div className='h-[0.8px] flex-1 bg-white'></div>
          </div>
          <p className='wrapper flex flex-col items-center justify-center gap-1 pb-4 text-xs leading-3 font-extralight lg:-translate-y-2 lg:flex-row lg:justify-between lg:text-base'>
            <span>Copyrighted© 2024 All rights reserved by Feronia</span>
            <span>Designed and Developed by Orpol Infotech</span>
          </p>
        </div>
        <div className='absolute inset-x-0 bottom-0 z-0'>
          <Image
            src='/img/footer-diorra.svg'
            width={600}
            height={200}
            alt='Diorra image'
            className='h-auto w-full'
          />
        </div>
      </div>
    </footer>
  );
}
