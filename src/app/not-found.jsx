import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <Header />
      <div className='3xl:pt-0 flex flex-col items-center justify-center pt-[120px] lg:flex-row'>
        <div className='wrapper place-items-center space-y-6 text-center md:text-left lg:w-1/2'>
          {/* <h1 className='font-bold text-4xl'>404 NOT FOUND</h1> */}
          <Image
            src='/img/4041.png'
            width={150}
            alt='404 image'
            height={200}
            className='brightness-90 contrast-125 grayscale lg:hidden'
          />
          <h1 className='font-sans text-2xl font-light uppercase xl:text-4xl'>
            You've found a link that's <br className='hidden xl:flex' />
            broken or doesn't exist
          </h1>
          <h1 className='hidden text-2xl font-semibold uppercase lg:flex xl:text-center xl:text-3xl'>
            The sparkle you're looking for isn't here
          </h1>
          <p className='mb-2 text-lg font-medium'>
            {' '}
            But these gems might catch your eye:
          </p>

          <div className='mx-auto grid w-full grid-cols-2 gap-4 md:mx-0 xl:w-xl xl:max-w-lg'>
            <Link
              href='/engagement-rings'
              className='flex items-center justify-center space-x-2 rounded bg-black px-3.5 py-3 text-xs font-semibold text-white transition hover:bg-gray-800 xl:text-base'
            >
              💍 <span>Engagement Rings</span>
            </Link>
            <Link
              href='/diamonds'
              className='flex items-center justify-center space-x-2 rounded bg-black px-3.5 py-3 text-xs font-semibold text-white transition hover:bg-gray-800 md:text-base'
            >
              💎 <span>Diamonds</span>
            </Link>
            <Link
              href='/wedding-rings'
              className='flex items-center justify-center space-x-2 rounded bg-black px-3.5 py-3 text-xs font-semibold text-white transition hover:bg-gray-800 md:text-base'
            >
              👰 <span>Wedding Rings</span>
            </Link>
            <Link
              href='/custom-jewelry'
              className='flex items-center justify-center space-x-2 rounded bg-black px-3.5 py-3 text-xs font-semibold text-white transition hover:bg-gray-800 md:text-base'
            >
              ✨<span>Custom jewel</span>
            </Link>
          </div>

          <p className='mb-1.5 pt-1 text-base'>
            or{' '}
            <Link href='/' className='underline'>
              click here
            </Link>{' '}
            to return to the previous page
          </p>
          <p className='text-base'>
            Still need help?{' '}
            <Link href='/contact' className='underline'>
              Contact Customer Service
            </Link>
          </p>
        </div>

        <div className='hidden justify-center md:w-1/2 lg:flex'>
          <Image
            src='/img/addcart.png'
            alt='Diamond rings'
            width={600}
            height={500}
            className='h-full w-full object-fill'
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
