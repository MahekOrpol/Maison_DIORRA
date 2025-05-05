'use client';
import Image from 'next/image';
import Link from 'next/link';
import { MoveRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BlogCard({
  href = '/blogs/slug',
  image,
  title,
  date = '22.DEC.2025',
  author = 'BY FERONIA',
  excerpt = 'A short description of the blog post goes here. It provides a quick overview to the reader...'
}) {
  const router = useRouter();
  const handleClick = () => {
    router.push('/blogs/slug');
  };
  return (
    <Link
      href={href}
      className='flex h-full flex-col overflow-hidden rounded-xl bg-white transition duration-300 ease-in-out'
    >
      {/* Image with fixed aspect ratio */}
      <div className='aspect-[5/3.25] w-full overflow-hidden rounded-lg'>
        <Image
          src={image}
          alt='Blog Image'
          className='h-full w-full object-cover transition duration-300 ease-in-out hover:scale-108 hover:rotate-2'
          width={380}
          height={210}
        />
      </div>
      {/* Content */}
      <div className='flex flex-1 flex-col p-2'>
        <p className='text-xs leading-5 lg:text-sm lg:leading-6'>
          22.DEC.2025 <span className='text-base leading-3'>•</span> BY FERONIA
        </p>
        <h3 className='text-xl font-medium lg:text-2xl'>
          {title || 'Blog Post Title'}
        </h3>
        <hr className='mb-2 border-black/50' />
        <p className='flex-1 text-sm font-light lg:text-base 2xl:text-lg'>
          A short description of the blog post goes here. It provides a quick
          overview to the reader...
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
