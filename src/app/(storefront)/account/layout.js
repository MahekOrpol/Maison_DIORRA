// app/account/layout.tsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AccountLayout({ children }) {
  const pathname = usePathname();

  const tabs = [
    { name: 'My Profile', href: '/account/profile' },
    { name: 'My Orders', href: '/account/orders' },
    { name: 'My Wishlist', href: '/account/wishlist' }
  ];

  return (
    <div className='xs:px-4 mt-6 flex flex-col px-2.5 md:flex-row md:px-6'>
      {/* Sidebar */}
      <aside className='mb-6 hidden w-64 rounded-md border-1 bg-white p-6 shadow-xl md:mr-6 md:mb-0 lg:block xl:w-72'>
        <h2 className='mb-6 text-[23px] font-semibold text-gray-800 underline xl:text-[27px]'>
          My Account
        </h2>
        <nav>
          <ul className='space-y-2'>
            {tabs.map((tab) => {
              const isActive = pathname === tab.href;
              return (
                <li key={tab.href}>
                  <Link
                    href={tab.href}
                    className={`block rounded-md px-5 py-2 text-base font-medium transition-all duration-200 xl:text-lg ${isActive ? 'bg-black text-white' : 'bg-secondary text-gray-700 hover:bg-gray-100'}`}
                  >
                    {tab.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Content Area */}
      <main className='flex-1 bg-white lg:p-6'>{children}</main>
    </div>
  );
}
