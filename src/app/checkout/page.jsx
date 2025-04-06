'use client';

import { useCheckoutStore } from '@/lib/checkout-store';
import ProgressBar from './components/progress-bar';
import ShoppingCart from './components/shopping-cart';
import DeliveryForm from './components/delivery-form';
import PaymentForm from './components/payment-form';
import Heading from '@/components/heading';
import PreviewCard from '@/components/preview-card';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';

const CheckoutPage = () => {
  const { step, setStep } = useCheckoutStore();

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const cardData = [
    {
      iconUrl: '/icons/wallet.svg',
      title: 'Flexible Payment',
      subtitle: 'Enjoy easy, flexible payment options to suit your budget'
    },
    {
      iconUrl: '/icons/money.svg',
      title: 'Money Gaurantee',
      subtitle:
        'Shop with confidence our money-back guarantee ensures your satisfaction'
    },
    {
      iconUrl: '/icons/certificate2.svg',
      title: 'Certifications',
      subtitle:
        'All our jewelry pieces are certified for quality and ethical sourcing.'
    },
    {
      iconUrl: '/icons/support.svg',
      title: 'Online Support',
      subtitle:
        'Need assistance? Our dedicated online support team is here to help you 24/7.'
    }
  ];

  return (
    <div className='wrapper'>
      {/* Progress Bar */}
      <ProgressBar />

      {/* Step Content */}
      <section className='my-8'>
        {step === 1 && <ShoppingCart onNext={nextStep} />}
        {step === 2 && <DeliveryForm onNext={nextStep} onPrev={prevStep} />}
        {step === 3 && <PaymentForm onPrev={prevStep} />}
      </section>
      {/* Other content */}
      <section className='mb-12'>
        <Heading
          title='Related Products'
          subtitle='You might also like to buy'
        />
        <Carousel className=''>
          <CarouselContent className=''>
            {Array.from({ length: 6 }).map((_, index) => (
              <CarouselItem
                key={index}
                className='basis-1/2 lg:basis-1/3 xl:basis-1/4'
              >
                <PreviewCard key={index} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='translate-x-8' />
          <CarouselNext className='-translate-x-8' />
        </Carousel>
      </section>

      <section className='mb-18 flex flex-col items-center gap-4'>
        <Image
          src='/icons/logo-diorra2.svg'
          alt='logo'
          width={350}
          height={150}
          className=''
        />
        <p className='max-w-4xl text-center text-sm font-light'>
          Discover exquisite craftsmanship and timeless elegance with our
          stunning collection of jewelry. From everyday wear to special occasion
          pieces, we have something for everyone. Choose your metals, stones,
          and styles to create a piece that is uniquely yours.
        </p>
        <form className='mx-auto mt-2 flex w-full max-w-lg items-center rounded-md border bg-white p-1 text-black shadow-[0_1px_8px_rgba(0,0,0,0.15)] lg:mt-0'>
          <Input
            placeholder='Enter Your Email'
            required
            type='email'
            className='w-full border-0 text-base shadow-none outline-none focus-visible:ring-0'
          />
          <button
            type='submit'
            className='ml-2 flex w-[120px] justify-center rounded bg-black px-4 py-1 text-white'
          >
            Subscribe
          </button>
        </form>
        <div className='mt-4 flex flex-col flex-wrap items-center justify-center gap-4 text-center sm:flex-row md:justify-around'>
          {cardData.map((card, index) => (
            <div
              key={index}
              className='flex max-w-[250px] flex-col items-center gap-2 md:w-[23%]'
            >
              <Image
                src={card.iconUrl}
                alt={card.title}
                width={35}
                height={35}
                className='h-full'
              />
              <div>
                <h3 className='mb-1 text-lg md:mb-2 lg:text-2xl'>
                  {card.title}
                </h3>
                <p className='text-xs leading-4 font-light lg:text-sm'>
                  {card.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CheckoutPage;
