'use client';
import { MapPin, Search } from 'lucide-react';
import React, { useState } from 'react';
import { Input } from '../ui/input';

export default function LocateAndSearch() {
  const [searchValue, setSearchValue] = useState('');

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log('User location:', latitude, longitude);
      },
      (error) => {
        console.error('Error getting location:', error);
        alert('Unable to retrieve your location');
      }
    );
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      console.log('Search:', searchValue);
      // You can also trigger an API call here
    }
  };

  return (
    <div className='flex items-center gap-2'>
      <button
        className='rounded-full p-2 hover:bg-gray-200'
        onClick={handleGetLocation}
        aria-label='Get location'
      >
        <MapPin className='h-5 w-5' />
      </button>

      <div className='relative w-full rounded-none border-b-2 border-gray-200'>
        <Search className='absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform' />
        <Input
          type='text'
          placeholder='Search...'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleSearch}
          className='w-full rounded-md border-transparent py-2 pr-4 pl-10 shadow-none focus:ring-0 focus-visible:ring-0'
        />
      </div>
    </div>
  );
}
