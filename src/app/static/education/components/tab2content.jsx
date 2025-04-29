import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import Link from 'next/link';
import Image from 'next/image';

export default function Tab2Content() {
  return (
    <div className='xs:py-8 flex flex-col justify-between gap-4 py-2 lg:flex-row lg:py-8'>
      <div className='lg:w-[30%]'>
        <DiamondKnowledge />
      </div>
      <div>MOISSANITE & GEMSTONES tab content</div>
    </div>
  );
}

export const DiamondKnowledge = () => {
  return (
    <div className='mx-auto max-w-2xl'>
      <h1 className='mb-3 text-2xl font-medium text-gray-800 md:text-2xl'>
        Know about Diamonds
      </h1>

      <Accordion type='single' collapsible className='w-full border'>
        {/* 4C's Section */}
        <AccordionItem value='item-1'>
          <AccordionTrigger className='px-2 text-base font-medium hover:no-underline'>
            4C's of Diamonds
          </AccordionTrigger>
          <AccordionContent className='space-y-2 px-4'>
            <ul className='list-disc space-y-2 pl-5'>
              <li>
                <Link href='#clarity' className='text-blue-600 hover:underline'>
                  Clarity - The absence of inclusions and blemishes
                </Link>
              </li>
              <li>
                <Link href='#color' className='text-blue-600 hover:underline'>
                  Color - The diamond's lack of color (graded D to Z)
                </Link>
              </li>
              <li>
                <Link href='#carat' className='text-blue-600 hover:underline'>
                  Carat Weight - The measurement of diamond's weight
                </Link>
              </li>
              <li>
                <Link href='#cut' className='text-blue-600 hover:underline'>
                  Cut - The quality of diamond's proportions and symmetry
                </Link>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        {/* Shapes Section */}
        <AccordionItem value='item-2'>
          <AccordionTrigger className='px-2 text-base font-medium hover:no-underline'>
            Diamond Shapes
          </AccordionTrigger>
          <AccordionContent className='space-y-2 pl-4'>
            <ul className='list-disc space-y-2 pl-5'>
              <li>
                <Link
                  href='/diamonds/shapes/round'
                  className='text-blue-600 hover:underline'
                >
                  Round - The most popular and brilliant cut
                </Link>
              </li>
              <li>
                <Link
                  href='/diamonds/shapes/emerald'
                  className='text-blue-600 hover:underline'
                >
                  Emerald - Rectangular with stepped facets
                </Link>
              </li>
              <li>
                <Link
                  href='/diamonds/shapes/princess'
                  className='text-blue-600 hover:underline'
                >
                  Princess - Square modified brilliant cut
                </Link>
              </li>
              <li>
                <Link
                  href='/diamonds/shapes/pear'
                  className='text-blue-600 hover:underline'
                >
                  Pear - Teardrop-shaped brilliant cut
                </Link>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        {/* Types Section */}
        <AccordionItem value='item-3'>
          <AccordionTrigger className='px-2 text-base font-medium hover:no-underline'>
            Diamond Types
          </AccordionTrigger>
          <AccordionContent className='space-y-2 pl-4'>
            <ul className='list-disc space-y-2 pl-5'>
              <li>
                <Link
                  href='/diamonds/types/lab-grown'
                  className='text-blue-600 hover:underline'
                >
                  Lab Grown Diamonds - Created in controlled environments
                </Link>
              </li>
              <li>
                <Link
                  href='/diamonds/types/natural'
                  className='text-blue-600 hover:underline'
                >
                  Natural Diamonds - Formed over billions of years
                </Link>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        {/* Other Sections */}
        <AccordionItem value='item-4'>
          <AccordionTrigger className='px-2 text-base font-medium hover:no-underline'>
            Diamond Characteristics
          </AccordionTrigger>
          <AccordionContent className='space-y-2 pl-4'>
            <ul className='list-disc space-y-2 pl-5'>
              <li>
                <Link
                  href='/diamonds/anatomy'
                  className='text-blue-600 hover:underline'
                >
                  Anatomy - Parts of a diamond (table, crown, girdle, etc.)
                </Link>
              </li>
              <li>
                <Link
                  href='/diamonds/sparkle'
                  className='text-blue-600 hover:underline'
                >
                  Sparkle - How light interacts with the diamond
                </Link>
              </li>
              <li>
                <Link
                  href='/diamonds/symmetry'
                  className='text-blue-600 hover:underline'
                >
                  Symmetry - Precision of facet alignment
                </Link>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
