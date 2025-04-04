import { useCheckoutStore } from '@/lib/checkout-store';
import { CreditCard, MapPin } from 'lucide-react';
import React from 'react';
import { BsHandbag } from 'react-icons/bs';

const steps = ['Shopping Cart', 'Delivery Address', 'Payment Method'];
const steps2 = [
  {
    icon: (
      <BsHandbag
        size={19}
        strokeWidth={0.3}
        className='h-4 w-4 md:h-5 md:w-5'
      />
    ),
    text: 'Shopping Cart'
  },
  {
    icon: <MapPin size={19} className='h-4 w-4 md:h-5 md:w-5' />,
    text: 'Delivery Address'
  },
  {
    icon: <CreditCard size={19} className='h-4 w-4 md:h-5 md:w-5' />,
    text: 'Payment Method'
  }
];

const ProgressBar = () => {
  const { step } = useCheckoutStore();

  return (
    <div className='mx-auto flex max-w-xl justify-center py-4'>
      {steps2.map((label, index) => (
        <React.Fragment key={index}>
          <div
            key={index}
            className='flex w-[70px] flex-col items-center md:w-auto'
          >
            <div
              className={`mb-1 flex h-8 w-8 items-center justify-center rounded-full md:h-10 md:w-10 ${step >= index + 1 ? 'bg-black text-white' : 'bg-secondary'}`}
            >
              {label.icon}
            </div>
            <p className='text-center text-xs md:text-sm'>{label.text}</p>
          </div>
          <div
            className={`mt-auto mb-4 hidden flex-1 not-last:block not-last:border-b-[0.5px] sm:mx-1 sm:mb-2 md:mx-2 ${step >= index + 1 ? 'border-gray-900' : 'border-gray-300'}`}
          ></div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgressBar;
