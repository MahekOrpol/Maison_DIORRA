import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { WishlistNotAllowed } from '@/components/modals/wishlist-not-allowed';
import ScrollToTop from '@/components/scroll-to-top';
import CartItem from '../checkout/components/cart-item';
import { CartNotAllowed } from '@/components/modals/cart-not-allowed';
import { fetchCategories } from '@/lib/api/home-page-api';

export default async function MainLayout({ children }) {
  const categories = await fetchCategories();
  console.log(categories);
  return (
    <>
      <Header categories={categories} />
      <main className='flex-1 pt-[85px] min-[1023px]:pt-[118px]'>
        {children}
      </main>
      <Footer />
      <ScrollToTop />
      <WishlistNotAllowed />
      <CartNotAllowed />
    </>
  );
}
