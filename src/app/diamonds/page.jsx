import CustomTag from '@/components/custom-tag';
import { ProductSelectionStepsForDiamonds } from '@/components/custom-tag-wrapper';
import DiamondFilters from './components/diamond-filters';
import DiamondPreviewCard from './components/diamond-preview-card';

export default function Page() {
  return (
    <div className='wrapper'>
      {/* arrowed label */}
      <ProductSelectionStepsForDiamonds />
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
