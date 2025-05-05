'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function OTPDialog2({ open, onOpenChange, onSubmit }) {
  const [otp, setOtp] = useState(new Array(6).fill(''));

  const handleChange = (element, index) => {
    const value = element.value.replace(/[^0-9]/g, '');
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = () => {
    const enteredOtp = otp.join('');
    onSubmit?.(enteredOtp);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-sm rounded-xl p-6 sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='text-center text-xl font-semibold'>
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
            />
          ))}
        </div>

        <DialogFooter>
          <Button className='w-full' onClick={handleSubmit}>
            Submit OTP
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
