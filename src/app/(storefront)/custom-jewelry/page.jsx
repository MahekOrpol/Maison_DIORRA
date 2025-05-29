'use client';
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
import { baseApiUrl } from '@/lib/utils';

export default function UnderConstruction() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm();

  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  const onSubmit = async (data) => {
    const formData = new FormData();

    // Append all form fields to formData
    formData.append('name', data.name);
    formData.append('mobile', data.phone);
    formData.append('email', data.email);
    formData.append('type', data.type);
    formData.append('budget', data.budget);
    formData.append('metal', data.metal);
    formData.append('message', data.message);

    // Append the file if it exists
    if (data.file && data.file.length > 0) {
      formData.append('file', data.file[0]);
    }

    try {
      const response = await fetch(`${baseApiUrl}/api/v1/custom-jewels/create`, {
        method: 'POST',
        body: formData,
        // Headers like Authorization would go here if needed
        // headers: {
        //   'Authorization': 'Bearer your-token-here'
        // }
      });

      const result = await response.json();

      if (result.success) {
        setDialogMessage(result.message);
      } else {
        setDialogMessage(result.message || 'There was an error submitting your request. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setDialogMessage('There was an error submitting your request. Please try again.');
    }

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
          <img src='/img/customline.png' className='w-64 pb-10 sm:w-96' />
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
          <img src='/img/customline.png' className='w-64 pb-10 sm:w-96' />
        </div>

        {/* Form */}
        <form className='mx-auto max-w-6xl' onSubmit={handleSubmit(onSubmit)}>
          <div className='grid grid-cols-1 gap-3 pb-3 md:grid-cols-2'>
            <div>
              <input
                type='text'
                placeholder='Name*'
                {...register('name', { required: 'Name is required' })}
                className={`w-full rounded border p-3 focus:ring-0 focus:outline-none ${errors.name ? 'border-red-500' : ''}`} />
              {errors.name && (<p className='text-sm text-red-500'>{errors.name.message}</p>)}
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
                className={`w-full rounded border p-3 focus:ring-0 focus:outline-none ${errors.phone ? 'border-red-500' : ''}`} />
              {errors.phone && (<p className='text-sm text-red-500'>{errors.phone.message}</p>)}
            </div>
          </div>

          <div className='mb-3'>
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
              className={`w-full rounded border p-3 focus:ring-0 focus:outline-none ${errors.email ? 'border-red-500' : ''}`} />
            {errors.email && (<p className='text-sm text-red-500'>{errors.email.message}</p>)}
          </div>

          <div className='mb-3'>
            <select
              {...register('type', { required: 'Type is required' })}
              className={`w-full rounded border p-3 focus:ring-0 focus:outline-none ${errors.type ? 'border-red-500' : ''}`}>
              <option value=''>Choose Type</option>
              <option value='Ring'>Ring</option>
              <option value='Necklace'>Necklace</option>
              <option value='Bracelet'>Bracelet</option>
              <option value='Earrings'>Earrings</option>
            </select>
            {errors.type && (<p className='text-sm text-red-500'>{errors.type.message}</p>)}
          </div>

          <div className='grid grid-cols-1 gap-3 pb-3 md:grid-cols-2'>
            <div>
              <input
                type="text"
                placeholder="Total Budget"
                {...register('budget', {
                  required: 'Budget is required',
                  pattern: {
                    value: /^[0-9]+$/, // allows only digits
                    message: 'Only numbers are valid',
                  },
                })}
                className={`w-full rounded border p-3 focus:ring-0 focus:outline-none ${errors.budget ? 'border-red-500' : ''}`} />
              {errors.budget && (
                <p className="text-sm text-red-500">{errors.budget.message}</p>
              )}
            </div>

            <div>
              <select
                {...register('metal', { required: 'Metal type is required' })}
                className={`w-full rounded border p-3 focus:ring-0 focus:outline-none ${errors.metal ? 'border-red-500' : ''}`} >
                <option value="">Select Metal Type</option>
                <option value="Gold">Gold</option>
                <option value="White Gold">White Gold</option>
                <option value="Rose Gold">Rose Gold</option>
              </select>
              {errors.metal && (<p className='text-sm text-red-500'>{errors.metal.message}</p>)}
            </div>
          </div>

          <div className="mb-3">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Upload Design
            </label>

            {/* File Input with Preview */}
            <div className={`border-2 border-dashed rounded-lg ${errors.file ? 'border-red-500' : 'border-gray-300'}`}>
              <div className="p-4">
                {/* Preview Container with Gray Background */}
                {watch('file')?.[0] && watch('file')[0].type.startsWith('image/') && (
                  <div className="mb-2 p-2 rounded-md flex justify-center">
                    <img
                      src={URL.createObjectURL(watch('file')[0])}
                      alt="Preview"
                      className="h-56 object-contain bg-gray-100"
                    />
                  </div>
                )}

                <input
                  type="file"
                  id="file-upload"
                  {...register('file', {
                    required: 'File upload is required',
                    validate: {
                      validType: (files) =>
                        ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf',
                          'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
                          .includes(files[0]?.type) || 'Invalid file type',
                      validSize: (files) =>
                        files[0]?.size < 5000000 || 'File size must be less than 5MB'
                    }
                  })}
                  className="hidden"
                  accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                />

                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center py-2 cursor-pointer"
                >
                  <svg
                    className="w-12 h-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="mt-1 text-sm text-gray-600">
                    {watch('file')?.[0]?.name || 'Click to upload or drag and drop'}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    JPG, PNG, PDF, DOC up to 5MB
                  </p>
                </label>
              </div>
            </div>

            {errors.file && (
              <p className="mt-1 text-sm text-red-500">{errors.file.message}</p>
            )}
          </div>

          <div className='mb-3'>
            <textarea
              placeholder='Please describe your idea for this Custom Project...'
              {...register('message', { required: 'Description is required' })}
              className={`w-full rounded border p-2 focus:ring-0 focus:outline-none ${errors.message ? 'border-red-500' : ''}`} rows={4} ></textarea>
            {errors.message && (<p className='text-sm text-red-500'>{errors.message.message}</p>)}
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
                {dialogMessage.includes('error') ? 'Error' : 'Thank You!'}
              </DialogTitle>
              <DialogDescription className='pt-2 text-base text-gray-700'>
                {dialogMessage}
              </DialogDescription>
            </DialogHeader>
            <button
              onClick={() => setShowDialog(false)}
              className='mt-6 h-12 w-full rounded bg-black text-white'
            >
              CLOSE
            </button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}