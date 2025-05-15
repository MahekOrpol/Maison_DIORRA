// app/account/layout.tsx
'use client'
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
    <div className="flex flex-col md:flex-row mt-6 px-2.5 xs:px-4 md:px-6">
      {/* Sidebar */}
      <aside className="w-64 xl:w-72 bg-white border-1 shadow-xl rounded-md mb-6 md:mb-0 md:mr-6 p-6 hidden lg:block">
        <h2 className="text-[23px] xl:text-[27px] font-semibold text-gray-800 mb-6 underline">My Account</h2>
        <nav>
          <ul className="space-y-2">
            {tabs.map((tab) => {
              const isActive = pathname === tab.href;
              return (
                <li key={tab.href}>
                  <Link
                    href={tab.href}
                    className={`block px-5 py-2 rounded-md font-medium transition-all duration-200 text-base xl:text-lg
                      ${isActive ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-100 bg-secondary'}`}
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
      <main className="flex-1 bg-white lg:p-6">
        {children}
      </main>
    </div>
  );
}
