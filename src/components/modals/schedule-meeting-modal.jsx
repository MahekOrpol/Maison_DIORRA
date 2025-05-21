'use client';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Clock, Calendar as CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { format } from 'date-fns';

export function ScheduleCallDialog({ open, setOpen }) {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [language] = useState('english');
  const [country, setCountry] = useState({ code: '+1', name: 'US' });
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [platform, setPlatform] = useState('');
  const [notes, setNotes] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const resetForm = () => {
    setDate(new Date());
    setTime('');
    setCountry({ code: '+1', name: 'US' });
    setPhone('');
    setEmail('');
    setPlatform('');
    setNotes('');
    setFormErrors({});
  };

  const validateForm = () => {
    const errors = {};

    if (!time) errors.time = 'Please select a time';
    if (!phone.trim()) errors.phone = 'Phone number is required';
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = 'Email is invalid';
    }
    if (!platform) errors.platform = 'Platform is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = {
      date: format(date, 'yyyy-MM-dd'),
      time,
      phone: `${country.code} ${phone}`,
      email,
      language,
      country: country.name,
      platform,
      notes
    };

    // console.log('Form Data:', formData);
    alert(
      'Thank you for scheduling your consultation! We will contact you shortly.'
    );
    resetForm(); // Clear all inputs after successful submission
    setOpen(false); // Close the dialog
  };

  const countryOptions = [
    { code: '+1', name: 'US' },
    { code: '+44', name: 'UK' },
    { code: '+91', name: 'India' },
    { code: '+971', name: 'UAE' },
    { code: '+65', name: 'Singapore' },
    { code: '+60', name: 'Malaysia' }
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='border-0 p-0 sm:w-[90vw] md:max-w-2xl lg:max-w-4xl xl:max-w-5xl'>
        <form onSubmit={handleSubmit}>
          <div className='flex'>
            {/* Left Side - Banner */}
            <div className='bg-primary hidden w-2/5 lg:block'>
              <div className='flex h-full flex-col justify-between p-8 text-white'>
                <div>
                  <h3 className='text-2xl font-bold'>
                    Live Video Consultation
                  </h3>
                  <p className='mt-2 text-sm opacity-90'>
                    See your favorite jewelry designs up close with our experts
                  </p>
                </div>

                <ul className='mt-6 space-y-4 text-sm'>
                  <li className='flex items-start'>
                    <div className='mt-0.5 mr-3 flex h-5 w-5 items-center justify-center rounded-full bg-white/20'>
                      ✓
                    </div>
                    <span>Personalized design recommendations</span>
                  </li>
                  <li className='flex items-start'>
                    <div className='mt-0.5 mr-3 flex h-5 w-5 items-center justify-center rounded-full bg-white/20'>
                      ✓
                    </div>
                    <span>See actual size and details in real-time</span>
                  </li>
                  <li className='flex items-start'>
                    <div className='mt-0.5 mr-3 flex h-5 w-5 items-center justify-center rounded-full bg-white/20'>
                      ✓
                    </div>
                    <span>Get expert styling advice</span>
                  </li>
                </ul>

                <div className='mt-8'>
                  <Image
                    src='/img/ads/add4.png'
                    alt='Ad Image'
                    width={400}
                    height={30}
                    className='rounded-lg'
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className='w-full p-4 sm:p-6 lg:w-3/5'>
              <DialogHeader>
                <DialogTitle className='text-xl font-bold text-gray-800 sm:text-2xl'>
                  Schedule Video Consultation
                </DialogTitle>
                <p className='text-sm text-gray-600'>
                  Our expert will contact you at your preferred time
                </p>
              </DialogHeader>

              <div className='mt-3 space-y-3 sm:mt-6 sm:space-y-5'>
                {/* Date and Time */}
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                  {/* Date Picker */}
                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-gray-700'>
                      Preferred Date*
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant='outline'
                          className='w-full justify-start text-left font-normal'
                        >
                          <CalendarIcon className='mr-2 h-4 w-4' />
                          {date ? (
                            format(date, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0'>
                        <Calendar
                          mode='single'
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Time Selector */}
                  <div className='relative space-y-2'>
                    <label className='text-sm font-medium text-gray-700'>
                      Preferred Time*
                    </label>
                    <Clock className='absolute top-9 left-3 z-10 h-4 w-4 text-gray-400' />
                    <Select value={time} onValueChange={setTime}>
                      <SelectTrigger className='w-full pl-10'>
                        <SelectValue placeholder='Select time' />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          '10:00',
                          '11:00',
                          '12:00',
                          '14:00',
                          '15:00',
                          '16:00',
                          '17:00'
                        ].map((slot) => (
                          <SelectItem key={slot} value={slot}>
                            {slot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {formErrors.time && (
                      <p className='text-sm text-red-500'>{formErrors.time}</p>
                    )}
                  </div>
                </div>

                {/* Contact Information */}
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-gray-700'>
                    Phone Number*
                  </label>
                  <div className='grid grid-cols-12 gap-2'>
                    <div className='col-span-5 sm:col-span-4'>
                      <Select
                        value={country.code}
                        onValueChange={(code) => {
                          const selected = countryOptions.find(
                            (c) => c.code === code
                          );
                          if (selected) setCountry(selected);
                        }}
                      >
                        <SelectTrigger className='w-full'>
                          <SelectValue
                            placeholder='+1'
                            renderValue={() =>
                              `${country.code} ${country.name}`
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {countryOptions.map((c) => (
                            <SelectItem key={c.code} value={c.code}>
                              <span className='text-muted-foreground'>
                                {c.code}
                              </span>{' '}
                              <span>{c.name}</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className='col-span-7 sm:col-span-8'>
                      <Input
                        type='tel'
                        placeholder='(123) 456-7890'
                        required
                        pattern='[0-9]{10,15}'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                      {formErrors.phone && (
                        <p className='text-sm text-red-500'>
                          {formErrors.phone}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className='space-y-2'>
                  <Input
                    type='email'
                    placeholder='your@email.com'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {formErrors.email && (
                    <p className='text-sm text-red-500'>{formErrors.email}</p>
                  )}
                </div>

                {/* Fixed Language */}
                <div className='space-y-1'>
                  <label className='text-sm font-medium text-gray-700'>
                    Language
                  </label>
                  <Input value='English' disabled className='bg-gray-100' />
                  <p className='text-muted-foreground text-xs'>
                    English is the default and only supported language for
                    consultations at this time.
                  </p>
                </div>

                {/* Platform */}
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-gray-700'>
                    Preferred Platform*
                  </label>
                  <Select value={platform} onValueChange={setPlatform} required>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Select platform' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='zoom'>Zoom (Recommended)</SelectItem>
                      <SelectItem value='google-meet'>Google Meet</SelectItem>
                      <SelectItem value='whatsapp'>WhatsApp Video</SelectItem>
                      <SelectItem value='phone'>
                        Phone Call (No Video)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {formErrors.platform && (
                    <p className='text-sm text-red-500'>
                      {formErrors.platform}
                    </p>
                  )}
                </div>

                {/* Additional Notes */}
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-gray-700'>
                    Any specific designs you'd like to see? (Optional)
                  </label>
                  <Textarea
                    placeholder='Mention product codes or styles...'
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type='submit'
                  className='mt-4 w-full py-3 text-sm font-medium sm:py-6 sm:text-base'
                >
                  Confirm Video Call Appointment
                </Button>
              </div>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
