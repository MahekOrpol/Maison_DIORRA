'use client';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerTitle,
    DrawerTrigger
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'nextjs-toploader/app';
import { useRef, useState } from 'react';
import {
    X,
    Search,
    Phone,
    LogIn,
    ChevronRight,
    Heart,
    ShoppingBag,
    User
} from 'lucide-react';
import { IoDiamondOutline } from 'react-icons/io5';
import { GiGemPendant } from 'react-icons/gi';
import { useModalStore } from '@/store/modal-stote';
import { useUserStore } from '@/store/user-store';
import { useWishlistStore } from '@/store/wishlist-store';
import { baseApiUrl } from '@/lib/utils';
import { toast } from 'sonner';
import { logoutUser } from '@/app/actions/authAction';
import { FiShoppingCart } from "react-icons/fi";
import { FaHandHoldingHeart } from 'react-icons/fa6';

export default function MobileSidebarCopy({
    menuItems,
    categories,
    DiamondShapes,
    availableStyles,
    metalOptions
}) {
    const [searchValue, setSearchValue] = useState('');
    const [activeSubmenu, setActiveSubmenu] = useState(null);
    const drawerCloseRef = useRef(null);
    const router = useRouter();
    const openModal = useModalStore((state) => state.openModal);
    const { clearUser, isLoggedIn } = useUserStore(
        (state) => state
    );
    const handleLogout = async () => {
        try {
            await logoutUser();
            clearUser();
            router.push('/login');
            toast.success('Logged out successfully');
        } catch (error) {
            console.error('Logout failed:', error);
            toast.error('Logout failed. Please try again.');
        }
    };

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            const query = searchValue.trim();
            if (!query || query.length < 2) return;

            router.push('/search?query=' + encodeURIComponent(query));
            setSearchValue('');
            if (drawerCloseRef.current) {
                drawerCloseRef.current.click();
            }
        }
    };

    const toggleSubmenu = (label) => {
        setActiveSubmenu(activeSubmenu === label ? null : label);
    };

    const closeDrawer = () => {
        if (drawerCloseRef.current) {
            drawerCloseRef.current.click();
        }
    };

    return (
        <Drawer direction='left' repositionInputs={false}>
            <DrawerTrigger asChild>
                <Button variant='ghost' size='icon' className='lg:hidden'>
                    <Image
                        src='/icons/menu.svg'
                        alt='Menu'
                        width={40}
                        height={40}
                        className='h-[40px] w-[40px]'
                        priority
                    />
                </Button>
            </DrawerTrigger>
            <DrawerClose ref={drawerCloseRef} className='hidden' />

            <DrawerContent className='flex flex-col p-0 backdrop-blur-lg bg-white/90 data-[vaul-drawer-direction=left]:w-[85%] border-none'>
                <DrawerTitle className='sr-only'>Mobile side nav bar</DrawerTitle>
                {/* TOP SECTION */}
                <div className='flex items-center justify-between bg-black px-4 py-1'>
                    <DrawerClose asChild>
                        <Link href='/' className='mx-auto'>
                            <Image
                                src='/icons/diorra-logo.png'
                                height={63}
                                width={160}
                                alt='Company logo'
                                priority
                                className='mx-auto h-[58px] object-cover invert-100'
                            />
                        </Link>
                    </DrawerClose>
                    <DrawerClose className='flex h-7 w-7 items-center justify-center rounded-full bg-gray-700 text-white transition hover:bg-gray-600'>
                        <X size={18} />
                    </DrawerClose>
                </div>

                {/* CONTENT SECTION */}
                <div className='flex-1 overflow-y-auto bg-white px-4 py-2 text-black'>
                    {/* Search */}
                    <div className='relative mb-4 w-full'>
                        <Search className='absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-500' />
                        <Input
                            type='text'
                            placeholder='Search products...'
                            className='h-10 w-full rounded-full border border-gray-300 pr-4 pl-10 shadow-none focus:ring-1'
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            onKeyDown={handleSearch}
                        />
                    </div>
                    {/* Navigation Sections */}
                    <nav className='space-y-1'>
                        {menuItems.map((item, index) => (
                            <div key={index} className="border-b">
                                {item.content ? (
                                    <>
                                        <button
                                            className='flex w-full items-center justify-between py-3 text-left'
                                            onClick={() => toggleSubmenu(item.label)}
                                        >
                                            <div className='flex items-center gap-2'>
                                                {item.icon}
                                                <span className='text-lg'>{item.label}</span>
                                            </div>
                                            <ChevronRight
                                                className={`transition-transform ${activeSubmenu === item.label ? 'rotate-90' : ''}`}
                                                size={18}
                                            />
                                        </button>
                                        {activeSubmenu === item.label && (
                                            <div className='pb-3 pl-8' onClick={closeDrawer}>
                                                {item.label === 'Diamonds' && (
                                                    <DiamondsSubmenu DiamondShapes={DiamondShapes} />
                                                )}
                                                {item.label === 'Fine Jewelry' && (
                                                    <FineJewelrySubmenu categories={categories} />
                                                )}
                                                {item.label === 'Engagement Rings' && (
                                                    <EngagementRingsSubmenu
                                                        availableStyles={availableStyles}
                                                        metalOptions={metalOptions}
                                                    />
                                                )}
                                                {item.label === 'Custom Jewelry' && (
                                                    <CustomJewelrySubmenu />
                                                )}
                                                {item.label === 'Education' && <EducationSubmenu />}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <DrawerClose asChild>
                                        <Link
                                            href={item.href}
                                            className='flex items-center gap-2 py-3'
                                        >
                                            {item.icon}
                                            {item.label}
                                        </Link>
                                    </DrawerClose>
                                )}
                            </div>
                        ))}

                        <div className='border-b'>
                            <DrawerClose asChild onClick={closeDrawer}>
                                <Link
                                    href='/account'
                                    className='flex items-center gap-2 py-3 text-lg'
                                >
                                    <User size={18} />
                                    My Account
                                </Link>
                            </DrawerClose>
                        </div>
                        <div className='border-b'>
                            <DrawerClose asChild onClick={closeDrawer}>
                                <Link
                                    href='/contact'
                                    className='flex items-center gap-2 py-3 text-lg'
                                >
                                    <FiShoppingCart size={18} />
                                    My Orders
                                </Link>
                            </DrawerClose>
                        </div>
                        <div className='border-b'>
                            <DrawerClose asChild onClick={closeDrawer}>
                                <Link
                                    href='/account/wishlist'
                                    className='flex items-center gap-2 py-3 text-lg'
                                >
                                    <FaHandHoldingHeart size={18} />
                                    My Wishlist
                                </Link>
                            </DrawerClose>
                        </div>
                    </nav>
                </div>

                {/* BOTTOM SECTION */}
                <div className='bg-primary text-primary-foreground px-4 py-1.5'>
                    {isLoggedIn ? (
                        <Button
                            variant='ghost'
                            className='w-full justify-start gap-2 text-white hover:bg-gray-800'
                            onClick={handleLogout}
                        >
                            <LogIn size={18} />
                            Log Out
                        </Button>
                    ) : (
                        <DrawerClose asChild>
                            <Link href='/login'>
                                <Button
                                    variant='ghost'
                                    className='w-full justify-start gap-2 text-white hover:bg-gray-800'
                                >
                                    <LogIn size={18} />
                                    Login / Sign Up
                                </Button>
                            </Link>
                        </DrawerClose>
                    )}
                </div>
            </DrawerContent>
        </Drawer>
    );
}

// Submenu Components
function DiamondsSubmenu({ DiamondShapes }) {
    return (
        <div className='space-y-4'>
            <div>
                <h4 className='mb-2 mt-2 font-medium text-base underline'>Diamonds By Shape</h4>
                <ul className='space-y-2'>
                    {DiamondShapes?.map((shape) => (
                        <li key={shape.id}>
                            <Link
                                href={`/diamonds?shape=${shape.diamondShape}`}
                                className='flex items-center gap-2 py-1'
                            >
                                {shape.diamondImage && (
                                    <Image
                                        src={baseApiUrl + shape.diamondImage}
                                        alt={shape.diamondShape}
                                        width={20}
                                        height={20}
                                        className='object-contain'
                                    />
                                )}
                                <span className='text-sm font-light'>{shape.diamondShape}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h4 className='mb-2 mt-2 font-medium text-base underline'>Diamonds By Price</h4>
                <ul className='space-y-2 pt-1 pb-1'>
                    {['Under $1,000', '$1,000 - $2,500', '$2,500 - $5,000', 'Over $5,000'].map((price) => (
                        <li key={price}>
                            <Link
                                href={`/diamonds?price=${price}`}
                                className='py-1 hover:underline text-sm font-light'
                            >
                                {price}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

function FineJewelrySubmenu({ categories }) {
    return (
        <div className='space-y-4'>
            {categories?.map((category) => (
                <div key={category.id}>
                    <h4 className='mb-2 mt-2 font-medium text-base underline'>{category.categoryName}</h4>
                    <ul className='space-y-2'>
                        {category.subcategories.map((sub) => (
                            <li key={sub._id} >
                                <Link
                                    href={`/products/${sub.subcategoryName.toLowerCase().replace(/\s+/g, '-')}`}
                                    className='py-1 hover:underline text-sm font-light'
                                >
                                    {sub.subcategoryName}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

function EngagementRingsSubmenu({ availableStyles, metalOptions }) {
    return (
        <div className='space-y-4'>
            <div>
                <h4 className='mb-2 mt-2 font-medium text-base underline'>Ring Styles</h4>
                <ul className='space-y-1'>
                    {availableStyles?.map(({ name, image }) => (
                        <li key={name}>
                            <Link
                                href={`/products/rings/engagement-rings?style=${name}`}
                                className='flex items-center gap-2 py-1'
                            >
                                <Image
                                    src={baseApiUrl + image}
                                    alt={name}
                                    width={20}
                                    height={20}
                                    className='object-contain'
                                />
                                <span className='hover:underline text-sm font-light'>{name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h4 className='mb-2 mt-2 font-medium text-base underline'>Metal Types</h4>
                <ul className='space-y-1'>
                    {metalOptions?.map(({ name, image }) => (
                        <li key={name}>
                            <Link
                                href={`/products/rings/engagement-rings?metal=${name.toLowerCase().replace(/\s+/g, '-')}`}
                                className='flex items-center gap-2 py-1'
                            >
                                <Image
                                    src={image}
                                    alt={name}
                                    width={20}
                                    height={20}
                                    className='object-contain'
                                />
                                <span className='hover:underline text-sm font-light'>{name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h4 className='mb-2 mt-2 font-medium text-base underline'>Collections</h4>
                <ul className='space-y-2'>
                    {['Classic', 'Bridal', 'Nature Inspired', 'Minimalist'].map(
                        (collection) => (
                            <li key={collection}>
                                <Link
                                    href={`/products/rings/engagement-rings/collections/${collection.toLowerCase().replace(/\s+/g, '-')}`}
                                    className='hover:underline text-sm font-light'
                                >
                                    {collection}
                                </Link>
                            </li>
                        )
                    )}
                </ul>
            </div>
        </div>
    );
}

function CustomJewelrySubmenu() {
    return (
        <div className='space-y-4'>
            <div>
                <h4 className='mb-2 mt-2 font-medium text-base underline'>Custom Jewelry</h4>
                <ul className='space-y-2'>
                    {[
                        'Design Your Own Ring',
                        'Custom Engagement Rings',
                        'Custom Pendants',
                        'Family Heirlooms',
                        'Replica Services'
                    ].map((service) => (
                        <li key={service}>
                            <Link
                                href={`/custom-jewelry/${service.toLowerCase().replace(/\s+/g, '-')}`}
                                className='py-1 hover:underline text-sm font-light'
                            >
                                {service}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h4 className='mb-2 mt-2 font-medium text-base underline'>The Process</h4>
                <ul className='space-y-2'>
                    {[
                        '1. Consultation',
                        '2. Design',
                        '3. 3D Rendering',
                        '4. Production',
                        '5. Final Approval'
                    ].map((step) => (
                        <li key={step}>
                            <Link
                                href='/custom-jewelry#process'
                                className='py-1 hover:underline text-sm font-light'
                            >
                                {step}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

function EducationSubmenu() {
    return (
        <div className='space-y-4'>
            <div>
                <h4 className='mb-2 mt-2 font-medium text-base underline'>Diamond Education</h4>
                <ul className='space-y-2'>
                    {[
                        'The 4 Cs',
                        'Diamond Shapes',
                        'Certifications',
                        'Fluorescence',
                        'Conflict-Free Diamonds'
                    ].map((topic) => (
                        <li key={topic}>
                            <Link
                                href={`/education/diamonds/${topic.toLowerCase().replace(/\s+/g, '-')}`}
                                className='py-1 hover:underline text-sm font-light'
                            >
                                {topic}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h4 className='mb-2 mt-2 font-medium text-base underline'>Jewelry Care</h4>
                <ul className='space-y-2'>
                    {[
                        'Cleaning Guide',
                        'Storage Tips',
                        'Maintenance',
                        'Insurance',
                        'Appraisals'
                    ].map((topic) => (
                        <li key={topic}>
                            <Link
                                href={`/education/care/${topic.toLowerCase().replace(/\s+/g, '-')}`}
                                className='py-1 hover:underline text-sm font-light'
                            >
                                {topic}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}