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
import { baseApiUrl, cn } from '@/lib/utils';
import { toast } from 'sonner';
import axios from 'axios';
export function ResetPasswordDialog({ open = false, setOpen, email }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue
  } = useForm();

  // Set the email value when component mounts or email prop changes
  useEffect(() => {
    if (email) {
      setValue('email', email);
    }
  }, [email, setValue]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${baseApiUrl || 'http://153.92.222.195:5000'}/api/v1/auth/forgot-password`,
        {
          email: data.email || email, // Use form email or prop email as fallback
          password: data.password,
          confirmPassword: data.confirmPassword
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        toast.success(response.data.message || 'Password reset successfully!');
        reset();
        setOpen(false);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        'Failed to reset password. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='rounded-xl px-6 py-8 sm:max-w-sm'>
        <DialogHeader>
          <DialogTitle className='text-center text-xl font-semibold'>
            Reset Password
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className='mt-6 grid gap-5'>
          {/* Password */}
          <div className='relative'>
            <input
              type='password'
              id='password'
              placeholder=''
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
              className={cn(
                'peer block w-full appearance-none rounded-md border-1 border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:ring-0 focus:outline-none',
                errors.password ? 'border-red-500' : ''
              )}
            />
            <label
              htmlFor='password'
              className='absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-95 transform bg-white px-2 text-base text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-90 peer-focus:px-2'
            >
              Password
            </label>
            {errors.password && (
              <p className='mt-1 text-xs text-red-500'>
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className='relative'>
            <input
              type='password'
              id='confirmPassword'
              placeholder=''
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) =>
                  value === watch('password') || "Passwords don't match"
              })}
              className={cn(
                'peer block w-full appearance-none rounded-md border-1 border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:ring-0 focus:outline-none',
                errors.confirmPassword ? 'border-red-500' : ''
              )}
            />
            <label
              htmlFor='confirmPassword'
              className='absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-95 transform bg-white px-2 text-base text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-90 peer-focus:px-2'
            >
              Confirm Password
            </label>
            {errors.confirmPassword && (
              <p className='mt-1 text-xs text-red-500'>
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <DialogFooter className='pt-2'>
            <Button
              type='submit'
              size={'lg'}
              className='h-11 w-full text-base'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Updating...' : 'Update Password'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
