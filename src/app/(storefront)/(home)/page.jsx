import S1HeroSection from './s1-hero';
import S2CustomDesign from './s2-custom-design';
import S3CategorySection from './s3-category';
import S4FavouriteSection from './s4-favourites';
import S5GiftingCollections from './s5-gifting';
import S6DiamondSection from './s6-diamonds';
import S7NewArrivals from './s7-new-arrivals';
import S8TrendingCollections from './s8-trendings';
import S9BlogsSection from './s9-blogs';
import S10TestimonialSection from './s10-testimonials';
import RingSection from './s2-custom-design(sample)';
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
      <S1HeroSection />
      {/* <S2CustomDesign /> */}
      <RingSection/>
      <S3CategorySection />
      <S4FavouriteSection />
      <S5GiftingCollections />
      <S6DiamondSection />
      <S7NewArrivals />
      <S8TrendingCollections />
      <S9BlogsSection />
      <S10TestimonialSection />
    </>
  );
}
