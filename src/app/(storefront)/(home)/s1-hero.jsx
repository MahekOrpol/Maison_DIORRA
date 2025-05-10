import HeroSliderClient from './hero-slider';
const slides = [
  {
    image: '/img/home-hero2.jpg',
    subtitle: "VALENTINE'S DAY",
    title: 'GET 20% OFF ON YOUR \n FIRST ORDER',
    ctaText: 'SHOP NOW',
    ctaLink: '/products/rings'
  },
  {
    image: '/img/hero2.jpg',
    subtitle: "VALENTINE'S DAY",
    title: 'GET 20% OFF ON YOUR \n FIRST ORDER 02',
    ctaText: 'SHOP NOW',
    ctaLink: '/products/rings'
  },
  {
    image: '/img/hero3.jpg',
    subtitle: "VALENTINE'S DAY",
    title: 'GET 20% OFF ON YOUR \n FIRST ORDER 03',
    ctaText: 'SHOP NOW',
    ctaLink: '/products/rings'
  }
];
export default function S1HeroSection({ data }) {
  return (
    <section className='relative w-full'>
      <HeroSliderClient slides={slides} />
    </section>
  );
}
