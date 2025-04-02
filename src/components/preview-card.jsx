'use client';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingBagIcon } from 'lucide-react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

// export default function PreviewCard({ className }) {
//   const [selectedMetal, setSelectedMetal] = useState(data.metals[0]); // Default to silver

//   return (
//     <Card
//       className={cn(
//         'relative w-auto max-w-[370px] rounded-sm bg-white shadow-lg',
//         className
//       )}
//     >
//       {/* Image Carousel */}
//       <Carousel opts={{ align: 'start', loop: false }}>
//         <CarouselContent className='pt-1'>
//           {selectedMetal.images.map((image, index) => (
//             <CarouselItem key={index}>
//               <div className='relative mb-2 p-1 md:p-3'>
//                 <Image
//                   src={image}
//                   alt={selectedMetal.name}
//                   width={300}
//                   height={300}
//                   className='h-32 w-full object-contain sm:h-[250px]'
//                 />
//                 <Button
//                   variant='ghost'
//                   className='absolute top-0 right-1 flex h-6 w-6 items-center justify-center rounded-full border text-black hover:bg-gray-100 sm:top-4 sm:right-4 sm:h-8 sm:w-8'
//                 >
//                   <Heart className='h-4 w-4 md:h-5 md:w-5' />
//                 </Button>
//               </div>
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//         <CarouselPrevious className='absolute bottom-0 left-1/2 h-5 w-5 -translate-x-6 translate-y-[55px] transform bg-[#EAEAEA] sm:translate-y-[112px] md:h-6 md:w-6' />
//         <CarouselNext className='absolute right-1/2 h-5 w-5 translate-x-8 translate-y-[55px] transform bg-[#EAEAEA] sm:translate-y-[112px] md:h-6 md:w-6' />
//       </Carousel>

//       {/* Card Content */}
//       <CardContent className='px-3 sm:px-4'>
//         {/* Metal Selection */}
//         <div className='flex flex-col justify-between border-t pt-2 sm:flex-row sm:items-center'>
//           <div className='mb-3 flex justify-center gap-2 sm:order-last'>
//             {data &&
//               data.metals.map((metalOption) => (
//                 <button
//                   key={metalOption.metal}
//                   className='h-[22px] w-[22px] rounded-full border-2 border-white hover:outline hover:outline-offset-1 md:h-6 md:w-6'
//                   style={{
//                     backgroundImage: `url('/img/preview/${metalOption.metal}.png')`,
//                     backgroundSize: 'cover',
//                     backgroundPosition: 'center'
//                   }}
//                   onClick={() => setSelectedMetal(metalOption)}
//                 />
//               ))}
//           </div>

//           {/* Price Display */}
//           <div className='flex items-baseline gap-2'>
//             <p className='text-lg font-semibold sm:text-[22px]'>
//               ${selectedMetal.amount}
//             </p>
//             <span className='text-base font-normal text-[#958F86] line-through sm:text-lg'>
//               ${selectedMetal.wrongAmount}
//             </span>
//           </div>
//         </div>

//         {/* Product Name */}
//         <h3 className='my-2 text-left text-base text-gray-900 md:text-[20px]'>
//           {selectedMetal.name}
//         </h3>

//         {/* Add to Bag Button */}
//         <Button className='mb-3 flex h-[36px] w-full items-center gap-2 rounded-[4px] text-base font-medium md:text-lg'>
//           Add to Bag <ShoppingBagIcon size='20' />
//         </Button>
//       </CardContent>
//     </Card>
//   );
// }

const data = {
  category: 'ring',
  metals: [
    {
      metal: 'silver',
      name: 'Silver Ring Lorem Ipsum',
      images: [
        '/img/preview/ring1.png',
        '/img/preview/nacklace.png',
        '/img/preview/pendant.png'
      ],
      amount: 125,
      wrongAmount: 200
    },
    {
      metal: 'gold',
      name: 'Gold Item Lorem Ipsum',
      images: [
        '/img/preview/gold1.png',
        '/img/preview/gold2.png',
        '/img/preview/gold3.png'
      ],
      amount: 728,
      wrongAmount: 800
    },
    {
      metal: 'rose',
      name: 'Rose Gold Ipsum',
      images: [
        '/img/preview/rose1.png',
        '/img/preview/rose2.png',
        '/img/preview/rose3.png'
      ],
      amount: 600,
      wrongAmount: 650
    }
  ]
};
export default function PreviewCard({ className }) {
  const [selectedMetal, setSelectedMetal] = useState(data.metals[0]); // Default to silver
  return (
    <Card
      className={cn(
        'relative w-auto max-w-[370px] gap-0 rounded-lg bg-white p-0 shadow-lg',
        className
      )}
    >
      <Carousel
        className=''
        opts={{
          align: 'start',
          loop: false
        }}
      >
        <CarouselContent className='pt-1'>
          {selectedMetal.images.map((image, index) => (
            <CarouselItem key={index} className=''>
              {/* Image Slider & Favorite Button */}
              <div className='relative mb-2 p-1 md:p-3'>
                <Image
                  src={image}
                  alt={selectedMetal.name}
                  width={300}
                  height={300}
                  className='h-32 max-w-full object-contain sm:h-[250px]'
                />
                <Button
                  variant='favourite button'
                  className='absolute top-[2%] right-[2%] flex h-6 w-6 items-center justify-center rounded-full border text-black hover:bg-gray-100 sm:top-4 sm:right-4 sm:h-8 sm:w-8'
                >
                  <Heart className='h-4 w-4 md:h-5 md:w-5' />
                </Button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='absolute bottom-0 left-1/2 h-5 w-5 -translate-x-6 translate-y-[55px] transform bg-[#EAEAEA] leading-2 sm:translate-y-[112px] md:h-6 md:w-6' />
        <CarouselNext className='absolute right-1/2 h-5 w-5 translate-x-8 translate-y-[55px] transform bg-[#EAEAEA] sm:translate-y-[112px] md:h-6 md:w-6' />
      </Carousel>
      <CardContent className='xs:px-4 px-2'>
        <div className='mb-3 flex justify-center gap-2 sm:order-last'>
          <div className='mt-2 flex w-full flex-col justify-between border-t pt-2 sm:flex-row sm:items-center md:justify-between'>
            {/* Metal themes */}
            <div className='mb-3 flex justify-center gap-2 sm:order-last sm:mb-0'>
              {data &&
                data.metals.map((metalOption) => (
                  <button
                    key={metalOption.metal}
                    className='h-[22px] w-[22px] rounded-full border-2 border-white hover:outline hover:outline-offset-1 md:h-6 md:w-6'
                    style={{
                      backgroundImage: `url('/img/preview/${metalOption.metal}.png')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                    onClick={() => setSelectedMetal(metalOption)}
                  />
                ))}
            </div>
            {/* Discounted Price */}
            <div className='flex items-baseline gap-2'>
              <p className='text-lg leading-1 font-semibold sm:text-[22px]'>
                ${selectedMetal.amount}
              </p>
              <span className='text-base leading-1 font-normal text-[#958F86] line-through sm:text-lg'>
                $39.99
              </span>
            </div>
          </div>
        </div>
        {/* Item Name */}
        <h3 className='my-2 text-left text-base leading-5 text-gray-900 md:text-[20px]'>
          {selectedMetal.name}
        </h3>
        {/* Add to Cart Button */}
        <Button className='mb-3 flex h-[36px] w-full cursor-pointer items-center gap-2 rounded-[4px] text-base font-medium md:h-[42px] md:text-lg'>
          Add to Bag <ShoppingBagIcon size='20' />
        </Button>
      </CardContent>
    </Card>
  );
}
