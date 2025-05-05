'use client';

import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import CreditCardForm from './bank-card-form';
import { CreditCard, Banknote, Wallet, IndianRupee, Timer } from 'lucide-react';
import { Input } from '@/components/ui/input';

const paymentOptions = [
  {
    id: 'bank_card',
    renderLabel: () => (
      <div className='flex w-full items-center justify-between'>
        <span className='font-medium'>Credit Card</span>
        <div className='hidden gap-2 min-[500px]:inline-flex'>
          <img
            src='/img/payment/rupay.png'
            alt='rupay'
            className='h-7 border border-[#959595]'
          />
          <img
            src='/img/payment/mastercard.svg'
            alt='MasterCard'
            className='h-7 w-15 border border-[#959595] pt-[1px]'
          />
          <img
            src='/img/payment/mobikwik.svg'
            alt='mobikwik'
            className='h-7 bg-white'
          />
          <img
            src='/img/payment/visa.svg'
            alt='Visa'
            className='h-7 border border-[#959595]'
          />
          <span className='inline-flex h-7 w-12 items-center justify-center border border-black/60'>
            + 2
          </span>
        </div>
      </div>
    )
  },
  {
    id: 'paytm',
    renderLabel: () => (
      <div className=''>
        <img src='/img/payment/paytm.svg' alt='Paytm' className='h-6' />
      </div>
    )
  },
  {
    id: 'google_pay',
    renderLabel: () => (
      <div className=''>
        <img
          src='/img/payment/gpay.svg'
          alt='Google Pay'
          className='h-[21px] w-[60px]'
        />
      </div>
    )
  },
  {
    id: 'paypal',
    renderLabel: () => (
      <div className=''>
        <img src='/img/payment/paypal.svg' alt='Paypal' className='h-6' />
      </div>
    )
  },
  {
    id: 'cod',
    renderLabel: () => (
      <span className='font-medium'>Cash on Delivery (COD)</span>
    )
  },
  {
    id: 'emi',
    renderLabel: () => <span className='font-medium'>Purchase on EMI</span>
  }
];

export default function PaymentMethodSection() {
  const [selectedMethod, setSelectedMethod] = useState('credit_card');
  const renderContent = (method) => {
    switch (method) {
      case 'bank_card':
        return <CreditCardForm />;
      case 'paytm':
        return <PaytmInfo />;
      case 'google_pay':
        return <GooglePayInfo />;
      case 'paypal':
        return <PaypalInfo />;
      case 'cod':
        return <CODInfo />;
      case 'emi':
        return <EMIInfo />;
      default:
        return null;
    }
  };

  return (
    <div className='bg-muted'>
      <RadioGroup
        value={selectedMethod}
        onValueChange={setSelectedMethod}
        className='gap-0'
      >
        {paymentOptions.map((option) => (
          <div
            key={option.id}
            className={cn(
              'rounded-md border border-gray-300 px-4 py-3',
              selectedMethod === option.id && 'border-black shadow-md'
            )}
          >
            <label className='flex w-full cursor-pointer items-center space-x-2'>
              <RadioGroupItem value={option.id} id={option.id} />
              <div className='flex-1'>{option.renderLabel()}</div>
            </label>

            {selectedMethod === option.id && (
              <div className='mt-4'>{renderContent(option.id)}</div>
            )}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

export function PaytmInfo() {
  return (
    <div className='space-y-2 rounded-xl border bg-white p-4'>
      <div className='flex items-center gap-2 font-medium'>
        <Wallet className='h-5 w-5' />
        Paytm Wallet
      </div>
      <Input
        type='text'
        placeholder='Enter your Paytm registered mobile number'
        className='h-11 md:text-base'
      />
      <p className='text-sm'>
        You will receive a payment request on this number.
      </p>
    </div>
  );
}

export function GooglePayInfo() {
  return (
    <div className='space-y-2 rounded-xl border bg-white p-4'>
      <div className='flex items-center gap-2 font-medium'>
        <Wallet className='h-5 w-5 text-black' />
        Google Pay (GPay)
      </div>
      <Input
        type='text'
        placeholder='Enter your GPay UPI ID (e.g. name@okaxis)'
        className='h-11 md:text-base'
      />
      <p className='text-sm'>
        We&apos;ll send a collect request to your UPI ID for approval.
      </p>
    </div>
  );
}

export function PaypalInfo() {
  return (
    <div className='space-y-2 rounded-xl border bg-white p-4'>
      <div className='flex items-center gap-2 font-medium'>
        <CreditCard className='h-5 w-5 text-black' />
        PayPal
      </div>
      <Input
        type='email'
        placeholder='Enter your PayPal email address'
        className='h-11 md:text-base'
      />
      <p className='text-sm'>
        You&apos;ll be redirected to PayPal to complete the transaction.
      </p>
    </div>
  );
}

export function CODInfo() {
  return (
    <div className='space-y-2 rounded-xl border bg-white p-4'>
      <div className='flex items-center gap-2 font-medium'>
        <Banknote className='h-5 w-5 text-black' />
        Cash on Delivery (COD)
      </div>
      <p className='text-sm'>
        You will pay with cash when your order is delivered. Please ensure you
        have the exact amount ready.
      </p>
    </div>
  );
}

export function EMIInfo() {
  return (
    <div className='space-y-2 rounded-xl border bg-white p-4'>
      <div className='flex items-center gap-2 font-medium'>
        <Timer className='h-5 w-5 text-black' />
        EMI / Pay Later
      </div>
      <select className='h-11 w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:outline-none md:text-base'>
        <option value=''>Select a Bank or Provider</option>
        <option value='hdfc'>HDFC Bank</option>
        <option value='icici'>ICICI Bank</option>
        <option value='bajaj'>Bajaj Finserv</option>
        <option value='slice'>Slice</option>
      </select>
      <p className='text-sm'>
        Choose your EMI provider and you&apos;ll be redirected to complete the
        setup.
      </p>
    </div>
  );
}
