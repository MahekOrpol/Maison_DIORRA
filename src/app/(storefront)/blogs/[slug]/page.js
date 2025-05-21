import React from 'react';
import { BlogsFilter } from '../page';
import { BlogsBanner } from '../blogs-banner';
import Image from 'next/image';
import { ReviewForm } from '../review-form';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight, MoveRight } from 'lucide-react';
import { ImQuotesLeft, ImQuotesRight } from 'react-icons/im';
import { baseUrl } from '@/lib/utils';
import { RichTextRenderer } from '@/components/rich-text-renderer';

export default async function Page({ params }) {
  const BASE_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || 'http://153.92.222.195:5000';

  const { slug } = await params;
  const res = await fetch(`${BASE_URL}/api/v1/blog/get/${slug}`, {
    next: { revalidate: 86400 }
  });
  const data = await res.json();

  const dummyHtml = `<h1>Main Heading (h1)</h1>
<h2>Section Heading (h2)</h2>
<h3>Subsection Heading (h3)</h3>
<h4>Smller Heading (h4)</h4>
<h5>Tiny Heading (h5)</h5>
<h6>Smallest Heading (h6)</h6>
<p>This is a paragraph with <strong>strong</strong>, <em>emphasis</em>, <u>underline</u>, and <a href="https://example.com">a link</a>.</p>
<p>Here's a <abbr title="HyperText Markup Language">HTML</abbr> abbreviation and an inline <code>console.log('Code')</code> example.</p>
<blockquote cite="https://example.com">
  This is a blockquote with some cited source.
</blockquote>
<pre><code>&lt;div&gt;This is preformatted code&lt;/div&gt;</code></pre>
<hr />
<ul>
  <li>Unordered List Item 1</li>
  <li>Unordered List Item 2</li>
  <li>Unordered List Item 3</li>
</ul>

<ol>
  <li>Ordered List Item 1</li>
  <li>Ordered List Item 2</li>
  <li>Ordered List Item 3</li>
</ol>
<dl>
  <dt>Definition Term</dt>
  <dd>This is the definition description.</dd>
  <dt>Another Term</dt>
  <dd>Another description for the term.</dd>
</dl>
<table>
  <thead>
    <tr>
      <th>Table Head 1</th>
      <th>Table Head 2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Table Data 1</td>
      <td>Table Data 2</td>
    </tr>
    <tr>
      <td>Table Data 3</td>
      <td>Table Data 4</td>
    </tr>
  </tbody>
</table>
<figure>
  <img src="https://www.shutterstock.com/image-photo/field-cosmos-flower-600nw-1011699703.jpg" alt="Placeholder image" />
  <figcaption>This is a caption for the image above.</figcaption>
</figure>
<mark>This is a highlighted text using &lt;mark&gt;.</mark>
<small>This is small text.</small>
<time datetime="2025-05-20">May 20, 2025</time>
<h2>Ordered List Example</h2>
<ol>
  <li>First Step</li>
  <li>Second Step</li>
  <li>Third Step
    <ol>
      <li>Sub-step i</li>
      <li>Sub-step ii</li>
    </ol>
  </li>
  <li>Final Step</li>
</ol>
<h2>Mixed List Example</h2>
<ul>
    <ol>
      <li>Option A</li>
      <li>Option B</li>
    </ol>
  </li>
</ul>
`;

  return (
    <div className='mb-8 md:mb-10'>
      <BlogsBanner
        imgUrl='/img/banner2.png'
        title='Blogs and Articles'
        subtitle='Home - Blogs and Articles'
        className='h-[200px]'
      />
      <section className='wrapper flex w-full flex-col gap-4 py-3 md:my-8 lg:gap-[4%] xl:flex-row xl:justify-between'>
        {/* blog details - takes about 70% width on desktop */}
        <article className='flex-1 xl:w-[66%]'>
          {/* hero */}
          <div className='mb-3 border-b-2 pb-2'>
            <div>
              <Image
                src={
                  data?.image
                    ? `${baseUrl}${data.image}`
                    : '/img/blogs/blog-details.png'
                }
                width={800}
                height={400}
                alt='Blog header w-full'
                className='w-full rounded-md'
              />
            </div>
            <p className='my-1 text-sm font-light md:my-2 lg:text-base'>
              Posted by Feronia -{' '}
              {new Date(data.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: '2-digit',
                year: 'numeric'
              })}
            </p>
            <h2 className='text-2xl leading-6 font-semibold md:text-3xl lg:text-4xl'>
              {data.headline}
            </h2>
          </div>

          {/* blog content */}
          <div className='space-y-4 text-sm md:text-base'>
            {/* Your existing blog content sections */}
            <div key={data.id} className='space-y-4'>
              <p className='text-justify'>{data.description}</p>
              <div>
                <div>
                  <ImQuotesLeft className='h-10 w-10' />
                  <blockquote className='mx-auto w-4/5'>
                    &quot;{data.articleBody}&quot;
                  </blockquote>
                  <ImQuotesRight className='ml-auto h-10 w-10' />
                </div>
                <p className='font-medium'>- {data.authorName}</p>
              </div>
              <div>
                <h3 className='text-2xl font-medium'>
                  Trends to Watch in the Jewelry World
                </h3>
                <ul className='ml-10'>
                  {data.trend?.map((item, index) => (
                    <li className='list-disc' key={index}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </article>

        {/* Sticky sidebar - takes about 30% width on desktop */}
        <div className='xl:w-[30%]'>
          <div className='xl:sticky xl:-top-1/4 xl:h-fit xl:self-start'>
            <BlogsFilter className='w-full xl:max-w-md' />
          </div>
        </div>
      </section>

      {/* prev - nextt */}
      <div className='wrapper my-6 grid grid-cols-1 justify-between border-y py-2 sm:grid-cols-2'>
        <Link href='#' className='inline-flex items-center gap-4 border-r p-2'>
          <Image
            src='/img/blogs/blog11.png'
            width={90}
            height={90}
            alt='article thumbnail'
            className='w-[90px] rounded-lg lg:w-[100px]'
          />
          <div className='space-y-1'>
            <p className='xs:text-xs inline-flex items-center text-[10px] font-medium tracking-widest'>
              <ChevronLeft size={18} className='-ml-1 inline' />
              PREVIOUS BLOG
            </p>
            <p className='xs:text-base text-sm leading-4 font-medium lg:text-lg'>
              Redefining Elegance through Unique Charms
            </p>
            <p className='text-sm'>
              Read More <MoveRight className='inline' size={16} />
            </p>
          </div>
        </Link>
        <Link
          href='#'
          className='inline-flex items-center gap-4 justify-self-end p-2'
        >
          <div className='space-y-1 text-right'>
            <p className='xs:text-xs inline-flex items-center text-[10px] font-medium tracking-widest'>
              NEXT BLOG
              <ChevronRight size={18} className='inline' />
            </p>
            <p className='xs:text-base text-sm leading-4 font-medium lg:text-lg'>
              Redefining Elegance through Unique Charms
            </p>
            <p className='text-sm font-medium'>
              Read More <MoveRight className='inline' size={16} />
            </p>
          </div>
          <Image
            src='/img/blogs/blog11.png'
            width={90}
            height={90}
            alt='article thumbnail'
            className='w-[90px] rounded-lg lg:w-[100px]'
          />
        </Link>
      </div>
      {/* review */}
      <ReviewForm />
      {/* <section className='wrapper'>
        <RichTextRenderer html={dummyHtml} />
      </section> */}
    </div>
  );
}
