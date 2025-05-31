import BlogCard from './blog-card';
import Image from 'next/image';
import Link from 'next/link';
import { BlogsBanner } from './blogs-banner';
// import { baseApiUrl } from '@/lib/utils';

const BASE_URL = 'http://192.168.1.6:5000';

async function getBlogPosts(
  categoryId = null,
  page = 1,
  limit = 6,
  isPopular = false,
  tagId = null
) {
  try {
    let url = `${BASE_URL}/api/v1/blogs?page=${page}&limit=${limit}`;
    if (categoryId) {
      url += `&category=${categoryId}`;
    }
    if (isPopular) {
      url += `&isPopular=true`;
    }
    if (tagId) {
      url += `&tags=${tagId}`; // Add tag filter to API request
    }
    const response = await fetch(url, {
      cache: 'no-store'
    });
    if (!response.ok) {
      throw new Error('Failed to fetch blog posts');
    }
    const data = await response.json();
    return data; // Now returning the full response including pagination data
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return { results: [], totalPages: 1, currentPage: 1 };
  }
}

async function getBlogCategories() {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/blog-categories`, {
      cache: 'no-store'
    });
    if (!response.ok) {
      throw new Error('Failed to fetch blog categories');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching blog categories:', error);
    return [];
  }
}

async function getBlogTags() {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/tags`, {
      cache: 'no-store'
    });
    if (!response.ok) {
      throw new Error('Failed to fetch blog tags');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching blog tags:', error);
    return [];
  }
}

export default async function BlogsPage({ searchParams }) {
  const categoryId = searchParams?.category || null;
  const tagId = searchParams?.tags || null;
  const currentPage = Number(searchParams?.page) || 1;
  const [blogData, categories, tags, popularPostsData] = await Promise.all([
    getBlogPosts(categoryId, currentPage, 6, false, tagId),
    getBlogCategories(),
    getBlogTags(),
    getBlogPosts(null, 1, 4, true)
  ]);

  const updatedBlogPosts =
    blogData.results?.map((post, index) => ({
      ...post,
      image: post.coverImage || `/img/blogs/blog${index + 1}.png`
    })) || [];

  const popularPosts =
    popularPostsData.results?.map((post, index) => ({
      ...post,
      image: post.coverImage || `/img/blogs/blog${index + 1}.png`
    })) || [];

  return (
    <div>
      <BlogsBanner
        imgUrl='/img/banner2.png'
        title='Blogs and Articles'
        subtitle='Home - Blogs and Articles'
      />
      <div className='wrapper flex w-full flex-col gap-4 pt-6 pb-10 sm:gap-6 md:pt-8 xl:flex-row xl:justify-between xl:gap-[4%]'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 xl:w-[66%]'>
          {updatedBlogPosts.map((post, index) => (
            <BlogCard key={post.id || index} data={post} />
          ))}
        </div>

        <div className='xl:sticky xl:top-10 xl:h-fit xl:w-[30%] xl:self-start'>
          <BlogsFilter
            categories={categories}
            tags={tags}
            popularPosts={popularPosts}
          />
        </div>
      </div>

      {/* Pagination Component */}
      <div className='wrapper pb-10'>
        <Pagination
          currentPage={currentPage}
          totalPages={blogData.totalPages || 1}
          categoryId={categoryId}
          tagId={tagId}
        />
      </div>
    </div>
  );
}

export function BlogsFilter({
  className,
  categories = [],
  tags = [],
  popularPosts = []
}) {
  function TitleText({ text }) {
    return (
      <div className='mb-2 md:mb-4'>
        <h2 className='border-b-2 border-black/20 pb-2 text-2xl leading-8 font-medium md:pb-3 md:text-3xl'>
          {text}
        </h2>
        <hr className='-mt-[1px] w-[100px] border border-black' />
      </div>
    );
  }
  return (
    <div className={`${className} flex flex-col gap-4 sm:flex-row xl:flex-col`}>
      <div className='rounded-md border p-4 shadow-md sm:flex-1 xl:flex-0'>
        <TitleText text='Popular Posts' />
        <div className='flex flex-col'>
          {popularPosts.map((post) => (
            <Link href={`/blogs/${post.slug || post.id}`} key={post.id}>
              <div className='flex cursor-pointer gap-2 border-black/40 py-3 not-last:border-b hover:bg-gray-50'>
                <img
                  src={`${BASE_URL}${post.coverImage}`}
                  width={100}
                  height={100}
                  alt={post.title}
                  className='object-cover'
                />
                <div>
                  <p className='mb-1 line-clamp-2 text-base xs:text-lg leading-5 font-medium'>
                    {post.title}
                  </p>
                  <p className='text-xs xs:text-sm font-medium'>
                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: '2-digit',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className='sm:w-[45%] xl:w-full'>
        <div className='rounded-md border p-4 shadow-md'>
          <TitleText text='Category' />
          <ul className='flex flex-col gap-[10px] font-light'>
            <li>
              <Link href='/blogs' className='inline-block hover:font-medium'>
                All Categories
              </Link>
            </li>
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  href={`/blogs?category=${category.id}`}
                  className='inline-block hover:font-medium'
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className='mt-4 rounded-md border p-4 shadow-md'>
          <TitleText text='Tags' />
          <div className='flex flex-wrap gap-2'>
            {tags.map((tag) => (
              <Link
                key={tag.id}
                href={`/blogs?tags=${tag.id}`}
                className='border border-black px-3 py-[2px] font-light transition-all duration-200 hover:bg-black hover:text-white'
              >
                {tag.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Pagination({ currentPage, totalPages, categoryId, tagId }) {
  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  // Generate base URL with category if exists
  const baseUrl = categoryId
    ? `/blogs?category=${categoryId}`
    : tagId
      ? `/blogs?tag=${tagId}`
      : '/blogs';

  return (
    <div className='mt-8 flex items-center justify-center gap-4'>
      {prevPage ? (
        <Link
          href={`${baseUrl}?page=${prevPage}`}
          className='rounded border px-4 py-2 hover:bg-gray-100'
        >
          Previous
        </Link>
      ) : (
        <button
          className='cursor-not-allowed rounded border px-4 py-2 text-gray-400'
          disabled
        >
          Previous
        </button>
      )}

      <div className='flex gap-2'>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Link
            key={page}
            href={`${baseUrl}?page=${page}`}
            className={`rounded border px-3 py-1 ${
              page === currentPage ? 'bg-black text-white' : 'hover:bg-gray-100'
            }`}
          >
            {page}
          </Link>
        ))}
      </div>

      {nextPage ? (
        <Link
          href={`${baseUrl}?page=${nextPage}`}
          className='rounded border px-4 py-2 hover:bg-gray-100'
        >
          Next
        </Link>
      ) : (
        <button
          className='cursor-not-allowed rounded border px-4 py-2 text-gray-400'
          disabled
        >
          Next
        </button>
      )}
    </div>
  );
}
