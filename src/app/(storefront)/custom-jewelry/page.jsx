'use client'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BiSolidHomeCircle } from 'react-icons/bi';
import { FaEnvelopeOpenText, FaGift, FaPeopleRoof } from 'react-icons/fa6';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';

export default function UnderConstruction() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const [showDialog, setShowDialog] = useState(false);

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    setShowDialog(true);
    reset();
  };

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
          <img src='/img/customline.png' className='pb-10 w-64 sm:w-96' />
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
          <img src='/img/customline.png' className='pb-10 w-64 sm:w-96' />
        </div>

        {/* Form */}
        <form className='mx-auto max-w-6xl' onSubmit={handleSubmit(onSubmit)}>
          <div className='grid grid-cols-1 gap-3 pb-3 md:grid-cols-2'>
            <div>
              <input
                type='text'
                placeholder='Name*'
                {...register('name', { required: 'Name is required' })}
                className={`w-full rounded border p-3 focus:outline-none focus:ring-0 ${errors.name ? 'border-red-500' : ''
                  }`}
              />
              {errors.name && <p className='text-sm text-red-500'>{errors.name.message}</p>}
            </div>

            <div>
              <input
                type='tel'
                placeholder='Mobile Number*'
                {...register('phone', {
                  required: 'Mobile number is required',
                  pattern: {
                    value: /^[0-9]{10,14}$/,
                    message: 'Enter a valid phone number'
                  }
                })}
                className={`w-full rounded border p-3 focus:outline-none focus:ring-0 ${errors.phone ? 'border-red-500' : ''
                  }`}
              />
              {errors.phone && <p className='text-sm text-red-500'>{errors.phone.message}</p>}
            </div>
          </div>

          <div>
            <input
              type='email'
              placeholder='Email Address*'
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Enter a valid email'
                }
              })}
              className={`mb-3 w-full rounded border p-3 focus:outline-none focus:ring-0 ${errors.email ? 'border-red-500' : ''
                }`}
            />
            {errors.email && <p className='text-sm text-red-500'>{errors.email.message}</p>}
          </div>

          <div>
            <select
              {...register('type', { required: 'Type is required' })}
              className={`mb-3 w-full rounded border p-3 focus:outline-none focus:ring-0 ${errors.type ? 'border-red-500' : ''
                }`}
            >
              <option value=''>Choose Type</option>
              <option value='Ring'>Ring</option>
              <option value='Necklace'>Necklace</option>
              <option value='Bracelet'>Bracelet</option>
              <option value='Earrings'>Earrings</option>
            </select>
            {errors.type && <p className='text-sm text-red-500'>{errors.type.message}</p>}
          </div>

          <div className='grid grid-cols-1 gap-3 pb-3 md:grid-cols-2'>
            <div>
              <input
                type='text'
                placeholder='Total Budget'
                {...register('budget', {
                  required: 'Budget is required'
                })}
                className={`w-full rounded border p-3 focus:outline-none focus:ring-0 ${errors.budget ? 'border-red-500' : ''
                  }`}
              />
              {errors.budget && <p className='text-sm text-red-500'>{errors.budget.message}</p>}
            </div>

            <div>
              <input
                type='text'
                placeholder='Metal Type'
                {...register('metal', { required: 'Metal type is required' })}
                className={`w-full rounded border p-3 focus:outline-none focus:ring-0 ${errors.metal ? 'border-red-500' : ''
                  }`}
              />
              {errors.metal && <p className='text-sm text-red-500'>{errors.metal.message}</p>}
            </div>
          </div>

          <div>
            <input
              type='file'
              {...register('file', { required: 'File upload is required' })}
              accept='.jpg,.jpeg,.png,.pdf,.doc,.docx'
              className={`mb-1 w-full rounded border p-3 focus:outline-none focus:ring-0 ${errors.file ? 'border-red-500' : ''
                }`}
            />
            {errors.file && <p className='text-sm text-red-500'>{errors.file.message}</p>}
            <p className='mb-3 text-xs text-gray-500'>
              Choose your file here to be uploaded. Allowed types: pdf, jpg, png, jpeg, doc, docx
            </p>
          </div>

          <div>
            <textarea
              placeholder='Please describe your idea for this Custom Project...'
              {...register('message', { required: 'Description is required' })}
              className={`mb-3 w-full rounded border p-2 focus:outline-none focus:ring-0 ${errors.message ? 'border-red-500' : ''
                }`}
              rows={4}
            ></textarea>
            {errors.message && <p className='text-sm text-red-500'>{errors.message.message}</p>}
          </div>

          <button
            type='submit'
            className='w-full rounded bg-black px-6 py-3 text-base text-white'
          >
            SUBMIT
          </button>
        </form>
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className='text-center'>
            <DialogHeader>
              <DialogTitle className='text-2xl font-bold'>
                Thank You!
              </DialogTitle>
              <DialogDescription className='text-gray-700 pt-2 text-base'>
                Your custom jewelry request has been submitted. We’ll get back to you soon.
              </DialogDescription>
            </DialogHeader>
            <button
              onClick={() => setShowDialog(false)}
              className='mt-6 w-full rounded bg-black text-white h-12'
            >
              CLOSE
            </button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
