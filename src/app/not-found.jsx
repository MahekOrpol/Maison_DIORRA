import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <Header />
      <div className="flex flex-col lg:flex-row items-center justify-center pt-[120px] 3xl:pt-0">
        <div className="lg:w-1/2 wrapper text-center place-items-center md:text-left space-y-6">
          {/* <h1 className='font-bold text-4xl'>404 NOT FOUND</h1> */}
          <Image src='/img/4041.png' width={150} height={200} className="grayscale contrast-125 brightness-90 lg:hidden"/>
          <h1 className="text-2xl xl:text-4xl font-light uppercase font-sans">
            You've found a link that's <br className='hidden xl:flex'/>broken or doesn't exist
          </h1>
          <h1 className="hidden lg:flex text-2xl xl:text-3xl font-semibold uppercase xl:text-center">
            The sparkle you're looking for isn't here
          </h1>
          <p className="font-medium text-lg mb-2"> But these gems might catch your eye:</p>

          <div className="grid grid-cols-2 gap-4 w-full xl:w-xl xl:max-w-lg mx-auto md:mx-0">
            <Link
              href="/engagement-rings"
              className="bg-black text-white py-3 px-3.5 text-xs xl:text-base font-semibold flex items-center justify-center space-x-2 hover:bg-gray-800 transition rounded"
            >
              💍 <span>Engagement Rings</span>
            </Link>
            <Link
              href="/diamonds"
              className="bg-black text-white py-3 px-3.5 text-xs md:text-base font-semibold flex items-center justify-center space-x-2 hover:bg-gray-800 transition rounded"
            >
              💎 <span>Diamonds</span>
            </Link>
            <Link
              href="/wedding-rings"
              className="bg-black text-white py-3 px-3.5 text-xs md:text-base font-semibold flex items-center justify-center space-x-2 hover:bg-gray-800 transition rounded"
            >
              👰 <span>Wedding Rings</span>
            </Link>
            <Link
              href="/custom-jewelry"
              className="bg-black text-white py-3 px-3.5 text-xs md:text-base font-semibold flex items-center justify-center space-x-2 hover:bg-gray-800 transition rounded"
            >
              ✨<span>Custom jewel</span>
            </Link>
          </div>

          <p className="text-base mb-1.5 pt-1">
            or{' '}
            <Link href="/" className='underline'>
              click here
            </Link>{' '}
            to return to the previous page
          </p>
          <p className="text-base">
            Still need help?{' '}
            <Link href="/contact" className='underline'>
              Contact Customer Service
            </Link>
          </p>
        </div>

        <div className="md:w-1/2 hidden lg:flex justify-center">
          <Image
            src="/img/addcart.png"
            alt="Diamond rings"
            width={600}
            height={500}
            className="object-fill h-full w-full"
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
