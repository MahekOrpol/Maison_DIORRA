import Link from 'next/link';
import { IoDiamondOutline } from 'react-icons/io5';
import { IoDiamond } from 'react-icons/io5';
import { FaArrowRight } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className='flex min-h-[80vh] flex-col items-center justify-center bg-white p-6 text-black'>
      {/* Animated diamond */}
      <div className='relative mb-8'>
        <IoDiamond
          className='h-24 w-24 animate-pulse text-gray-300'
          style={{ animationDuration: '2s' }}
        />
        <div className='absolute inset-0 flex items-center justify-center'>
          <span className='text-4xl font-light'>404</span>
        </div>
      </div>

      {/* Main message */}
      <h1 className='mb-4 text-center text-3xl font-light md:text-4xl'>
        Page Not Found
      </h1>
      <p className='mb-8 max-w-md text-center text-gray-600'>
        The page you're looking for doesn't exist or has been moved. Like a rare
        diamond, it's currently out of sight.
      </p>

      {/* Navigation buttons */}
      <div className='flex flex-col gap-4 sm:flex-row'>
        <Link
          href='/'
          className='flex items-center justify-center gap-2 border border-black px-6 py-3 transition-all duration-300 hover:bg-black hover:text-white'
        >
          Return Home <FaArrowRight className='text-xs' />
        </Link>
        <Link
          href='/products'
          className='flex items-center justify-center gap-2 bg-black px-6 py-3 text-white transition-all duration-300 hover:bg-gray-800'
        >
          Browse Collection <FaArrowRight className='text-xs' />
        </Link>
      </div>

      {/* Decorative elements */}
      <div className='mt-16 flex gap-8 opacity-50'>
        {Array.from({ length: 3 }).map((_, i) => (
          <IoDiamondOutline key={i} className='h-8 w-8 text-gray-300' />
        ))}
      </div>
    </div>
  );
}
