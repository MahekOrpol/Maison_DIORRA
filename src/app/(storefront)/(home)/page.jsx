import S1HeroSection from './s1-hero';
import S3CategorySection from './s3-category';
import S4FavouriteSection from './s4-favourites';
import S5GiftingCollections from './s5-gifting';
import S6DiamondSection from './s6-diamonds';
import S7NewArrivals from './s7-new-arrivals';
import S8TrendingCollections from './s8-trendings';
import S9BlogsSection from './s9-blogs';
import S10TestimonialSection from './s10-testimonials';
import RingSection from './s2-custom-design(sample)';
import { getHomePageData } from '@/lib/api/home-page-api';
import S2CustomDesign from './s2-custom-design';
export default async function HomePage() {
  const data = await getHomePageData();
  console.log(data);

  return (
    <>
      <S1HeroSection data={data.heroData} />
      {/* <RingSection /> */}
      <S2CustomDesign />
      <S3CategorySection data={data.categoryData} />
      <S4FavouriteSection data={data.favourites} />
      <S5GiftingCollections data={data.gifting} />
      <S6DiamondSection />
      <S7NewArrivals data={data.newArrivals} />
      <S8TrendingCollections data={data.trending} />
      <S9BlogsSection data={data.blogs} />
      <S10TestimonialSection data={data.testimonials} />
    </>
  );
}
