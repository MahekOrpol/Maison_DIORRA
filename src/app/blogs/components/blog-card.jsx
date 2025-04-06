'use client';
import Image from 'next/image';
import Link from 'next/link';
import { MoveRight } from 'lucide-react';

export default function BlogCard({
  href = '#',
  image,
  title,
  date = '22.DEC.2025',
  author = 'BY FERONIA',
  excerpt = 'A short description of the blog post goes here. It provides a quick overview to the reader...'
}) {
  return (
    <Link
      href={href}
      className='block overflow-hidden rounded-lg shadow-lg transition hover:shadow-xl'
    >
      <Image
        src={image}
        alt='Blog Image'
        className='w-full object-cover'
        width={500}
        height={400}
      />
      <div className='p-4'>
        <p className='mb-1 text-sm font-medium text-gray-500'>
          {date} <span className='text-xl'>•</span> {author}
        </p>
        <h3 className='text-xl font-bold text-gray-900'>{title}</h3>
        <hr className='my-1 border-gray-300' />
        <p className='text-gray-700'>{excerpt}</p>
        <button className='mt-4 inline-flex items-center rounded-full bg-black px-4 py-[6px] text-sm font-semibold text-white transition hover:bg-black/80'>
          Read More <MoveRight className='ml-2 h-4 w-4' />
        </button>
      </div>
    </Link>
  );
}
