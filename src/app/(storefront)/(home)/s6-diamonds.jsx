import Heading from '@/components/heading';
import DiamondSlider from './diamond-slider';

export default function S6DiamondSection() {
  return (
    <section className='pt-6 md:pt-8 lg:pt-10'>
      <Heading
        title='Shop by Diamond Shapes'
        subtitle='Find Your Perfect Shape, Shine Your Way'
      />
      <div className='relative min-[2100px]:mx-auto min-[2100px]:max-w-[2100px]'>
        <DiamondSlider />
      </div>
    </section>
  );
}
