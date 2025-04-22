'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';
import { GiGemPendant } from 'react-icons/gi';
import Image from 'next/image';

export default function ChooseSettingsModal({ open, onOpenChange }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const handleSelect = (option) => {
    setSelectedOption(option);
    onOpenChange(false);
  };

  const options = [
    {
      label: 'Ring',
      image: '/icons/ring-fv.svg'
    },
    {
      label: 'Pendant',
      icon: <GiGemPendant className='size-12 text-black' />
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='w-full max-w-sm rounded-xl p-8 sm:max-w-sm'>
        <DialogTitle className='text-center text-2xl font-semibold'>
          Choose Your Setting
        </DialogTitle>

        <div className='mt-6 grid grid-cols-2 gap-6 sm:gap-6 sm:px-4 sm:pb-4'>
          {options.map((opt, index) => (
            <div
              key={index}
              onClick={() => handleSelect(opt.label)}
              className='group bg-secondary cursor-pointer rounded-lg border border-gray-200 p-2 text-center transition hover:border-black'
            >
              <div className='mb-2 flex h-16 items-center justify-center'>
                {opt.image ? (
                  <Image
                    src={opt.image}
                    alt={opt.label}
                    width={40}
                    height={40}
                    className='object-contain'
                  />
                ) : (
                  opt.icon
                )}
              </div>
              <p className='font-medium text-gray-800 group-hover:text-black'>
                {opt.label}
              </p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
