import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { WishlistNotAllowed } from '@/components/modals/wishlist-not-allowed';
import ScrollToTop from '@/components/scroll-to-top';
import CartItem from '../checkout/components/cart-item';
import { CartNotAllowed } from '@/components/modals/cart-not-allowed';
import { fetchCategories } from '@/lib/api/home-page-api';
import { baseApiUrl } from '@/lib/utils';

export async function fetchDiamondShapes() {
  try {
    const response = await fetch(`${baseApiUrl}/api/v1/diamond-shape/get`, {
      // next: { revalidate: 3600 } // Optional: revalidate data every hour
    });
    if (!response.ok) {
      throw new Error('Failed to fetch diamond shapes');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching diamond shapes:', error);
    return [];
  }
}

export async function fetchRingStyles() {
  try {
    const response = await fetch(`${baseApiUrl || 'http://153.92.222.195:5000'}/api/v1/category/get`, {
      // next: { revalidate: 3600 } // Optional: revalidate data every hour
    });
    if (!response.ok) {
      throw new Error('Failed to fetch diamond shapes');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching diamond shapes:', error);
    return [];
  }
}

export default async function MainLayout({ children }) {
  const categories = await fetchCategories();
  const DiamondShapes = await fetchDiamondShapes();
  const allcategories = await fetchRingStyles();
  const availableStyles = (allcategories || []).find(
    (item) => item.categoryName === "Rings"
  )?.style;
  return (
    <>
      <Header categories={categories} DiamondShapes={DiamondShapes} availableStyles={availableStyles} />
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
