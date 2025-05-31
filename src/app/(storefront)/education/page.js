import React from 'react';
import { Banner } from '../about/page';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IoDiamondOutline } from 'react-icons/io5';
import { TbCube3dSphere } from 'react-icons/tb';
import { GiDiamondRing } from 'react-icons/gi';
import Tab1Content from './tab1content';
async function fetchEducationData() {
  const res = await fetch('http://192.168.1.6:5000/api/v1/education');
  return res.json();
}
export default async function Page() {
  const data = await fetchEducationData();

  return (
    <section className='xl:pt-2'>
      <EduBanner imgUrl='/img/banner4.png' className='' />
      <section>
        <Tabs defaultValue={data?.[0]?.name} className='wrapper pb-8'>
          <TabsList className='grid h-[55px] w-full grid-cols-3 gap-1 rounded-none border-b bg-transparent text-xs md:gap-[10vw]'>
            {data.map((category) => {
              return (
                <TabsTrigger
                key={category.id}
                  value={category.name}
                  className='border-b-2 border-b-transparent py-1 text-xs font-medium data-[state=active]:border-b-black sm:py-2 sm:text-sm lg:text-base'
                >
                  <IoDiamondOutline className='block' /> {category.name}
                </TabsTrigger>
              );
            })}
          </TabsList>
          {data.map((category) => {
            return (
              <TabsContent value={category.name}  key={category.id}>
                <Tab1Content data={category} />
              </TabsContent>
            );
          })}
        </Tabs>
      </section>
    </section>
  );
}

export function EduBanner({ imgUrl, heading, className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <div
        className='xs:h-[190px] relative mx-auto flex h-[170px] w-full items-center justify-center bg-cover bg-center sm:h-[260px] lg:h-[360px] xl:h-[400px] xl:bg-center'
        style={{
          backgroundImage: `url(${imgUrl})`,
          backgroundPosition: '55% center'
        }}
      >
        {/* Overlay for contrast */}
        <div className='absolute inset-0 bg-black/30' />

        {/* Heading - slightly left of center */}
        <h1 className='font-rozha xs:text-2xl xs:-ml-[45%] xs:leading-8 relative z-10 -ml-[50%] w-fit text-xl leading-6 sm:text-3xl sm:leading-10 lg:text-5xl lg:leading-16'>
          Know more <br className='sm:hidden' /> about <br /> DIAMONDS
        </h1>
      </div>
    </div>
  );
}
