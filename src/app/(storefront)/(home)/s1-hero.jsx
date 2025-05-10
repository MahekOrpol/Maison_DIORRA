import HeroSliderClient from './hero-slider';

export default function S1HeroSection({ data }) {
  return (
    <section className='relative w-full'>
      <HeroSliderClient slides={data.slides} />
    </section>
  );
}
