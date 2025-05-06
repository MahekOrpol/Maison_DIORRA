import React from 'react';
import { BiSolidHomeCircle } from 'react-icons/bi';
import { FaEnvelopeOpenText, FaGift, FaPeopleRoof } from 'react-icons/fa6';

export default function UnderConstruction() {
  return (
    <div className='min-h-screen bg-white'>
      {/* Header Section */}
      <div>
        <img src='/img/customjewel.png' />
      </div>
      <div className='wrapper pt-10 pb-20'>
        <div className='flex flex-col items-center text-center'>
          <h1 className='text-3xl font-bold md:text-4xl'>Custom Jewelry</h1>
          <p className='mt-2 text-sm text-gray-600'>
            Jewelry as Unique as Your Story
          </p>
          <img src='/img/customline.png' className='w-2/3 pb-10 xl:w-[20%]' />
        </div>

        {/* Features Section */}
        <div className='mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4'>
          {[
            {
              img: <FaEnvelopeOpenText size={27} />,
              title: 'Uniqueness and Exclusivity',
              desc: 'Custom jewelry ensures no one else will have the exact same piece, making it truly yours.'
            },
            {
              img: <FaPeopleRoof size={27} />,
              title: 'Personalization',
              desc: 'Tailor every detail to your style, from the choice of gem to the design elements.'
            },
            {
              img: <FaGift size={27} />,
              title: 'Celebrate Special Moments',
              desc: 'Create a lasting memory for engagements, milestone, birthdays, or any anniversary.'
            },
            {
              img: <BiSolidHomeCircle size={27} />,
              title: 'Quality and Craftsmanship',
              desc: 'Every custom piece is handcrafted by skilled artisans using the finest materials.'
            }
          ].map((feature, i) => (
            <div
              key={i}
              className='flex flex-col items-center rounded-lg bg-gray-100 p-4 shadow transition hover:shadow-md'
            >
              <span className='rounded-3xl bg-gray-300 p-3'>{feature.img}</span>
              <h3 className='mb-2 pt-3 text-lg font-semibold text-black md:text-xl'>
                {feature.title}
              </h3>
              <p className='text-center text-sm text-gray-600 md:text-base'>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Form Section */}
        <div className='flex flex-col items-center pt-14 text-center'>
          <h2 className='text-2xl font-bold md:text-4xl'>
            Designed by You, Crafted by Us
          </h2>
          <p className='pt-1 text-sm text-gray-600'>
            Create a unique piece of jewelry that reflects your personal style
            and story
          </p>
          <img src='/img/customline.png' className='w-2/3 pb-10 xl:w-[20%]' />
        </div>

        <form className='mx-auto max-w-6xl'>
          <div className='grid grid-cols-1 gap-3 pb-3 md:grid-cols-2'>
            <input
              type='text'
              placeholder='Name*'
              className='w-full rounded border p-3'
              required
            />
            <input
              type='tel'
              placeholder='Mobile Number*'
              className='w-full rounded border p-3'
              required
            />
          </div>
          <input
            type='email'
            placeholder='Email Address*'
            className='mb-3 w-full rounded border p-3 md:col-span-2'
            required
          />
          <select className='mb-3 w-full rounded border p-3'>
            <option>Choose Type</option>
            <option>Ring</option>
            <option>Necklace</option>
            <option>Bracelet</option>
            <option>Earrings</option>
          </select>
          <div className='grid grid-cols-1 gap-3 pb-3 md:grid-cols-2'>
            <input
              type='text'
              placeholder='Total Budget'
              className='w-full rounded border p-3'
            />
            <input
              type='text'
              placeholder='Metal Type'
              className='w-full rounded border p-3'
            />
          </div>
          <input
            type='file'
            accept='.jpg,.jpeg,.png,.pdf,.doc,.docx'
            className='mb-1 w-full rounded border p-3 md:col-span-2'
          />
          <p className='mb-3 text-xs text-gray-500 md:col-span-2'>
            Choose your file here to be upload. Allowed types: pdf, jpg, png,
            jpeg, doc, docx
          </p>
          <textarea
            placeholder='Please describe your idea for this Custom Project...'
            className='mb-3 w-full rounded border p-2 md:col-span-2'
            rows={4}
          ></textarea>
          <button
            type='submit'
            className='w-full rounded bg-black px-6 py-3 text-base text-white md:col-span-2'
          >
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
}
