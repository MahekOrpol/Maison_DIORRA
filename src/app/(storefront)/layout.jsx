import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import ScrollToTop from '@/components/scroll-to-top';

export default function MainLayout({ children }) {
  return (
    <>
      <Header />
      <main className='flex-1 pt-[85px] min-[1023px]:pt-[118px]'>
        {children}
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
