'use client';
import { MapPin, Search } from 'lucide-react';
import React, { useState } from 'react';
import { Input } from '../ui/input';
import { useRouter } from 'next/navigation';
import { baseUrl } from '@/lib/utils';

export default function LocateAndSearch() {
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

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
      router.push('/search?query=' + searchValue);
      setSearchValue("");
      // router.push(`${baseUrl}/api/v1/product/get?productName=` + searchValue);
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

      {/* <div className='relative w-full rounded-none border-b-2 border-gray-200'>
        <Search className='absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform' />
        <Input
          type='text'
          placeholder='Search...'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleSearch}
          className='w-full rounded-md border-transparent py-2 pr-4 pl-10 shadow-none focus:ring-0 focus-visible:ring-0'
        />
      </div> */}

      <div className='relative w-full border-b border-gray-400 transition-colors'>
        <Search className='absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-black/70' />
        <Input
          type='text'
          placeholder='Search products...'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleSearch}
          className='w-full border-none bg-transparent py-2 pr-4 pl-10 shadow-none outline-none focus:outline-none focus-visible:ring-0'
        />
      </div>
      {/* <div className='relative w-full'>
        <Search className='absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-white' />
        <input
          type='text'
          placeholder='Search collections, rings...'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleSearch}
          className='w-full rounded-full border border-gray-600 bg-transparent py-2 pr-4 pl-12 text-white transition placeholder:text-gray-400 hover:border-white focus:border-white focus:outline-none'
        />
      </div> */}
    </div>
  );
}
