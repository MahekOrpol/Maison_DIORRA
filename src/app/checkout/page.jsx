'use client';

import { useCheckoutStore } from '@/lib/checkout-store';
import ProgressBar from './components/progress-bar';
import ShoppingCart from './components/shopping-cart';
import DeliveryForm from './components/delivery-form';
import PaymentForm from './components/payment-form';
import CallToAction from '@/components/call-to-action';
import RelatedProducts from '@/components/related-products';

const CheckoutPage = () => {
  const { step, setStep } = useCheckoutStore();

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

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

      {/* other content */}
      <RelatedProducts />
      <CallToAction />
    </div>
  );
};

export default CheckoutPage;
