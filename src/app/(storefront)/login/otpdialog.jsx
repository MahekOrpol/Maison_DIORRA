'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import axios from 'axios';
import { ResetPasswordDialog } from './resetpassworddialog';
import { baseApiUrl } from '@/lib/utils';

export function OTPDialog({ open, onOpenChange, onSubmit, email }) {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [openResetPassword, setOpenResetPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (element, index) => {
    const value = element.value.replace(/[^0-9]/g, '');
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if there is a digit
    if (element.nextSibling && value) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      e.preventDefault(); // Prevent default backspace behavior

      const newOtp = [...otp];

      if (otp[index]) {
        // If current input has value, just clear it
        newOtp[index] = '';
        setOtp(newOtp);
      } else if (index > 0) {
        // If current input is empty and not the first input,
        // move focus to previous input and clear it
        newOtp[index - 1] = '';
        setOtp(newOtp);
        e.target.previousSibling.focus();
      }
    }
  };

  const handleSubmit = async () => {
    const enteredOtp = otp.join('');

    if (enteredOtp.length !== 6) {
      setError('Please enter a complete 6-digit OTP');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Make API call with Axios
      const response = await axios.post(
        `${baseApiUrl || 'http://153.92.222.195:5000'}/api/v1/auth/verify-otp`,
        {
          email: email, // Make sure this is not null/undefined
          generateOTP: enteredOtp
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status == 200) {
        toast.success(response.data.message);
      }

      // Handle successful response
      onSubmit?.(response.data);
      setOpenResetPassword(true);
      onOpenChange(false);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || 'Verification failed';
      setError(errorMessage);
      setOtp(new Array(6).fill(''));

      // Debugging: Log the exact request being sent
      console.error('API Request Failed:', {
        url: `${baseApiUrl || 'http://153.92.222.195:5000'}/api/v1/auth/verify-otp`,
        payload: {
          email: email,
          generateOTP: enteredOtp
        },
        error: err.response?.data || err.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className='xs2:p-6 rounded-xl p-1.5 sm:max-w-md'>
          <DialogHeader>
            <DialogTitle className='mb-2 text-center text-xl font-semibold'>
              Enter OTP
            </DialogTitle>
          </DialogHeader>

          <div className='text-muted-foreground xs2:mb-4 mb-3 text-center text-sm'>
            Please enter the 6-digit code sent to your email address.
          </div>

          <div className='xs2:gap-2 mb-6 flex justify-center gap-1'>
            {otp.map((data, index) => (
              <input
                key={index}
                type='text'
                maxLength='1'
                className='h-12 w-10 rounded-md border border-gray-300 text-center text-lg focus:border-black focus:outline-none'
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onFocus={(e) => e.target.select()}
              />
            ))}
          </div>

          <DialogFooter>
            <Button
              className='xs2:h-11 h-9 w-full text-base'
              onClick={handleSubmit}
              email={email}
              disabled={otp.join('').length !== 6}
            >
              Verify OTP
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ResetPasswordDialog
        open={openResetPassword}
        setOpen={setOpenResetPassword}
        email={email}
      />
    </>
  );
}
