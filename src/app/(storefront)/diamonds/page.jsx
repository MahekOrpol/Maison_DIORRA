import { ProductSelectionStepsForDiamonds } from '@/components/custom-tag-wrapper';
import DiamondFilters from './components/diamond-filters';
import DiamondPreviewCard from './components/diamond-preview-card';

export default function Page() {
  return (
    <div className='wrapper'>
      {/* arrowed label */}
      <ProductSelectionStepsForDiamonds className='xs:my-[25px] my-[20px] sm:my-[30px] lg:my-[35px] xl:mt-[50px] xl:mb-[45px] 2xl:mt-[65px] 2xl:mb-[60px]' />
      <DiamondFilters />
      {/* Diamond listing section */}
      <section className='grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4 lg:grid-cols-4'>
        {Array.from({ length: 50 }).map((item, i) => (
          <DiamondPreviewCard key={i} href='/diamonds/slug' />
        ))}
      </section>
    </div>
  );
}
