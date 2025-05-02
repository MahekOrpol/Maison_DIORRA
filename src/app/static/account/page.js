'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@radix-ui/react-dropdown-menu';
import { FormProvider } from 'react-hook-form';

export default function Page() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  return (
    <div className='mx-auto max-w-3xl px-4 py-10'>
      <h1 className='mb-6 text-2xl font-bold'>My Account</h1>

      {/* Profile Info */}
      <Card className='mb-6 gap-1 pt-2 pb-4 md:gap-4 md:py-6'>
        <CardHeader className='flex flex-row items-center justify-between'>
          <CardTitle>Profile Details</CardTitle>
          <Button
            variant='ghost'
            size='icon'
            aria-label='Edit Profile'
            onClick={() => setIsEditModalOpen(true)}
          >
            <Pencil className='h-4 w-4' />
          </Button>
        </CardHeader>
        <hr />
        <CardContent className='space-y-3 pt-2 md:pt-0 xl:space-y-5'>
          <div>
            <p className='text-muted-foreground text-base font-medium'>Name</p>
            <p className='text-base'>John Doe</p>
          </div>
          <div>
            <p className='text-muted-foreground text-base font-medium'>Email</p>
            <p className='text-base'>john@example.com</p>
          </div>
          <div>
            <p className='text-muted-foreground text-base font-medium'>Phone</p>
            <p className='text-base'>+91 9876543210</p>
          </div>
          <div>
            <p className='text-muted-foreground text-base font-medium'>
              Saved Address
            </p>
            <p className='text-base'>
              123, Royal Avenue, Diamond Nagar,
              <br />
              Surat, Gujarat - 395007
              <br />
              India
            </p>
          </div>
        </CardContent>
      </Card>
      {/* Edit Profile Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className='bg-white md:h-fit md:max-w-fit'>
          <DialogHeader>
            <DialogTitle className='text-black text-2xl pb-3 text-left'>Edit Profile</DialogTitle>
          </DialogHeader>
          <form className='space-y-4'>
            <div className='flex gap-2'>
              <input
                type='text'
                id='first_name'
                placeholder='First Name'
                className='block w-full rounded-lg border p-3 text-sm text-black'
              />
              <input
                type='text'
                id='last_name'
                placeholder='Last Name'
                className='block w-full rounded-lg border p-3 text-sm text-black'
              />
            </div>

            <div className='space-y-2'>
              <input
                id='email'
                name='email'
                placeholder='Email'
                className='block w-full rounded-lg border p-3 text-sm text-black'
              />
            </div>

            <div className='space-y-2'>
              <input
                id='phone'
                name='phone'
                placeholder='Phone Number'
                className='block w-full rounded-lg border p-3 text-sm text-black'
              />
            </div>

            <div className='space-y-2'>
              <input
                id='address'
                name='address'
                placeholder='Address'
                className='block w-full rounded-lg border p-3 text-sm text-black'
              />
            </div>
            <div className='flex justify-between gap-2'>
              <input
                id='City'
                name='City'
                placeholder='City'
                className='block w-full rounded-lg border p-3 text-sm text-black'
              />
              <input
                id='State'
                name='State'
                placeholder='State'
                className='block w-full rounded-lg border p-3 text-sm text-black'
              />
              <input
                id='Zip Code'
                name='Zip Code'
                placeholder='Zip Code'
                className='block w-full rounded-lg border p-3 text-sm text-black'
              />
            </div>
            <div className='space-y-2'>
              <input
                id='Birth Date'
                name='Birth Date'
                placeholder='Birth Date'
                className='block w-full rounded-lg border p-3 text-sm text-black'
              />
            </div>

            <div class='mb-4 flex items-center justify-start'>
              <input
                id='default-radio-1'
                type='radio'
                value=''
                name='default-radio'
                class='h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600'
              />
              <label
                for='default-radio-1'
                class='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
              >
                Default radio
              </label>
              <input
                checked
                id='default-radio-2'
                type='radio'
                value=''
                name='default-radio'
                class='h-4 w-4 border-gray-300 bg-gray-100 text-blue-600  dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600'
              />
              <label
                for='default-radio-2'
                class='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
              >
                Checked state
              </label>
            </div>
            <div class='flex items-center'></div>

            <div className='flex justify-end space-x-2 pt-4'>
              <Button
                type='button'
                variant='outline'
                onClick={() => setIsEditModalOpen(false)}
                className='border-gray-300 text-black'
              >
                Cancel
              </Button>
              <Button className='bg-black text-white hover:bg-gray-800'>
                Save Changes
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
