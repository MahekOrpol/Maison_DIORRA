import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import ProductGallery from '@/features/product/components/product-gallery';
import ProductDetails from '@/features/product/components/product-details';
import { Button } from '@/components/ui/button';
import CustomTag from '@/components/CustomTag';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';

export default function Page() {
  return (
    <div className='container'>
      <Breadcrumb className='my-2'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href='/components'>Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {/* arrowed label */}
      <div className='my-[3%] flex w-full items-center justify-between gap-3 md:flex-row md:gap-6 xl:my-15'>
        <CustomTag
          no='1.'
          text='Select Your'
          bold='METAL'
          imgUrl='/icons/metal.svg'
          href='/products'
        />
        <CustomTag
          no='2.'
          text='Select Your'
          bold='SHANK'
          imgUrl='/icons/shank.svg'
          href='/products'
        />
        <CustomTag
          no='3.'
          text='Select Your'
          bold='DIAMOND'
          imgUrl='/icons/diamond1.svg'
          href='/products'
        />
      </div>
      <div className='flex w-full flex-col gap-6 lg:flex-row'>
        <ProductGallery className='lg:w-[45%]' />
        <ProductDetails className='lg:w-[55%]' />
      </div>
      <RingDetails />
      <CustomerReviews />
    </div>
  );
}

export const PriceDisplay = ({ price, originalPrice, className = '' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <span className='text-3xl font-bold text-gray-900'>
        ¥{price.toLocaleString()}
      </span>
      {originalPrice && (
        <span className='ml-2 text-xl text-gray-500 line-through'>
          ¥{originalPrice.toLocaleString()}
        </span>
      )}
    </div>
  );
};

export const RingDetails = () => {
  return (
    <div className='mt-12 border-t pt-8'>
      <h2 className='mb-6 text-2xl font-bold'>Ring and Stone Details</h2>

      <Accordion
        type='multiple'
        defaultValue={['know-your-setting', 'ring-details']}
      >
        {/* Know Your Setting Section */}
        <AccordionItem value='know-your-setting'>
          <AccordionTrigger className='text-lg font-medium'>
            Know your Setting
          </AccordionTrigger>
          <AccordionContent>
            <ul className='list-disc space-y-3 pl-5'>
              <li>
                <span className='font-semibold'>RING DIAMETER</span>
                <p>1.62 cm</p>
              </li>
              <li>
                <span className='font-semibold'>APPROX CTW</span>
                <p>0.2 ct</p>
              </li>
            </ul>
            <p className='mt-3 text-sm text-gray-600'>
              Measured at the base of the ring. The settings average total card
              weight.
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* Ring Details Section */}
        <AccordionItem value='ring-details'>
          <AccordionTrigger className='text-lg font-medium'>
            Ring Details
          </AccordionTrigger>
          <AccordionContent>
            <Table className='mb-4'>
              <TableHeader>
                <TableRow>
                  <TableHead>DIAMOND SHAPE</TableHead>
                  <TableHead>DIAMOND SIZE</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Circle</TableCell>
                  <TableCell>Moissanite Diamond 0.18 ctw</TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <ul className='list-disc space-y-3 pl-5'>
              <li>
                <span className='font-semibold'>METAL</span>
                <p>925 Silver</p>
              </li>
            </ul>
            <p className='mt-3 text-sm text-gray-600'>
              It comes with the authenticity and guarantee certificate of 925
              Silver with lifetime exchange guarantee.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export const CustomerReviews = () => {
  const reviews = [
    {
      id: 1,
      name: 'Rosalina Kelin',
      date: '19th June, 2024',
      content:
        'I recently purchased a ring from your store, and I am extremely happy with my purchase'
    },
    {
      id: 2,
      name: 'Jonathan Kale',
      date: '19th June, 2024',
      content:
        'I recently purchased a ring from your store, and I am extremely happy with my purchase'
    }
  ];

  return (
    <div className='mt-12 border-t pt-8'>
      <h2 className='mb-6 text-2xl font-bold'>Customer Reviews</h2>

      <div className='space-y-6'>
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardHeader className='pb-2'>
              <div className='flex items-center justify-between'>
                <h3 className='font-semibold'>{review.name}</h3>
                <span className='text-sm text-gray-500'>{review.date}</span>
              </div>
            </CardHeader>
            <CardContent>
              <p>{review.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className='mt-8 rounded-lg bg-gray-50 p-4'>
        <h3 className='mb-2 text-lg font-medium'>Add a Review</h3>
        <p className='mb-4 text-gray-600'>
          You must be logged in to post a review.
        </p>
        <Button className='w-full sm:w-auto'>Login to Review</Button>
      </div>
    </div>
  );
};
