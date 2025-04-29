'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

export default function AuthTabs() {
  const [tab, setTab] = useState('login');
  const [openForgotPassword, setOpenForgotPassword] = useState(false);

  return (
    <>
      <div className='bg-muted flex items-center justify-center border px-2 py-8 sm:px-4'>
        <div className='flex w-full max-w-lg overflow-hidden rounded-lg bg-white shadow-md md:h-[660px] md:max-w-5xl'>
          {/* Left Side Image */}
          <div className='hidden w-[40%] md:block'>
            <Image
              src='/img/login-model.png'
              alt='Jewelry model'
              width={500}
              height={500}
              className='h-full w-full object-cover'
            />
          </div>
          {/* Right Side Form */}
          <div className='flex-1 px-4 pt-0 md:mb-8 md:px-6 md:pt-2 lg:px-10'>
            <Tabs value={tab} onValueChange={setTab} className='w-full'>
              <TabsList className='mb-2 grid h-full w-full grid-cols-2 border-b border-gray-500'>
                <TabsTrigger
                  value='login'
                  className='data-[state=active]:bg-primary r data-[state=active]:text-primary-foreground bg-background h-full border-b border-b-transparent pt-2 pb-1 text-xl font-medium data-[state=active]:border-b-black data-[state=active]:text-2xl sm:border-b-2'
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value='register'
                  className='data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-background h-full border-b border-b-transparent pt-2 pb-1 text-xl font-medium data-[state=active]:border-b-black data-[state=active]:text-2xl sm:border-b-2'
                >
                  Register
                </TabsTrigger>
              </TabsList>

              {/* Login Tab Content */}
              <TabsContent
                value='login'
                className='pb-6 text-center sm:pt-2 md:text-left lg:pt-3'
              >
                <h2 className='mb-2 text-2xl leading-6 font-medium'>
                  Login using your Email and Password
                </h2>
                <p className='text-sm leading-4 font-light'>
                  For the purpose of industry registration, your details are
                  required and will be stored.
                </p>
                <form action='#'>
                  <div className='relative my-5 pt-2 lg:mt-6'>
                    <input
                      type='email'
                      id='email'
                      className='peer block w-full appearance-none rounded-md border-1 border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:ring-0 focus:outline-none'
                      placeholder=''
                    />
                    <label
                      htmlFor='email'
                      className='absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-95 transform bg-white px-2 text-base text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-90 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4'
                    >
                      Email
                    </label>
                  </div>

                  <div className='relative'>
                    <input
                      type='password'
                      id='default_outlined'
                      className='peer block w-full appearance-none rounded-md border-1 border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:ring-0 focus:outline-none'
                      placeholder=''
                    />
                    <label
                      htmlFor='default_outlined'
                      className='absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-95 transform bg-white px-2 text-base text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-90 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4'
                    >
                      Password
                    </label>
                  </div>
                  <div className='mt-1 mb-5 flex items-center justify-between'>
                    <span className='inline-flex items-center gap-2'>
                      <Input
                        type='checkbox'
                        name='saveAddress'
                        className='h-4 w-4 rounded-sm accent-black'
                      />
                      Remember me
                    </span>
                    <Button
                      variant='link'
                      className='p-0 text-sm font-medium underline underline-offset-3'
                      onClick={() => setOpenForgotPassword(true)}
                    >
                      Forgot Password
                    </Button>
                  </div>

                  <div className='mx-auto mt-2 w-full items-center text-center lg:mt-10 xl:w-3/4'>
                    <p className='mb-2 text-xs sm:text-sm md:mb-4'>
                      By Continuing, I agree to{' '}
                      <Link
                        href='#'
                        className='font-medium underline underline-offset-2'
                      >
                        Terms of Use
                      </Link>{' '}
                      &{' '}
                      <Link
                        href='#'
                        className='font-medium underline underline-offset-2'
                      >
                        Privacy Policy
                      </Link>
                    </p>
                    <Button
                      size={'lg'}
                      className='xs:w-2/3 mb-2 h-12 w-full text-lg'
                    >
                      Login
                    </Button>
                    <div className='mx-auto my-4 flex w-2/3 items-center justify-center gap-2'>
                      <hr className='w-[48%] border-black' />
                      OR
                      <hr className='w-[48%] border-black' />
                    </div>
                    <button className='xs:w-2/3 mx-auto mb-3 flex h-12 w-full items-center justify-center gap-2 rounded-md border px-4 py-1.5 text-base'>
                      <FcGoogle className='h-7 w-7' />
                      Login with Google
                    </button>

                    <p className='text-center text-sm'>
                      Don&apos;t have an account?{' '}
                      <button
                        type='button'
                        className='ml-2 font-medium underline-offset-2 hover:underline'
                        onClick={() => setTab('register')}
                      >
                        Create Account
                      </button>
                    </p>
                  </div>
                </form>
              </TabsContent>

              {/* Register Tab Content */}
              <TabsContent
                value='register'
                className='pb-6 text-center sm:pt-2 md:text-left lg:pt-3'
              >
                <h2 className='mb-2 text-2xl leading-6 font-medium'>
                  Don’t have an Account?
                </h2>
                <p className='text-sm leading-4 font-light'>
                  For the purpose of industry registration, your details are
                  required and will be stored.
                </p>
                <form action='#' className='mt-4'>
                  <div className='xs:grid-cols-2 grid grid-cols-1 gap-x-4 gap-y-5 sm:gap-4'>
                    <div className='xs:col-span-2 relative'>
                      <input
                        type='text'
                        id='name'
                        className='peer block w-full appearance-none rounded-md border-1 border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:ring-0 focus:outline-none'
                        placeholder=''
                      />
                      <label
                        htmlFor='name'
                        className='absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-95 transform bg-white px-2 text-base text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-90 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4'
                      >
                        Name
                      </label>
                    </div>

                    <div className='relative col-span-1'>
                      <input
                        type='email'
                        id='email'
                        className='peer block w-full appearance-none rounded-md border-1 border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:ring-0 focus:outline-none'
                        placeholder=''
                      />
                      <label
                        htmlFor='email'
                        className='absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-95 transform bg-white px-2 text-base text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-90 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4'
                      >
                        Email
                      </label>
                    </div>

                    <div className='relative col-span-1'>
                      <input
                        type='tel'
                        id='mobile'
                        className='peer block w-full appearance-none rounded-md border-1 border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:ring-0 focus:outline-none'
                        placeholder=''
                      />
                      <label
                        htmlFor='mobile'
                        className='absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-95 transform bg-white px-2 text-base text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-90 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4'
                      >
                        Mobile Number
                      </label>
                    </div>

                    <div className='relative col-span-1'>
                      <input
                        type='password'
                        id='password'
                        className='peer block w-full appearance-none rounded-md border-1 border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:ring-0 focus:outline-none'
                        placeholder=''
                      />
                      <label
                        htmlFor='password'
                        className='absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-95 transform bg-white px-2 text-base text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-90 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4'
                      >
                        Password
                      </label>
                    </div>

                    <div className='relative col-span-1'>
                      <input
                        type='password'
                        id='confirmPassword'
                        className='peer block w-full appearance-none rounded-md border-1 border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:ring-0 focus:outline-none'
                        placeholder=''
                      />
                      <label
                        htmlFor='confirmPassword'
                        className='absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-95 transform bg-white px-2 text-base text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-90 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4'
                      >
                        Confirm Password
                      </label>
                    </div>
                  </div>
                  <div className='mx-auto mt-7 w-full items-center text-center lg:mt-10 xl:w-3/4'>
                    <p className='mb-2 text-xs sm:text-sm md:mb-4'>
                      By Continuing, I agree to{' '}
                      <Link
                        href='#'
                        className='font-medium underline underline-offset-3'
                      >
                        Terms of Use
                      </Link>{' '}
                      &{' '}
                      <Link
                        href='#'
                        className='font-medium underline underline-offset-3'
                      >
                        Privacy Policy
                      </Link>
                    </p>
                    <Button
                      size={'lg'}
                      className='xs:w-2/3 mb-2 h-12 w-full text-lg'
                    >
                      Register
                    </Button>
                    <div className='mx-auto my-4 flex w-2/3 items-center justify-center gap-2'>
                      <hr className='w-[48%] border-black' />
                      OR
                      <hr className='w-[48%] border-black' />
                    </div>

                    <button className='xs:w-2/3 mx-auto mb-2 flex h-12 w-full items-center justify-center gap-2 rounded-md border px-4 py-1.5 text-base'>
                      <FcGoogle className='h-7 w-7' />
                      Signup with Google
                    </button>

                    <p className='text-center text-sm'>
                      Already have an Account?
                      <button
                        type='button'
                        className='ml-2 font-medium underline-offset-2 hover:underline'
                        onClick={() => setTab('login')}
                      >
                        Login
                      </button>
                    </p>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <ForgotPasswordDialog
        open={openForgotPassword}
        setOpen={setOpenForgotPassword}
      />
    </>
  );
}

