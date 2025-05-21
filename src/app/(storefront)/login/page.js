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
import { ForgotPasswordDialog } from './forgotpassworddialog';
import { useUserStore } from '@/store/user-store';
import { useWishlistStore } from '@/store/wishlist-store';

// Mock API service
const authService = {
  login: async (data) => {
    // console.log('Logging in with:', data);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, token: 'mock-token' });
      }, 1000);
    });
  },
  register: async (data) => {
    // console.log('Registering with:', data);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 1000);
    });
  },
  forgotPassword: async (email) => {
    // console.log('Sending reset link to:', email);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 1000);
    });
  },
  resetPassword: async (data) => {
    // console.log('Resetting password with:', data);
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
  const { setUser } = useUserStore((state) => state);

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

  const onLogin = async (data) => {
    setIsSubmitting(true);
    const { loginId, password } = data;

    try {
      const response = await axios.post('/api/login', {
        loginId,
        password
      });
      const { user } = response.data;

      // console.log('User:', user);

      if (response.status === 200) {
        setUser(user);
        resetLoginForm();
        await useWishlistStore.getState().fetchWishlist();
        router.push('/account/profile');
      }
    } catch (error) {
      console.error('Login failed:', error);
      toast.error(error.response.data.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onRegister = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://153.92.222.195:5000'}/api/v1/register/register`,
        {
          name: data.name,
          email: data.email,
          phone: data.mobile,
          password: data.password,
          ConfirmPassword: data.confirmPassword
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
                        placeholder='Email, Username, or PhoneNumber'
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
                    <div className='mb-4'>
                      <input
                        type='password'
                        id='password'
                        className={cn(
                          'block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none',
                          loginErrors.password ? 'border-red-500' : ''
                        )}
                        placeholder='Password'
                        {...loginRegister('password', {
                          required: 'Password is required',
                          minLength: {
                            value: 6,
                            message: 'Password must be at least 6 characters'
                          }
                        })}
                      />
                      {loginErrors.password && (
                        <p className='mt-1 text-xs text-red-500'>
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
                    Don&apos;t have an Account?
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
                            'block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none',
                            registerErrors.name ? 'border-red-500' : ''
                          )}
                          placeholder='Name'
                          {...registerRegister('name', {
                            required: 'Name is required',
                            minLength: {
                              value: 2,
                              message: 'Name must be at least 2 characters'
                            }
                          })}
                        />
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
                            'block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none',
                            registerErrors.email ? 'border-red-500' : ''
                          )}
                          placeholder='Email'
                          {...registerRegister('email', {
                            required: 'Email is required',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'Invalid email address'
                            }
                          })}
                        />
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
                            'block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none',
                            registerErrors.mobile ? 'border-red-500' : ''
                          )}
                          placeholder='Mobile Number'
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
                            'block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none',
                            registerErrors.password ? 'border-red-500' : ''
                          )}
                          placeholder='Password'
                          {...registerRegister('password', {
                            required: 'Password is required',
                            minLength: {
                              value: 6,
                              message: 'Password must be at least 6 characters'
                            }
                          })}
                        />
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
                            'block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none',
                            registerErrors.confirmPassword
                              ? 'border-red-500'
                              : ''
                          )}
                          placeholder='Confirm Password'
                          {...registerRegister('confirmPassword', {
                            required: 'Please confirm your password',
                            validate: (value) =>
                              value === registerWatch('password') ||
                              "Passwords don't match"
                          })}
                        />
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
