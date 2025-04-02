import React from 'react';

export default function Heading({ title, subtitle }) {
  return (
    <div className='mb-8 text-center'>
      <h2 className='mb-2 text-2xl text-black underline decoration-[2px] underline-offset-8 md:text-[48px] md:underline-offset-[14px]'>
        {title}
      </h2>
      <p className='text-lg'>{subtitle}</p>
    </div>
  );
}
