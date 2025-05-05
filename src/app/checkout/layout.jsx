import Footer from '@/components/layout/footer';
import Image from 'next/image';
import Link from 'next/link';

export default function CheckoutLayout({ children }) {
  return (
    <>
      <header className='bg-primary flex items-center justify-center'>
        <Link href={'/'}>
          <Image
            src='/icons/diorra-logo.png'
            alt='logo'
            width={150}
            height={80}
            className='invert-100'
            priority
          />
        </Link>
      </header>
      {children}
      <Footer />
    </>
  );
}
