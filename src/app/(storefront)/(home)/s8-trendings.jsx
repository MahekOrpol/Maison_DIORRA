import dynamic from 'next/dynamic';
import Heading from '@/components/heading';

// Dynamically import the client component to avoid hydration issues
const TrendingCollections = dynamic(() => import('./trending-collections'));

export default function S8TrendingCollections({ data }) {
  return (
    <section className='wrapper pt-6 md:pt-10 lg:pt-12 xl:pt-14'>
      <Heading
        title='Trending Collection'
        subtitle='Affordable luxury for everyday wear'
      />
      <TrendingCollections data={data} />
    </section>
  );
}
