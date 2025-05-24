import dynamic from 'next/dynamic';
import Heading from '@/components/heading';

// Dynamically import the client component to avoid hydration issues
const TrendingCollections = dynamic(() => import('./trending-collections'));

export default function S8TrendingCollections({ data }) {
  return (
    <section className='wrapper 3xl:pt-16 pt-6 md:pt-8 lg:pt-10 xl:pt-12'>
      <Heading
        title='Trending Collection'
        subtitle='Affordable luxury for everyday wear'
      />
      <TrendingCollections data={data} />
    </section>
  );
}
