import Heading from '@/components/heading';

import { repeatProductsV1 } from '@/lib/utils';
import FavouriteSlider from './favourite-slider';

export default function S4FavouriteSection({ data }) {
  // console.log('favorito :>> ', data);
  // const customersFavourite = repeatProductsV1(20); // Replace with server-fetch if needed
  return (
    <section className='wrapper pt-6 md:pt-7 lg:pt-8 xl:pt-10'>
      <Heading
        title='Customer’s Favourite'
        subtitle='New Styles, Endless Elegance'
      />
      <FavouriteSlider products={data} />
    </section>
  );
}
