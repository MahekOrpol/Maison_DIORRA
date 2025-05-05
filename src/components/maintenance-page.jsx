import { Home, ShoppingBag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function UnderConstruction() {
  return (
    <div className='flex min-h-[80vh] flex-col items-center justify-center bg-white p-4'>
      {/* Progress Indicators */}
      <div className='mb-8 w-full max-w-xs'>
        <div className='relative pt-1'>
          <div className='flex items-center justify-between'>
            <span className='text-xs font-semibold text-black'>Progress</span>
            <span className='text-xs font-semibold text-black'>20%</span>
          </div>
          <div className='mt-2 h-2 overflow-hidden rounded-full bg-gray-200'>
            <div
              className='h-full rounded-full bg-black'
              style={{ width: '20%' }}
            ></div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <Card className='w-full max-w-md border-black bg-white shadow-lg'>
        <CardHeader>
          <div className='mb-4 flex flex-col items-center gap-4'>
            <CardTitle className='text-3xl font-bold text-black'>
              Page Under Construction
            </CardTitle>
            <div className='h-px w-full bg-black/20'></div>
          </div>
        </CardHeader>
        <CardContent>
          <p className='mb-8 text-center text-gray-700'>
            We're building something extraordinary for you. Our team is hard at
            work creating an exceptional experience.
          </p>
          <div className='flex flex-col justify-center gap-4 sm:flex-row'>
            <Link
              href='/'
              className='flex items-center justify-center gap-2 rounded-md border border-black bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-gray-100 focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-none'
            >
              <Home className='h-4 w-4' />
              Return Home
            </Link>
            <Link
              href='/products'
              className='inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-none'
            >
              <ShoppingBag className='h-4 w-4' />
              Browse Products
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
