'use client';
import { useForm } from 'react-hook-form';
import { MailOpenIcon as Envelope, MoveRight } from 'lucide-react';
import Link from 'next/link';
import { Banner } from '../about/page';
import CallToAction from '@/components/call-to-action';
import { TbMailFilled } from 'react-icons/tb';
import { FaPhoneVolume, FaBusinessTime } from 'react-icons/fa6';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://153.92.222.195:5000';

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/contact-us/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const result = await response.json();
      // console.log('Form submission successful:', result);
      toast.success('Message sent successfully!');
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to send message. Please try again.');
    }
  };

  return (
    <div className=''>
      <Banner imgUrl='/img/banner/banner1.png' heading='Contact Us' />

      {/* Contact Info Cards */}
      <div className='wrapper mt-14 mb-8 w-full md:mt-16 md:mb-12 xl:mt-20 xl:mb-16'>
        <div className='flex flex-col flex-wrap items-center justify-center gap-12 text-nowrap sm:flex-row lg:flex-nowrap lg:items-stretch lg:justify-between lg:gap-8 xl:gap-14'>
          {/* Email Card */}
          <div className='relative flex w-full max-w-xs flex-col items-center justify-end rounded-lg border-2 border-black px-4 pt-11 pb-4 text-center lg:max-w-md xl:px-6 xl:pb-6'>
            <div className='absolute -top-8 z-10 rounded-lg bg-black p-4 xl:-top-14 xl:p-6'>
              <TbMailFilled className='h-7 w-7 text-white lg:h-8 lg:w-8 xl:h-10 xl:w-10' />
            </div>
            <h2 className='mb-1 text-2xl font-medium xl:text-3xl'>E-mail</h2>
            <p className='text-[15px] lg:text-base xl:text-lg'>
              Main Email:{' '}
              <Link
                href='mailto:info@maisondiorra.com'
                className='text-primary hover:underline'
              >
                info@maisondiorra.com
              </Link>
            </p>
            <p className='text-[15px] lg:text-base xl:text-lg'>
              Inquiries:{' '}
              <Link
                href='mailto:customercare123@gmail.com'
                className='text-primary hover:underline'
              >
                customercare123@gmail.com
              </Link>
            </p>
          </div>

          {/* Contact Card */}
          <div className='relative flex w-full max-w-xs flex-col items-center justify-end rounded-lg border-2 border-black px-4 pt-11 pb-4 text-center lg:max-w-md xl:px-6 xl:pb-6'>
            <div className='absolute -top-8 z-10 rounded-lg bg-black p-4 xl:-top-14 xl:p-6'>
              <FaPhoneVolume className='h-7 w-7 text-white lg:h-8 lg:w-8 xl:h-9 xl:w-9' />
            </div>
            <h2 className='mb-1 text-2xl font-medium xl:text-3xl'>
              Contact Us
            </h2>
            <p className='text-[15px] lg:text-base xl:text-lg'>
              Office Telephone:{' '}
              <Link
                href='tel:0261697456'
                className='text-primary hover:underline'
              >
                0261 697 456
              </Link>
            </p>
            <p className='text-[15px] lg:text-base xl:text-lg'>
              Mobile:{' '}
              <Link
                href='tel:8787887876'
                className='text-primary hover:underline'
              >
                87878 87876
              </Link>
            </p>
          </div>

          {/* Working Hours Card */}
          <div className='relative flex w-full max-w-xs flex-col items-center justify-end rounded-lg border-2 border-black px-4 pt-11 pb-4 text-center lg:max-w-md xl:px-6 xl:pb-6'>
            <div className='absolute -top-8 z-10 rounded-lg bg-black p-4 xl:-top-14 xl:p-6'>
              <FaBusinessTime className='h-7 w-7 text-white lg:h-8 lg:w-8 xl:h-10 xl:w-10' />
            </div>
            <h2 className='mb-1 text-2xl font-medium xl:text-3xl'>
              Working Hours
            </h2>
            <p className='text-[15px] lg:text-base xl:text-lg'>
              Monday - Friday: 9:00 A.M to 8:00 P.M
            </p>
            <p className='text-[15px] lg:text-base xl:text-lg'>
              Saturday - Sunday: 9:00 A.M to 5:00 P.M
            </p>
          </div>
        </div>
      </div>

      {/* Appointment and Contact Form Section */}
      <div className='wrapper'>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
          {/* Virtual Appointment Section */}
          <div className='mx-auto flex flex-col gap-3 lg:mx-0 lg:w-5/6 lg:gap-5'>
            <p className='text-lg font-medium md:text-xl lg:text-2xl xl:text-3xl'>
              Virtual Appointment
            </p>
            <h2 className='text-4xl leading-8 font-medium lg:text-5xl lg:leading-12 xl:text-6xl xl:leading-14'>
              Schedule
              <br />
              an Appointment
            </h2>
            <p className='font-light md:text-lg 2xl:text-xl'>
              Experience personalized jewelry shopping from the comfort of your
              home! Our expert consultants are here to guide you through our
              collections.
            </p>
            <div>
              <Button className='group mt-4 h-12 w-[280px] text-lg'>
                Book Appointment
                <MoveRight className='h-10 w-10 group-hover:-rotate-45' />
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <div className='relative z-10 rounded-lg bg-white p-4 shadow-[0px_0px_10px_4px_rgba(0,_0,_0,_0.1)] sm:p-8'>
            <h2 className='mb-4 text-3xl font-medium'>Leave a Message</h2>
            <p className='mb-6 text-sm md:text-base'>
              Please fill out the below form and leave us a message. We will
              reply within 24 hours.
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-4 grid grid-cols-1 gap-2 sm:gap-4 md:grid-cols-2'>
                <div>
                  <label
                    htmlFor='firstName'
                    className='text-muted-foreground mb-1 block text-sm sm:text-base'
                  >
                    First Name
                  </label>
                  <Input
                    id='firstName'
                    className={`h-[42px] md:text-base ${errors.firstName ? 'border-red-500 focus-visible:border-red-500' : ''}`}
                    {...register('firstName', {
                      required: 'First name is required'
                    })}
                  />
                  {errors.firstName && (
                    <p className='text-sm text-red-500'>
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor='lastName'
                    className='text-muted-foreground mb-1 block text-sm sm:text-base'
                  >
                    Last Name
                  </label>
                  <Input
                    id='lastName'
                    className={`h-[42px] md:text-base ${errors.lastName ? 'border-red-500 focus-visible:border-red-500' : ''}`}
                    {...register('lastName', {
                      required: 'Last name is required'
                    })}
                  />
                  {errors.lastName && (
                    <p className='text-sm text-red-500'>
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div className='mb-4 grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div>
                  <label
                    htmlFor='email'
                    className='text-muted-foreground mb-1 block text-sm sm:text-base'
                  >
                    E-mail
                  </label>
                  <Input
                    type='email'
                    id='email'
                    className={`h-[42px] md:text-base ${errors.email ? 'border-red-500 focus-visible:border-red-500' : ''}`}
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Invalid email format'
                      }
                    })}
                  />
                  {errors.email && (
                    <p className='text-sm text-red-500'>
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor='phone'
                    className='text-muted-foreground mb-1 block text-sm sm:text-base'
                  >
                    Phone Number
                  </label>
                  <Input
                    type='tel'
                    id='phone'
                    className={`h-[42px] md:text-base ${errors.phone ? 'border-red-500 focus-visible:border-red-500' : ''}`}
                    {...register('phone', {
                      required: 'Phone number is required',
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: 'Please enter a valid 10-digit phone number'
                      }
                    })}
                  />
                  {errors.phone && (
                    <p className='text-sm text-red-500'>
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              <div className='mb-4'>
                <label
                  htmlFor='message'
                  className='text-muted-foreground mb-1 block text-sm sm:text-base'
                >
                  Message
                </label>
                <Textarea
                  id='message'
                  rows={5}
                  className={`h-[120px] w-full md:text-base ${errors.message ? 'border-red-500 focus-visible:border-red-500' : ''}`}
                  {...register('message', { required: 'Message is required' })}
                />
                {errors.message && (
                  <p className='text-sm text-red-500'>
                    {errors.message.message}
                  </p>
                )}
              </div>

              <Button
                type='submit'
                className='h-12 w-full text-lg lg:max-w-[220px]'
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Submit Now'}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className='lg:-mt-36'>
        <div className='my-10 h-96 w-full lg:h-[420px]'>
          <iframe
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.8219652911444!2d72.49594075!3d23.01889635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84576b8d8e79%3A0x208a5d302dd55e9e!2sSG%20Rd%2C%20Ahmedabad%2C%20Gujarat%2C%20India!5e0!3m2!1sen!2sus!4v1617293154619!5m2!1sen!2sus'
            width='100%'
            height='100%'
            style={{ border: 0 }}
            allowFullScreen={true}
            loading='lazy'
            title='Location Map'
          ></iframe>
        </div>

        <CallToAction />
      </div>
    </div>
  );
}
