import Heading from '@/components/heading';
import GiftingSlider from './gifting-slider';

const giftingCollectionCards = [
  {
    img: '/img/gifting/guide1.jpeg',
    label: 'Diamond Solitaire Ring',
    href: '/products/rings/engagement-rings'
  },
  {
    img: '/img/gifting/guide2.jpeg',
    label: 'Platinum Couple Bands',
    href: '/products/rings/couple-bands'
  },
  {
    img: '/img/gifting/guide3.jpeg',
    label: 'Emerald Pendant Necklace',
    href: '/products/necklaces/diamond-emerald-pendants'
  },
  {
    img: '/img/gifting/guide4.jpeg',
    label: 'Gold Hoop Earrings',
    href: '/products/earrings/gold-hoops'
  },
  {
    img: '/img/gifting/guide5.jpeg',
    label: 'Diamond Stud Earrings',
    href: '/products/earrings/diamond-studs'
  },
  {
    img: '/img/gifting/guide6.jpeg',
    label: 'Pearl Drop Earrings',
    href: '/products/earrings/diaomond-pearl-drops'
  },
  {
    img: '/img/gifting/guide7.jpeg',
    label: 'Sapphire Tennis Bracelet',
    href: '/products/bracelets/sapphire-tennis'
  },
  {
    img: '/img/gifting/guide8.jpeg',
    label: 'Custom Name Pendant',
    href: '/products/necklaces/diamond-custom-name'
  }
];

export default function S5GiftingCollections() {
  return (
    <section className='wrapper pt-6 md:pt-7 lg:pt-8 xl:pt-10'>
      <Heading
        title='Gifting Collections'
        subtitle='Statement pieces fit for royalty'
      />
      <GiftingSlider cards={giftingCollectionCards} />
    </section>
  );
}
