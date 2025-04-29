import CoverflowCarousel from '@/components/dummy/SwiperCoverflow';
import BlogsSection from '@/features/home/components/blogs-section';
import CustomersFavourite from '@/features/home/components/customers-favourite';
import DiamondShapes from '@/features/home/components/diamond-shapes';
import GiftingSection from '@/features/home/components/gifting-guide';
import CoverflowSlider from '@/features/home/components/gifting-guide2';
import Hero from '@/features/home/components/hero';
import NewArrivals from '@/features/home/components/new-arrivals';
import ShopByCategory from '@/features/home/components/shop-by-category';
import TestimonialSection from '@/features/home/components/testimonial-section';
import TrendingCollections from '@/features/home/components/trending-collections';
import TrendingCollectionsV1 from '@/features/home/components/trending-collectionsv1';
import YourDesign from '@/features/home/components/your-design';
export const metadata = {
  description:
    'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};
export default function HomePage() {
  return (
    <>
      <Hero />
      <YourDesign />
      <ShopByCategory />
      <CustomersFavourite />
      <GiftingSection />
      <DiamondShapes />
      <NewArrivals />
      <TrendingCollectionsV1 />
      {/* <TrendingCollections /> */}
      <BlogsSection />
      <TestimonialSection />
    </>
  );
}
