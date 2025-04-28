'use client';
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import Link from 'next/link';
import Image from 'next/image';
// const data = {
//   title: '40 % Off',
//   subtitle: ' On The Diamond Earings',
//   buttonLabel: 'Shop Diamonds',
//   buttonLink: '#',
//   backgroundImage: '/img/ads/add1.png',
//   align: 'left'
// };
const clarityGrades = [
  {
    grade: 'Flawless (FL)',
    meaning: 'No inclusions or blemishes using 10x magnification'
  },
  {
    grade: 'Internally flawless (IF)',
    meaning: 'No inclusions using 10x magnification'
  },
  {
    grade: 'Very, very slightly included (VVS1 and VVS2)',
    meaning:
      'Slight inclusions barely visible to a skilled diamond grader using 10x magnification'
  },
  {
    grade: 'Very slightly included (VS1 and VS2)',
    meaning:
      'Small inclusions ranging from difficult to somewhat easy to identify by a grader using 10x magnification'
  },
  {
    grade: 'Slightly included (SI1 and SI2)',
    meaning: 'Inclusions are visible with 10x magnification'
  },
  {
    grade: 'Included (I1, I2 and I3)',
    meaning:
      'Obvious inclusions using 10x magnification which might affect brilliance and transparency'
  }
];

export default function Tab1Content() {
  return (
    <div className='xs:py-4 flex flex-col justify-between gap-4 lg:flex-row lg:py-8'>
      {/* Left side index - sticky on desktop */}
      <div className='lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)] lg:w-[30%] lg:self-start lg:overflow-y-auto'>
        <DiamondKnowledge />
        <div className='mx-auto mt-4 w-full rounded-lg border border-gray-200 bg-white px-6 py-4 shadow-sm dark:bg-black dark:text-white'>
          <div className='flex flex-col items-center justify-between gap-3 sm:flex-row'>
            <p className='text-base font-medium'>
              New arrivals just dropped 💍
            </p>
            <button
              onClick={() => router.push('/collection/new')}
              className='rounded-full bg-black px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-300'
            >
              Explore Now
            </button>
          </div>
        </div>
      </div>
      {/* Right side Article content */}
      <div className='3xl:text-lg space-y-2 text-justify text-sm leading-5 font-light md:space-y-3 md:text-base md:leading-6 lg:w-[65%]'>
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
        <div className=''>
          <Image
            src='/img/blogs/edu1.png'
            width={200}
            height={100}
            alt='Education image'
            className='mx-auto w-full max-w-5xl'
          />
          <div className='bg-secondary xs:px-8 xs:py-2 relative bottom-4 z-20 mx-auto w-fit rounded-full border border-black px-2 py-1 text-center text-xs sm:bottom-6 lg:text-sm'>
            Round, Emerald, Princess and Pear shaped Diamond
          </div>
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
        <div className='rounded-sm border p-2 md:p-4 xl:p-6'>
          <p className='font-normal'>
            To determine the clarity of a diamond, the GIA (Gemological
            Institute of America) uses a diamond clarity scale, consisting of 11
            grades:
          </p>
          <div className='mt-4'>
            <div className='overflow-x-auto'>
              <table className='w-full border-separate border-spacing-0 border border-black'>
                <thead className='bg-[#B8BABA]'>
                  <tr>
                    <th className='border-r border-black px-3 py-3 text-xs font-medium sm:text-sm md:px-4 md:text-base lg:text-lg'>
                      Clarity Grade
                    </th>
                    <th className='px-3 py-3 text-xs font-medium sm:text-sm md:px-4 md:text-base lg:text-lg'>
                      Meaning
                    </th>
                  </tr>
                </thead>
                <tbody className='text-left'>
                  {clarityGrades.map((item, index) => (
                    <tr
                      key={index}
                      className={
                        index % 2 === 0 ? 'bg-[#EFEFEF]' : 'bg-[#E0E0E0]'
                      }
                    >
                      <td className='border-r border-black px-3 py-2.5 text-xs font-medium sm:text-sm md:px-4 md:py-3 2xl:text-base'>
                        {item.grade}
                      </td>
                      <td className='px-3 py-2.5 text-xs sm:text-sm md:px-4 md:py-3 2xl:text-base'>
                        {item.meaning}
                      </td>
                    </tr>
                  ))}
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
            className='w-full'
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

const accordionItems = [
  {
    value: 'item-1',
    title: "4C's of Diamonds",
    icon: '/icons/content-4c.svg',
    items: [
      {
        href: '#',
        text: 'Clarity - The absence of inclusions and blemishes'
      },
      {
        href: '#',
        text: "Color - The diamond's lack of color (graded D to Z)"
      },
      {
        href: '#',
        text: "Carat Weight - The measurement of diamond's weight"
      },
      {
        href: '#',
        text: "Cut - The quality of diamond's proportions and symmetry"
      }
    ]
  },
  {
    value: 'item-2',
    title: 'Diamond Shapes',
    icon: '/icons/content-shapes.svg',
    items: [
      {
        href: '#',
        text: 'Round - The most popular and brilliant cut'
      },
      {
        href: '#',
        text: 'Emerald - Rectangular with stepped facets'
      },
      {
        href: '#',
        text: 'Princess - Square modified brilliant cut'
      },
      {
        href: '#',
        text: 'Pear - Teardrop-shaped brilliant cut'
      }
    ]
  },
  {
    value: 'item-3',
    title: 'Diamond Types',
    icon: '/icons/content-diamond.svg',
    items: [
      {
        href: '#',
        text: 'Lab Grown Diamonds - Created in controlled environments'
      },
      {
        href: '#',
        text: 'Natural Diamonds - Formed over billions of years'
      }
    ]
  },
  {
    value: 'item-4',
    title: 'Diamond Characteristics',
    icon: '/icons/content-shapes.svg',
    items: [
      {
        href: '#',
        text: 'Anatomy - Parts of a diamond (table, crown, girdle, etc.)'
      },
      {
        href: '#',
        text: 'Sparkle - How light interacts with the diamond'
      },
      {
        href: '#',
        text: 'Symmetry - Precision of facet alignment'
      }
    ]
  },
  {
    value: 'item-5',
    title: 'Anatomy',
    icon: '/icons/content-anatomy.svg',
    items: [
      {
        href: '#',
        text: 'Anatomy - Parts of a diamond (table, crown, girdle, etc.)'
      },
      {
        href: '#',
        text: 'Sparkle - How light interacts with the diamond'
      }
    ]
  },
  {
    value: 'item-6',
    title: 'Symmetry',
    icon: '/icons/content-symmetry.svg',
    items: [
      {
        href: '#',
        text: 'Sparkle - How light interacts with the diamond'
      }
    ]
  },
  {
    value: 'item-7',
    title: 'Sparkle',
    icon: '/icons/content-sparkle.svg',
    items: [
      {
        href: '#',
        text: 'Symmetry - Precision of facet alignment'
      }
    ]
  }
];
export const DiamondKnowledge = () => {
  return (
    <>
      <div className='mx-auto rounded-sm border p-4'>
        <h1 className='mb-3 border-b pb-1 text-2xl font-medium underline decoration-1 underline-offset-12 md:text-2xl'>
          Know about Diamonds
        </h1>
        <Accordion
          type='multiple'
          defaultValue={['item-1']}
          className='w-full rounded-md not-last:border-b'
        >
          {accordionItems.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger className='px-2 py-3 text-base font-medium hover:no-underline'>
                <div>
                  <Image
                    src={item.icon}
                    width={18}
                    height={18}
                    alt='icon'
                    className='mr-2 inline-block'
                  />
                  {item.title}
                </div>
              </AccordionTrigger>
              <AccordionContent className='space-y-2 pl-4'>
                <ul className='xs:space-y-2 list-disc space-y-1 pl-5 [&>li::marker]:text-xs'>
                  {item.items.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className='underline-offset-3 hover:underline'
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  );
};
