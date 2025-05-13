'use client';
import Image from 'next/image';
import Link from 'next/link';
import { MoveRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { baseUrl } from '@/lib/utils';
export default function BlogCard({ data }) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/blogs/${data.id}`);
  };
  console.log(data);
  return (
    <Link
      href={`/blogs/${data.id}`}
      className='flex h-full flex-col overflow-hidden rounded-xl bg-white transition duration-300 ease-in-out'
    >
      {/* Image with fixed aspect ratio */}
      <div className='aspect-[5/3.25] w-full overflow-hidden rounded-lg'>
        <Image
          src={data?.imges ? `${baseUrl}${data.imges}` : ''}
          alt='Blog Image'
          className='h-full w-full object-cover transition duration-300 ease-in-out hover:scale-108 hover:rotate-2'
          width={380}
          height={210}
        />
      </div>
      {/* Content */}
      <div className='flex flex-1 flex-col p-2'>
        <p className='text-xs leading-5 font-medium lg:text-sm lg:leading-6'>
          {new Date(data.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric'
          })}
          <span className='text-base leading-3'>•</span> {data.authorName}
        </p>
        <h3 className='line-clamp-1 overflow-hidden text-xl font-medium 2xl:text-2xl'>
          {data.headline || 'Blog Post Title'}
        </h3>
        <hr className='mb-2 border-black/50' />
        <p className='line-clamp-2 overflow-hidden text-sm font-light text-ellipsis lg:text-base 2xl:text-lg'>
          {data.description}
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
