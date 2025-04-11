import BlogsSection from '@/features/home/components/blogs-section';
import CustomersFavourite from '@/features/home/components/customers-favourite';
import DiamondShapes from '@/features/home/components/diamond-shapes';
import GiftingSection from '@/features/home/components/gifting-guide';
import Hero from '@/features/home/components/hero';
import NewArrivals from '@/features/home/components/new-arrivals';
import ShopByCategory from '@/features/home/components/shop-by-category';
import TestimonialSection from '@/features/home/components/testimonial-section';
import TrendingCollections from '@/features/home/components/trending-collections';
import YourDesign from '@/features/home/components/your-design';
export default function Page() {
  return (
    <div>
      <Hero />
      <YourDesign />
      <ShopByCategory />
      <CustomersFavourite />
      <GiftingSection />
      <DiamondShapes />
      <NewArrivals />
      <TrendingCollections />

      <BlogsSection />
      <TestimonialSection />
    </div>
  );
}
