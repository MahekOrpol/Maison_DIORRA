'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { useUserStore } from '@/store/user-store';

export default function Page() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
   const [formData, setFormData] = useState({});
  const { authUser, isLoggedIn } = useUserStore((state) => state);

  // Set form data when authUser changes
  useEffect(() => {
    if (authUser) {
      setFormData({
        name: authUser.name || '',
        email: authUser.email || '',
        phone: authUser.phone || '',
        address: authUser.address || '',
        city: authUser.city || '',
        state: authUser.state || '',
        zipCode: authUser.zipCode || '',
        birthDate: authUser.birthDate || '',
        gender: authUser.gender || ''
      });
    }
  }, [authUser]);

  if (!isLoggedIn) {
    return null; // or a loading spinner while redirect happens
  }

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
            <p className='text-base'>{authUser.name || 'Not provided'}</p>
          </div>
          <div>
            <p className='text-muted-foreground text-base font-medium'>Email</p>
            <p className='text-base'>{authUser.email || 'Not provided'}</p>
          </div>
          <div>
            <p className='text-muted-foreground text-base font-medium'>Phone</p>
            <p className='text-base'>{authUser.phone || 'Not provided'}</p>
          </div>
          <div>
            <p className='text-muted-foreground text-base font-medium'>
              Saved Address
            </p>
            <p className='text-base'>
              {authUser.address ? (
                <>
                  {authUser.address}
                  <br />
                  {authUser.city}, {authUser.state} - {authUser.zipCode}
                </>
              ) : (
                'Not provided'
              )}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Edit Profile Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className='bg-white md:h-fit md:max-w-fit'>
          <DialogHeader>
            <DialogTitle className='pb-3 text-left text-2xl text-black'>
              Edit Profile
            </DialogTitle>
          </DialogHeader>
          <form className='space-y-4'>
            <div className='flex gap-2'>
              <input
                type='text'
                id='first_name'
                placeholder='First Name'
                // value={authUser.name || ''}
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
                // value={authUser.email || ''}
                className='block w-full rounded-lg border p-3 text-sm text-black'
              />
            </div>

            <div className='space-y-2'>
              <input
                id='phone'
                name='phone'
                placeholder='Phone Number'
                // value={authUser.phone || ''}
                className='block w-full rounded-lg border p-3 text-sm text-black'
              />
            </div>

            <div className='space-y-2'>
              <input
                id='address'
                name='address'
                placeholder='Address'
                // value={authUser.address || ''}
                className='block w-full rounded-lg border p-3 text-sm text-black'
              />
            </div>
            <div className='flex justify-between gap-2'>
              <input
                id='City'
                name='City'
                placeholder='City'
                // value={authUser.city || ''}
                className='block w-full rounded-lg border p-3 text-sm text-black'
              />
              <input
                id='State'
                name='State'
                placeholder='State'
                // value={authUser.state || ''}
                className='block w-full rounded-lg border p-3 text-sm text-black'
              />
              <input
                id='Zip Code'
                name='Zip Code'
                placeholder='Zip Code'
                // value={authUser.zipCode || ''}
                className='block w-full rounded-lg border p-3 text-sm text-black'
              />
            </div>
            <div className='space-y-2'>
              <input
                id='Birth Date'
                name='Birth Date'
                placeholder='Birth Date'
                // value={authUser.birthDate || ''}
                className='block w-full rounded-lg border p-3 text-sm text-black'
              />
            </div>
            <div className='mb-4 flex items-center justify-start gap-4'>
              <div className='flex items-center'>
                <input
                  id='male-radio'
                  type='radio'
                  value='male'
                  name='gender'
                  className='h-4 w-4 border-gray-300 bg-gray-100 text-black'
                />
                <label
                  htmlFor='male-radio'
                  className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                >
                  Male
                </label>
              </div>
              <div className='flex items-center'>
                <input
                  id='female-radio'
                  type='radio'
                  value='female'
                  name='gender'
                  className='h-4 w-4 border-gray-300 bg-gray-100 text-black'
                />
                <label
                  htmlFor='female-radio'
                  className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                >
                  Female
                </label>
              </div>
            </div>

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
