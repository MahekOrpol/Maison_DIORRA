'use client';
import Image from 'next/image';
import Link from 'next/link';
import { MoveRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { baseApiUrl } from '@/lib/utils';
export default function BlogCard({ data }) {
  const router = useRouter();
  const BASE_URL =  'http://192.168.1.17:5000';

  const handleClick = () => {
    router.push(`/blogs/${data?.id}`);
  };
  return (
    <Link
      href={`/blogs/${data?.id}`}
      className='flex h-full flex-col overflow-hidden rounded-xl bg-white transition duration-300 ease-in-out'
    >
      {/* Image with fixed aspect ratio */}
      <div className='aspect-[5/3.25] w-full overflow-hidden rounded-lg'>
        <img
          // src={`${baseApiUrl}${data?.imges}`}
          src={BASE_URL + `${data?.coverImage}`}
          alt='Blog Image'
          className='h-full w-full object-cover transition duration-300 ease-in-out hover:scale-108 hover:rotate-2'
          // width={380}
          // height={210}
        />
      </div>
      {/* Content */}
      <div className='flex flex-1 flex-col px-2 pt-2'>
        <p className='text-xs leading-5 font-medium lg:text-sm lg:leading-6'>
          {new Date(data?.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric'
          })}
          <span className='text-base leading-3'>•</span> {data?.authorName}
        </p>
        <h3 className='line-clamp-1 overflow-hidden text-xl font-medium 2xl:text-2xl'>
          {data?.title || 'Blog Post Title'}
        </h3>
        <hr className='mb-2 border-black/50' />
        <p className='line-clamp-2 overflow-hidden text-sm font-light text-ellipsis lg:text-base 2xl:text-lg'>
          {data?.teaser}
        </p>
        <button
          onClick={handleClick}
          className='mt-2 inline-flex w-fit items-center rounded-full bg-black px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-black/80'
        >
          Read More <MoveRight className='ml-2' />
        </button>
      </div>
    </Link>
  );
}
