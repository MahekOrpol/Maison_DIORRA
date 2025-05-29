'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useUserStore } from '@/store/user-store';
import { toast } from 'sonner'; // or your preferred toast library
import { baseApiUrl } from '@/lib/utils';

export default function Page() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    birthDate: '',
    gender: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { authUser, isLoggedIn, updateUser } = useUserStore((state) => state);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!authUser?.id) return;

      setIsLoading(true);
      try {
        const response = await fetch(
          `${baseApiUrl}/api/v1/users/${authUser.id}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await response.json();
        updateUser(userData); // Update store with fresh data

        setFormData({
          name: userData.name || '',
          email: userData.email || '',
          phone: userData.phone || '',
          address: userData.address || '',
          city: userData.city || '',
          state: userData.state || '',
          zipCode: userData.zipCode || '',
          birthDate: userData.birthDate || '',
          gender: userData.gender || ''
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to load profile data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [authUser?.id, updateUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!authUser?.id) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `${baseApiUrl}/api/v1/users/${authUser.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedUser = await response.json();
      updateUser(updatedUser); // Update store with new data
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  // Reset form to original values
  const handleReset = () => {
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
  };

  if (!isLoggedIn) return null;

  return (
    <div className='mx-auto max-w-3xl px-1 xs:px-4 py-10'>
      <Card className='rounded-2xl border border-gray-200 bg-gradient-to-br gap-2 sm:gap-6 from-white to-gray-50 p-3 xs:p-6 shadow-xl transition-all duration-300 hover:shadow-2xl'>
        <CardHeader>
          <CardTitle className='text-2xl underline'>Edit Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form className='space-y-4' onSubmit={handleSubmit}>
            <div className='flex gap-2'>
              <input
                type='text'
                placeholder='Full Name'
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className='block w-full rounded-lg border p-3 text-sm text-black'
                disabled={isLoading}
                required
              />
            </div>

            <div>
              <input
                type='email'
                placeholder='Email'
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                className='block w-full rounded-lg border p-3 text-sm text-black'
                disabled={isLoading}
                required
              />
            </div>

            <div>
              <input
                type='tel'
                placeholder='Phone Number'
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, phone: e.target.value }))
                }
                className='block w-full rounded-lg border p-3 text-sm text-black'
                disabled={isLoading}
              />
            </div>

            <div>
              <input
                placeholder='Address'
                value={formData.address}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, address: e.target.value }))
                }
                className='block w-full rounded-lg border p-3 text-sm text-black'
                disabled={isLoading}
              />
            </div>

            <div className='flex gap-2'>
              <input
                placeholder='City'
                value={formData.city}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, city: e.target.value }))
                }
                className='block w-full rounded-lg border p-3 text-sm text-black'
                disabled={isLoading}
              />
              <input
                placeholder='State'
                value={formData.state}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, state: e.target.value }))
                }
                className='block w-full rounded-lg border p-3 text-sm text-black'
                disabled={isLoading}
              />
              <input
                placeholder='Zip Code'
                value={formData.zipCode}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, zipCode: e.target.value }))
                }
                className='block w-full rounded-lg border p-3 text-sm text-black'
                disabled={isLoading}
              />
            </div>

            <div>
              <input
                type='date'
                placeholder='Birth Date'
                value={formData.birthDate}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    birthDate: e.target.value
                  }))
                }
                className='block w-full rounded-lg border p-3 text-sm text-black'
                disabled={isLoading}
              />
            </div>

            <div className='flex items-center gap-4'>
              <label className='flex items-center'>
                <input
                  type='radio'
                  name='gender'
                  value='male'
                  checked={formData.gender === 'male'}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, gender: e.target.value }))
                  }
                  className='h-4 w-4 border-gray-300 text-black'
                  disabled={isLoading}
                />
                <span className='ml-2 text-sm'>Male</span>
              </label>
              <label className='flex items-center'>
                <input
                  type='radio'
                  name='gender'
                  value='female'
                  checked={formData.gender === 'female'}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, gender: e.target.value }))
                  }
                  className='h-4 w-4 border-gray-300 text-black'
                  disabled={isLoading}
                />
                <span className='ml-2 text-sm'>Female</span>
              </label>
            </div>

            <div className='sm:flex justify-end space-x-2 pt-4'>
              <Button
                type='submit'
                className='bg-black text-white hover:bg-gray-800 w-full'
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Update Profile'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
