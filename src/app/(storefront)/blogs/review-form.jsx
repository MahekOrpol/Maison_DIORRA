'use client';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input'; // shadcn input
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

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
    // console.log('Review submitted:', data);
    reset();
  };

  return (
    <div className='wrapper'>
      <h2 className='mb-2 text-2xl font-semibold lg:text-3xl'>Add a Review</h2>
      <p className='mb-2 text-sm'>
        Your E-mail will not be Published. Required fields are marked*
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label htmlFor='firstName' className='text-sm'>
              First Name <span className='text-red-500'>*</span>
            </label>
            <Input
              id='firstName'
              placeholder='Enter first name'
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
            <label htmlFor='lastName' className='text-sm'>
              Last Name
            </label>
            <Input
              id='lastName'
              placeholder='Enter last name'
              {...register('lastName')}
              className='rounded-md'
            />
          </div>
        </div>

        <div>
          <label htmlFor='email' className='text-sm'>
            E-mail <span className='text-red-500'>*</span>
          </label>
          <Input
            id='email'
            type='email'
            placeholder='Enter email id'
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
          <label htmlFor='message' className='text-sm'>
            Message <span className='text-red-500'>*</span>
          </label>
          <Textarea
            id='message'
            placeholder='Enter message text'
            {...register('message', {
              required: 'Message is required',
              minLength: {
                value: 10,
                message: 'Message must be at least 10 characters'
              }
            })}
            className={`w-full rounded-md border px-3 py-2 ${
              errors.message ? 'border-red-500' : 'border-gray-300'
            } `}
            rows={4}
          />
          {errors.message && (
            <p className='mt-1 text-sm text-red-500'>
              {errors.message.message}
            </p>
          )}
        </div>

        <div className='pt-2'>
          <Button type='submit' size='lg' className='w-full max-w-md'>
            Post a Review
          </Button>
        </div>
      </form>
    </div>
  );
}