export function ForgotPasswordDialog({ open = false, setOpen }) {
  const [openOtpModal, setOpenOtpModal] = useState(false);

  const { register, handleSubmit, formState, reset } = useForm();

  const onSubmit = (data) => {
    console.log('Forgot password email:', data.email);
    // Your forgot password API logic here
    reset();
    setOpen(false);
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
                    formState.errors.email ? 'border-red-500' : ''
                  )}
                  placeholder=''
                  {...register('email', { required: true })}
                />
                <label
                  htmlFor='email'
                  className='absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-95 transform bg-white px-2 text-base text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-90 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4'
                >
                  Email
                </label>
                {formState.errors.email && (
                  <p className='text-xs text-red-500'>Email is required</p>
                )}
              </div>
            </div>

            <DialogFooter className='pt-2'>
              <Button
                type='submit'
                size={'lg'}
                className='h-11 w-full text-base'
                onClick={() => setOpenOtpModal(true)}
              >
                Send Reset Link
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <OTPDialog open={openOtpModal} onOpenChange={setOpenOtpModal} />
    </>
  );
}

export function ResetPasswordDialog({ open = false, setOpen }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = (data) => {
    console.log('Resetting password with:', data);
    // Your reset password API logic here
    reset();
    setOpen(false);
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
              {...register('password', { required: true })}
              className={`peer block w-full appearance-none rounded-md border-1 border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:ring-0 focus:outline-none ${errors.password ? 'border-red-500' : ''}`}
            />
            <label
              htmlFor='password'
              className='absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-95 transform bg-white px-2 text-base text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-90 peer-focus:px-2'
            >
              Password
            </label>
            {errors.password && (
              <p className='mt-1 text-xs text-red-500'>Password is required</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className='relative'>
            <input
              type='password'
              id='confirmPassword'
              placeholder=''
              {...register('confirmPassword', {
                required: true,
                validate: (val) =>
                  val === watch('password') || 'Passwords do not match'
              })}
              className={`peer block w-full appearance-none rounded-md border-1 border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:ring-0 focus:outline-none ${errors.confirmPassword ? 'border-red-500' : ''}`}
            />
            <label
              htmlFor='confirmPassword'
              className='absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-95 transform bg-white px-2 text-base text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-90 peer-focus:px-2'
            >
              Confirm Password
            </label>
            {errors.confirmPassword && (
              <p className='mt-1 text-xs text-red-500'>
                {errors.confirmPassword.message ||
                  'Confirm Password is required'}
              </p>
            )}
          </div>

          <DialogFooter className='pt-2'>
            <Button type='submit' size={'lg'} className='h-11 w-full text-base'>
              Update Password
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function OTPDialog({ open, onOpenChange, onSubmit }) {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [openResetPassword, setOpenResetPassword] = useState(false);

  const handleChange = (element, index) => {
    const value = element.value.replace(/[^0-9]/g, '');
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = () => {
    const enteredOtp = otp.join('');
    onSubmit?.(enteredOtp);
    // If OTP is valid, open reset password dialog
    if (enteredOtp.length === 6) {
      setOpenResetPassword(true);
      onOpenChange(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className='rounded-xl p-6 sm:max-w-md'>
          <DialogHeader>
            <DialogTitle className='mb-2 text-center text-xl font-semibold'>
              Enter OTP
            </DialogTitle>
          </DialogHeader>

          <div className='text-muted-foreground mb-4 text-center text-sm'>
            Please enter the 6-digit code sent to your email address.
          </div>

          <div className='mb-6 flex justify-center gap-2'>
            {otp.map((data, index) => (
              <input
                key={index}
                type='text'
                maxLength='1'
                className='h-12 w-10 rounded-md border border-gray-300 text-center text-lg focus:border-black focus:outline-none'
                value={data}
                onChange={(e) => handleChange(e.target, index)}
              />
            ))}
          </div>

          <DialogFooter>
            <Button className='h-11 w-full text-base' onClick={handleSubmit}>
              Verify OTP
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ResetPasswordDialog
        open={openResetPassword}
        setOpen={setOpenResetPassword}
      />
    </>
  );
}
