// app/account/layout.tsx
import Link from 'next/link';

export default function AccountLayout({ children }) {
  const tabs = [
    { name: 'MyProfile', href: '/account/profile' },
    { name: 'My Orders', href: '/account/orders' },
    { name: 'My Wishlist', href: '/account/wishlist' }
  ];

  return (
    <div className='flex min-h-screen'>
      {/* Left Sidebar with Tabs */}
      <div className='w-64 bg-gray-50 p-4'>
        <h2 className='mb-6 text-xl font-semibold'>My Account</h2>
        <nav>
          <ul className='space-y-2'>
            {tabs.map((tab) => (
              <li key={tab.href}>
                <Link
                  href={tab.href}
                  className='block rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100'
                >
                  {tab.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Right Content Area */}
      <div className='flex-1 p-8'>{children}</div>
    </div>
  );
}
