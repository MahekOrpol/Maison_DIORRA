'use client';
import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { RichTextRenderer } from '@/components/rich-text-renderer';

export default function Tab1Content({ data }) {
  const router = useRouter();
  const [activeTopic, setActiveTopic] = useState(null);
  console.log(activeTopic)

  return (
    <div className='xs:py-4 flex flex-col justify-between gap-4 lg:flex-row lg:py-8'>
      {/* Left side index - sticky on desktop */}
      <div className='lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)] lg:w-[30%] lg:self-start lg:overflow-y-auto'>
        <DiamondKnowledge data={data} onTopicSelect={setActiveTopic} />
        <div className='mx-auto mt-4 w-full rounded-lg border border-gray-200 bg-white px-6 py-4 shadow-sm dark:bg-black dark:text-white'>
          <div className='flex flex-col items-center justify-between gap-3 sm:flex-row'>
            <p className='text-base font-medium'>
              New arrivals just dropped 💍
            </p>
            <button
              onClick={() => router.push('/education')}
              className='rounded-full bg-black px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-300'
            >
              Explore Now
            </button>
          </div>
        </div>
      </div>

      {/* Right side Article content */}
      <div className='3xl:text-lg space-y-2 text-justify text-sm leading-5 font-light md:space-y-3 md:text-base md:leading-6 lg:w-[65%]'>
        {activeTopic ? (
          <>
            <h2 className='text-left text-2xl font-semibold md:text-3xl xl:text-4xl'>
              {activeTopic.name}
            </h2>
            <RichTextRenderer
              html={activeTopic.body}
            />
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}


export const DiamondKnowledge = ({ data, onTopicSelect }) => {
  const [activeTopic, setActiveTopic] = useState(null);
  return (
    <div className='mx-auto rounded-sm border p-4'>
      <h1 className='mb-3 border-b pb-1 text-2xl font-medium underline decoration-1 underline-offset-12 md:text-2xl'>
        Know about Diamonds
      </h1>
      <Accordion
        type='multiple'
        defaultValue={[data.subcategories[0].name]}
        className='w-full rounded-md not-last:border-b'
      >
        {data.subcategories.map((category) => (
          <AccordionItem key={category.name} value={category.name}>
            <AccordionTrigger className='px-2 py-3 text-base font-medium hover:no-underline'>
              <div>
                {category.name}
              </div>
            </AccordionTrigger>
            <AccordionContent className='space-y-2 pl-4'>
              {category.topics.map((topic) => (
                <div
                  key={topic.name}
                  className={`p-2 cursor-pointer rounded hover:bg-gray-50 ${activeTopic?.name === topic.name ? 'bg-gray-100 font-medium' : ''
                    }`}
                  onClick={() => onTopicSelect(topic)}
                >
                  {topic.name}
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};