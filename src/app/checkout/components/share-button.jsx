'use client';
import { useState, useRef, useEffect } from 'react';
import { Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ShareButton({ className, url, title, media }) {
  const [isOpen, setIsOpen] = useState(false);
  const shareRef = useRef(null);

  // Close the share menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (shareRef.current && !shareRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNativeShare = async () => {
    try {
      await navigator.share({
        title: title,
        text: `Check out this product: ${title}`,
        url: url
      });
    } catch (err) {
      console.error('Error sharing:', err);
      // Fallback to opening the share menu anyway
      setIsOpen(!isOpen);
    }
  };

  return (
    <div ref={shareRef} className={cn('relative inline-block', className)}>
      <button
        onClick={handleNativeShare}
        className={cn(
          'flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white transition-all hover:bg-gray-100',
          isOpen ? 'bg-gray-200' : ''
        )}
        aria-label='Share'
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <span className='text-lg font-bold'>×</span>
        ) : (
          <Share2 className='h-5 w-5' strokeWidth={1.6} />
        )}
      </button>

      {/* Social share buttons */}
      <div
        className={cn(
          'absolute top-0 right-0 z-10 flex w-[90vw] items-center gap-2 transition-all duration-300',
          isOpen
            ? 'translate-x-[-110%] opacity-100'
            : 'pointer-events-none translate-x-0 opacity-0'
        )}
      >
        <a
          href={shareLinks.facebook}
          target='_blank'
          rel='noopener noreferrer'
          className='flex h-9 w-9 items-center justify-center rounded-full bg-[#3b5998] text-white transition hover:scale-110 hover:opacity-90'
          title='Share on Facebook'
          aria-label='Facebook'
        >
          <svg
            className='h-5 w-5'
            fill='currentColor'
            viewBox='0 0 24 24'
            aria-hidden='true'
          >
            <path
              fillRule='evenodd'
              d='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z'
              clipRule='evenodd'
            />
          </svg>
        </a>
        <a
          href={shareLinks.twitter}
          target='_blank'
          rel='noopener noreferrer'
          className='flex h-9 w-9 items-center justify-center rounded-full bg-[#55acee] text-white transition hover:scale-110 hover:opacity-90'
          title='Share on Twitter'
          aria-label='Twitter'
        >
          <svg
            className='h-5 w-5'
            fill='currentColor'
            viewBox='0 0 24 24'
            aria-hidden='true'
          >
            <path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' />
          </svg>
        </a>
        <a
          href={shareLinks.pinterest}
          target='_blank'
          rel='noopener noreferrer'
          className='flex h-9 w-9 items-center justify-center rounded-full bg-[#bd081c] text-white transition hover:scale-110 hover:opacity-90'
          title='Share on Pinterest'
          aria-label='Pinterest'
        >
          <svg
            className='h-5 w-5'
            fill='currentColor'
            viewBox='0 0 24 24'
            aria-hidden='true'
          >
            <path
              fillRule='evenodd'
              d='M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.083.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z'
              clipRule='evenodd'
            />
          </svg>
        </a>
        <a
          href={shareLinks.whatsapp}
          target='_blank'
          rel='noopener noreferrer'
          className='flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-white transition hover:scale-110 hover:opacity-90'
          title='Share on WhatsApp'
          aria-label='WhatsApp'
        >
          <svg
            className='h-5 w-5'
            fill='currentColor'
            viewBox='0 0 24 24'
            aria-hidden='true'
          >
            <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z' />
          </svg>
        </a>
      </div>
    </div>
  );
}
