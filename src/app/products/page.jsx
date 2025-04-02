'use client';
import CustomTag from '@/components/CustomTag';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import PreviewCard from '@/components/preview-card';
import { Funnel, ListFilter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
  DialogClose,
  DialogDescription
} from '@/components/ui/dialog';
import { motion } from 'framer-motion';

export default function Page() {
  return (
    <div className='container'>
      {/* arrowed label */}
      <div className='container my-[5%] flex w-full items-center justify-between md:flex-row md:gap-6 xl:my-15'>
        <CustomTag
          no='1.'
          text='Select Your'
          bold='METAL'
          imgUrl='/icons/metal.svg'
          href='/products'
        />
        <CustomTag
          no='2.'
          text='Select Your'
          bold='SHANK'
          imgUrl='/icons/shank.svg'
          href='/products'
        />
        <CustomTag
          no='3.'
          text='Select Your'
          bold='DIAMOND'
          imgUrl='/icons/diamond1.svg'
          href='/products'
        />
      </div>
      {/* select ring style */}
      <div className='container text-center'>
        <h2 className='mb-3 sm:text-xl md:text-2xl lg:text-3xl'>
          Choose Perfect Ring Style for You
        </h2>
        <div className='hidden justify-center gap-3 transition-all duration-800 md:flex'>
          <Link href='#' className=''>
            <Image
              src='/img/ring-style-halo.svg'
              width={150}
              height={150}
              className='w-[130px] transition-all duration-200 hover:scale-105 lg:w-[140px]'
              alt='Image diamond'
            />
          </Link>
          <Link href='#'>
            <Image
              src='/img/ring-style-pave.svg'
              width={150}
              height={150}
              className='w-[130px] transition-all duration-200 hover:scale-105 lg:w-[140px]'
              alt='Image diamond'
            />
          </Link>
          <Link href='#'>
            <Image
              src='/img/ring-style-solitaire.svg'
              width={150}
              height={150}
              className='w-[130px] transition-all duration-200 hover:scale-105 lg:w-[140px]'
              alt='Image diamond'
            />
          </Link>
          <Link href='#'>
            <Image
              src='/img/ring-style-stone.svg'
              width={150}
              height={150}
              className='w-[130px] transition-all duration-200 hover:scale-105 lg:w-[140px]'
              alt='Image diamond'
            />
          </Link>
          <Link href='#'>
            <Image
              src='/img/ring-style-hidden.svg'
              width={150}
              height={150}
              className='w-[130px] transition-all duration-200 hover:scale-105 lg:w-[140px]'
              alt='Image diamond'
            />
          </Link>
        </div>
      </div>
      {/* filters */}
      <ProductsFilter />
      {/* listing components */}
      <div className='container my-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'>
        {Array.from({ length: 30 }).map((_, index) => (
          <React.Fragment key={index}>
            <PreviewCard />
            {index > 0 && (index + 1) % 8 === 0 && <Advertisement />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function ProductsFilter() {
  return (
    <div className=''>
      {/* mobile */}
      <Dialog>
        <DialogTrigger className='flex rounded-sm border px-2 py-[6px] shadow-none md:hidden'>
          <Funnel className='mr-1 h-5 w-5' /> Filter
        </DialogTrigger>

        <DialogContent
          className='max-w-screen overflow-hidden rounded-lg p-0 sm:max-w-screen'
          animateSide='bottom'
          hideClose={true}
        >
          <DialogTitle className='bg-secondary flex items-center justify-between px-4 py-2'>
            <Button className='w-fit rounded-sm text-sm' variant='outline'>
              Filters Selected (2)
            </Button>
            <DialogClose className='flex h-8 w-8 items-center justify-center rounded-full bg-[#D9D9D9] text-gray-600 transition hover:bg-gray-300'>
              <X size={20} />
            </DialogClose>
          </DialogTitle>

          <div className='container space-y-3 py-6'>
            <div>
              <p>
                <strong>Metal :</strong>
                <span className='text-secondary-foreground'>White Gold </span>
              </p>
              <div className='mt-2 grid grid-cols-4 gap-4 text-xs text-nowrap'>
                {/* Rose Gold */}
                <button className='bg-secondary flex flex-col items-center justify-between gap-2 rounded-sm border-1 border-transparent px-4 py-2 text-sm transition focus:border-black'>
                  <Image
                    src='/img/gold-theme.png'
                    width={32}
                    height={32}
                    alt='metal'
                    className='h-8 w-8'
                  />
                  Gold
                </button>

                {/* Gold */}
                <button className='bg-secondary flex flex-col items-center justify-between gap-2 rounded-sm border-1 border-transparent px-4 py-2 text-sm transition focus:border-black'>
                  <Image
                    src='/img/rose-theme.png'
                    width={32}
                    height={32}
                    alt='metal'
                    className='h-8 w-8'
                  />
                  Rose Gold
                </button>

                {/* Silver */}
                <button className='bg-secondary flex flex-col items-center justify-between gap-2 rounded-sm border-1 border-transparent px-4 py-2 text-sm transition focus:border-black'>
                  <Image
                    src='/img/white-theme.png'
                    width={32}
                    height={32}
                    alt='metal'
                    className='h-8 w-8'
                  />
                  Silver
                </button>
              </div>
            </div>
            <div>
              <p>
                <strong>Purity :</strong>
                <span className='text-secondary-foreground'>14 K</span>
              </p>
              <div className='mt-2 grid grid-cols-4 gap-4 text-xs text-nowrap'>
                <Button
                  variant='outline'
                  className='bg-secondary rounded-sm border-none'
                >
                  14 K
                </Button>
              </div>
            </div>
            <div>
              <p>
                <strong>Ring Style:</strong>
                <span className='text-secondary-foreground'>Halo</span>
              </p>
              <div className='mt-2 grid grid-cols-4 gap-4 text-[0.8rem] text-nowrap'>
                <button className='bg-secondary flex flex-col items-center justify-between rounded-sm border-1 border-transparent px-3 py-2 text-sm transition focus:border-black'>
                  <Image
                    src='/icons/ring-style-solitare.png'
                    width={32}
                    height={32}
                    alt='metal'
                    className='w-[80px]'
                  />
                  Solitare
                </button>
                <button className='bg-secondary flex flex-col items-center justify-between rounded-sm border-1 border-transparent px-3 py-2 text-sm transition focus:border-black'>
                  <Image
                    src='/icons/ring-style-pave.png'
                    width={32}
                    height={32}
                    alt='metal'
                    className='w-[80px]'
                  />
                  Pave
                </button>
                <button className='bg-secondary flex flex-col items-center justify-between rounded-sm border-1 border-transparent px-3 py-2 text-sm transition focus:border-black'>
                  <Image
                    src='/icons/ring-style-halo.png'
                    width={32}
                    height={32}
                    alt='metal'
                    className='w-[80px]'
                  />
                  Halo
                </button>
                <button className='bg-secondary flex flex-col items-center justify-between rounded-sm border-1 border-transparent px-3 py-2 transition focus:border-black'>
                  <Image
                    src='/icons/ring-style-hidden.png'
                    width={32}
                    height={32}
                    alt='metal'
                    className='w-[80px]'
                  />
                  Hidden halo
                </button>
              </div>
            </div>
            <div>
              <p>
                <strong>Ring Style:</strong>
                <span className='text-secondary-foreground'>Halo</span>
              </p>
              <div className='mt-2 grid grid-cols-4 gap-4 text-[0.8rem] text-nowrap'>
                <button className='bg-secondary flex flex-col items-center justify-between rounded-sm border-1 border-transparent px-3 py-2 transition focus:border-black'>
                  <Image
                    src='/icons/shape-round.svg'
                    width={32}
                    height={32}
                    alt='metal'
                    className='w-[80px]'
                  />
                  Round
                </button>

                <button className='bg-secondary flex flex-col items-center justify-between rounded-sm border-1 border-transparent px-3 py-2 transition focus:border-black'>
                  <Image
                    src='/icons/shape-pear.svg'
                    width={32}
                    height={32}
                    alt='metal'
                    className='w-[80px]'
                  />
                  Pear
                </button>
                <button className='bg-secondary flex flex-col items-center justify-between rounded-sm border-1 border-transparent px-3 py-2 transition focus:border-black'>
                  <Image
                    src='/icons/shape-emerlad.svg'
                    width={32}
                    height={32}
                    alt='metal'
                    className='w-[80px]'
                  />
                  Emerlad
                </button>
                <button className='bg-secondary flex flex-col items-center justify-between rounded-sm border-1 border-transparent px-3 py-2 transition focus:border-black'>
                  <Image
                    src='/icons/shape-princess.svg'
                    width={32}
                    height={32}
                    alt='metal'
                    className='w-[80px]'
                  />
                  Princess
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {/* desktop */}
      <div className='hidden gap-4 md:flex'>
        <Select>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Select Metal' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='rose'>Rose Gold</SelectItem>
            <SelectItem value='gold'>Gold</SelectItem>
            <SelectItem value='silver'>Silver</SelectItem>
            <SelectItem value='platinum'>Platinum</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Purity' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='light'>10 %pre</SelectItem>
            <SelectItem value='dark'>Dark</SelectItem>
            <SelectItem value='system'>System</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Ring Styles' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='light'>Light</SelectItem>
            <SelectItem value='dark'>Dark</SelectItem>
            <SelectItem value='system'>System</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Diamond Shape' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='light'>Light</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
const Advertisement = () => {
  return (
    <div className='col-span-2 flex min-h-[300px] justify-center bg-gray-100 p-4 text-center'>
      <p className='text-lg font-semibold'>
        🔥 Special Offer! Limited Time Discount! 🔥
      </p>
    </div>
  );
};
