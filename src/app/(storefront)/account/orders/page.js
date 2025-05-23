'use client';
import React from 'react';
import Image from 'next/image';
import { Card, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
export default function MyOrdersPage() {
  const orders = [
    {
      id: 'ORD123456',
      date: 'March 20, 2025',
      total: '₹12,499',
      status: 'Delivered',
      image: '/img/category/pendant.png',
      title: 'Diamond Pendant Necklace'
    },
    {
      id: 'ORD123457',
      date: 'March 15, 2025',
      total: '₹8,799',
      status: 'Shipped',
      image: '/img/category/rings.png',
      title: 'Gold Ring - 18k with Stone'
    },
    {
      id: 'ORD123458',
      date: 'March 10, 2025',
      total: '₹2,499',
      status: 'Processing',
      image: '/img/category/bracelet.png',
      title: 'Silver Bracelet'
    },
    {
      id: 'ORD123459',
      date: 'March 25, 2025',
      total: '₹8,799',
      status: 'Shipped',
      image: '/img/category/earrings.png',
      title: 'Earring - 18k with Stone'
    }
  ];
  return (
    <div className='mx-auto max-w-4xl px-4 py-10'>
      <h1 className='mb-6 text-3xl font-bold'>My Orders</h1>
      <div className='space-y-5'>
        {orders.length > 0 ? (
          orders.map((order) => (
            <Card key={order.id} className='overflow-hidden'>
              <div className='flex flex-col gap-4 p-4 sm:flex-row'>
                {/* Image */}
                <Image
                  src={order.image}
                  alt={order.title}
                  width={120}
                  height={120}
                  className='h-28 w-28 rounded-md border object-cover'
                />

                {/* Info */}
                <div className='flex flex-1 flex-col justify-between'>
                  {/* Title and status */}
                  <div className='flex items-start justify-between'>
                    <div>
                      <CardTitle className='text-lg font-semibold'>
                        {order.title}
                      </CardTitle>
                      <p className='text-muted-foreground text-sm'>
                        Order #{order.id}
                      </p>
                    </div>
                    <Badge
                      className={`text-xs ${
                        order.status === 'Delivered'
                          ? 'bg-green-100 text-green-700'
                          : order.status === 'Shipped'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {order.status}
                    </Badge>
                  </div>

                  {/* Summary */}
                  <div className='text-muted-foreground mt-2 text-sm'>
                    <p>Order Date: {order.date}</p>
                    <p>
                      Total Amount:{' '}
                      <span className='text-foreground font-medium'>
                        {order.total}
                      </span>
                    </p>
                  </div>

                  {/* Actions */}
                  <div className='mt-4 flex flex-wrap gap-2'>
                    {/* <Link href={`/orders/track/${order.id}`}> */}
                    <Button size='sm' variant='outline'>
                      Track Order
                    </Button>
                    {/* </Link> */}
                    {/* <Link href={`/orders/invoice/${order.id}`}> */}
                    <Button size='sm' variant='outline'>
                      View Invoice
                    </Button>
                    {/* </Link> */}
                    {/* <Link href='/products/product-id'> */}
                    <Button size='sm'>Buy Again</Button>
                    {/* </Link> */}
                  </div>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <p className='text-muted-foreground text-center'>
            You have no orders yet.
          </p>
        )}
      </div>
    </div>
  );
}
