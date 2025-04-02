import Heading from '@/components/heading';
import PreviewCard from '@/components/preview-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';

export default function CustomersFavourite() {
  return (
    <section className='container pt-16'>
      <Heading
        title='Customer’s Favourite'
        subtitle='New Styles, Endless Elegance'
      />
      <Carousel className=''>
        <CarouselContent className=''>
          {Array.from({ length: 6 }).map((_, index) => (
            <CarouselItem
              key={index}
              className='basis-1/2 lg:basis-1/3 xl:basis-1/4'
            >
              <PreviewCard key={index} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='translate-x-8' />
        <CarouselNext className='-translate-x-8' />
      </Carousel>
    </section>
  );
}
