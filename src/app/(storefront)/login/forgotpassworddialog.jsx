'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import axios from 'axios';
import { OTPDialog } from './otpdialog';

export function ForgotPasswordDialog({ open = false, setOpen }) {
  const [openOtpModal, setOpenOtpModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://153.92.222.195:5000'}/api/v1/auth/send-otp`,
        {
          email: data.email
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        setEmail(data.email);
        reset();
        setOpen(false);
        setOpenOtpModal(true);
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      let errorMessage = 'Failed to send OTP. Please try again.';

      if (axios.isAxiosError(error)) {
        if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.response?.status === 404) {
          errorMessage = 'Email not found';
        }
      }

      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='rounded-xl px-6 py-8 sm:max-w-md'>
          <DialogHeader>
            <DialogTitle className='text-center text-xl font-semibold'>
              Forgot Password
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className='mt-4 space-y-4'>
            <div className='grid gap-2'>
              <div className='relative my-3 lg:mt-6'>
                <input
                  type='email'
                  id='email'
                  className={cn(
                    'peer block w-full appearance-none rounded-md border-1 border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:ring-0 focus:outline-none',
                    errors.email ? 'border-red-500' : ''
                  )}
                  placeholder=''
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                />
                <label
                  htmlFor='email'
                  className='absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-95 transform bg-white px-2 text-base text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-90 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4'
                >
                  Email
                </label>
                {errors.email && (
                  <p className='text-xs text-red-500'>{errors.email.message}</p>
                )}
              </div>
            </div>

            <DialogFooter className='pt-2'>
              <Button
                type='submit'
                size={'lg'}
                className='h-11 w-full text-base'
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <OTPDialog
        open={openOtpModal}
        onOpenChange={setOpenOtpModal}
        email={email}
      />
    </>
  );
}
