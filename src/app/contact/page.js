'use client';

import { useState } from 'react';
import {
  MailOpenIcon as Envelope,
  Phone,
  Briefcase,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = () => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <div className='flex min-h-screen flex-col'>
      {/* Hero Section */}
      <div
        className='relative h-64 w-full bg-cover bg-center md:h-80'
        style={{
          backgroundImage: "url('/placeholder.svg?height=800&width=1600')",
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(0,0,0,0.4)'
        }}
      >
        <div className='absolute inset-0 flex items-center justify-center'>
          <h1 className='text-4xl font-bold text-white md:text-5xl'>
            Contact Us
          </h1>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className='wrapper mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
          {/* Email Card */}
          <div className='flex flex-col items-center rounded-lg border p-6 text-center'>
            <div className='mb-4 rounded-lg bg-black p-4'>
              <Envelope className='h-8 w-8 text-white' />
            </div>
            <h2 className='mb-4 text-xl font-semibold'>E-mail</h2>
            <p className='mb-1 text-sm'>Main Email: info@misiondiorra.com</p>
            <p className='text-sm'>Inquiries: customercare123@gmail.com</p>
          </div>
          {/* Contact Card */}
          <div className='flex flex-col items-center rounded-lg border p-6 text-center'>
            <div className='mb-4 rounded-lg bg-black p-4'>
              <Phone className='h-8 w-8 text-white' />
            </div>
            <h2 className='mb-4 text-xl font-semibold'>Contact Us</h2>
            <p className='mb-1 text-sm'>Office Telephone: 0261 697 456</p>
            <p className='text-sm'>Mobile: 87878 87876</p>
          </div>

          {/* Working Hours Card */}
          <div className='flex flex-col items-center rounded-lg border p-6 text-center'>
            <div className='mb-4 rounded-lg bg-black p-4'>
              <Briefcase className='h-8 w-8 text-white' />
            </div>
            <h2 className='mb-4 text-xl font-semibold'>Working Hours</h2>
            <p className='mb-1 text-sm'>
              Monday - Friday: 9:00 A.M to 8:00 P.M
            </p>
            <p className='text-sm'>Saturday - Sunday: 9:00 A.M to 5:00 P.M</p>
          </div>
        </div>
      </div>

      {/* Appointment and Contact Form Section */}
      <div className='wrapper mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
          {/* Virtual Appointment Section */}
          <div className='flex flex-col'>
            <p className='mb-2 text-lg font-medium'>Virtual Appointment</p>
            <h2 className='mb-4 text-3xl font-bold'>
              Schedule
              <br />
              an Appointment
            </h2>
            <p className='mb-6'>
              Experience personalized jewelry shopping from the comfort of your
              home! Our expert consultants are here to guide you through our
              collections.
            </p>
            <div>
              <button className='flex items-center space-x-2 bg-black px-6 py-3 text-white transition-colors hover:bg-gray-800'>
                <span>Book Appointment</span>
                <ArrowRight className='h-4 w-4' />
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className='rounded-lg bg-white p-6 shadow-md'>
            <h2 className='mb-4 text-2xl font-bold'>Leave a Message</h2>
            <p className='mb-6'>
              Please fill out the below form and leave us a message. We will
              reply within 24 hours.
            </p>

            <form onSubmit={handleSubmit}>
              <div className='mb-4 grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div>
                  <label htmlFor='firstName' className='mb-1 block text-sm'>
                    First Name
                  </label>
                  <input
                    type='text'
                    id='firstName'
                    name='firstName'
                    value={formData.firstName}
                    onChange={handleChange}
                    className='w-full rounded-md border p-2'
                    required
                  />
                </div>
                <div>
                  <label htmlFor='lastName' className='mb-1 block text-sm'>
                    Last Name
                  </label>
                  <input
                    type='text'
                    id='lastName'
                    name='lastName'
                    value={formData.lastName}
                    onChange={handleChange}
                    className='w-full rounded-md border p-2'
                    required
                  />
                </div>
              </div>

              <div className='mb-4 grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div>
                  <label htmlFor='email' className='mb-1 block text-sm'>
                    E-mail
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    className='w-full rounded-md border p-2'
                    required
                  />
                </div>
                <div>
                  <label htmlFor='phone' className='mb-1 block text-sm'>
                    Phone Number
                  </label>
                  <input
                    type='tel'
                    id='phone'
                    name='phone'
                    value={formData.phone}
                    onChange={handleChange}
                    className='w-full rounded-md border p-2'
                    required
                  />
                </div>
              </div>

              <div className='mb-4'>
                <label htmlFor='message' className='mb-1 block text-sm'>
                  Message
                </label>
                <textarea
                  id='message'
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className='w-full rounded-md border p-2'
                  required
                ></textarea>
              </div>

              <button
                type='submit'
                className='bg-black px-6 py-3 text-white transition-colors hover:bg-gray-800'
              >
                Submit Now
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className='mt-8 h-96 w-full'>
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
      <LabelTag
        number={2}
        text='Select Your'
        highlight='SETTING'
        imageSrc='/path-to-your-icon.png'
        link='/settings'
      />
    </div>

    // hello sir how are you ------------------------------------
  );
}

const LabelTag = ({ number, text, highlight, imageSrc, link }) => {
  return (
    <Link
      href={link}
      className={cn(
        'relative flex items-center justify-between border border-black px-4 py-2 text-black',
        'w-full max-w-md bg-white',
        'clip-path-[polygon(0%_0%,100%_0%,97%_50%,100%_100%,0%_100%)]' // Creates the angled corner effect
      )}
    >
      <span className='flex items-center gap-2 text-lg font-medium'>
        <span className='text-2xl font-bold'>{number}.</span>
        {text} <strong>{highlight}</strong>
      </span>

      <div className='flex h-10 w-10 items-center justify-center rounded-full bg-gray-300'>
        <Image src={imageSrc} alt='icon' width={24} height={24} />
      </div>
    </Link>
  );
};
