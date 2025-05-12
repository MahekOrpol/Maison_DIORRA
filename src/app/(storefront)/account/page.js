'use client';
import React, { useState, useEffect } from 'react';

export default function Page() {
  const [activeTab, setActiveTab] = useState('profile');
  const [tabData, setTabData] = useState({
    profile: { content: null, loading: false },
    orders: { content: null, loading: false },
    wishlist: { content: null, loading: false },
  });

  const handleTabClick = async (tabKey) => {
    setActiveTab(tabKey);

    // If content hasn't been loaded yet, fetch it
    if (!tabData[tabKey].content) {
      setTabData(prev => ({
        ...prev,
        [tabKey]: { ...prev[tabKey], loading: true }
      }));
      
      try {
        const res = await fetch(`/account/${tabKey}`);
        const data = await res.text();
        setTabData(prev => ({
          ...prev,
          [tabKey]: { content: data, loading: false }
        }));
      } catch (error) {
        setTabData(prev => ({
          ...prev,
          [tabKey]: {
            content: `<p>Error loading ${tabKey} content.</p>`,
            loading: false
          }
        }));
      }
    }
  };

  // Load default tab content on mount
  useEffect(() => {
    handleTabClick('profile');
  }, []);

  // Render the active tab's content
  const renderTabContent = () => {
    const currentTab = tabData[activeTab];

    if (currentTab.loading) {
      return <p className='p-6'>Loading {activeTab}...</p>;
    }

    return (
      <div
        className='p-6'
        dangerouslySetInnerHTML={{ __html: currentTab.content || '' }}
      />
    );
  };

  return (
    <div className='flex flex-col md:flex-row gap-6'>
      {/* Sidebar Tabs */}
      <div className='w-full md:w-1/4 space-y-2 p-10'>
        {['profile', 'orders', 'wishlist'].map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`w-full text-left rounded-lg p-3 font-medium ${
              activeTab === tab
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            {tab === 'profile' && 'Profile'}
            {tab === 'orders' && 'My Orders'}
            {tab === 'wishlist' && 'My Wishlist'}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className='w-full md:w-3/4 bg-white shadow rounded-lg'>
        {renderTabContent()}
      </div>
    </div>
  );
}
