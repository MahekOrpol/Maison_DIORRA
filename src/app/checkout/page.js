'use client';

import { useCheckoutStore } from '@/store/checkout-store';
import ProgressBar from './components/progress-bar';
import ShoppingCart from './components/shopping-cart';
import DeliveryForm from './components/delivery-form';
import PaymentForm from './components/payment-form';
import { useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';

const CheckoutPage = () => {
  const { step, setStep, cart, setCart } = useCheckoutStore();

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  // useEffect(() => {
  //   fetch('http://localhost:4000/cart')
  //     .then((res) => res.json())
  //     .then((data) => setCart(data))
  //     .catch((err) => console.log(err));
  // }, []);

  return (
    <div className='wrapper pt-2 lg:pt-4'>
      {/* Progress Bar */}
      <ProgressBar />
      {step > 1 && (
        <button
          onClick={prevStep}
          className='mb-4 flex items-center text-sm text-gray-600 hover:text-gray-900'
        >
          <ChevronLeft className='mr-1 h-5 w-5' />
          Back
        </button>
      )}
      {/* Step Content */}
      <section className='my-2 md:my-8'>
        {step === 1 && <ShoppingCart onNext={nextStep} />}
        {step === 2 && <DeliveryForm onNext={nextStep} onPrev={prevStep} />}
        {step === 3 && <PaymentForm onPrev={prevStep} />}
      </section>
    </div>
  );
};

export default CheckoutPage;
