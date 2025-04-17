import React from 'react';
import { OrderSummary } from './order-summary';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import FloatingInput from '@/components/ui/floatingInput';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';
import PaymentMethodSection from './payment';
import { Phone } from 'lucide-react';

export default function PaymentForm({ onPrev }) {
  const router = useRouter();
  const orderItems = [
    {
      id: '1',
      name: 'Two Stone Diamond Ring',
      variant: '18k Silver / Round diamond',
      size: '3',
      price: '30,000',
      imgUrl: '/img/preview/ring1.png'
    },
    {
      id: '2',
      name: 'Two Stone Diamond Ring 2',
      variant: '22k Silver / Round diamond',
      size: '4',
      price: '30,000',
      imgUrl: '/img/preview/rose3.png'
    },
    {
      id: '3',
      name: 'Two Stone Diamond Ring lorem lorem lorem',
      variant: '18k Gold / Herald diamond',
      size: '16',
      price: '30,850',
      imgUrl: '/img/preview/gold1.png'
    }
  ];

  const handleApplyDiscount = (code) => {
    console.log('Applying discount code:', code);
    // Add your discount logic here
  };
  const handlePayment = (e) => {
    e.preventDefault();
    toast.success('Payment successffull');
    router.push('/account');
  };
  return (
    <div className='flex flex-col justify-between gap-[3%] md:flex-row 2xl:gap-[7%]'>
      <div className='flex-1 pr-4'>
        <h2 className='mb-4 text-xl font-semibold md:text-2xl'>
          Choose Payment Method
        </h2>
        <div className='w-full max-w-4xl'>
          {/* payment gateway form  */}
          <div>
            <div className='max-w-3xl'>
              <PaymentMethodSection />
            </div>
            <div>
              <div className='my-8 text-sm'>
                <label
                  htmlFor='rememberme'
                  className='mb-1 inline-block font-semibold md:text-lg'
                >
                  Remember me
                </label>
                <div className='flex items-center gap-2 border p-2 leading-4 md:px-4 md:py-3'>
                  <Input
                    type='checkbox'
                    name='rememberme'
                    checked
                    onChange={() => console.log('remember me selected')}
                    className='inline h-4 w-4 rounded-sm text-white accent-black'
                  />
                  Save my information for a faster checkout with shop account
                </div>
                <div className='bg-secondary mb-1 rounded-b-lg p-2 md:p-4'>
                  <div className='w-full'>
                    <label className='mb-1 block text-sm font-medium text-gray-700'>
                      Mobile phone number
                    </label>
                    <div className='flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2'>
                      <Phone className='h-4 w-4 text-gray-500' />
                      <span className='text-sm text-gray-700'>+1</span>
                      <input
                        type='tel'
                        placeholder='Enter mobile number'
                        className='flex-1 border-none bg-transparent py-1 text-sm text-gray-900 placeholder-gray-400 focus:outline-none'
                      />
                    </div>
                  </div>
                </div>
                <p className='text-muted-foreground flex items-center'>
                  <Lock className='mr-2 inline h-4 w-4' />
                  Secure and encrypted
                </p>
              </div>
              <Button
                className='w-full text-lg sm:text-xl'
                size='lg'
                onClick={handlePayment}
              >
                Pay Now
              </Button>
              <p className='mt-2 text-xs font-light sm:text-sm'>
                Your info will be saved to a Shop account. By continuing, you
                agree to Shop's{' '}
                <Link href='/terms' className='font-medium hover:underline'>
                  Terms of Service
                </Link>{' '}
                and acknowledge the{' '}
                <Link
                  href='/privacy-policy'
                  className='font-medium hover:underline'
                >
                  {' '}
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full md:max-w-sm lg:max-w-xl'>
        <OrderSummary
          items={orderItems}
          subtotal='90,850'
          shipping='Free'
          taxes='9,085'
          total='99,935'
          onApplyDiscount={handleApplyDiscount}
        />
      </div>
    </div>
  );
}
