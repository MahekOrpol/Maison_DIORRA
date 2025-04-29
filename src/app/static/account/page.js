import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';

export default function Page() {
  return (
    <div className='mx-auto max-w-3xl px-4 py-10'>
      <h1 className='mb-6 text-2xl font-bold'>My Account</h1>

      {/* Profile Info */}
      <Card className='mb-6 gap-1 pt-2 pb-4 md:gap-4 md:py-6'>
        <CardHeader className='flex flex-row items-center justify-between'>
          <CardTitle>Profile Details</CardTitle>
          <Button variant='ghost' size='icon' aria-label='Edit Profile'>
            <Pencil className='h-4 w-4' />
          </Button>
        </CardHeader>
        <hr />
        <CardContent className='space-y-2'>
          <div>
            <p className='text-muted-foreground text-sm font-medium'>Name</p>
            <p className='text-base'>John Doe</p>
          </div>
          <div>
            <p className='text-muted-foreground text-sm font-medium'>Email</p>
            <p className='text-base'>john@example.com</p>
          </div>
          <div>
            <p className='text-muted-foreground text-sm font-medium'>Phone</p>
            <p className='text-base'>+91 9876543210</p>
          </div>
        </CardContent>
      </Card>

      {/* Address Info */}
      <Card className='mb-6 gap-1 pt-2 pb-4 md:gap-4 md:py-6'>
        <CardHeader className='flex flex-row items-center justify-between'>
          <CardTitle>Saved Address</CardTitle>
          <Button variant='ghost' size='icon' aria-label='Edit Address'>
            <Pencil className='h-4 w-4' />
          </Button>
        </CardHeader>
        <hr />
        <CardContent className=''>
          <p className='text-base'>
            123, Royal Avenue, Diamond Nagar,
            <br />
            Surat, Gujarat - 395007
            <br />
            India
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
