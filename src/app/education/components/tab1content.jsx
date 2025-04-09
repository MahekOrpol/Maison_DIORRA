import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import Link from 'next/link';
import Image from 'next/image';

export default function Tab1Content() {
  return (
    <div className='xs:py-8 flex flex-col justify-between gap-4 py-2 lg:flex-row lg:py-8'>
      <div className='lg:w-[30%]'>
        <DiamondKnowledge />
      </div>
      <div className='space-y-2 text-justify text-sm leading-5 font-light md:space-y-3 md:text-base md:leading-6 lg:w-[65%] xl:text-lg'>
        <h2 className='text-left text-2xl font-semibold md:text-3xl xl:text-4xl'>
          All you need to know about Diamond Clarity
        </h2>
        <p>
          A diamond with outstanding clarity has few to no inclusions and
          blemishes. This doesn’t mean you must only shop for flawless stones
          and nothing else. It’s still possible to get a large, sparkly,
          eye-clean rock in lower clarity grades. Here at Keyzar, we’re all
          about sparkle, size, and saving money… Continue reading to learn about
          inclusions, blemishes, clarity grades, and more!
        </p>
        <div>
          <Image
            src='/img/blogs/edu1.png'
            width={200}
            height={100}
            alt='Education image'
            className='mx-auto w-full max-w-5xl'
          />
        </div>
        <h3 className='text-left text-xl font-medium md:text-2xl xl:text-3xl'>
          What exactly is Diamond Clarity?
        </h3>
        <p>
          Clarity refers to the presence of inclusions or imperfections within a
          diamond. Inclusions materialize within a diamond when tiny particles
          of gas, metal and dust are caught inside the structure as it grows.
          Blemishes affect the surface of the gem. Diamonds with large
          inclusions and blemishes have poor clarity. Diamonds with small (or
          no) inclusions or blemishes have good clarity. The position, size and
          visibility of inclusions can have a huge impact on its clarity and
          price.
        </p>
        <p>
          It is also a good idea to balance the clarity grade of your diamond
          with the color. If you are looking at diamonds in the D-F color range,
          focus on clarity grades of VS2 or higher. Diamonds in the G-I color
          range combined with SI clarity are excellent values.
        </p>
        {/* table section */}
        <div className='rounded-sm border p-2 md:p-4'>
          <p>
            To determine the clarity of a diamond, the GIA (Gemological
            Institute of America) uses a diamond clarity scale, consisting of 11
            grades:
          </p>
          <div className=''>
            <div className='mt-4 overflow-x-auto'>
              <table className='overflow-hidden rounded-md border-2 border-black bg-[#EFEFEF]'>
                <thead className='bg-[#B8BABA]'>
                  <tr>
                    <th className='px-4 py-2 text-left text-sm font-medium tracking-wider uppercase'>
                      Clarity Grade
                    </th>
                    <th className='px-4 py-2 text-left text-sm font-medium tracking-wider uppercase'>
                      Meaning
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-[#EFEFEF] whitespace-nowrap'>
                  {/* Flawless */}
                  <tr className='odd:bg-gray-50'>
                    <td className='px-4 py-2 text-sm font-medium whitespace-nowrap text-gray-900'>
                      Flawless (FL)
                    </td>
                    <td className='px-4 py-2 text-sm whitespace-nowrap text-gray-500'>
                      No inclusions or blemishes using 10x magnification
                    </td>
                  </tr>

                  {/* Internally Flawless */}
                  <tr className='hover:bg-gray-50'>
                    <td className='px-4 py-2 text-sm font-medium whitespace-nowrap text-gray-900'>
                      Internally flawless (IF)
                    </td>
                    <td className='px-4 py-2 text-sm text-gray-500'>
                      No inclusions using 10x magnification
                    </td>
                  </tr>

                  {/* VVS */}
                  <tr className='odd:bg-gray-50'>
                    <td className='px-4 py-2 text-sm font-medium whitespace-nowrap text-gray-900'>
                      Very, very slightly included (VVS1 and VVS2)
                    </td>
                    <td className='px-4 py-2 text-sm text-gray-500'>
                      Slight inclusions barely visible to a skilled diamond
                      grader using 10x magnification
                    </td>
                  </tr>

                  {/* VS */}
                  <tr className='hover:bg-gray-50'>
                    <td className='px-4 py-2 text-sm font-medium whitespace-nowrap text-gray-900'>
                      Very slightly included (VS1 and VS2)
                    </td>
                    <td className='px-4 py-2 text-sm text-gray-500'>
                      Small inclusions ranging from difficult to somewhat easy
                      to identify by a grader using 10x magnification
                    </td>
                  </tr>

                  {/* SI */}
                  <tr className='odd:bg-gray-50'>
                    <td className='px-4 py-2 text-sm font-medium whitespace-nowrap text-gray-900'>
                      Slightly included (SI1 and SI2)
                    </td>
                    <td className='px-4 py-2 text-sm text-gray-500'>
                      Inclusions are visible with 10x magnification
                    </td>
                  </tr>

                  {/* Included */}
                  <tr className='hover:bg-gray-50'>
                    <td className='px-4 py-2 text-sm font-medium whitespace-nowrap text-gray-900'>
                      Included (I1, I2 and I3)
                    </td>
                    <td className='px-4 py-2 text-sm text-gray-500'>
                      Obvious inclusions using 10x magnification which might
                      affect brilliance and transparency
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <p>
          A diamond that is 'eye-clean' is one that has no imperfections visible
          to the naked eye. This is the only thing you should be after (unless
          you’re a professional diamond trader). Spend your money on size, not
          on clarity. Go for the minimum clarity: eye-clean. SI1 diamonds are
          usually eye-clean but to make absolutely sure, use our 3D preview tool
          to see for yourself. If you go for a brilliant cut diamond, a
          below-SI1 clarity may not be an issue as the sparkle will obscure the
          inclusions and blemishes.
        </p>
        <div>
          <Image
            src='/img/blogs/edu2.png'
            width={300}
            height={200}
            alt='Blog'
            className='w-full max-w-3xl'
          />{' '}
        </div>
        <div className='bg-secondary p-4'>
          <h4 className='mb-2 text-2xl font-medium'>Conclusion</h4>
          <p>
            The good news is you don’t need to spend a fortune to find a high
            quality diamond with superb clarity and sparkle. You just need to
            consider the 4C’s: Cut, Clarity, Color and Carat Weight. Hopefully,
            you now have a better idea of how to find a beautiful diamond.
          </p>
        </div>
      </div>
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
