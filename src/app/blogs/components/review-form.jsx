'use client';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input'; // shadcn input
import { Button } from '@/components/ui/button';

export function ReviewForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      message: ''
    }
  });

  const onSubmit = (data) => {
    console.log('Review submitted:', data);
    reset();
  };

  return (
    <div className='mx-auto max-w-md rounded-lg bg-white p-6 shadow-md'>
      <h2 className='mb-6 text-center text-2xl font-bold'>Add a Review</h2>
      <p className='mb-6 text-center text-sm text-gray-500'>
        Your E-mail will not be Published. Required fields are marked*
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label htmlFor='firstName'>
              First Name <span className='text-red-500'>*</span>
            </label>
            <Input
              id='firstName'
              {...register('firstName', { required: 'First name is required' })}
              className={`rounded-md ${errors.firstName ? 'border-red-500' : ''}`}
            />
            {errors.firstName && (
              <p className='mt-1 text-sm text-red-500'>
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor='lastName'>Last Name</label>
            <Input
              id='lastName'
              {...register('lastName')}
              className='rounded-md'
            />
          </div>
        </div>

        <div>
          <label htmlFor='email'>
            E-mail <span className='text-red-500'>*</span>
          </label>
          <Input
            id='email'
            type='email'
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            className={`rounded-md ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && (
            <p className='mt-1 text-sm text-red-500'>{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor='message'>
            Message <span className='text-red-500'>*</span>
          </label>
          <textarea
            id='message'
            {...register('message', {
              required: 'Message is required',
              minLength: {
                value: 10,
                message: 'Message must be at least 10 characters'
              }
            })}
            className={`w-full rounded-md border px-3 py-2 ${
              errors.message ? 'border-red-500' : 'border-gray-300'
            } focus:ring-2 focus:ring-blue-500 focus:outline-none`}
            rows={4}
          />
          {errors.message && (
            <p className='mt-1 text-sm text-red-500'>
              {errors.message.message}
            </p>
          )}
        </div>

        <div className='pt-2'>
          <Button
            type='submit'
            className='w-full rounded-md bg-blue-600 px-4 py-2 text-white transition duration-200 hover:bg-blue-700'
          >
            Post a Review
          </Button>
        </div>
      </form>
    </div>
  );
}
