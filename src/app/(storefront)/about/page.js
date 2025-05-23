import { baseApiUrl, cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

const BASE_URL = baseApiUrl || 'https://massion-diorra-ywz5.onrender.com';

export default async function Page() {
  try {
    // Fetch data from the API
    const response = await fetch(`${BASE_URL}/api/v1/about-us/get`);
    if (!response.ok) {
      throw new Error('Failed to fetch about data');
    }
    const aboutData = await response.json();
    const data = aboutData[0];
    // console.log(data)

    return (
      <>
        <Banner imgUrl='/img/banner1.png' heading='About Us' />
        <section className='wrapper py-6 md:py-12'>
          <AboutSection
            image={baseApiUrl + data.aboutImg}
            title='About Us'
            paragraphs={data.aboutDescription.split('\n\n')}
          />

          {/* quote */}
          <div className='xs:w-[90%] mx-auto -mt-4 mb-6 w-full text-center text-lg font-medium sm:w-2/3 sm:text-[22px] md:my-8 lg:my-14 lg:w-1/2 lg:text-2xl xl:text-3xl'>
            <hr className='mx-auto w-3/4 border-[1px] border-black/70' />
            <blockquote className='my-4 leading-6 tracking-wide sm:leading-7 lg:my-5 lg:tracking-normal xl:leading-8'>
              &quot;{data.tagline}&quot;
            </blockquote>
            <hr className='mx-auto mb-6 w-3/4 border-[1px] border-black/70' />
          </div>

          <AboutSection
            image={baseApiUrl + data.goalImg}
            title='Our Goal'
            paragraphs={data.goalDescription.split('\n\n')}
            reverse
          />
        </section>
      </>
    );
  } catch (error) {
    console.error('Error loading about page:', error);
    return (
      <div className='wrapper py-12 text-center'>
        Error loading content. Please try again later.
      </div>
    );
  }
}

export function Banner({ imgUrl, heading, className = '' }) {
  return (
    <div
      className={`relative flex h-[230px] w-full items-center justify-center bg-cover text-white sm:h-[280px] lg:h-[400px] xl:bg-center ${className}`}
      style={{ backgroundImage: `url(${imgUrl})` }}
    >
      <div className='absolute inset-0 bg-black/40' />
      <h1 className='font-rozha relative z-10 text-center text-4xl font-light sm:text-5xl lg:text-6xl xl:text-7xl'>
        {heading}
      </h1>
    </div>
  );
}

export function AboutSection({ image, title, paragraphs, reverse = false }) {
  return (
    <div className='relative flex flex-col items-center md:flex-row'>
      {/* Image */}
      <div className={cn('w-full md:w-1/2', reverse && 'md:ml-auto')}>
        <Image
          src={image}
          height={600}
          width={800}
          alt={title}
          className='h-full w-full object-cover'
        />
      </div>

      {/* Content */}
      <div
        className={cn(
          'xxs:w-[95%] z-10 -translate-y-12 bg-white p-4 shadow-[0px_0px_12px_0px_rgba(0,_0,_0,_0.1)] sm:p-6 md:w-[65%] lg:w-[57%] lg:p-10 xl:p-16',
          'md:absolute md:top-1/2 md:-translate-y-1/2',
          reverse ? 'mr-auto md:left-0' : 'ml-auto md:right-0'
        )}
      >
        <h2 className='mb-6 text-2xl font-semibold underline underline-offset-4 sm:text-3xl lg:text-4xl'>
          {title}
        </h2>
        {paragraphs.map((text, i) => (
          <p
            key={i}
            className='mb-4 text-justify text-sm leading-4 font-light sm:text-base sm:leading-6 md:text-left lg:text-lg xl:leading-7 2xl:text-[22px] 2xl:leading-8'
          >
            {text}
          </p>
        ))}
      </div>
    </div>
  );
}
