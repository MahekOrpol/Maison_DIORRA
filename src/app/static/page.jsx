import CoverflowCarousel from '@/components/dummy/SwiperCoverflow';
import BlogsSection from '@/app/(storefront)/(home)/s9-blogs';
import CustomersFavourite from '@/app/(storefront)/(home)/s4-favourites';
import DiamondShapes from '@/app/(storefront)/(home)/s6-diamonds';
import GiftingSection from '@/app/(storefront)/(home)/s5-gifting';
import CoverflowSlider from '@/app/(storefront)/(home)/test-gifting';
import Hero from '@/app/(storefront)/(home)/s1-hero';
import NewArrivals from '@/app/(storefront)/(home)/s7-new-arrivals';
import ShopByCategory from '@/app/(storefront)/(home)/s3-category';
import TestimonialSection from '@/app/(storefront)/(home)/s10-testimonials';
import TrendingCollections from '@/app/(storefront)/(home)/test-trending';
import TrendingCollectionsV1 from '@/app/(storefront)/(home)/s8-trendings';
import YourDesign from '@/app/(storefront)/(home)/s2-custom-design';
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
