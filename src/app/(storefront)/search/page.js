'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, SearchX } from 'lucide-react';
import PreviewCard3 from '@/components/preview-card';
import axios from 'axios';
import { baseUrl } from '@/lib/utils';
import PreviewCard from '@/components/preview-card';

export default function SearchPage() {
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const [Products,setProducts] = useState([]);

  // Sync query param to input field when page loads or URL changes
  useEffect(() => {
    if (query) {
      setSearchValue(query);
      searchQuery(query);
    }
  }, [query]);
  const searchQuery = async (query) => {
      try {
        // Navigate to search page with query parameter
        // router.push(`/search?query=${encodeURIComponent(searchValue.trim())}`);

        // Make API call
        const response = await axios.get(`${baseUrl}/api/v1/product/get`, {
          params: {
            productName: query.trim()
          }
        });
        setProducts(response.data);
        // Handle the response data
        console.log('Search results:', response.data);
        // You might want to store the results in state or context
        // setSearchResults(response.data);

      } catch (error) {
        console.error('Error fetching search results:', error);
        // Handle error (show toast, etc.)
      }
  }
  const handleSearch = async (e) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      try {
        // Navigate to search page with query parameter
        router.push(`/search?query=${encodeURIComponent(searchValue.trim())}`);

        // Make API call
        const response = await axios.get(`${baseUrl}/api/v1/product/get`, {
          params: {
            productName: searchValue.trim()
          }
        });
        setProducts(response.data);
        // Handle the response data
        console.log('Search results:', response.data);
        // You might want to store the results in state or context
        // setSearchResults(response.data);

      } catch (error) {
        console.error('Error fetching search results:', error);
        // Handle error (show toast, etc.)
      }
    }
  };


  return (
    <div className='flex min-h-screen flex-col items-center justify-start px-4 pt-10'>
      <div className='w-full max-w-3xl'>
        <div className='relative w-full border-b border-gray-700 transition-colors'>
          <Search className='absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400' />
          <input
            type='text'
            placeholder='Search for diamonds, rings, collections...'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleSearch}
            className='w-full bg-transparent py-3 pr-4 pl-10 text-lg outline-none placeholder:text-gray-500'
          />
        </div>
      </div>

      {/* Optional: Search Results */}
      <div className='wrapper mt-12 w-full'>
        {Products.length ? (
          <div>
            <p className='text-center text-gray-400'>
              Showing results for:{' '}
              <span className='font-semibold'>{query}</span>
            </p>
            <div className='mt-6 mb-10 grid grid-cols-2 gap-2 md:mb-20 md:grid-cols-3 md:gap-3 lg:grid-cols-4 lg:gap-5 xl:gap-6'>
              {Products.map((product) => (
                <PreviewCard key={product._id} product={product}/>
              ))}
            </div>
          </div>
        ) : (
          <p className='text-center text-sm text-gray-400'>
            Type something and hit enter to search...
            <NoResults />
          </p>
        )}
      </div>
    </div>
  );
}

export function NoResults() {
  return (
    <div className='flex flex-col items-center justify-center py-16 text-center text-gray-600'>
      <SearchX className='mb-4 h-12 w-12 text-gray-400' />
      <h2 className='text-xl font-semibold text-gray-800'>No Results Found</h2>
      <p className='mt-2 max-w-md text-sm text-gray-500'>
        No results? No problem! Try using different keywords or check your
        spelling. You can also browse our categories for inspiration.
      </p>
      <button
        onClick={() => (window.location.href = '/')}
        className='mt-6 rounded-md bg-black px-6 py-2 text-sm font-medium text-white transition hover:bg-gray-800'
      >
        Back to Home
      </button>
    </div>
  );
}
