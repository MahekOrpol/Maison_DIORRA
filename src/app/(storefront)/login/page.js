'use client';

import { useEffect, useState } from 'react';
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
import { toast } from 'sonner';
import axios from 'axios';
import { useRouter } from 'nextjs-toploader/app';

// Mock API service
const authService = {
  login: async (data) => {
    console.log('Logging in with:', data);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, token: 'mock-token' });
      }, 1000);
    });
  },
  register: async (data) => {
    console.log('Registering with:', data);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 1000);
    });
  },
  forgotPassword: async (email) => {
    console.log('Sending reset link to:', email);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 1000);
    });
  },
  resetPassword: async (data) => {
    console.log('Resetting password with:', data);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 1000);
    });
  }
};

export default function LoginPage() {
  const [tab, setTab] = useState('login');
  const [openForgotPassword, setOpenForgotPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  // Login Form
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
    reset: resetLoginForm
  } = useForm();

  // Register Form
  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
    watch: registerWatch,
    reset: resetRegisterForm
  } = useForm();

  /* Mock API service for testing. dont remove this code plz */
  // const onLogin = async (data) => {
  //   setIsSubmitting(true);
  //   try {
  //     const response = await authService.login(data);
  //     if (response.success) {
  //       toast.success('Login successful!');
  //       resetLoginForm();
  //       // Redirect or handle successful login
  //     }
  //   } catch (error) {
  //     toast.error('Login failed. Please try again.');
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };
  // const onRegister = async (data) => {
  //   setIsSubmitting(true);
  //   try {
  //     const response = await authService.register(data);
  //     if (response.success) {
  //       toast.success('Registration successful! Please login.');
  //       resetRegisterForm();
  //       setTab('login');
  //     }
  //   } catch (error) {
  //     toast.error('Registration failed. Please try again.');
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const detectLoginType = (loginId) => {
    if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(loginId)) {
      return 'email';
    } else if (/^[0-9]{10}$/.test(loginId)) {
      return 'phone';
    } else if (/^[a-zA-Z ]{3,}$/.test(loginId)) {
      return 'name';
    }
    return 'email'; // default fallback
  };

  const onLogin = async (data) => {
    setIsSubmitting(true);
    const { loginId, password } = data;
    const loginType = detectLoginType(loginId);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL || ''}/api/v1/register/login`,
        {
          loginType, // Add loginType to the request
          [loginType]: loginId, // Dynamic property based on loginType
          password
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 200) {
        resetLoginForm();
        // Store tokens and user data
        const { token, user } = response.data;
        localStorage.setItem('accessToken', token.access.token);
        localStorage.setItem('refreshToken', token.refresh.token);
        localStorage.setItem('authUser', JSON.stringify(user));
        localStorage.setItem(
          'user',
          JSON.stringify({
            name: user.name,
            email: user.email,
            phone: user.phone
          })
        );
        // Redirect to account page
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Login error:', error);

      let errorMessage = 'Login failed. Please try again.';
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.data?.message) {
            errorMessage = error.response.data.message;
          } else if (error.response.status === 401) {
            errorMessage = 'Invalid credentials';
          } else if (error.response.status === 400) {
            errorMessage = 'Validation error. Please check your inputs.';
          }
        } else if (error.request) {
          errorMessage = 'Network error. Please check your connection.';
        }
      }

      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onRegister = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL || ''}/api/v1/register/register`,
        {
          name: data.name,
          email: data.email,
          phone: data.mobile,
          password: data.password,
          ConfirmPassword: data.confirmPassword
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 201) {
        toast.success('Registration successful! Please login.');
        resetRegisterForm();
        setTab('login');

        return;
      }

      throw new Error('Registration failed');
    } catch (error) {
      console.error('Registration error:', error);

      let errorMessage = 'Registration failed. Please try again.';

      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.data?.message) {
            errorMessage = error.response.data.message;
          } else if (error.response.status === 400) {
            errorMessage = 'Validation error. Please check your inputs.';
          } else if (error.response.status === 409) {
            errorMessage = 'Email or phone number already registered.';
          }
        } else if (error.request) {
          errorMessage = 'Network error. Please check your connection.';
        }
      }

      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className='bg-muted flex items-center justify-center border px-2 py-8 sm:px-4'>
        <div className='flex h-fit w-full max-w-lg overflow-hidden rounded-lg bg-white shadow-md md:max-w-5xl'>
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
          <div className='flex-1 pt-0 md:mb-8 md:px-6 md:pt-2 lg:px-10'>
            <Tabs value={tab} onValueChange={setTab} className='w-full'>
              <TabsList className='mb-2 grid h-fit w-full grid-cols-2 border-gray-500'>
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
                className='px-6 pb-6 text-center sm:pt-2 md:text-left lg:pt-3'
              >
                <div className='pt-3 md:pt-0'>
                  <h2 className='mb-2 text-xl leading-6 font-medium sm:text-2xl'>
                    Login using your Email and Password
                  </h2>
                  <p className='text-xs leading-4 font-light sm:text-sm'>
                    For the purpose of industry registration, your details are
                    required and will be stored.
                  </p>
                  <form onSubmit={handleLoginSubmit(onLogin)}>
                    <div className='mb-4 pt-5'>
                      <input
                        type='text'
                        id='loginId'
                        className={cn(
                          'block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none',
                          loginErrors.loginId ? 'border-red-500' : ''
                        )}
                        placeholder='Enter email, username, or phone'
                        {...loginRegister('loginId', {
                          required: 'This field is required',
                          validate: {
                            validInput: (value) => {
                              const isEmail =
                                /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                  value
                                );
                              const isPhone = /^[0-9]{10}$/.test(value);
                              const isName = /^[a-zA-Z ]{3,}$/.test(value);
                              return (
                                isEmail ||
                                isPhone ||
                                isName ||
                                'Enter a valid email, username (3+ letters), or phone (10 digits)'
                              );
                            }
                          }
                        })}
                      />
                      {loginErrors.loginId && (
                        <p className='mt-1 text-xs text-red-500'>
                          {loginErrors.loginId.message}
                        </p>
                      )}
                    </div>
                    <div className='relative'>
                      <input
                        type='password'
                        id='password'
                        className={cn(
                          'peer block w-full appearance-none rounded-md border-1 border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:ring-0 focus:outline-none',
                          loginErrors.password ? 'border-red-500' : ''
                        )}
                        placeholder='123456'
                        {...loginRegister('password', {
                          required: 'Password is required',
                          minLength: {
                            value: 6,
                            message: 'Password must be at least 6 characters'
                          }
                        })}
                      />
                      <label
                        htmlFor='password'
                        className='absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-95 transform bg-white px-2 text-base text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-90 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4'
                      >
                        Password
                      </label>
                      {loginErrors.password && (
                        <p className='mt-1 text-left text-xs text-red-500'>
                          {loginErrors.password.message}
                        </p>
                      )}
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
                        type='button'
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
                        className='xs:w-2/3 mb-2 h-10 w-full text-base sm:h-12 sm:text-lg'
                        type='submit'
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Logging in...' : 'Login'}
                      </Button>
                      <div className='mx-auto my-4 flex w-2/3 items-center justify-center gap-2'>
                        <hr className='w-[48%] border-black' />
                        OR
                        <hr className='w-[48%] border-black' />
                      </div>
                      <button
                        className='xs:w-2/3 mx-auto mb-3 flex h-9 w-full items-center justify-center gap-2 rounded-md border px-4 py-1.5 text-sm sm:h-12 sm:text-base'
                        type='button'
                      >
                        <FcGoogle className='h-4 w-7 sm:h-7' />
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
                </div>
              </TabsContent>

              {/* Register Tab Content */}
              <TabsContent
                value='register'
                className='pb-6 text-center sm:pt-2 md:text-left lg:pt-3'
              >
                <div className='px-6 pt-3 md:pt-0'>
                  <h2 className='mb-2 text-xl leading-6 font-medium sm:text-2xl'>
                    Don't have an Account?
                  </h2>
                  <p className='text-xs leading-4 font-light sm:text-sm'>
                    For the purpose of industry registration, your details are
                    required and will be stored.
                  </p>
                  <form
                    onSubmit={handleRegisterSubmit(onRegister)}
                    className='mt-4'
                  >
                    <div className='xs:grid-cols-2 grid grid-cols-1 gap-x-4 gap-y-5 sm:gap-4'>
                      <div className='xs:col-span-2 relative'>
                        <input
                          type='text'
                          id='name'
                          className={cn(
                            'peer block w-full appearance-none rounded-md border-1 border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:ring-0 focus:outline-none',
                            registerErrors.name ? 'border-red-500' : ''
                          )}
                          placeholder=''
                          {...registerRegister('name', {
                            required: 'Name is required',
                            minLength: {
                              value: 2,
                              message: 'Name must be at least 2 characters'
                            }
                          })}
                        />
                        <label
                          htmlFor='name'
                          className='absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-95 transform bg-white px-2 text-base text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-90 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4'
                        >
                          Name
                        </label>
                        {registerErrors.name && (
                          <p className='mt-1 text-left text-xs text-red-500'>
                            {registerErrors.name.message}
                          </p>
                        )}
                      </div>

                      <div className='relative col-span-1'>
                        <input
                          type='email'
                          id='email'
                          className={cn(
                            'peer block w-full appearance-none rounded-md border-1 border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:ring-0 focus:outline-none',
                            registerErrors.email ? 'border-red-500' : ''
                          )}
                          placeholder=''
                          {...registerRegister('email', {
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
                        {registerErrors.email && (
                          <p className='mt-1 text-left text-xs text-red-500'>
                            {registerErrors.email.message}
                          </p>
                        )}
                      </div>

                      <div className='relative col-span-1'>
                        <input
                          type='tel'
                          id='mobile'
                          className={cn(
                            'peer block w-full appearance-none rounded-md border-1 border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:ring-0 focus:outline-none',
                            registerErrors.mobile ? 'border-red-500' : ''
                          )}
                          placeholder=''
                          {...registerRegister('mobile', {
                            required: 'Mobile number is required',
                            minLength: {
                              value: 10,
                              message: 'Invalid mobile number'
                            },
                            pattern: {
                              value: /^[0-9]+$/,
                              message: 'Only numbers are allowed'
                            }
                          })}
                        />
                        <label
                          htmlFor='mobile'
                          className='absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-95 transform bg-white px-2 text-base text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-90 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4'
                        >
                          Mobile Number
                        </label>
                        {registerErrors.mobile && (
                          <p className='mt-1 text-left text-xs text-red-500'>
                            {registerErrors.mobile.message}
                          </p>
                        )}
                      </div>

                      <div className='relative col-span-1'>
                        <input
                          type='password'
                          id='password'
                          className={cn(
                            'peer block w-full appearance-none rounded-md border-1 border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:ring-0 focus:outline-none',
                            registerErrors.password ? 'border-red-500' : ''
                          )}
                          placeholder=''
                          {...registerRegister('password', {
                            required: 'Password is required',
                            minLength: {
                              value: 8,
                              message: 'Password must be at least 8 characters'
                            }
                          })}
                        />
                        <label
                          htmlFor='password'
                          className='absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-95 transform bg-white px-2 text-base text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-90 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4'
                        >
                          Password
                        </label>
                        {registerErrors.password && (
                          <p className='mt-1 text-left text-xs text-red-500'>
                            {registerErrors.password.message}
                          </p>
                        )}
                      </div>

                      <div className='relative col-span-1'>
                        <input
                          type='password'
                          id='confirmPassword'
                          className={cn(
                            'peer block w-full appearance-none rounded-md border-1 border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:ring-0 focus:outline-none',
                            registerErrors.confirmPassword
                              ? 'border-red-500'
                              : ''
                          )}
                          placeholder=''
                          {...registerRegister('confirmPassword', {
                            required: 'Please confirm your password',
                            validate: (value) =>
                              value === registerWatch('password') ||
                              "Passwords don't match"
                          })}
                        />
                        <label
                          htmlFor='confirmPassword'
                          className='absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-95 transform bg-white px-2 text-base text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-90 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4'
                        >
                          Confirm Password
                        </label>
                        {registerErrors.confirmPassword && (
                          <p className='mt-1 text-xs text-red-500'>
                            {registerErrors.confirmPassword.message}
                          </p>
                        )}
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
                        className='xs:w-2/3 mb-2 h-10 w-full text-base sm:h-12 sm:text-lg'
                        type='submit'
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Registering...' : 'Register'}
                      </Button>
                      <div className='mx-auto my-4 flex w-2/3 items-center justify-center gap-2'>
                        <hr className='w-[48%] border-black' />
                        OR
                        <hr className='w-[48%] border-black' />
                      </div>

                      <button
                        className='xs:w-2/3 mx-auto mb-2 flex h-9 w-full items-center justify-center gap-2 rounded-md border px-4 py-1.5 text-sm sm:h-12 sm:text-base'
                        type='button'
                      >
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
                </div>
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL || ''}/api/v1/auth/send-otp`,
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/forgot-password`,
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

export function OTPDialog({ open, onOpenChange, onSubmit, email }) {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [openResetPassword, setOpenResetPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (element, index) => {
    const value = element.value.replace(/[^0-9]/g, '');
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    // Auto-focus next input only if a digit was entered
    if (value && element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = async () => {
    const enteredOtp = otp.join('');

    if (enteredOtp.length !== 6) {
      setError('Please enter a complete 6-digit OTP');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Make API call with Axios
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/verify-otp`,
        {
          email: email, // Make sure this is not null/undefined
          generateOTP: enteredOtp
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if(response.status == 200){
        toast.success(response.data.message)
      }

      // Handle successful response
      onSubmit?.(response.data);
      setOpenResetPassword(true);
      onOpenChange(false);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || 'Verification failed';
      setError(errorMessage);
      setOtp(new Array(6).fill(''));

      // Debugging: Log the exact request being sent
      console.error('API Request Failed:', {
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/verify-otp`,
        payload: {
          email: email,
          generateOTP: enteredOtp
        },
        error: err.response?.data || err.message
      });
    } finally {
      setIsLoading(false);
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
                onFocus={(e) => e.target.select()}
              />
            ))}
          </div>

          <DialogFooter>
            <Button
              className='h-11 w-full text-base'
              onClick={handleSubmit}
              email={email}
              disabled={otp.join('').length !== 6}
            >
              Verify OTP
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ResetPasswordDialog
        open={openResetPassword}
        setOpen={setOpenResetPassword}
        email={email}
      />
    </>
  );
}
