'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';
import { GiGemPendant } from 'react-icons/gi';
import Image from 'next/image';

export default function ChooseStonelModal({ open, onOpenChange }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const handleSelect = (option) => {
    setSelectedOption(option);
    onOpenChange(false);
  };
  const options = [
    {
      label: 'Natural Diamond',
      // image: '/icons/natural-diamond.svg'
      image: '/icons/natural-diamond.svg'
    },
    {
      label: 'Lab Diamond',
      image: '/icons/lab-diamond.svg'
    },
    {
      label: 'Gemstones & Moissanite',
      image: '/icons/gemstone-diamond.svg'
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='w-full max-w-sm rounded-xl px-4 py-8 sm:px-8'>
        <DialogTitle className='text-center text-2xl font-semibold'>
          Choose Your Diamond
        </DialogTitle>

        <div className='xs:gap-4 xs:px-2 mt-6 grid grid-cols-3 gap-3 sm:gap-6 sm:px-4 sm:pb-4'>
          {options.map((opt, index) => (
            <div
              key={index}
              onClick={() => handleSelect(opt.label)}
              className='group bg-secondary cursor-pointer rounded-lg border border-gray-200 p-2 text-center transition hover:border-black'
            >
              <div className='flex h-16 items-center justify-center'>
                {opt.image ? (
                  <Image
                    src={opt.image}
                    alt={opt.label}
                    width={55}
                    height={55}
                    className='object-contain'
                  />
                ) : (
                  opt.icon
                )}
              </div>
              <p className='text-xs leading-4 font-medium sm:text-sm'>
                {opt.label}
              </p>
            </div>
          ))}
          {/* <button className='bg-secondary flex flex-col items-center justify-between rounded-sm border border-transparent px-3 py-2 transition focus:border-black'>
            <Image
              src={`/img/gold-theme.png`}
              width={30}
              height={30}
              alt='theme'
            />
            Gold
          </button> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
